"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKnexTest = exports.createKnex = void 0;
var knex_1 = __importDefault(require("knex"));
exports.createKnex = function () {
    return knex_1.default({
        client: 'pg',
        connection: {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            host: process.env.DB_HOST,
            database: process.env.DB_NAME
        }
    });
};
exports.createKnexTest = function () {
    return knex_1.default({
        client: 'pg',
        connection: {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            host: process.env.DB_HOST,
            database: process.env.DB_NAME
        }
    });
};
