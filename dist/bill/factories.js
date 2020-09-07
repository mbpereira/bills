"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLaunchService = exports.createLaunchRepository = void 0;
var launch_repository_1 = require("./launch.repository");
var launch_service_1 = require("./launch.service");
// import { createFinnancialAccountRepository } from "../finnancial-account/factories";
exports.createLaunchRepository = function (knex) {
    return new launch_repository_1.BillRepository(knex);
};
exports.createLaunchService = function (knex) {
    return new launch_service_1.LaunchService(exports.createLaunchRepository(knex));
};
