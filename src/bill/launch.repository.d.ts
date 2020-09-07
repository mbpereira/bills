import { Bill } from "./launch";
import { ITransactional } from "../data/transactional";

export interface IBillRepository extends ITransactional {
    findById(id: number): Promise<Bill>;
    all(limit?: number): Promise<Bill>;
    add(launch: Bill): Promise<void>;
    remove(id: number);
    update(id: number, launch: Bill): Promise<void>;
}