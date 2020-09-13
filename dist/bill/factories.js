"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creteBillServiceWithRepositories = exports.createBillServiceWithKnex = exports.createBillRepository = void 0;
var bill_repository_1 = require("./bill.repository");
var bill_service_1 = require("./bill.service");
var factories_1 = require("../finnancial-account/factories");
exports.createBillRepository = function (knex) {
    return new bill_repository_1.BillRepository(knex);
};
exports.createBillServiceWithKnex = function (knex) {
    return new bill_service_1.BillService(exports.createBillRepository(knex), factories_1.createFinnancialAccountRepository(knex));
};
exports.creteBillServiceWithRepositories = function (billRepository, finnancialAccountRepository) {
    return new bill_service_1.BillService(billRepository, finnancialAccountRepository);
};
