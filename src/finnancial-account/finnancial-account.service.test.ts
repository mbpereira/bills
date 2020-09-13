import { createFinnancialAccountRepository, createFinnancialAccountServiceWithRepository } from "./factories";
import { createKnexTest } from "../data/knex";
import { FinnancialAccount } from "./finnancial-account";
import { truncate } from "../data/helpers";
import { finnancialAccountsFakes } from "./finnancial-account.seeds";
import { exception } from "../error/exception";
import { ApplicationError } from "../error/application-error";
import { FinancialAccountRepositoryFake } from "./finnancial-account.repository.fake";

const knex = createKnexTest();
const finnancialAccountRepository = createFinnancialAccountRepository(knex);

describe("Integração - Cadastro de Contas Financeiras", () => {

  beforeAll(async () => {
    await truncate(knex, ["Bills", "FinnancialAccounts"]);
  });

  describe("Criação de registros", () => {
    test("Deve cadastrar o registro corretamente", async () => {
      await Promise.all(finnancialAccountsFakes.map(deposit => finnancialAccountRepository.add(deposit)));
      await Promise.all(finnancialAccountsFakes.map(async deposit => {
        const depoistFound = await finnancialAccountRepository.findById(deposit.id);
        expect(depoistFound).toBeDefined();
        await finnancialAccountRepository.remove(depoistFound.id);
      }));
    });

  });

  describe("Consulta de registros", () => {

    test("Deve consultar os registros sem lançar exceção", async () => {
      const foundRecords = await finnancialAccountRepository.all();
      expect(foundRecords).toEqual([]);
    });

    test("Ao buscar um registro pelo id deve retornar esse registro", async () => {
      const deposit = finnancialAccountsFakes[0];
      await finnancialAccountRepository.add(deposit);
      const found = await finnancialAccountRepository.findById(deposit.id);
      expect(found.id).toBe(deposit.id);

      await finnancialAccountRepository.remove(deposit.id);
    });
  });

  describe("Atualização de registros", () => {
    test("Ao tentar atualizar um registro existente então este deve ser atualizado corretamente", async () => {
      const deposit = finnancialAccountsFakes[0];
      await finnancialAccountRepository.add(deposit);

      deposit.name = `${deposit.name} - Atualizado`;

      await finnancialAccountRepository.update(deposit.id, deposit);
      const found = await finnancialAccountRepository.findById(deposit.id);

      expect(found.name).toBe(deposit.name);
      await finnancialAccountRepository.remove(deposit.id);
    });
  });
});

const finnancialAccountRepositoryFake = new FinancialAccountRepositoryFake();
const finnancialAccountServiceWithFakeRepo = createFinnancialAccountServiceWithRepository(finnancialAccountRepositoryFake)

describe("Serviço de contas financeiras", () => { 
  describe("Criação de contas financeiras", () => {
    test("Deve lançar uma exceção caso o nome não seja preenchido", async () => {
      const deposit = { id: 1, name: "" } as FinnancialAccount;

      const expectedErrorCode = exception().invalidOperation.code;
      await finnancialAccountServiceWithFakeRepo.create(deposit)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });
  });

  describe("Consulta de contas financeiras", () => {
    test("Ao consultar um registro que não existe deve lançar uma exceção", async () => {
      const expectedErrorCode = exception().recordNotFound.code;
      await finnancialAccountServiceWithFakeRepo.find(-1)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });
  });

  describe("Atualização de contas financeiras", () => {
    test("Ao tentar atualizar um registro inexistente deve lançar uma exeção", async () => {
      const expectedErrorCode = exception().recordNotFound.code;
      await finnancialAccountServiceWithFakeRepo.update(-1, { id: -1, name: "Banco do Mateus", balance: 200 })
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });

    test("Ao tentar realizar uma movimentação que deixa o saldo negativo deve lançar uma exceção", async () => {
      const deposit = finnancialAccountsFakes[0];
      
      const expectedErrorCode = exception().invalidOperation.code;
      await finnancialAccountServiceWithFakeRepo.moveMoney(deposit.id, -5000)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
      
      await finnancialAccountServiceWithFakeRepo.delete(deposit.id);
    });

    test("Ao tentar realizar uma movimentação que não deixe o saldo negativo então deve atualizar o valor", async () => {
      const deposit = finnancialAccountsFakes[1];
      await finnancialAccountServiceWithFakeRepo.moveMoney(deposit.id, -20);
      const account = await finnancialAccountServiceWithFakeRepo.find(deposit.id);
      expect(account.balance).toBe(780);
      await finnancialAccountServiceWithFakeRepo.delete(deposit.id);
    });
  });

  describe("Remoção de registros", () => {
    test("Deve lançar uma exceção se não for informado um código", async () => {
      const expectedErrorCode = exception().invalidOperation.code;
      await finnancialAccountServiceWithFakeRepo.delete(0)
        .catch((e: ApplicationError) => expect(e.code).toBe(expectedErrorCode));
    });
  });
});
