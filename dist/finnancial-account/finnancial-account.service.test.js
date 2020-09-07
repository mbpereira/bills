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
var factories_1 = require("./factories");
var knex_1 = require("../data/knex");
var helpers_1 = require("../data/helpers");
var finnancial_account_seeds_1 = require("./finnancial-account.seeds");
var knex = knex_1.createKnexTest();
var finnancialAccountService = factories_1.createFinnancialAccountService(knex);
describe("Teste de integração - Cadastro de Contas Financeiras", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.truncate(knex, ["Launches", "FinnancialAccounts"])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("Criação de registros", function () {
        test("Deve lançar uma exceção caso o nome não seja preenchido", function () { return __awaiter(void 0, void 0, void 0, function () {
            var deposit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deposit = { id: 1, name: "" };
                        return [4 /*yield*/, expect(finnancialAccountService.create(deposit)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Deve cadastrar o registro corretamente", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(finnancial_account_seeds_1.depositFakes.map(function (deposit) { return finnancialAccountService.create(deposit); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(finnancial_account_seeds_1.depositFakes.map(function (deposit) { return __awaiter(void 0, void 0, void 0, function () {
                                var depoistFound;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, finnancialAccountService.find(deposit.id)];
                                        case 1:
                                            depoistFound = _a.sent();
                                            expect(depoistFound).toBeDefined();
                                            return [4 /*yield*/, finnancialAccountService.delete(depoistFound.id)];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Remoção de registros", function () {
        test("Deve lançar uma exceção se não for informado um código", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(finnancialAccountService.delete(0)).rejects.toMatchObject({ code: 50, name: "INVALID_OPERATION" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Consulta de registros", function () {
        test("Deve consultar os registros sem lançar exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(finnancialAccountService.getAll()).resolves.toMatchObject([])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao buscar um registro pelo id deve retornar esse registro", function () { return __awaiter(void 0, void 0, void 0, function () {
            var deposit, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deposit = finnancial_account_seeds_1.depositFakes[0];
                        return [4 /*yield*/, finnancialAccountService.create(deposit)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, finnancialAccountService.find(deposit.id)];
                    case 2:
                        found = _a.sent();
                        expect(found.id).toBe(deposit.id);
                        return [4 /*yield*/, finnancialAccountService.delete(deposit.id)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao consultar um registro que não existe deve lançar uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(finnancialAccountService.find(-1)).rejects.toMatchObject({ code: 404, name: "RECORD_NOT_FOUND" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Atualização de registros", function () {
        test("Ao tentar atualizar um registro inexistente deve lançar uma exeção", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(finnancialAccountService.update(-1, { id: -1, name: "Banco do Mateus", balance: 200 })).rejects.toMatchObject({ code: 404, name: "RECORD_NOT_FOUND" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao tentar atualizar um registro existente então este deve ser atualizado corretamente", function () { return __awaiter(void 0, void 0, void 0, function () {
            var deposit, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deposit = finnancial_account_seeds_1.depositFakes[0];
                        return [4 /*yield*/, finnancialAccountService.create(deposit)];
                    case 1:
                        _a.sent();
                        deposit.name = deposit.name + " - Atualizado";
                        return [4 /*yield*/, finnancialAccountService.update(deposit.id, deposit)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, finnancialAccountService.find(deposit.id)];
                    case 3:
                        found = _a.sent();
                        expect(found.name).toBe(deposit.name);
                        return [4 /*yield*/, finnancialAccountService.delete(deposit.id)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao tentar realizar uma movimentação que deixa o saldo negativo deve lançar uma exceção", function () { return __awaiter(void 0, void 0, void 0, function () {
            var deposit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deposit = finnancial_account_seeds_1.depositFakes[0];
                        return [4 /*yield*/, finnancialAccountService.create(deposit)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(finnancialAccountService.movingMoney(deposit.id, -5000)).rejects.toMatchObject({ code: 50 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, finnancialAccountService.delete(deposit.id)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test("Ao tentar realizar uma movimentação que não deixe o saldo negativo então deve atualizar o valor", function () { return __awaiter(void 0, void 0, void 0, function () {
            var deposit, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deposit = finnancial_account_seeds_1.depositFakes[0];
                        return [4 /*yield*/, finnancialAccountService.create(deposit)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, finnancialAccountService.movingMoney(deposit.id, -20)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, finnancialAccountService.find(deposit.id)];
                    case 3:
                        account = _a.sent();
                        expect(account.balance).toBe(780);
                        return [4 /*yield*/, finnancialAccountService.delete(deposit.id)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
