"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var finnancial_account_controller_1 = require("./finnancial-account/finnancial-account.controller");
var knex_1 = require("./data/knex");
var dotenv_1 = require("dotenv");
var parse_exception_1 = require("./error/parse-exception");
dotenv_1.config();
var knex = knex_1.createKnex();
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) { return res.send("Hi"); });
finnancial_account_controller_1.map(app, knex);
app.use(function (err, req, res, next) {
    var _a = parse_exception_1.parseException(err), name = _a.name, message = _a.message, code = _a.code;
    res.send({
        name: name, message: message, code: code
    });
});
app.listen(process.env.PORT, function () {
    console.log('Server rodando...');
});
