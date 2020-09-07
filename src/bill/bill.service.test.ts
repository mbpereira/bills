import { createKnexTest } from "../data/knex";
import { truncate } from "../data/helpers";

const knex = createKnexTest();

describe("Teste de integração - Cadastro de Lançamentos (Contas)", () => {

  beforeAll(async () => {
    await truncate(knex, ["Launches", "FinnancialAccounts"]);
  });

  describe("Criação de registros", () => {
    test("Deve lançar uma exceção caso o nome não seja preenchido", async () => {

    });
  });
});
