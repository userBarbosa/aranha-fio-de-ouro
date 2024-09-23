"use strict";

import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { environment } from "../../config/environment";
import logger from "../logger";
import { ErrorResponse, ErrorType } from "../response";
import { RequestWithToken, TokenUserPayload } from "./types";

export async function createToken(data: any, customExpiration?: number) {
  try {
    const token = sign(data, environment.TOKEN_SECRET, {
      expiresIn: customExpiration || environment.TOKEN_EXPIRATION_SECONDS,
    });

    return token;
  } catch (error) {
    logger.error("Error generating token", data);
  }

  return "";
}

export function validateToken(token: string): TokenUserPayload | undefined {
  try {
    const payload = verify(token, environment.TOKEN_SECRET) as string;
    return payload as unknown as TokenUserPayload;
  } catch (error) {
    logger.error("Error validating token", error);
  }
}

export function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void | NextFunction {
  try {
    const tokenHeader = req?.headers?.authorization;

    if (!tokenHeader) {
      return ErrorResponse(res, ErrorType.NotAuthorized, { error: "token is missing" });

    }

    const payload = validateToken(tokenHeader);

    if (!payload) {
      return ErrorResponse(res, ErrorType.NotAuthorized);
    }

    (req as RequestWithToken).user = payload as TokenUserPayload;
    return next();
  } catch (error) {
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}
