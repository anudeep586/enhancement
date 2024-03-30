import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function(table) {
        table.uuid('id').primary().notNullable().unique();
        table.string('username').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.enum('role', ['user', 'admin']).defaultTo('user');
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
        table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
      });
}

export async function down(knex: Knex): Promise<void> {}
