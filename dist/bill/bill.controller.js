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
exports.map = void 0;
var express_1 = require("express");
var factories_1 = require("./factories");
var parse_exception_1 = require("../error/parse-exception");
var BillController = /** @class */ (function () {
    /**
     *
     */
    function BillController(billService) {
        this.billService = billService;
    }
    BillController.prototype.load = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var allRecords, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.billService.getAll()];
                    case 1:
                        allRecords = _a.sent();
                        res.send(allRecords);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        parse_exception_1.parseException(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BillController.prototype.find = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundRecord, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = Number(req.params.id);
                        return [4 /*yield*/, this.billService.find(id)];
                    case 1:
                        foundRecord = _a.sent();
                        res.send(foundRecord);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        next(parse_exception_1.parseException(e_2));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BillController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, body, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = Number(req.params.id);
                        body = req.body;
                        return [4 /*yield*/, this.billService.update(id, body)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        next(parse_exception_1.parseException(e_3));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BillController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.billService.create(req.body)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        next(parse_exception_1.parseException(e_4));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BillController.prototype.destroy = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idBill, idAccount, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        idBill = Number(req.params.id);
                        idAccount = Number(req.params.account);
                        return [4 /*yield*/, this.billService.delete(idBill, idAccount)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        next(parse_exception_1.parseException(e_5));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BillController.prototype.pay = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var billId, paymentValue, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        billId = Number(req.params.id);
                        paymentValue = Number(req.body.value);
                        return [4 /*yield*/, this.billService.pay(billId, paymentValue)];
                    case 1:
                        _a.sent();
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        next(next(parse_exception_1.parseException(e_6)));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BillController;
}());
exports.map = function (app, knex) {
    var route = express_1.Router();
    var launchService = factories_1.createBillServiceWithKnex(knex);
    var controller = new BillController(launchService);
    route
        .get('/', controller.load)
        .get('/:id', controller.find)
        .put('/:id', controller.update)
        .post('/', controller.create)
        .post('/pay/:id')
        .delete('/:id/estornar/:account', controller.destroy);
    app.use('/contas', route);
};
