"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var deposit_controller_1 = require("./deposit/deposit.controller");
var knex_1 = require("./knex");
var knex = knex_1.createKnex();
var app = express_1.default();
deposit_controller_1.map(app, knex);
app.listen(process.env.PORT, function () {
    console.log('Server rodando...');
});
