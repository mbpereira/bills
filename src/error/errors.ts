import { ApplicationError } from "./application-error";

export const exception = (message: string = "", stacktrace: boolean = true) => ({
  invalidOperation: new ApplicationError("INVALID_OPERATION", message, 400, stacktrace),
  recordNotFound: new ApplicationError("NOT_FOUND", message, 404, stacktrace),
  internalError: new ApplicationError("INTERNAL_ERROR", message, 500, stacktrace)
});