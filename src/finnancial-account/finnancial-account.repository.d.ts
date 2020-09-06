import { FinnancialAccount } from "./finnancial-account";

export interface IFinnancialAccountRepository {
    findById(id: number): Promise<FinnancialAccount>;
    all(limit?: number): Promise<FinnancialAccount[]>;
    add(launch: FinnancialAccount): Promise<void>;
    remove(id: number): Promise<void>;
    update(id: number, launch: FinnancialAccount): Promise<void>;
}