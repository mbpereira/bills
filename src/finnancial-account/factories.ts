import Knex from "knex";
import { FinnancialAccountService } from "./finnancial-account.service";
import { FinnancialAccountRepository } from "./finnancial-account.repository";
import { IFinnancialAccountRepository } from "./finnancial-account.repository.d";

export function createFinnancialAccountRepository(knex: Knex): IFinnancialAccountRepository {
  return new FinnancialAccountRepository(knex);
}

export function createFinnancialAccountService(knex: Knex): FinnancialAccountService {
  return new FinnancialAccountService(createFinnancialAccountRepository(knex));
}