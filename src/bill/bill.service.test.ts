import { createKnexTest } from "../data/knex";
import { truncate } from "../data/helpers";
import { createBillServiceWithKnex, creteBillServiceWithRepositories, createBillRepository } from "./factories";
import { billFakes1, billFakes2 } from "./bill.seeds";
import { BillRepositoryFake } from "./bill.repository.fake";
import { FinancialAccountRepositoryFake } from "../finnancial-account/finnancial-account.repository.fake";
import { Bill } from "./bill";
import { BillType } from "./bill-type.enum";
import { BillStatus } from "./bill-status.enum";
import { exception } from "../error/exception";
import { ApplicationError } from "../error/application-error";

const knex = createKnexTest();
const billRepository = createBillRepository(knex);

describe("Teste de integração - Cadastro de Contas à pagar/receber", () => {

  beforeAll(async () => {
    await truncate(knex, ["Bills", "FinnancialAccounts"]);
  });

  describe("Criação de registros", () => {
    test("Deve cadastrar o registro corretamente", async () => {
      await Promise.all(billFakes1.map(bill => billRepository.add(bill)));

      const records = await billRepository.all();

      expect(records.length).toBeGreaterThan(0);

      await Promise.all(billFakes1.map(bill => billRepository.remove(bill.id)));
    });
  });

  describe("Atualização de registros", () => {
    test("Deve atualizar o registro corretamente", async () => {
      const billFake = billFakes2[1];
      await billRepository.add(billFake);

      billFake.description = "Updated"
      await billRepository.update(billFake.id, billFake);

      const updated = await billRepository.findById(billFake.id);

      expect(updated.description).toBe(billFake.description);

      await billRepository.remove(updated.id);
    });
  });
});

const billRepositoryFake = new BillRepositoryFake();
const finnancialRepositoryFake = new FinancialAccountRepositoryFake();
const billServiceWithFakeRepo = creteBillServiceWithRepositories(billRepositoryFake, finnancialRepositoryFake);

