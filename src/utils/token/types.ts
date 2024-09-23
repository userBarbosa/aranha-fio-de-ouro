"use strict";

import { Request } from "express";

export type TokenUserPayload = {
  id: string;
  name: string;
  email: string;
  emailConfirmed: Date | undefined;
};
export type RequestWithToken = Request & { user: TokenUserPayload };
