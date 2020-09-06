import { Deposit } from "./deposit";

export interface IDepositRepository {
    findById(id: number): Promise<Deposit>;
    all(limit?: number): Promise<Deposit>;
    add(launch: Deposit): Promise<void>;
    remove(id: number): Promise<void>;
    update(id: number, launch: Deposit): Promise<void>;
}