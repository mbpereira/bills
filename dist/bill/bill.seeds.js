"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billFakes2 = exports.billFakes1 = void 0;
var bill_type_enum_1 = require("./bill-type.enum");
var bill_status_enum_1 = require("./bill-status.enum");
exports.billFakes1 = [
    { id: 1, description: "Recebimento de Salário", type: bill_type_enum_1.BillType.Receivable, status: bill_status_enum_1.BillStatus.Closed, totalValue: 1642.00, totalMissing: 0 },
    { id: 2, description: "Pagamento Fatura Nubank", type: bill_type_enum_1.BillType.Payable, status: bill_status_enum_1.BillStatus.Closed, totalValue: 350.00, totalMissing: 0 },
    { id: 3, description: "Pagamento Conta da Claro", type: bill_type_enum_1.BillType.Payable, status: bill_status_enum_1.BillStatus.Partial, totalValue: 210, totalMissing: 118 }
];
exports.billFakes2 = [
    { id: 4, description: "Recebimento conta NET", type: bill_type_enum_1.BillType.Payable, status: bill_status_enum_1.BillStatus.Closed, totalValue: 210, totalMissing: 0 },
    { id: 5, description: "Pagamento alimentação", type: bill_type_enum_1.BillType.Payable, status: bill_status_enum_1.BillStatus.Closed, totalValue: 52.00, totalMissing: 0 },
];
