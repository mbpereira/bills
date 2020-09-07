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
exports.LaunchService = void 0;
// import { throwException } from "../error/throw-exception";
var application_error_1 = require("../error/application-error");
var bill_status_enum_1 = require("./bill-status.enum");
// import { AbstractFinnancialAccountRepository } from "../finnancial-account/finnancial-account.repository.d";
var LaunchService = /** @class */ (function () {
    /**
     *
     */
    function LaunchService(billRepository) {
        this.billRepository = billRepository;
    }
    LaunchService.prototype.create = function (bill) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (bill.totalValue <= 0 || bill.totalMissing < 0 || bill.totalMissing > bill.totalValue)
                            throw new application_error_1.ApplicationError("INVALID_OPERATION", "O valor informado para essa conta não é válido", 50);
                        if (!bill.description)
                            throw new application_error_1.ApplicationError("INVALID_OPERATION", "É necessário informar uma descrição para essa conta", 50);
                        if (!bill.type)
                            throw new application_error_1.ApplicationError("INVALID_OPERATION", "É necessário informar um tipo [Pagar = 1, Receber = 2]", 50);
                        if (bill.totalValue == bill.totalMissing)
                            bill.status = bill_status_enum_1.BillStatus.Open;
                        else if (bill.totalValue > bill.totalMissing)
                            bill.status = bill_status_enum_1.BillStatus.Partial;
                        else
                            bill.status = bill_status_enum_1.BillStatus.Closed;
                        return [4 /*yield*/, this.billRepository.add(bill)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LaunchService.prototype.delete = function (billId, finnancialAccountToReturn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    LaunchService.prototype.find = function (billId) {
        return __awaiter(this, void 0, void 0, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!billId)
                            throw new application_error_1.ApplicationError("INVALID_OPERATION", "É necessário informar um código válido", 50);
                        return [4 /*yield*/, this.billRepository.findById(billId)];
                    case 1:
                        record = _a.sent();
                        if (!record)
                            throw new application_error_1.ApplicationError("RECORD_NOT_FOUND", "O registro não foi encontrado", 404);
                        return [2 /*return*/, record];
                }
            });
        });
    };
    LaunchService.prototype.pay = function (billId, value) {
        return __awaiter(this, void 0, void 0, function () {
            var billSnapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(billId)];
                    case 1:
                        billSnapshot = _a.sent();
                        if (value <= 0)
                            throw new application_error_1.ApplicationError("INVALID_OPERATION", "O o valor do pagamento informado não é válido", 50);
                        if (billSnapshot.status == bill_status_enum_1.BillStatus.Closed)
                            throw new application_error_1.ApplicationError("INVALID_OPERATION", "Não é possível inserir mais pagamentos neste registro pois ele foi finalizado!", 50);
                        if (value > billSnapshot.totalMissing)
                            throw new application_error_1.ApplicationError("INVALID_OPERATION", "Não é possível inserir pagamento com valor superior ao valor pendente", 50);
                        billSnapshot.totalMissing -= value;
                        if (billSnapshot.totalMissing > 0)
                            billSnapshot.status = bill_status_enum_1.BillStatus.Partial;
                        else
                            billSnapshot.status = bill_status_enum_1.BillStatus.Closed;
                        return [4 /*yield*/, this.billRepository.update(billSnapshot.id, billSnapshot)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LaunchService;
}());
exports.LaunchService = LaunchService;
