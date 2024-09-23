"use strict";

import { createHash } from "../../utils/encrypt/index";
import logger from "../../utils/logger";
import { RandomPassword } from "../../utils/random";
import { createToken } from "../../utils/token";
import { TokenUserPayload } from "../../utils/token/types";
import { NewUser, ReadByEmail } from "../repositories/users.repository";
import { User } from "../types/users.types";

export async function CreateUserModel(
  name: string,
  email: string,
  password?: string
): Promise<string | null> {
  const log = logger.child({
    func: "CreateUserModel",
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
): Promise<string> {
  const log = logger.child({
    func: "users.model.getUserToken",
    data: { user, expMilli },
  });

  try {
    const tokenUserPayload: TokenUserPayload = {
      id: user.id as string,
      name: user.name,
      email: user.email,
      emailConfirmed: undefined,
    };

    const token = await createToken(tokenUserPayload, expMilli);
    return token;
  } catch (error) {
    log.error("error on getting user token", { error });
    throw error;
  }
}
