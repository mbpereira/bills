import { AbstractFinnancialAccountRepository } from "./finnancial-account.repository.abstract";
import { FinnancialAccount } from "./finnancial-account";
import { finnancialAccountsFakes } from "./finnancial-account.seeds";
import { transactionMock } from "../data/helpers";

export class FinancialAccountRepositoryFake extends AbstractFinnancialAccountRepository {
  
  private data: FinnancialAccount[];
  /**
   *
   */
  constructor() {
    super();
    this.data = finnancialAccountsFakes;
  }

  findById(id: number): Promise<FinnancialAccount> {
    const result = this.data.find(f => f.id === id)
    if (!result)
      throw "Not Found";
    
    return Promise.resolve(result);  
  }

  all(limit?: number | undefined): Promise<FinnancialAccount[]> {
    return Promise.resolve(this.data);
  }

  add(launch: FinnancialAccount): Promise<void> {
    this.data.push(launch);
    return Promise.resolve();
  }

  remove(id: number): Promise<void> {
    this.data = this.data.filter(f => f.id !== id);
    return Promise.resolve();
  }

  update(id: number, launch: FinnancialAccount): Promise<void> {
    const index = this.data.findIndex(f => f.id === id);
    this.data[index] = launch;
    return Promise.resolve();
  }

  protected get knex(): import("knex") <any, unknown[]> {
    return transactionMock();
  }

}