import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("profiles", function (table) {
    table.uuid('id').primary().notNullable().unique();
    table
      .uuid("user_id")
      .unique()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.text("bio");
    table.string("phone");
    table.string("email");
    table.string("photo");
    table.boolean("is_public").defaultTo(true);
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
