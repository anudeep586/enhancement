const bcrypt = require("bcrypt");
import knex from "../database/db";
import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";

export const registerController = async (ctx: any) => {
  try {
    const { username, email, password } = ctx.request.body;
    const hash = await bcrypt.hash(password, 10);
    const id = uuidv4();
    await knex("users")
      .insert({
        id,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hash,
      })
      .returning("*");
    ctx.body = "successfully registered";
  } catch (err: any) {
    ctx.body = "Internal Server Error";
    ctx.status = 500;
  }
};

export const loginController = async (ctx: any) => {
  try {
    const { email, password } = ctx.request.body;
    const hash = await bcrypt.hash(password, 10);
    let message: any;
    let status = 201;
    const data = await knex("users")
      .where({ email: email.toLowerCase() })
      .select("*");
    if (data.length > 0) {
      if (!(await bcrypt.compare(password, data[0].password))) {
        status = 400;
        message = {
          msg: "Incorrect Password",
        };
      } else {
        const token = jwt.sign(
          {
            username: data[0].username,
            id: data[0].id,
            email: data[0].email,
          },
          process.env.JWT_SECRET + "@JWT_R@nD0m_Str1Ng",
          { expiresIn: process.env.JWT_EXPIRE ?? "10h" }
        );
        message = {
          msg: "successfully verified",
          token: token,
        };
      }
    } else {
      message = { msg: "please signUp first", token: "" };
      status = 400;
    }
    ctx.body = message;
    ctx.status = status;
  } catch (err: any) {
    ctx.body = "Internal Server Error";
    ctx.status = 500;
  }
};

export const addProfileDetails = async (ctx: any) => {
  try {
    const { name, bio, phone, photo, is_public } = ctx.request.body;
    const userId = ctx.state.userPayload?.id;
    const email = ctx.state.userPayload?.email;
    let message;
    const data = await knex("users").where({ id: userId }).select("*");
    let status = 200;
    if (data.length > 0) {
      const id = uuidv4();
      await knex("profiles")
        .insert({
          id,
          user_id: userId,
          name,
          bio,
          email,
          phone,
          photo,
          is_public,
        })
        .returning("*");
      message = "successfuly added";
    } else {
      message = "no such user";
      status = 404;
    }
    ctx.body = message;
    ctx.status = status;
  } catch (err: any) {
    ctx.body = "Internal Server Error";
    ctx.status = 500;
  }
};

export const loginThroughGoogle = async (ctx: any) => {
  try {
    const email: string = ctx.request.body.email;
    const name: string = ctx.request.body.name;
    const check = await knex("users")
      .where({ email: email.toLowerCase() })
      .returning("*");
    let token;
    if (check.length === 0) {
      const password = "loginpassword";
      const hash = await bcrypt.hash(password, 10);
      const id = uuidv4();
      const data = await knex("users")
        .insert({
          id,
          username: name.toLowerCase(),
          email: email.toLowerCase(),
          password: hash,
        })
        .returning("*");
      token = jwt.sign(
        {
          username: data[0].username,
          id: data[0].id,
          email: data[0].email,
        },
        process.env.JWT_SECRET + "@JWT_R@nD0m_Str1Ng",
        { expiresIn: process.env.GOOGLE_TOKEN_EXPIRE ?? "10h" }
      );
    } else {
      token = jwt.sign(
        {
          username: check[0].username,
          id: check[0].id,
          email: check[0].email,
        },
        process.env.JWT_SECRET + "@JWT_R@nD0m_Str1Ng",
        { expiresIn: process.env.GOOGLE_TOKEN_EXPIRE ?? "10h" }
      );
    }
    ctx.body = {
      msg: "loggedin successfully",
      token: token,
    };
    ctx.status = 200;
  } catch (error: any) {
    ctx.body = "Internal Server Error";
    ctx.status = 500;
  }
};

export const getAllProfileDetails = async (ctx: any) => {
  try {
    const role = ctx.state.userPayload?.role;
    let data;
    if (role === "user") {
      data = await knex("profiles").where({ is_public: true }).select("*");
    } else if (role === "admin") {
      data = await knex("profiles").select("*").orderBy("created_at", "desc");
    }
    ctx.body = { data: data };
    ctx.status = 201;
  } catch (err: any) {
    ctx.body = "Internal Server Error";
    ctx.status = 500;
  }
};

export const getMyProfileDetails = async (ctx: any) => {
  try {
    const id = ctx.state.userPayload?.id;
    let data;
    data = await knex("profiles").where({ user_id: id }).select("*");
    ctx.body = { data: data[0] };
    ctx.status = 201;
  } catch (err: any) {
    ctx.body = "Internal Server Error";
    ctx.status = 500;
  }
};

export const updateProfile = async (ctx: any) => {
  try {
    const userId = ctx.state.userPayload?.id;
    const { name, bio, phone, email, photo, is_public } = ctx.request.body;
    if (email) {
      // Update email in users table
      await knex("users").where("id", userId).update({
        email,
      });
    }
    const data = await knex("profiles")
      .where("user_id", userId)
      .update({
        photo,
        name,
        bio,
        email,
        phone,
        is_public,
      })
      .returning("*");
    ctx.body = { message: "Updated successfully", data: data[0] };
    ctx.status = 201;
  } catch (err: any) {
    ctx.body = "Internal Server Error";
    ctx.status = 500;
  }
};

export const changeProfileAsAdmin = async (ctx: any) => {
  try {
    const userId = ctx.state.userPayload?.id;
    const data = await knex("users")
      .where("id", userId)
      .update({
        role: "admin",
      })
      .returning("*");
    ctx.body = { message: "Updated successfully", data: data[0] };
    ctx.status = 201;
  } catch (err: any) {
    ctx.body = "Internal Server Error";
    ctx.status = 500;
  }
};
