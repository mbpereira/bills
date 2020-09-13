"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillRepositoryFake = void 0;
var bill_repository_abstract_1 = require("./bill.repository.abstract");
var bill_seeds_1 = require("./bill.seeds");
var helpers_1 = require("../data/helpers");
var BillRepositoryFake = /** @class */ (function (_super) {
    __extends(BillRepositoryFake, _super);
    /**
     *
     */
    function BillRepositoryFake() {
        var _this = _super.call(this) || this;
        _this.data = __spreadArrays(bill_seeds_1.billFakes1);
        return _this;
    }
    BillRepositoryFake.prototype.findById = function (id) {
        var result = this.data.find(function (b) { return b.id === id; });
        return Promise.resolve(result);
    };
    BillRepositoryFake.prototype.all = function (limit) {
        return Promise.resolve(this.data);
    };
    BillRepositoryFake.prototype.add = function (launch) {
        this.data.push(launch);
        return Promise.resolve();
    };
    BillRepositoryFake.prototype.remove = function (id) {
        this.data = this.data.filter(function (b) { return b.id !== id; });
        return Promise.resolve();
    };
    BillRepositoryFake.prototype.update = function (id, launch) {
        var index = this.data.findIndex(function (b) { return b.id === id; });
        this.data[index] = launch;
        return Promise.resolve();
    };
    Object.defineProperty(BillRepositoryFake.prototype, "knex", {
        get: function () {
            return helpers_1.transactionMock();
        },
        enumerable: false,
        configurable: true
    });
    return BillRepositoryFake;
}(bill_repository_abstract_1.AbstractBillRepository));
exports.BillRepositoryFake = BillRepositoryFake;
