import { Bill } from "./bill";
import { AbstractTransactional } from "../data/transactional";

export abstract class AbstractBillRepository extends AbstractTransactional {
    abstract findById(id: number): Promise<Bill>;
    abstract all(limit?: number): Promise<Bill[]>;
    abstract add(launch: Bill): Promise<void>;
    abstract remove(id: number): Promise<void>;
    abstract update(id: number, launch: Bill): Promise<void>;
}