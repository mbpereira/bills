import { IDepositRepository } from "./deposit.repository.d"
import { Deposit } from "./deposit";
import Knex, { QueryBuilder } from "knex";

export class DepositRepository implements IDepositRepository {

  private queryBuilder: QueryBuilder;
  
  /**
   *
   */
  constructor(knex: Knex) {
    this.queryBuilder = knex("Deposits");
  }

  findById(id: number): Promise<Deposit> {
    return this.queryBuilder.where("id", id)
      .first();
  }

  all(limit?: number | undefined): Promise<Deposit> {
    return this.queryBuilder.select("*");
  }

  async add(deposit: Deposit): Promise<void> {
    return this.queryBuilder.insert(deposit);
  }
  
  remove(id: number): Promise<void> {
    return this.queryBuilder.where("id", id)
      .first()
      .del();
  }

  update(id: number, deposit: Deposit): Promise<void> {
    return this.queryBuilder.where("id", id)
      .update(deposit);
  }

}