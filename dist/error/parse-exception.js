"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseException = void 0;
var application_error_1 = require("./application-error");
exports.parseException = function (error) {
    if (error instanceof application_error_1.ApplicationError)
        return error;
    return new application_error_1.ApplicationError("INTERNAL_ERROR", error.message, 500);
};
