"use strict";
import { GenericDTO } from "../../services/database/mongodb/types";

export type User = {
  id?: string;
  name: string;
  email: string;
  emailConfirmed?: Date,
};

export type UserDTO = {
  name: string;
  email: string;
  password: string;
  emailConfirmed?: Date,
} & GenericDTO;

export type SignInUserResponse = {
  id: string,
  name: string,
  email: string,
  emailConfirmed: Date | undefined,
  token: string,
};