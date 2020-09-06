import { IFinnancialAccountRepository } from "./finnancial-account.repository.d"
import { FinnancialAccount } from "./finnancial-account";
import Knex, { QueryBuilder } from "knex";

export class FinnancialAccountRepository implements IFinnancialAccountRepository {


  /**
   *
   */
  constructor(private knex: Knex) {
  }

  get queryBuilder() {
    return this.knex("FinnancialAccounts");
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