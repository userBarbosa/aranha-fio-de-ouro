"use strict";

import { GenericDTO } from "./../../services/database/mongodb/types";

export type Group = {
  id?: string;
  name: string;
  description: string;
  members: Member[];
};
export type GroupDTO = {
  name: string;
  description: string;
  members: Member[];
} & GenericDTO;

export type Member = {
  userId: string;
  isAdmin: boolean;
};
