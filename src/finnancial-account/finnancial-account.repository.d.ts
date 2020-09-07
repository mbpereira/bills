import { FinnancialAccount } from "./finnancial-account";
import { AbstractTransactional } from "../data/transactional";

export abstract class AbstractFinnancialAccountRepository extends AbstractTransactional {
    abstract findById(id: number): Promise<FinnancialAccount>;
    abstract all(limit?: number): Promise<FinnancialAccount[]>;
    abstract add(launch: FinnancialAccount): Promise<void>;
    abstract remove(id: number): Promise<void>;
    abstract update(id: number, launch: FinnancialAccount): Promise<void>;
}