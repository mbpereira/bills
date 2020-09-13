"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = require("../data/knex");
var helpers_1 = require("../data/helpers");
var factories_1 = require("./factories");
var bill_seeds_1 = require("./bill.seeds");
var bill_repository_fake_1 = require("./bill.repository.fake");
var finnancial_account_repository_fake_1 = require("../finnancial-account/finnancial-account.repository.fake");
var bill_type_enum_1 = require("./bill-type.enum");
var bill_status_enum_1 = require("./bill-status.enum");
var errors_1 = require("../error/errors");
var knex = knex_1.createKnexTest();
var billRepository = factories_1.createBillRepository(knex);
describe("Teste de integração - Cadastro de Contas à pagar/receber", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.truncate(knex, ["Bills", "FinnancialAccounts"])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("Criação de registros", function () {
        test("Deve cadastrar o registro corretamente", function () { return __awaiter(void 0, void 0, void 0, function () {
            var records;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(bill_seeds_1.billFakes1.map(function (bill) { return billRepository.add(bill); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, billRepository.all()];
                    case 2:
                        records = _a.sent();
                        expect(records.length).toBeGreaterThan(0);
                        return [4 /*yield*/, Promise.all(bill_seeds_1.billFakes1.map(function (bill) { return billRepository.remove(bill.id); }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Atualização de registros", function () {
        test("Deve atualizar o registro corretamente", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = bill_seeds_1.billFakes2[1];
                        return [4 /*yield*/, billRepository.add(billFake)];
                    case 1:
                        _a.sent();
                        billFake.description = "Updated";
                        return [4 /*yield*/, billRepository.update(billFake.id, billFake)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, billRepository.findById(billFake.id)];
                    case 3:
                        updated = _a.sent();
                        expect(updated.description).toBe(billFake.description);
                        return [4 /*yield*/, billRepository.remove(updated.id)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var billRepositoryFake = new bill_repository_fake_1.BillRepositoryFake();
var finnancialRepositoryFake = new finnancial_account_repository_fake_1.FinancialAccountRepositoryFake();
var billServiceWithFakeRepo = factories_1.creteBillServiceWithRepositories(billRepositoryFake, finnancialRepositoryFake);
describe("Teste do serviço de pagamentos", function () {
    describe("Criação de um novo pagamento", function () {
        test("Quando o valor pendente do pagamento for maior que o valor do pagamento então deve ser lançada uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, expectedErrorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = { id: 7, totalValue: 100, totalMissing: 200 };
                        expectedErrorCode = errors_1.exception().invalidOperation.code;
                        return [4 /*yield*/, billServiceWithFakeRepo.create(billFake)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Quando o total pendente de pagamento for menor que 0 deve ser lançada uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, expectedErrorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = { id: 7, totalValue: 100, totalMissing: -1 };
                        expectedErrorCode = errors_1.exception().invalidOperation.code;
                        return [4 /*yield*/, billServiceWithFakeRepo.create(billFake)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Quando o valor total da conta for zero então deve ser lançada uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, expectedErrorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = { id: 7, totalValue: 0, totalMissing: 0 };
                        expectedErrorCode = errors_1.exception().invalidOperation.code;
                        return [4 /*yield*/, billServiceWithFakeRepo.create(billFake)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Quando o valor total da conta for menor que zero então deve ser lançada uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, expectedErrorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = { id: 7, totalValue: -20, totalMissing: 0 };
                        expectedErrorCode = errors_1.exception().invalidOperation.code;
                        return [4 /*yield*/, billServiceWithFakeRepo.create(billFake)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Quando uma descrição não for informada, deve ser lançada uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, expectedErrorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = { id: 7, totalValue: 20, totalMissing: 20 };
                        expectedErrorCode = errors_1.exception().invalidOperation.code;
                        return [4 /*yield*/, billServiceWithFakeRepo.create(billFake)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Quando o tipo da conta não for informado, deve ser lançada uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, expectedErrorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = { id: 7, totalValue: 20, description: "Recebimento de aluguel", totalMissing: 20 };
                        expectedErrorCode = errors_1.exception().invalidOperation.code;
                        return [4 /*yield*/, billServiceWithFakeRepo.create(billFake)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Quando o valor à ser pago for igual ao valor da conta então essa conta deve ser salva com o status 'aberta'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = { id: 7, totalValue: 20, totalMissing: 20, description: "Recebimento Uber", type: bill_type_enum_1.BillType.Receivable };
                        return [4 /*yield*/, billServiceWithFakeRepo.create(billFake)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, billServiceWithFakeRepo.find(billFake.id)];
                    case 2:
                        created = _a.sent();
                        expect(created.status).toBe(bill_status_enum_1.BillStatus.Open);
                        return [2 /*return*/];
                }
            });
        }); });
        test("Quando o valor à ser pago for menor que o valor da conta E ao mesmo tempo MAIOR que zero então essa conta deve ser salva com o status 'partial'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = { id: 8, totalValue: 20, totalMissing: 15, description: "Recebimento Uber", type: bill_type_enum_1.BillType.Receivable };
                        return [4 /*yield*/, billServiceWithFakeRepo.create(billFake)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, billServiceWithFakeRepo.find(billFake.id)];
                    case 2:
                        created = _a.sent();
                        expect(created.status).toBe(bill_status_enum_1.BillStatus.Partial);
                        return [2 /*return*/];
                }
            });
        }); });
        test("Quando o valor à ser pago for zero então essa conta deve ser salva com o status 'fechada'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billFake, created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billFake = { id: 9, totalValue: 20, totalMissing: 0, description: "Recebimento Uber", type: bill_type_enum_1.BillType.Receivable };
                        return [4 /*yield*/, billServiceWithFakeRepo.create(billFake)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, billServiceWithFakeRepo.find(billFake.id)];
                    case 2:
                        created = _a.sent();
                        expect(created.status).toBe(bill_status_enum_1.BillStatus.Closed);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Atualização de pagamentos", function () {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var bills;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bills = [
                            { id: 21, description: "Conta de Luz", totalValue: 350, totalMissing: 350, type: bill_type_enum_1.BillType.Payable },
                            { id: 22, description: "Conta de água", totalValue: 80, totalMissing: 43, type: bill_type_enum_1.BillType.Payable },
                            { id: 23, description: "Gastos com gasolina", totalValue: 340, totalMissing: 0, type: bill_type_enum_1.BillType.Payable },
                            { id: 24, description: "Gastos com lazer", totalValue: 600, totalMissing: 600, type: bill_type_enum_1.BillType.Payable }
                        ];
                        return [4 /*yield*/, Promise.all(bills.map(function (bill) { return billServiceWithFakeRepo.create(bill); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao tentar incluir um pagamento com valor igual ou menor que zero, deve ser lançada uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var expectedErrorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedErrorCode = errors_1.exception().invalidOperation.code;
                        return [4 /*yield*/, billServiceWithFakeRepo.pay(21, 0)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, billServiceWithFakeRepo.pay(22, -22)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao tentar incluir um pagamento com valor maior do que o valor pendente, deve ser lançada uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var expectedErrorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedErrorCode = errors_1.exception().invalidOperation.code;
                        return [4 /*yield*/, billServiceWithFakeRepo.pay(22, 44)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao tentar incluir um pagamento para uma conta que já está fechada, deve ser lançada uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var expectedErrorCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedErrorCode = errors_1.exception().invalidOperation.code;
                        return [4 /*yield*/, billServiceWithFakeRepo.pay(23, 5)
                                .catch(function (e) { return expect(e.code).toBe(expectedErrorCode); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao incluir um pagamento parcial, a conta deve ter o estado alterado para 'parcial'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billWithPartialPayment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, billServiceWithFakeRepo.pay(21, 300)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, billServiceWithFakeRepo.find(21)];
                    case 2:
                        billWithPartialPayment = _a.sent();
                        expect(billWithPartialPayment.status).toBe(bill_status_enum_1.BillStatus.Partial);
                        expect(billWithPartialPayment.totalMissing).toBe(50);
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao incluir um pagamento total para uma conta, essa conta deve ter seu status alterado para 'fechado'", function () { return __awaiter(void 0, void 0, void 0, function () {
            var billWithPartialPayment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, billServiceWithFakeRepo.pay(24, 600)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, billServiceWithFakeRepo.find(24)];
                    case 2:
                        billWithPartialPayment = _a.sent();
                        expect(billWithPartialPayment.status).toBe(bill_status_enum_1.BillStatus.Closed);
                        expect(billWithPartialPayment.totalMissing).toBe(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Remoção de pagamentos", function () {
        test("Ao tentar remover um pagamento e definir a conta financeira para estorno, então o saldo dessa conta financeira deve aumentar", function () { return __awaiter(void 0, void 0, void 0, function () {
            var finnancialAccount, billToDelete, newBalance, finnancialAccountUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, finnancialRepositoryFake.findById(1)];
                    case 1:
                        finnancialAccount = _a.sent();
                        return [4 /*yield*/, billServiceWithFakeRepo.find(24)];
                    case 2:
                        billToDelete = _a.sent();
                        newBalance = finnancialAccount.balance + (billToDelete.totalValue - billToDelete.totalMissing);
                        return [4 /*yield*/, billServiceWithFakeRepo.delete(billToDelete.id, finnancialAccount.id)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, finnancialRepositoryFake.findById(1)];
                    case 4:
                        finnancialAccountUpdated = _a.sent();
                        expect(finnancialAccountUpdated.balance).toBe(newBalance);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
