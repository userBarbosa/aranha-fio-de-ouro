"use strict";

import { config } from "dotenv";

config();

type Environment = {
  PORT: number;
  MONGODB_URI: string;
  MONGODB_DATABASE: string;
  TOKEN_SECRET: string;
  TOKEN_EXPIRATION_SECONDS: number
};

export const environment: Environment = {
  PORT: parseInt(process.env.PORT || "4000"),
  MONGODB_URI: process.env.MONGODB_URI || "",
  MONGODB_DATABASE: process.env.MONGODB_DATABASE || "",
  TOKEN_SECRET: process.env.TOKEN_SECRET || "",
  TOKEN_EXPIRATION_SECONDS: parseInt(process.env.TOKEN_EXPIRATION_SECONDS || "3600")
};
