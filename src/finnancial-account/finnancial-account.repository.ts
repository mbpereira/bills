import { AbstractFinnancialAccountRepository } from "./finnancial-account.repository.d"
import { FinnancialAccount } from "./finnancial-account";
import Knex from "knex";

export class FinnancialAccountRepository extends AbstractFinnancialAccountRepository, ITransactional {

  /**
   *
   */
  constructor(protected knex: Knex) {
    super();
  }

  get queryBuilder() {
    if(!this.transaction)
      return this.knex("FinnancialAccounts");
  
    return this.transaction("FinnancialAccounts");
  }

  async findById(id: number): Promise<FinnancialAccount> {
    return await this.queryBuilder.where("id", id)
      .first();
  }

  async all(limit?: number | undefined): Promise<FinnancialAccount[]> {
    const records = await this.queryBuilder.select<FinnancialAccount[]>("*");

    return records;
  }

  async add(deposit: FinnancialAccount): Promise<void> {
    return await this.queryBuilder.insert(deposit);
  }
  
  async remove(id: number): Promise<void> {
    return await this.queryBuilder.where("id", id)
      .first()
      .del();
  }

  async update(id: number, deposit: FinnancialAccount): Promise<void> {
    return await this.queryBuilder.where("id", id)
      .update(deposit);
  }

}