import { BillRepository } from "./bill.repository"
import { AbstractBillRepository } from "./bill.repository.abstract";
import { LaunchService } from "./bill.service";
import Knex from "knex";
import { createFinnancialAccountRepository } from "../finnancial-account/factories";

export const createLaunchRepository = (knex: Knex): AbstractBillRepository => {
  return new BillRepository(knex);
}

export const createLaunchService = (knex: Knex): LaunchService => {
  return new LaunchService(createLaunchRepository(knex), createFinnancialAccountRepository(knex));
}