import Knex from "knex";

export const truncate = async (knex: Knex, table: string[] | string) => {
  if (Array.isArray(table)) {
    await Promise.all(table.map(name => knex.raw(`truncate table "${name}" cascade`)));
    return;
  }
  await knex.raw(`truncate table "${table}" cascade`);
};