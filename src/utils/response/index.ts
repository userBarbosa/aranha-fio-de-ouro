'use strict'

import { Response } from 'express';

export enum ErrorType {
  BadRequest = 400,
  NotAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  Timeout = 504,
}

export enum ErrorMetrics {
  InvalidCredentials = "INV_CREDS"
}

export function SuccessResponse(
  res: Response,
  data: Record<string, unknown> | Record<string, unknown>[] | string | number | boolean
) {
  res
    .status(200)
    .json({data, success: true})
    .end()
}

export function ErrorResponse(
  res: Response,
  type: ErrorType,
  data?: Record<string, unknown> | Record<string, unknown>[] | string | number | boolean, 
  error?: Error
) {
  res
    .status(type)
    .json({ data, error, success: false })
    .end()
}