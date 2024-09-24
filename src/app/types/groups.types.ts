"use strict";

import { ObjectId } from "mongodb";
import { GenericDTO } from "./../../services/database/mongodb/types";

export type Group = {
  id?: string;
  name: string;
  description: string;
  members: Member[];
  createdBy: ObjectId | string;
  updatedBy: ObjectId | string;
};
export type GroupDTO = {
  name: string;
  description: string;
  members: Member[];
  createdBy: ObjectId | string;
  updatedBy: ObjectId | string;
} & GenericDTO;

export type Member = {
  userId: ObjectId | string;
  isAdmin: boolean;
};
