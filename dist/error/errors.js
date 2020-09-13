"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exception = void 0;
var application_error_1 = require("./application-error");
exports.exception = function (message, stacktrace) {
    if (message === void 0) { message = ""; }
    if (stacktrace === void 0) { stacktrace = true; }
    return ({
        invalidOperation: new application_error_1.ApplicationError("INVALID_OPERATION", message, 400, stacktrace),
        recordNotFound: new application_error_1.ApplicationError("NOT_FOUND", message, 404, stacktrace),
        internalError: new application_error_1.ApplicationError("INTERNAL_ERROR", message, 500, stacktrace)
    });
};
