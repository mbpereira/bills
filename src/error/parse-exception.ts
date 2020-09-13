import { ApplicationError } from "./application-error"
import { exception } from "./exception";

export const parseException = (error: Error): ApplicationError => {
  if (error instanceof ApplicationError)
    return error;
  
  return exception(error.message).internalError;
};
