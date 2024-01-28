import { NextFunction, Request, Response } from "express";
import { RateLimiterMongo } from "rate-limiter-flexible";

const opts = {
  storeClient: mongoConn,
  dbName: "somedb",
  points: 10, // Number of points
  duration: 1, // Per second(s)
};

const rateLimiter = new RateLimiterMongo(opts);

export const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
};
