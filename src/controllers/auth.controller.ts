import { Request, Response } from "express";
import HttpStatusCode from "../../utils/HttpStatusCode";
import { createSessionInput } from "../schema/auth.schema";
import { signAccessToken, signRefreshToken } from "../services/auth.service";
import { findUserByEmail } from "../services/user.service";

export async function createSessionHandler(
  req: Request<{}, {}, createSessionInput>,
  res: Response
) {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(HttpStatusCode.UNAUTHORIZED).send(message);
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    res.send(message);
  }

  // sign an access token
  const accessToken = signAccessToken(user);
  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id });
  // send the tokens
  res.send({
    accessToken,
    refreshToken,
  });
}
