export interface FinnancialAccount {
    id: number;
    name: string;
    balance: number;
    lastBalanceUpdate?: Date;
}