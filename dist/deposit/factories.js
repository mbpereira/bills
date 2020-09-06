"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDepositService = exports.createDepositRepository = void 0;
var deposit_service_1 = require("./deposit.service");
var deposit_repository_1 = require("./deposit.repository");
function createDepositRepository(knex) {
    return new deposit_repository_1.DepositRepository(knex);
}
exports.createDepositRepository = createDepositRepository;
function createDepositService(knex) {
    return new deposit_service_1.DepositService(createDepositRepository(knex));
}
exports.createDepositService = createDepositService;
