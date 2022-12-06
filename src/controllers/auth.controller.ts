import { Request, Response } from "express";
import { get } from "lodash";
import HttpStatusCode from "../../utils/HttpStatusCode";
import { verifyJwt } from "../../utils/jwt";
import { createSessionInput } from "../schema/auth.schema";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../services/auth.service";
import { findUserByEmail, findUserById } from "../services/user.service";

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

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, "headers.x-refresh");
  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .send("Failed to refresh access token");
  }

  const session = await findSessionById(decoded.session);
  if (!session || !session.valid) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .send("Failed to refresh access token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .send("Failed to refresh access token");
  }
  const accessToken = signAccessToken(user);
  return res.send({ accessToken });
}
