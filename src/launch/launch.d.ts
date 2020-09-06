import { Deposit } from "../deposit/deposit";
import { LaunchType } from "./launch-type.enum";
import { LaunchStatus } from "./launch-status.enum";

export interface Launch {
    id: number;
    deposit: Deposit;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    value: number;
    type: LaunchType;
    status: LaunchStatus
};