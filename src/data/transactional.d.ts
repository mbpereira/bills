import { Transaction } from "knex";

export interface ITransactional {
  setTransaction(trx: Transaction);
}