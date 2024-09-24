"use strict";

import logger from "../../utils/logger";
import { Request, Response } from "express";
import {
  ErrorMetrics,
  ErrorResponse,
  ErrorType,
  SuccessResponse,
} from "../../utils/response";
import {
  CreateUserModel as CreateUser,
  GetUserToken,
  LoginUser,
} from "../models/users.model";
import { RequestWithToken } from "../../utils/token/types";

export async function Create(req: Request, res: Response) {
  const log = logger.child({ func: "CreateUser", layer: "controller" });
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return ErrorResponse(res, ErrorType.BadRequest, {}, {
        message: "missing required fields",
      } as Error);
    }

    const id = await CreateUser(name, email, password);

    if (!id) {
      return ErrorResponse(res, ErrorType.BadRequest, {}, {
        message: "couldn't create user",
      } as Error);
    }

    const token = await GetUserToken({ id, name, email });
    return SuccessResponse(res, { id, ...token });
  } catch (error) {
    log.error("error creating an user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function Login(req: Request, res: Response) {
  const log = logger.child({ func: "Login", layer: "controller" });
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ErrorResponse(res, ErrorType.BadRequest);
    }
    const user = await LoginUser(email, password);

    if (!user) {
      return ErrorResponse(res, ErrorType.InternalServerError);
    }

    return SuccessResponse(res, { ...user });
  } catch (error) {
    const customError = error as any;
    if (
      customError?.metric &&
      customError.metric === ErrorMetrics.InvalidCredentials
    ) {
      return ErrorResponse(res, ErrorType.Forbidden, {}, error as Error);
    }
    log.error("error singing user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function GetCurrentUser(req: Request, res: Response) {
  const log = logger.child({ func: "GetCurrentUser", layer: "controller" });
  try {
    const user = (req as RequestWithToken).user;
    return SuccessResponse(res, { ...user });
  } catch (error) {
    log.error("error getting current user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function UpdateUser(req: Request, res: Response) {}
