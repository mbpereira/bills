import { Launch } from "./launch";
import { LaunchType } from "./launch-type.enum";
import { LaunchStatus } from "./launch-status.enum";

export const launchFakes: Launch[] = [
  { id: 1, depositId: 1, description: "Recebimento de Salário", type: LaunchType.Credit, status: LaunchStatus.Closed, value: 1642.00 },
  { id: 2, depositId: 1, description: "Pagamento Fatura Nubank", type: LaunchType.Debit, status: LaunchStatus.Closed, value: 350.00 },
  
];