"use strict";

import { ObjectId } from "mongodb";
import { selectOne } from "../../services/database";
import { GroupDTO } from "../types/groups.types";

const COLLECTION = "groups";

export async function ReadById(id: string): Promise<GroupDTO | null> {
  try {
    const response = await selectOne<GroupDTO>(COLLECTION, {
      _id: new ObjectId(id),
    });
    return response;
  } catch (error) {
    throw {
      id,
      error,
      layer: "repository",
      func: "ReadByEmail",
    };
  }
}
