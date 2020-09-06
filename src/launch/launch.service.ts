import { ILaunchRepository } from "./launch.repository.d";
import { Launch } from "./launch";
import { throwException } from "../error/throw-exception";

export class LaunchService {
  /**
   *
   */
  constructor(private repository: ILaunchRepository) {}

  async save(launch: Launch): Promise<void> {
    try {
      this.repository.add(launch);
    } catch (e) {
      throwException(e);
    }
  }
}