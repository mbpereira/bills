import Knex, { Transaction } from "knex";

export abstract class AbstractTransactional {

  private _transaction: Transaction<any, any> | null = null;
  /**
   *
   */

  protected abstract get knex(): Knex;

  setTransaction(trx: Transaction<any, any>) {
    this._transaction = trx;
  }

  async beginTransaction(): Promise<Transaction<any, any>> {
    if (!this._transaction) {
      const trx = await this.knex.transaction();
      this._transaction = trx;
    }

    return this._transaction;
  }

  get transaction(): Transaction<any, any> | null {
    if (this._transaction?.isCompleted) {
      return null;
    }

    return this._transaction;
  }
}