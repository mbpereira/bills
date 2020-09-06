import { createDepositService } from "./factories";
import { createKnexTest } from "../knex";
import { Deposit } from "./deposit";

const depositService = createDepositService(createKnexTest());

describe("Serviço de persistência de contas (depósitos)", () => {
  describe("Criação de registros", () => {
    test("Deve lançar uma exceção caso o nome não seja preenchido", async () => {
      const deposit = { id: 1, name: "" } as Deposit;

      await expect(depositService.create(deposit)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" });
    });
  });

  describe("Consulta de registros", () => {
    test("Deve consultar os registros sem lançar exceção", async () => {
      await expect(depositService.getAll()).resolves.toMatchObject([]);;
    });
  });
});
