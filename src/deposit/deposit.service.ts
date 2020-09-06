import { IDepositRepository } from "./deposit.repository.d";
import { Deposit } from "./deposit";
import { ApplicationError } from "../error/application-error";

export class DepositService {
  /**
   *
   */
  constructor(private depositRepository: IDepositRepository) { }
  
  async create(deposit: Deposit) {
    if (!deposit.name)
      throw new ApplicationError("INVALID_OPERATION", "O nome precisa ser preenchido", 50);
    
    return this.depositRepository.add(deposit);
  }

  async getAll(page?: number) {
    return this.depositRepository.all();
  }
}