import { NextFunction, Response, Request } from "express";
import { parseException } from "../error/parse-exception";

export const error = (err: any, req: Request, res: Response, next: NextFunction) => {
  const fullErr = parseException(err);
  const { stack, ...appError } = fullErr;

  console.error(fullErr);
  res.send(appError);
}