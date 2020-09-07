import { Bill } from "./bill";
import { BillType } from "./bill-type.enum";
import { BillStatus } from "./bill-status.enum";

export const launchFakes: Bill[] = [
  { id: 1, description: "Recebimento de Salário", type: BillType.Receivable, status: BillStatus.Closed, totalValue: 1642.00, totalMissing: 0 },
  { id: 2, description: "Pagamento Fatura Nubank", type: BillType.Payable, status: BillStatus.Closed, totalValue: 350.00, totalMissing: 0 },
  { id: 3, description: "Pagamento Conta da Claro", type: BillType.Payable, status: BillStatus.Partial, totalValue: 210, totalMissing: 118 }
];