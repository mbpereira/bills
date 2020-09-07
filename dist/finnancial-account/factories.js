"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFinnancialAccountService = exports.createFinnancialAccountRepository = void 0;
var finnancial_account_service_1 = require("./finnancial-account.service");
var finnancial_account_repository_1 = require("./finnancial-account.repository");
// import { AbstractFinnancialAccountRepository } from "./finnancial-account.repository.d";
function createFinnancialAccountRepository(knex) {
    return new finnancial_account_repository_1.FinnancialAccountRepository(knex);
}
exports.createFinnancialAccountRepository = createFinnancialAccountRepository;
function createFinnancialAccountService(knex) {
    return new finnancial_account_service_1.FinnancialAccountService(createFinnancialAccountRepository(knex));
}
exports.createFinnancialAccountService = createFinnancialAccountService;
