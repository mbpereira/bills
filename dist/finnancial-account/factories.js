"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFinnancialAccountServiceWithRepository = exports.createFinnancialAccountService = exports.createFinnancialAccountRepository = void 0;
var finnancial_account_service_1 = require("./finnancial-account.service");
var finnancial_account_repository_1 = require("./finnancial-account.repository");
exports.createFinnancialAccountRepository = function (knex) {
    return new finnancial_account_repository_1.FinnancialAccountRepository(knex);
};
exports.createFinnancialAccountService = function (knex) {
    return new finnancial_account_service_1.FinnancialAccountService(exports.createFinnancialAccountRepository(knex));
};
exports.createFinnancialAccountServiceWithRepository = function (finnancialAccountRepository) {
    return new finnancial_account_service_1.FinnancialAccountService(finnancialAccountRepository);
};
