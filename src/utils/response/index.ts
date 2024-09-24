"use strict";

import { Response } from "express";
import { isEmpty } from "../utils";

export enum ErrorType {
  BadRequest = 400,
  NotAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  Timeout = 504,
}

export enum ErrorMetrics {
  InvalidCredentials = "INV_CREDS",
  InvalidToken = "INV_TOKEN",
  NotAuthorized = "NOT_AUTHORIZED",
}

export function SuccessResponse(
  res: Response,
  data:
    | Record<string, unknown>
    | Record<string, unknown>[]
    | string
    | number
    | boolean
) {
  res.status(200).json({ data, success: true }).end();
}

export function ErrorResponse(
  res: Response,
  type: ErrorType,
  data?:
    | Record<string, unknown>
    | Record<string, unknown>[]
    | string
    | number
    | boolean,
  error?: Error
) {
  res
    .status(type)
    .json({ ...(data && !isEmpty(data) && { data }), error, success: false })
    .end();
}
