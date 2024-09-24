"use strict";

import { Request, Response } from "express";
import logger from "../../utils/logger";
import {
  ErrorMetrics,
  ErrorResponse,
  ErrorType,
  SuccessResponse,
} from "../../utils/response";
import { RequestWithToken } from "../../utils/token/types";
import { AddMemberToGroup, CreateGroup, ReadGroup } from "../models/groups.model";
import { Group } from "../types/groups.types";

export async function Create(req: Request, res: Response) {
  const log = logger.child({ func: "Create", layer: "controller" });
  try {
    const { description, members, name } = req.body;
    const user = (req as RequestWithToken).user;

    if (!name) {
      return ErrorResponse(res, ErrorType.BadRequest, {}, {
        message: "missing required fields",
      } as Error);
    }

    const id = await CreateGroup(name, description, members, user.id);

    return SuccessResponse(res, { id });
  } catch (error) {
    log.error("error creating group", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function GetGroup(req: Request, res: Response) {
  const log = logger.child({ func: "GetGroup", layer: "controller" });
  try {
    const user = (req as RequestWithToken).user;
    const { id } = req.params;
    if (!id) {
      return ErrorResponse(res, ErrorType.BadRequest, {}, {
        message: "missing required fields",
      } as Error);
    }

    const group: Group = await ReadGroup(id, user.id);
    return SuccessResponse(res, group);
  } catch (error) {
    log.error("error getting group", error);
    const customError = error as any;
    if (
      customError?.metric &&
      customError.metric === ErrorMetrics.NotAuthorized
    ) {
      return ErrorResponse(res, ErrorType.Forbidden, {}, error as Error);
    }
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function AddMembers(req: Request, res: Response) {
  const log = logger.child({ func: "AddMembers", layer: "controller" });
  try {
    const user = (req as RequestWithToken).user;
    const { id } = req.params;
    const { members } = req.body;
    if (!id || !members) {
      return ErrorResponse(res, ErrorType.BadRequest, {}, {
        message: "missing required fields",
      } as Error);
    }

    const updated = await AddMemberToGroup(id, members);
    return SuccessResponse(res, {updated});
  } catch (error) {
    log.error("error getting group", error);
    const customError = error as any;
    if (
      customError?.metric &&
      customError.metric === ErrorMetrics.NotAuthorized
    ) {
      return ErrorResponse(res, ErrorType.Forbidden, {}, error as Error);
    }
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function GetGroups(req: Request, res: Response) {}

export async function UpdateGroup(req: Request, res: Response) {}
export async function DeleteGroup(req: Request, res: Response) {}
export async function AddContactToGroup(req: Request, res: Response) {}
export async function GetGroupContacts(req: Request, res: Response) {}
export async function RemoveContactFromGroup(req: Request, res: Response) {}
