import { AbstractBillRepository } from "./launch.repository.d";
import { Bill } from "./launch";
import Knex from "knex";

export class BillRepository extends AbstractBillRepository {

  /**
   *
   */
  
  constructor(protected knex: Knex) {
    super();
  }

  get queryBuilder() {
    if(!this.transaction)
      return this.knex("Bills");
    
    return this.transaction("Bills");
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