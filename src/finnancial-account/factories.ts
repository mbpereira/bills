import Knex from "knex";
import { FinnancialAccountService } from "./finnancial-account.service";
import { FinnancialAccountRepository } from "./finnancial-account.repository";
import { AbstractFinnancialAccountRepository } from "./finnancial-account.repository.abstract";

export const createFinnancialAccountRepository = (knex: Knex): AbstractFinnancialAccountRepository =>
  new FinnancialAccountRepository(knex);

export const createFinnancialAccountService = (knex: Knex): FinnancialAccountService =>
  new FinnancialAccountService(createFinnancialAccountRepository(knex));

export const createFinnancialAccountServiceWithRepository = (finnancialAccountRepository: AbstractFinnancialAccountRepository) =>
  new FinnancialAccountService(finnancialAccountRepository);