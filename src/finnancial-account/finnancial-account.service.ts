import { FinnancialAccount } from "./finnancial-account";
import { exception } from "../error/errors";
import { AbstractFinnancialAccountRepository } from "./finnancial-account.repository.abstract";

export class FinnancialAccountService {
  
  async find(depositId: number): Promise<FinnancialAccount> {
    if (!depositId)
      throw exception("É necessário informar um código de depósito válido").invalidOperation;
    
    const found = await this.finnancialRepository.findById(depositId);

    if (!found)
      throw exception("O registro não foi encontrado").recordNotFound;
    
    return found;
  }
  /**
   *
   */
  constructor(private finnancialRepository: AbstractFinnancialAccountRepository) { }
  
  async create(deposit: FinnancialAccount) {
    if (!deposit.name)
      throw exception("O nome precisa ser preenchido").invalidOperation;
    
    return this.finnancialRepository.add(deposit);
  }

  async getAll(page?: number): Promise<FinnancialAccount[]> {
    return this.finnancialRepository.all();
  }

  async delete(depositId: number): Promise<void> {
    const record = await this.find(depositId);
    
    return this.finnancialRepository.remove(record.id);
  }

  async update(accountId: number, account: FinnancialAccount): Promise<void> {
    const record = await this.find(accountId);

    await this.finnancialRepository.update(record.id, account);
  }

  async movingMoney(accountId: number, value: number): Promise<void> {
    const accountSnapshot = await this.find(accountId);
    
    const newBalance = accountSnapshot.balance + value;
    
    if (newBalance < 0)
      throw exception("Saldo insuficiente").invalidOperation;
    
    accountSnapshot.balance = newBalance;

    await this.finnancialRepository.update(accountId, Object.assign({}, accountSnapshot));
  }
}