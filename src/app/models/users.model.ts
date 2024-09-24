"use strict";

import { createHash, validateHash } from "../../utils/encrypt/index";
import logger from "../../utils/logger";
import { RandomPassword } from "../../utils/utils";
import { ErrorMetrics } from "../../utils/response";
import { createToken } from "../../utils/token";
import { TokenUserPayload } from "../../utils/token/types";
import { NewUser, ReadByEmail } from "../repositories/users.repository";
import { SignInUserResponse, User } from "../types/users.types";

export async function CreateUserModel(
  name: string,
  email: string,
  password?: string
): Promise<string | null> {
  const log = logger.child({
    func: "CreateUserModel",
    layer: "model",
    data: { name, email },
  });

  try {
    const existingUser = await ReadByEmail(email);

    if (existingUser) {
      throw { message: "User already exists" };
    }

    const hashedPassword = password
      ? await createHash(password)
      : await createHash(RandomPassword());

    const response = await NewUser(name, email, hashedPassword);

    return response;
  } catch (error) {
    let logMessage = "error creating user";
    if (error instanceof Error) {
      logMessage = error.message;
    }
    log.error(logMessage, error);
    throw error;
  }
}

export async function GetUserToken(
  user: User,
  expMilli?: number
): Promise<{ token: string; expiresIn: number }> {
  const log = logger.child({
    func: "GetUserToken",
    layer: "model",
    data: { user, expMilli },
  });

  try {
    const tokenUserPayload: TokenUserPayload = {
      id: user.id as string,
      name: user.name,
      email: user.email,
      groups: user.groups || [],
    };

    const token = await createToken(tokenUserPayload, expMilli);
    return token;
  } catch (error) {
    log.error("error on getting user token", { error });
    throw error;
  }
}

export async function LoginUser(
  email: string,
  password: string
): Promise<SignInUserResponse | null> {
  const log = logger.child({
    func: "LoginUser",
    layer: "model",
    data: { email },
  });
  try {
    const existingUser = await ReadByEmail(email);
    if (!existingUser) {
      throw { message: "user does not exists", email };
    }

    const isPasswordCorrect = await validateHash(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      throw {
        message: "incorrect password",
        metric: ErrorMetrics.InvalidCredentials,
        email,
      };
    }

    const tokenUserPayload: TokenUserPayload = {
      id: existingUser._id.toString(),
      name: existingUser.name,
      email: existingUser.email,
      groups: existingUser.groups,
    };
    const newToken = await createToken(tokenUserPayload);

    return {
      ...tokenUserPayload,
      ...newToken,
    };
  } catch (error) {
    log.error("error logging user", error);
    throw error;
  }
}
