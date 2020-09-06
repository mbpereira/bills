import { IBillRepository } from "./launch.repository.d";
import { Bill } from "./launch";
import Knex, { QueryBuilder } from "knex";

export class BillRepository implements IBillRepository {

  /**
   *
   */
  
  constructor(private knex: Knex) {
  }

  get queryBuilder() {
    return this.knex("Bills");
  }

  async findById(id: number): Promise<Bill> {
    return await this.queryBuilder.where("id", id)
      .first();
  }

  all(limit?: number | undefined): Promise<Bill> {
    throw new Error("Method not implemented.");
  }

  async add(bill: Bill): Promise<void> {
    return await this.queryBuilder.insert(bill);
  }

  remove(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(id: number, launch: Bill): Promise<void> {
    throw new Error("Method not implemented.");
  }

}