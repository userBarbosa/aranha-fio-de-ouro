"use strict";

import { GenericDTO } from "./../../services/database/mongodb/types";

export type Contact = {
  id: string;
  name: string;
  address?: string;
  phone: string;
  email: string;
  groupId: string;
};

export type ContactDTO = {
  name: string;
  address?: string;
  phone: string;
  email: string;
  groupId: string;
} & GenericDTO;
