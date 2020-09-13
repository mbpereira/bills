"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
var ApplicationError = /** @class */ (function () {
    /**
     *
     */
    function ApplicationError(name, message, code, stacktrace) {
        if (stacktrace === void 0) { stacktrace = true; }
        if (stacktrace)
            this.stack = (new Error()).stack;
        this.name = name;
        this.message = message;
        this.code = code;
    }
    return ApplicationError;
}());
exports.ApplicationError = ApplicationError;
