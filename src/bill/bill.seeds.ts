import { Bill } from "./bill";
import { BillType } from "./bill-type.enum";
import { BillStatus } from "./bill-status.enum";

export const billFakes1: Bill[] = [
  { id: 1, description: "Recebimento de Salário", type: BillType.Receivable, status: BillStatus.Closed, totalValue: 1642.00, totalMissing: 0 },
  { id: 2, description: "Pagamento Fatura Nubank", type: BillType.Payable, status: BillStatus.Closed, totalValue: 350.00, totalMissing: 0 },
  { id: 3, description: "Pagamento Conta da Claro", type: BillType.Payable, status: BillStatus.Partial, totalValue: 210, totalMissing: 118 }
];

export const billFakes2: Bill[] = [
  { id: 4, description: "Recebimento conta NET", type: BillType.Payable, status: BillStatus.Closed, totalValue: 210, totalMissing: 0 },
  { id: 5, description: "Pagamento alimentação", type: BillType.Payable, status: BillStatus.Closed, totalValue: 52.00, totalMissing: 0 },
];