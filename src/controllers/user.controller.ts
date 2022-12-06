import { Request, Response } from "express";
import HttpStatusCode from "../../utils/HttpStatusCode";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../services/user.service";

const UNIQUE_CONSTRAIN_VIOLATED = 110000;

/**
 * @desc create User
 * @route POST /api/users
 * @access Private
 */
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;
  try {
    const user = await createUser(body);
    return res.send("User successfully created");
  } catch (e: any) {
    if (e.code === UNIQUE_CONSTRAIN_VIOLATED) {
      res.send(HttpStatusCode.CONFLICT).send("User already exists!");
    }
    res.send(HttpStatusCode.INTERNAL_SERVER_ERROR).send(e);
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user); // deserialize Middleware
}
