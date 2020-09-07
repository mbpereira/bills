import { createFinnancialAccountService } from "./factories";
import { createKnexTest } from "../data/knex";
import { FinnancialAccount } from "./finnancial-account";
import { truncate } from "../data/helpers";
import { finnancialAccountsFakes } from "./finnancial-account.seeds";

const knex = createKnexTest();
const finnancialAccountService = createFinnancialAccountService(knex);

describe("Teste de integração - Cadastro de Contas Financeiras", () => {

  beforeAll(async () => {
    await truncate(knex, ["Bills", "FinnancialAccounts"]);
  });

  describe("Criação de registros", () => {
    test("Deve lançar uma exceção caso o nome não seja preenchido", async () => {
      const deposit = { id: 1, name: "" } as FinnancialAccount;

      await expect(finnancialAccountService.create(deposit)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" });
    });

    test("Deve cadastrar o registro corretamente", async () => {
      await Promise.all(finnancialAccountsFakes.map(deposit => finnancialAccountService.create(deposit)));
      await Promise.all(finnancialAccountsFakes.map(async deposit => {
        const depoistFound = await finnancialAccountService.find(deposit.id);
        expect(depoistFound).toBeDefined();
        await finnancialAccountService.delete(depoistFound.id);
      }));
    });

  });

  describe("Remoção de registros", () => {
    test("Deve lançar uma exceção se não for informado um código", async () => {
      await expect(finnancialAccountService.delete(0)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" });
    });
  });

  describe("Consulta de registros", () => {
    
    test("Deve consultar os registros sem lançar exceção", async () => {
      await expect(finnancialAccountService.getAll()).resolves.toMatchObject([]);
    });

    test("Ao buscar um registro pelo id deve retornar esse registro", async () => {
      const deposit = finnancialAccountsFakes[0];
      await finnancialAccountService.create(deposit);
      const found = await finnancialAccountService.find(deposit.id);
      expect(found.id).toBe(deposit.id);

      await finnancialAccountService.delete(deposit.id);
    });

    test("Ao consultar um registro que não existe deve lançar uma exceção", async () => {
      await expect(finnancialAccountService.find(-1)).rejects.toMatchObject({ code: 404, name: "RECORD_NOT_FOUND" });
    });
  });

  describe("Atualização de registros", () => {
    test("Ao tentar atualizar um registro inexistente deve lançar uma exeção", async () => {
      await expect(finnancialAccountService.update(-1, { id: -1, name: "Banco do Mateus", balance: 200 })).rejects.toMatchObject({ code: 404, name: "RECORD_NOT_FOUND" });
    });

    test("Ao tentar atualizar um registro existente então este deve ser atualizado corretamente", async () => {
      const deposit = finnancialAccountsFakes[0];
      await finnancialAccountService.create(deposit);

      deposit.name = `${deposit.name} - Atualizado`;

      await finnancialAccountService.update(deposit.id, deposit);
      const found = await finnancialAccountService.find(deposit.id);

      expect(found.name).toBe(deposit.name);
      await finnancialAccountService.delete(deposit.id);
    });

    test("Ao tentar realizar uma movimentação que deixa o saldo negativo deve lançar uma exceção", async () => {
      const deposit = finnancialAccountsFakes[0];
      await finnancialAccountService.create(deposit);
      await expect(finnancialAccountService.movingMoney(deposit.id, -5000)).rejects.toMatchObject({ code: 50 });
      await finnancialAccountService.delete(deposit.id);
    });

    test("Ao tentar realizar uma movimentação que não deixe o saldo negativo então deve atualizar o valor", async () => {
      const deposit = finnancialAccountsFakes[0];
      await finnancialAccountService.create(deposit);
      await finnancialAccountService.movingMoney(deposit.id, -20);
      const account = await finnancialAccountService.find(deposit.id);
      expect(account.balance).toBe(780);
      await finnancialAccountService.delete(deposit.id);
    });
  });
});
