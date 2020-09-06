import { LaunchRepository } from "./launch.repository"
import { ILaunchRepository } from "./launch.repository.d";
import { LaunchService } from "./launch.service";
import Knex from "knex";

export const createLaunchRepository = (knex: Knex): ILaunchRepository => {
  return new LaunchRepository(knex);
}

export const createLaunchService = (knex: Knex) => {
  return new LaunchService(createLaunchRepository(knex));
}