import { AbstractFinnancialAccountRepository } from "./finnancial-account.repository.d";
import { FinnancialAccount } from "./finnancial-account";
import { ApplicationError } from "../error/application-error";

export class FinnancialAccountService {
  
  async find(depositId: number): Promise<FinnancialAccount> {
    if (!depositId)
      throw new ApplicationError("INVALID_OPERATION", "É necessário informar um código de depósito válido", 50);
    
    const found = await this.finnancialRepository.findById(depositId);

    if (!found)
      throw new ApplicationError("RECORD_NOT_FOUND", "O registro não foi encontrado", 404);
    
    return found;
  }
  /**
   *
   */
  constructor(private finnancialRepository: AbstractFinnancialAccountRepository) { }
  
  async create(deposit: FinnancialAccount) {
    if (!deposit.name)
      throw new ApplicationError("INVALID_OPERATION", "O nome precisa ser preenchido", 50);
    
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
      throw new ApplicationError("INVALID_OPERATION", "Saldo insuficiente", 50);
    
    accountSnapshot.balance = newBalance;

    await this.finnancialRepository.update(accountId, Object.assign({}, accountSnapshot));
  }
}