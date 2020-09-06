import { Bill } from "./launch";

export interface IBillRepository {
    findById(id: number): Promise<Bill>;
    all(limit?: number): Promise<Bill>;
    add(launch: Bill): Promise<void>;
    remove(id: number);
    update(id: number, launch: Bill): Promise<void>;
}