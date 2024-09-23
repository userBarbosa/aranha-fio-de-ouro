"use strict";

import { insertOne, selectOne } from "../../services/database";
import { UserDTO } from "../types/users.types";

const COLLECTION = "users";

export async function ReadByEmail(email: string): Promise<UserDTO | null> {
  try {
    const response = await selectOne<UserDTO>(COLLECTION, { email });
    return response;
  } catch (error) {
    throw {
      email,
      error,
      message: "error at repository level",
      func: "ReadByEmail",
    };
  }
}

export async function NewUser(
  name: string,
  email: string,
  password: string
): Promise<string | null> {
  try {
    const id = await insertOne(COLLECTION, { name, email, password });
    return id;
  } catch (error) {
    throw {
      email,
      error,
      message: "error at repository level",
      func: "NewUser",
    };
  }
}
