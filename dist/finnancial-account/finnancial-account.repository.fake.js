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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialAccountRepositoryFake = void 0;
var finnancial_account_repository_abstract_1 = require("./finnancial-account.repository.abstract");
var finnancial_account_seeds_1 = require("./finnancial-account.seeds");
var helpers_1 = require("../data/helpers");
var FinancialAccountRepositoryFake = /** @class */ (function (_super) {
    __extends(FinancialAccountRepositoryFake, _super);
    /**
     *
     */
    function FinancialAccountRepositoryFake() {
        var _this = _super.call(this) || this;
        _this.data = finnancial_account_seeds_1.finnancialAccountsFakes;
        return _this;
    }
    FinancialAccountRepositoryFake.prototype.findById = function (id) {
        var result = this.data.find(function (f) { return f.id === id; });
        return Promise.resolve(result);
    };
    FinancialAccountRepositoryFake.prototype.all = function (limit) {
        return Promise.resolve(this.data);
    };
    FinancialAccountRepositoryFake.prototype.add = function (launch) {
        this.data.push(launch);
        return Promise.resolve();
    };
    FinancialAccountRepositoryFake.prototype.remove = function (id) {
        this.data = this.data.filter(function (f) { return f.id !== id; });
        return Promise.resolve();
    };
    FinancialAccountRepositoryFake.prototype.update = function (id, launch) {
        var index = this.data.findIndex(function (f) { return f.id === id; });
        this.data[index] = launch;
        return Promise.resolve();
    };
    Object.defineProperty(FinancialAccountRepositoryFake.prototype, "knex", {
        get: function () {
            return helpers_1.transactionMock();
        },
        enumerable: false,
        configurable: true
    });
    return FinancialAccountRepositoryFake;
}(finnancial_account_repository_abstract_1.AbstractFinnancialAccountRepository));
exports.FinancialAccountRepositoryFake = FinancialAccountRepositoryFake;
