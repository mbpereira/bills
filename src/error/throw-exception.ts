import { ApplicationError } from "./application-error"

export const throwException = (error: Error): ApplicationError => {
  if (error instanceof ApplicationError)
    return error;
  
  return new ApplicationError("INTERNAL_ERROR", error.message, 500);
};
