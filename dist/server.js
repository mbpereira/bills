"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var finnancial_account_controller_1 = require("./finnancial-account/finnancial-account.controller");
var knex_1 = require("./data/knex");
var knex = knex_1.createKnex();
var app = express_1.default();
finnancial_account_controller_1.map(app, knex);
app.listen(process.env.PORT, function () {
    console.log('Server rodando...');
});
