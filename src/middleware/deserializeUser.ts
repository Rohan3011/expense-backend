import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../utils/HttpStatusCode";
import { verifyJwt } from "../../utils/jwt";

async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/s,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.user = decoded;
  }
  next();
}

export default deserializeUser;
