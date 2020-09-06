import { LaunchRepository } from "./launch.repository"
import { ILaunchRepository } from "./launch.repository.d";
import { LaunchService } from "./launch.service";
import Knex from "knex";

export const getLaunchRepository = (knex: Knex): ILaunchRepository => {
  return new LaunchRepository(knex);
}

export const getLaunchService = (knex: Knex) => {
  return new LaunchService(getLaunchRepository(knex));
}