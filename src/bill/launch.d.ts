import { FinnancialAccount } from "../finnancial-account/finnancial-account";
import { LaunchType } from "./launch-type.enum";
import { LaunchStatus } from "./launch-status.enum";

export interface Launch {
    id: number;
    deposit?: FinnancialAccount;
    depositId: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    value: number;
    type: LaunchType;
    status: LaunchStatus
};