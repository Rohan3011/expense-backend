import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../utils/HttpStatusCode";

async function requireUser(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user) {
    return res
      .status(HttpStatusCode.FORBIDDEN)
      .send({ error: "User doesn't exits, please login!" });
  }

  return next();
}

export default requireUser;
