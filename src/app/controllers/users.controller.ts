"use strict";

import logger from "../../utils/logger";
import { Request, Response } from "express";
import {
  ErrorResponse,
  ErrorType,
  SuccessResponse,
} from "../../utils/response";
import { CreateUserModel, GetUserToken } from "../models/users.model";
import { RequestWithToken } from "../../utils/token/types";

export async function CreateUser(req: Request, res: Response) {
  const log = logger.child({ func: "CreateUser" });
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return ErrorResponse(res, ErrorType.BadRequest, {
        message: "missing required fields",
      });
    }

    const id = await CreateUserModel(name, email, password);

    if (!id) {
      return ErrorResponse(res, ErrorType.BadRequest, {}, {
        message: "couldn't create user",
      } as Error);
    }

    const token = await GetUserToken({ id, name, email });
    return SuccessResponse(res, { id, token });
  } catch (error) {
    log.error("error creating an user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function GetCurrentUser(req: Request, res: Response) {
  const log = logger.child({ func: "GetCurrentUser" });
  try {
    const user = (req as RequestWithToken).user;
    return SuccessResponse(res, { user });
  } catch (error) {
    log.error("error getting current user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}
