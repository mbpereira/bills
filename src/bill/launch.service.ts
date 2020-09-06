import { IBillRepository } from "./launch.repository.d";
import { Bill } from "./launch";
import { throwException } from "../error/throw-exception";

export class LaunchService {
  /**
   *
   */
  constructor(private repository: IBillRepository) {}

  pay(billId: number, value: number) {

  }
}