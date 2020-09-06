"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLaunchService = exports.getLaunchRepository = void 0;
var launch_repository_1 = require("./launch.repository");
var launch_service_1 = require("./launch.service");
exports.getLaunchRepository = function (knex) {
    return new launch_repository_1.LaunchRepository(knex);
};
exports.getLaunchService = function (knex) {
    return new launch_service_1.LaunchService(exports.getLaunchRepository(knex));
};
