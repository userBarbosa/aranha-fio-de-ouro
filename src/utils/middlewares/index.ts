"use strict";

import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import { RequestWithToken } from "../token/types";
import { ErrorResponse, ErrorType } from "../response";
import { ReadById } from "../../app/repositories/groups.repository";

export async function isGroupAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> {
  const log = logger.child({ func: "isGroupAdmin", layer: "middleware" });

  try {
    const user = (req as RequestWithToken).user;
    const userId = user.id;

    const groupId = req.params.id;

    if (!userId || !groupId) {
      return ErrorResponse(res, ErrorType.BadRequest, {}, {
        message: "missing required information",
      } as Error);
    }

    const group = await ReadById(groupId);
    if (!group) {
      return ErrorResponse(res, ErrorType.NotFound, {}, {
        message: "group not found",
      } as Error);
    }
    const isAdmin = group.members.some(
      (member: any) => member.userId.toString() === userId && member.isAdmin
    );

    if (!isAdmin) {
      return ErrorResponse(res, ErrorType.NotAuthorized);
    }

    next();
  } catch (error) {
    log.error("error on checking if user is admin", { error });
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}
