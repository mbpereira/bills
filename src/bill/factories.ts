import { BillRepository } from "./bill.repository"
import { AbstractBillRepository } from "./bill.repository.abstract";
import { BillService } from "./bill.service";
import Knex from "knex";
import { createFinnancialAccountRepository } from "../finnancial-account/factories";
import { AbstractFinnancialAccountRepository } from "../finnancial-account/finnancial-account.repository.abstract";

export const createBillRepository = (knex: Knex): AbstractBillRepository =>
 new BillRepository(knex);

export const createBillServiceWithKnex = (knex: Knex): BillService =>
  new BillService(createBillRepository(knex), createFinnancialAccountRepository(knex));

export const creteBillServiceWithRepositories = (billRepository: AbstractBillRepository, finnancialAccountRepository: AbstractFinnancialAccountRepository) =>
  new BillService(billRepository, finnancialAccountRepository);
