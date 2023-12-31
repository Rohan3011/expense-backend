import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../utils/HttpStatusCode";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(res.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}

export default errorHandler;
