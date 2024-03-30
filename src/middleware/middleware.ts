const bcrypt = require("bcrypt");
import knex from "../database/db";
import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";

export const verifyToken = async (ctx: any, next: any) => {
    if (!ctx.request.header.authorization) {
      throw new Error('Token should not be empty');
    }
    const token = ctx.request.header.authorization.split(' ')[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET + '@JWT_R@nD0m_Str1Ng',
      (err: any, userObjdata: any) => {
        if (err) {
          throw new Error('Invalid or expired token');
        }
        ctx.state.userPayload = userObjdata;
      }
    );
  
    const data = await knex('users')
      .where({ id: ctx.state.userPayload?.id })
      .select('*');
    if (data.length === 0) {
      throw new Error('User not found, try different token');
    }
    ctx.state.userPayload = data[0];  
    await next();
  };