describe("Teste do serviço de pagamentos", () => {
  describe("Criação de um novo pagamento", () => {
    test("Quando o valor pendente do pagamento for maior que o valor do pagamento então deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 100, totalMissing: 200 } as Bill;

      const expectedErrorCode = exception().invalidOperation.code;
      await billServiceWithFakeRepo.create(billFake)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode))
    });

    test("Quando o total pendente de pagamento for menor que 0 deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 100, totalMissing: -1 } as Bill;

      const expectedErrorCode = exception().invalidOperation.code;
      await billServiceWithFakeRepo.create(billFake)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode))
    });

    test("Quando o valor total da conta for zero então deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 0, totalMissing: 0 } as Bill;

      const expectedErrorCode = exception().invalidOperation.code;
      await billServiceWithFakeRepo.create(billFake)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });

    test("Quando o valor total da conta for menor que zero então deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: -20, totalMissing: 0 } as Bill;

      const expectedErrorCode = exception().invalidOperation.code;
      await billServiceWithFakeRepo.create(billFake)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });

    test("Quando uma descrição não for informada, deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 20, totalMissing: 20 } as Bill;

      const expectedErrorCode = exception().invalidOperation.code;
      await billServiceWithFakeRepo.create(billFake)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });

    test("Quando o tipo da conta não for informado, deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 20, description: "Recebimento de aluguel", totalMissing: 20 } as Bill;

      const expectedErrorCode = exception().invalidOperation.code;
      await billServiceWithFakeRepo.create(billFake)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });

    test("Quando o valor à ser pago for igual ao valor da conta então essa conta deve ser salva com o status 'aberta'", async () => {
      const billFake = { id: 7, totalValue: 20, totalMissing: 20, description: "Recebimento Uber", type: BillType.Receivable } as Bill;

      await billServiceWithFakeRepo.create(billFake);

      const created = await billServiceWithFakeRepo.find(billFake.id);

      expect(created.status).toBe(BillStatus.Open);
    });

    test("Quando o valor à ser pago for menor que o valor da conta E ao mesmo tempo MAIOR que zero então essa conta deve ser salva com o status 'partial'", async () => {
      const billFake = { id: 8, totalValue: 20, totalMissing: 15, description: "Recebimento Uber", type: BillType.Receivable } as Bill;

      await billServiceWithFakeRepo.create(billFake);

      const created = await billServiceWithFakeRepo.find(billFake.id);

      expect(created.status).toBe(BillStatus.Partial);
    });


    test("Quando o valor à ser pago for zero então essa conta deve ser salva com o status 'fechada'", async () => {
      const billFake = { id: 9, totalValue: 20, totalMissing: 0, description: "Recebimento Uber", type: BillType.Receivable } as Bill;

      await billServiceWithFakeRepo.create(billFake);

      const created = await billServiceWithFakeRepo.find(billFake.id);

      expect(created.status).toBe(BillStatus.Closed);
    });
  });

  describe("Atualização de pagamentos", () => {

    beforeAll(async () => {
      const bills: Bill[] = [
        { id: 21, description: "Conta de Luz", totalValue: 350, totalMissing: 350, type: BillType.Payable } as Bill,
        { id: 22, description: "Conta de água", totalValue: 80, totalMissing: 43, type: BillType.Payable } as Bill,
        { id: 23, description: "Gastos com gasolina", totalValue: 340, totalMissing: 0, type: BillType.Payable } as Bill,
        { id: 24, description: "Gastos com lazer", totalValue: 600, totalMissing: 600, type: BillType.Payable } as Bill
      ];

      await Promise.all(bills.map(bill => billServiceWithFakeRepo.create(bill)));
    });

    test("Ao tentar incluir um pagamento com valor igual ou menor que zero, deve ser lançada uma exceção", async () => {
      const expectedErrorCode = exception().invalidOperation.code;
      await billServiceWithFakeRepo.pay(21, 0)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));

      await billServiceWithFakeRepo.pay(22, -22)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });

    test("Ao tentar incluir um pagamento com valor maior do que o valor pendente, deve ser lançada uma exceção", async () => {
      const expectedErrorCode = exception().invalidOperation.code;

      await billServiceWithFakeRepo.pay(22, 44)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });

    test("Ao tentar incluir um pagamento para uma conta que já está fechada, deve ser lançada uma exceção", async () => {
      const expectedErrorCode = exception().invalidOperation.code;

      await billServiceWithFakeRepo.pay(23, 5)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });

    test("Ao incluir um pagamento parcial, a conta deve ter o estado alterado para 'parcial'", async () => {
      await billServiceWithFakeRepo.pay(21, 300);
      const billWithPartialPayment = await billServiceWithFakeRepo.find(21);

      expect(billWithPartialPayment.status).toBe(BillStatus.Partial);
      expect(billWithPartialPayment.totalMissing).toBe(50);
    });

    test("Ao incluir um pagamento total para uma conta, essa conta deve ter seu status alterado para 'fechado'", async () => {
      await billServiceWithFakeRepo.pay(24, 600);
      const billWithPartialPayment = await billServiceWithFakeRepo.find(24);

      expect(billWithPartialPayment.status).toBe(BillStatus.Closed);
      expect(billWithPartialPayment.totalMissing).toBe(0);
    });
  });

  describe("Remoção de pagamentos", () => {
    test("Ao tentar remover um pagamento e definir a conta financeira para estorno, então o saldo dessa conta financeira deve aumentar", async () => {
      const finnancialAccount = await finnancialRepositoryFake.findById(1);
      const billToDelete = await billServiceWithFakeRepo.find(24);

      const newBalance = finnancialAccount.balance + (billToDelete.totalValue - billToDelete.totalMissing);

      await billServiceWithFakeRepo.delete(billToDelete.id, finnancialAccount.id);

      const finnancialAccountUpdated = await finnancialRepositoryFake.findById(1);

      expect(finnancialAccountUpdated.balance).toBe(newBalance);
    });
  });
});
