import { createKnexTest } from "../data/knex";
import { truncate } from "../data/helpers";
import { createBillServiceWithKnex } from "./factories";

const knex = createKnexTest();
const billService = createBillServiceWithKnex(knex);

describe("Teste de integração - Cadastro de Contas à pagar/receber", () => {

  beforeAll(async () => {
    await truncate(knex, ["Launches", "FinnancialAccounts"]);
  });

  describe("Criação de registros", () => {
    test("Deve lançar uma exceção caso o nome não seja preenchido", async () => {

    });
  });
});
