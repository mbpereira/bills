import { ILaunchRepository } from "./launch.repository.d";
import { Launch } from "./launch";
import Knex, { QueryBuilder } from "knex";

export class LaunchRepository implements ILaunchRepository {

  private queryBuilder: QueryBuilder;
  /**
   *
   */
  
  constructor(knex: Knex) {
    this.queryBuilder = knex("Launch");
  }

  findById(id: number): Promise<import("./launch").Launch> {
    throw new Error("Method not implemented.");
  }

  all(limit?: number | undefined): Promise<import("./launch").Launch> {
    throw new Error("Method not implemented.");
  }

  async add(launch: Launch): Promise<void> {
    this.queryBuilder.insert(launch);
  }

  remove(id: number) {
    throw new Error("Method not implemented.");
  }

  update(id: number, launch: Launch): Promise<void> {
    throw new Error("Method not implemented.");
  }

}