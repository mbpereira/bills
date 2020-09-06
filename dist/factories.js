"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKnex = void 0;
var knex_1 = __importDefault(require("knex"));
exports.createKnex = function () {
    return knex_1.default({
        client: 'pg',
        connection: {
            user: "postgres",
            password: "123456",
            port: 5432,
            host: "localhost",
            database: "SysBit"
        }
    });
};
