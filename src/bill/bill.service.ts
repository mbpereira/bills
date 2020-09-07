import { AbstractBillRepository } from "./bill.repository.abstract";
import { Bill } from "./bill";
import { throwException } from "../error/throw-exception";
import { ApplicationError } from "../error/application-error";
import { BillStatus } from "./bill-status.enum";
import { AbstractFinnancialAccountRepository } from "../finnancial-account/finnancial-account.repository.abstract";

export class LaunchService {
  /**
   *
   */
  constructor(private billRepository: AbstractBillRepository, private finnancialAccountRepository: AbstractFinnancialAccountRepository) { }

  async create(bill: Bill) {
    if (bill.totalValue <= 0 || bill.totalMissing < 0 || bill.totalMissing > bill.totalValue)
      throw new ApplicationError("INVALID_OPERATION", "O valor informado para essa conta não é válido", 50);

    if (!bill.description)
      throw new ApplicationError("INVALID_OPERATION", "É necessário informar uma descrição para essa conta", 50);

    if (!bill.type)
      throw new ApplicationError("INVALID_OPERATION", "É necessário informar um tipo [Pagar = 1, Receber = 2]", 50);

    if (bill.totalValue == bill.totalMissing)
      bill.status = BillStatus.Open;
    else if (bill.totalValue > bill.totalMissing)
      bill.status = BillStatus.Partial;
    else
      bill.status = BillStatus.Closed;

    await this.billRepository.add(bill);
  }

  async delete(billId: number, finnancialAccountToReturn: number) {
    if (!finnancialAccountToReturn)
      throw new ApplicationError("INVALID_OPERATION", "É necessário informar uma conta para que o dinheiro seja devolvido", 50);

    const trx = await this.billRepository.beginTransaction();
    this.finnancialAccountRepository.setTransaction(trx);

    try {
      const finnancialAccount = await this.finnancialAccountRepository.findById(finnancialAccountToReturn);

      if (!finnancialAccountToReturn)
        throw new ApplicationError("RECORD_NOT_FOUND", "O registro não foi encontrado", 50);

      const bill = await this.find(billId);
      const valueToReturn = bill.totalValue - bill.totalMissing;
      finnancialAccount.balance += valueToReturn;

      await this.finnancialAccountRepository.update(finnancialAccountToReturn, finnancialAccount);
      await this.billRepository.remove(billId);

      trx.commit();
    } catch (e) {
      trx.rollback();
      throwException(e);
    }
  }

  async find(billId: number) {
    if (!billId)
      throw new ApplicationError("INVALID_OPERATION", "É necessário informar um código válido", 50);
    const record = await this.billRepository.findById(billId);

    if (!record)
      throw new ApplicationError("RECORD_NOT_FOUND", "O registro não foi encontrado", 404);

    return record;
  }

  async pay(billId: number, value: number) {
    const billSnapshot = await this.find(billId);

    if (value <= 0)
      throw new ApplicationError("INVALID_OPERATION", "O o valor do pagamento informado não é válido", 50);

    if (billSnapshot.status == BillStatus.Closed)
      throw new ApplicationError("INVALID_OPERATION", "Não é possível inserir mais pagamentos neste registro pois ele foi finalizado!", 50);

    if (value > billSnapshot.totalMissing)
      throw new ApplicationError("INVALID_OPERATION", "Não é possível inserir pagamento com valor superior ao valor pendente", 50);

    billSnapshot.totalMissing -= value;

    if (billSnapshot.totalMissing > 0)
      billSnapshot.status = BillStatus.Partial;
    else
      billSnapshot.status = BillStatus.Closed;

    await this.billRepository.update(billSnapshot.id, billSnapshot);
  }
}