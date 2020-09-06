import { Launch } from "./launch";

export interface ILaunchRepository {
    findById(id: number): Promise<Launch>;
    all(limit?: number): Promise<Launch>;
    add(launch: Launch): Promise<void>;
    remove(id: number);
    update(id: number, launch: Launch): Promise<void>;
}