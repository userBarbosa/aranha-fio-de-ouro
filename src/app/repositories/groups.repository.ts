"use strict";

import { ObjectId } from "mongodb";
import { insertOne, selectOne, updateOne } from "../../services/database";
import { Group, GroupDTO } from "../types/groups.types";

const COLLECTION = "groups";

export async function ReadById(id: string): Promise<GroupDTO | null> {
  try {
    const response = await selectOne<GroupDTO>(COLLECTION, {
      _id: new ObjectId(id),
    });
    console.log(response);
    
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

export async function ReadByNameAndUserId(
  name: string,
  userId: string
): Promise<GroupDTO | null> {
  try {
    const response = await selectOne<GroupDTO | null>(COLLECTION, {
      userId,
      name,
    });
    return response;
  } catch (error) {
    throw {
      error,
      name,
      userId,
      func: "ReadByNameAndUserId",
      layer: "repository",
    };
  }
}

export async function NewGroup(group: Group): Promise<string | null> {
  try {
    group.createdBy = new ObjectId(group.createdBy);
    group.updatedBy = new ObjectId(group.updatedBy);
    group.members.forEach(
      (member) => (member.userId = new ObjectId(member.userId))
    );

    const id = await insertOne(COLLECTION, group);
    return id;
  } catch (error) {
    throw {
      error,
      group,
      func: "NewGroup",
      layer: "repository",
    };
  }
}

export async function AppendMembers(group: GroupDTO): Promise<boolean> {
  try {
    const query = { _id: new ObjectId(group._id) };
    const result = await updateOne(COLLECTION, query, group);
    return result;
  } catch (error) {
    throw {
      error,
      group,
      func: "AppendMembers",
      layer: "repository",
    };
  }
}
