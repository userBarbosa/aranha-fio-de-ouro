"use strict";

import logger from "../../utils/logger";
import { ErrorMetrics } from "../../utils/response";
import {
  AppendMembers,
  NewGroup,
  ReadById,
  ReadByNameAndUserId,
} from "../repositories/groups.repository";
import { Member } from "./../types/groups.types";

export async function CreateGroup(
  name: string,
  description: string,
  members: Member[],
  userId: string
) {
  const log = logger.child({
    func: "CreateUserModel",
    layer: "model",
    data: { name, userId, members },
  });

  try {
    const duplicatedName = ReadByNameAndUserId(name, userId);
    if (!duplicatedName) {
      throw { message: "name isn't unique", original: duplicatedName };
    }

    const group = {
      name,
      description,
      members: [...members, { userId, isAdmin: true }],
      createdBy: userId,
      updatedBy: userId,
    };
    const response = await NewGroup(group);

    return response;
  } catch (error) {
    log.error("error creating group", error);
    throw error;
  }
}

export async function ReadGroup(id: string, userId: string) {
  const log = logger.child({ func: "ReadGroup", layer: "model", id, userId });

  try {
    const group = await ReadById(id);
    if (!group) {
      throw { message: "group not found" };
    }
    const isMember = group.members.some((member) => member.userId.toString() === userId);
    if (!isMember) {
      throw {
        message: "user is not a member of this group",
        metric: ErrorMetrics.NotAuthorized,
      };
    }
    return group;
  } catch (error) {
    log.error("error getting group", error);
    throw error;
  }
}

export async function AddMemberToGroup(id: string, newMembers: Member[]) {
  const log = logger.child({
    func: "AddMemberToGroup",
    layer: "model",
    data: { id, newMembers },
  });

  try {
    const group = await ReadById(id);
    if (!group) {
      throw { message: "group not found" };
    }
    console.log(group);
    group.members = [...group.members, ...newMembers];
    const response = await AppendMembers(group);
    return response;
  } catch (error) {
    log.error("error adding member to group", error);
    throw error;
  }
}
// export async function UpdateGroup(
//   id: string,
//   name: string,
//   description: string,
//   members: Member[],
//   userId: string
// ) {
//   const log = logger.child({
//     func: "UpdateGroup",
//     layer: "model",
//     data: { id, name, description, members, userId },
//   });

//   try {
//     const group = await ReadById(id);
//     if (!group) {
//       throw { message: "group not found" };
//     }
//     if (group.createdBy !== userId) {
//       throw { message: "user is not the owner of this group", metric: ErrorMetrics.NotAuthorized };
//     }

//     const updatedGroup: Group = {
//       name,
//       description,
//       members,
//       updatedBy: userId,
//     };

//     const response = await NewGroup(updatedGroup);
//     return response;
//   } catch (error) {
//     log.error("error updating group", error);
//     throw error;
//   }
// }
