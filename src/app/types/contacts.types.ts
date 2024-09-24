"use strict";

import { ObjectId } from 'mongodb';
import { GenericDTO } from "./../../services/database/mongodb/types";

export type Contact = {
  id: string;
  name: string;
  address?: string;
  phone: string;
  email: string;
  groupId: ObjectId;
};

export type ContactDTO = {
  name: string;
  address?: string;
  phone: string;
  email: string;
  groupId: ObjectId;
} & GenericDTO;
