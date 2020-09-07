import { BillRepository } from "./bill.repository"
import { AbstractBillRepository } from "./bill.repository.abstract";
import { BillService } from "./bill.service";
import Knex from "knex";
import { createFinnancialAccountRepository } from "../finnancial-account/factories";

export const createLaunchRepository = (knex: Knex): AbstractBillRepository => {
  return new BillRepository(knex);
}

export const createLaunchService = (knex: Knex): BillService => {
  return new BillService(createLaunchRepository(knex), createFinnancialAccountRepository(knex));
}