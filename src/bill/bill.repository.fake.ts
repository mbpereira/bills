import { AbstractBillRepository } from "./bill.repository.abstract";
import { Bill } from "./bill";
import { billFakes } from "./bill.seeds";

export class BillRepositoryFake extends AbstractBillRepository {

  private data: Bill[];
  /**
   *
   */
  constructor() {
    super();
    this.data = [...billFakes];
  }
  
  findById(id: number): Promise<Bill> {
    return Promise.resolve(this.data.find(b => b.id === id));
  }

  all(limit?: number): Promise<Bill[]> {
    return Promise.resolve(this.data);
  }

  add(launch: Bill): Promise<void> {
    this.data.push(launch);
    return Promise.resolve();
  }

  remove(id: number): Promise<void> {
    this.data = this.data.filter(b => b.id !== id);
    return Promise.resolve();
  }

  update(id: number, launch: Bill): Promise<void> {
    const index = this.data.findIndex(b => b.id === id);
    this.data[index] = launch;
    return Promise.resolve();
  }

  protected get knex(): import("knex") <any, unknown[]> {
    throw new Error("Method not implemented.");
  }

}