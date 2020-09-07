import { FinnancialAccount } from "./finnancial-account";
import { ITransactional } from "../data/transactional.d";

export interface IFinnancialAccountRepository extends ITransactional {
    findById(id: number): Promise<FinnancialAccount>;
    all(limit?: number): Promise<FinnancialAccount[]>;
    add(launch: FinnancialAccount): Promise<void>;
    remove(id: number): Promise<void>;
    update(id: number, launch: FinnancialAccount): Promise<void>;
}