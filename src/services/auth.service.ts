import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import { signJwt } from "../../utils/jwt";
import SessionModel from "../models/session.model";
import { privateFields, User } from "../models/user.model";

export function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });
  const refreshToken = signJwt(
    { session: session._id },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );
  return refreshToken;
}

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);
  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });
  return accessToken;
}
