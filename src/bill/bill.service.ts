import { AbstractBillRepository } from "./bill.repository.abstract";
import { Bill } from "./bill";
import { parseException } from "../error/parse-exception";
import { ApplicationError } from "../error/application-error";
import { BillStatus } from "./bill-status.enum";
import { AbstractFinnancialAccountRepository } from "../finnancial-account/finnancial-account.repository.abstract";
import { exception } from "../error/errors";

export class BillService {

  /**
   *
   */
  constructor(private billRepository: AbstractBillRepository, private finnancialAccountRepository: AbstractFinnancialAccountRepository) { }

  async create(bill: Bill) {
    if (bill.totalValue <= 0 || bill.totalMissing < 0 || bill.totalMissing > bill.totalValue)
      throw exception("O valor informado para essa conta não é válido").invalidOperation;

    if (!bill.description)
      throw exception("É necessário informar uma descrição para essa conta").invalidOperation;

    if (!bill.type)
      throw exception("É necessário informar um tipo [Pagar = 1, Receber = 2]").invalidOperation;

    if (bill.totalMissing === 0) {
      bill.status = BillStatus.Closed;
    } else if (bill.totalValue === bill.totalMissing) {
      bill.status = BillStatus.Open;
    } else {
      bill.status = BillStatus.Partial;
    }

    await this.billRepository.add(bill);
  }

  async delete(billId: number, finnancialAccountToReturn: number, testing: boolean = false) {

    const trx = await this.billRepository.beginTransaction();
    this.finnancialAccountRepository.setTransaction(trx);

    try {

      if (!testing) {
        const finnancialAccount = await this.finnancialAccountRepository.findById(finnancialAccountToReturn);

        if (!finnancialAccountToReturn)
          throw exception("O registro não foi encontrado").recordNotFound;

        const bill = await this.find(billId);
        const valueToReturn = bill.totalValue - bill.totalMissing;
        finnancialAccount.balance += valueToReturn;

        await this.finnancialAccountRepository.update(finnancialAccountToReturn, finnancialAccount);
      }

      await this.billRepository.remove(billId);

      trx.commit();
    } catch (e) {
      trx.rollback();
      parseException(e);
    }
  }

  async find(billId: number) {
    if (!billId)
      throw exception("É necessário informar um código válido").invalidOperation;

    const record = await this.billRepository.findById(billId);

    if (!record)
      throw exception("O registro não foi encontrado").recordNotFound;

    return record;
  }

  async update(billId: number, bill: Bill) {
    const found = await this.find(billId);

    await this.billRepository.update(found.id, bill);
  }

  async getAll(page?: number) {
    return await this.billRepository.all(page);
  }

  async pay(billId: number, value: number) {
    const billSnapshot = await this.find(billId);

    if (value <= 0)
      throw exception("O o valor do pagamento informado não é válido").invalidOperation;

    if (billSnapshot.status == BillStatus.Closed)
      throw exception("Não é possível inserir mais pagamentos neste registro pois ele foi finalizado!").invalidOperation;

    if (value > billSnapshot.totalMissing)
      throw exception("Não é possível inserir pagamento com valor superior ao valor pendente").invalidOperation;

    billSnapshot.totalMissing -= value;

    if (billSnapshot.totalMissing > 0)
      billSnapshot.status = BillStatus.Partial;
    else
      billSnapshot.status = BillStatus.Closed;

    await this.billRepository.update(billSnapshot.id, billSnapshot);
  }
}