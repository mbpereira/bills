import { FinnancialAccount } from "../finnancial-account/finnancial-account";
import { BillType } from "./bill-type.enum";
import { BillStatus } from "./bill-status.enum";

export interface Bill {
    id: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    closedAt?: Date;
    totalValue: number;
    totalMissing: number;
    type: BillType;
    status: BillStatus;
};