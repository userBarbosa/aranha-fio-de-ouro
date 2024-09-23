"use strict";

import { Request } from "express";

export type TokenUserPayload = {
  id: string;
  name: string;
  email: string;
  groups: string[];
};
export type RequestWithToken = Request & { user: TokenUserPayload };
