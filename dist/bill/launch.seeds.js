"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchFakes = void 0;
var bill_type_enum_1 = require("./bill-type.enum");
var bill_status_enum_1 = require("./bill-status.enum");
exports.launchFakes = [
    { id: 1, description: "Recebimento de Salário", type: bill_type_enum_1.BillType.Receivable, status: bill_status_enum_1.BillStatus.Closed, totalValue: 1642.00, totalMissing: 0 },
    { id: 2, description: "Pagamento Fatura Nubank", type: bill_type_enum_1.BillType.Payable, status: bill_status_enum_1.BillStatus.Closed, totalValue: 350.00, totalMissing: 0 },
    { id: 3, description: "Pagamento Conta da Claro", type: bill_type_enum_1.BillType.Payable, status: bill_status_enum_1.BillStatus.Partial, totalValue: 210, totalMissing: 118 }
];
