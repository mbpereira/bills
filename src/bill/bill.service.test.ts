import { createKnexTest } from "../data/knex";
import { truncate } from "../data/helpers";
import { createBillServiceWithKnex, creteBillServiceWithRepositories } from "./factories";
import { billFakes1, billFakes2 } from "./bill.seeds";
import { BillRepositoryFake } from "./bill.repository.fake";
import { FinancialAccountRepositoryFake } from "../finnancial-account/finnancial-account.repository.fake";
import { Bill } from "./bill";
import { BillType } from "./bill-type.enum";
import { BillStatus } from "./bill-status.enum";

const knex = createKnexTest();
const billService = createBillServiceWithKnex(knex);

describe("Teste de integração - Cadastro de Contas à pagar/receber", () => {

  beforeAll(async () => {
    await truncate(knex, ["Bills", "FinnancialAccounts"]);
  });

  describe("Criação de registros", () => {
    test("Deve cadastrar o registro corretamente", async () => {
      await Promise.all(billFakes1.map(bill => billService.create(bill)));

      const records = await billService.getAll();

      expect(records.length).toBeGreaterThan(0);

      await Promise.all(billFakes1.map(bill => billService.delete(bill.id, 0, true)));
    });
  });

  describe("Atualização de registros", () => {
    test("Deve atualizar o registro corretamente", async () => {
      const billFake = billFakes2[1];
      await billService.create(billFake);

      billFake.description = "Updated"
      await billService.update(billFake.id, billFake);

      const updated = await billService.find(billFake.id);

      expect(updated.description).toBe(billFake.description);

      await billService.delete(updated.id, 0, true);
    });
  });
});


const billRepositoryFake = new BillRepositoryFake();
const finnancialRepositoryFake = new FinancialAccountRepositoryFake();
const billServiceWithFakeRepo = creteBillServiceWithRepositories(billRepositoryFake, finnancialRepositoryFake);

describe("Teste de regras para inclusão de pagamentos", () => {
  describe("Criação de um novo pagamento", () => {
    test("Quando o valor pendente do pagamento for maior que o valor do pagamento então deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 100, totalMissing: 200 } as Bill;      

      await expect(billServiceWithFakeRepo.create(billFake)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" });
    });

    test("Quando o total pendente de pagamento for menor que 0 deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 100, totalMissing: -1 } as Bill;      

      await expect(billServiceWithFakeRepo.create(billFake)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" });
    });

    test("Quando o valor total da conta for zero então deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 0, totalMissing: 0 } as Bill;      

      await expect(billServiceWithFakeRepo.create(billFake)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" });
    });

    test("Quando o valor total da conta for menor que zero então deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: -20, totalMissing: 0 } as Bill;      

      await expect(billServiceWithFakeRepo.create(billFake)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" });
    });

    test("Quando uma descrição não for informada, deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 20, totalMissing: 20 } as Bill;      

      await expect(billServiceWithFakeRepo.create(billFake)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" });
    });

    test("Quando o tipo da conta não for informado, deve ser lançada uma exceção", async () => {
      const billFake = { id: 7, totalValue: 20, description: "Recebimento de aluguel", totalMissing: 20 } as Bill;      

      await expect(billServiceWithFakeRepo.create(billFake)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" });
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
});
