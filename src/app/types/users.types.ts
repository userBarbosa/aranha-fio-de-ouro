"use strict";
import { ObjectId } from 'mongodb';
import { GenericDTO } from "../../services/database/mongodb/types";

export type User = {
  id?: ObjectId | string;
  name: string;
  email: string;
  groups?: string[];
};

export type UserDTO = {
  name: string;
  email: string;
  password: string;
  groups: string[];
} & GenericDTO;

export type SignInUserResponse = {
  id: string;
  name: string;
  email: string;
  groups: string[];
  token: string;
  expiresIn: number;
};
