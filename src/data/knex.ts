import knex from "knex";
import { ITransactional } from "./transactional";
import Knex from "knex";

export const createKnex = () => {
  return knex({
    client: 'pg',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      database: process.env.DB_NAME
    }
  });
};

export const createKnexTest = () => {
  return knex({
    client: 'pg',
    connection: {
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
      port: Number(process.env.DEV_DB_PORT),
      host: process.env.DEV_DB_HOST,
      database: process.env.DEV_DB_NAME
    }
  });
};

export const createTransactionContext = async (transactionals: ITransactional[], unitOfWork: { (trx: Knex.Transaction<any, any>): void }) => {
  
  let trx: Knex.Transaction<any, any> = await createKnex().transaction();
  
  transactionals.map(transactional => {
    transactional.setTransaction(trx);
  });

  unitOfWork(trx);
}