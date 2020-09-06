import Knex from "knex";
import { DepositService } from "./deposit.service";
import { DepositRepository } from "./deposit.repository";
import { IDepositRepository } from "./deposit.repository.d";

export function createDepositRepository(knex: Knex): IDepositRepository {
  return new DepositRepository(knex);
}

export function createDepositService(knex: Knex): DepositService {
  return new DepositService(createDepositRepository(knex));
}