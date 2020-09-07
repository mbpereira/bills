import { AbstractBillRepository } from "./bill.repository.abstract";
import { Bill } from "./bill";
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

  async all(limit?: number | undefined): Promise<Bill[]> {
    return await this.queryBuilder.select();
  }

  async add(bill: Bill): Promise<void> {
    return await this.queryBuilder.insert(bill);
  }

  async remove(id: number): Promise<void> {
    return await this.queryBuilder.where("id", id)
      .first()
      .del();
  }

  async update(id: number, launch: Bill): Promise<void> {
    await this.queryBuilder.where("id", id).update(launch);
  }

}