import { BillRepository } from "./launch.repository"
import { AbstractBillRepository } from "./launch.repository.d";
import { LaunchService } from "./launch.service";
import Knex from "knex";
import { createFinnancialAccountRepository } from "../finnancial-account/factories";

export const createLaunchRepository = (knex: Knex): AbstractBillRepository => {
  return new BillRepository(knex);
}

export const createLaunchService = (knex: Knex): LaunchService => {
  return new LaunchService(createLaunchRepository(knex), createFinnancialAccountRepository(knex));
}