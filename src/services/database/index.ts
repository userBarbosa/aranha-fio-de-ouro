"use strict";

import { findFirst, imHealthy, insert, updateFirst } from "./mongodb";
import { CustomMongoErrors } from "./mongodb/types";

export async function selectOne<T>(
  source: string,
  query: any
): Promise<T | null> {
  return await findFirst<T>(source, query);
}

export async function insertOne(
  source: string,
  content: Record<string, unknown>
): Promise<string | null> {
  const date = new Date();
  return await insert(source, {
    ...content,
    createdAt: date,
    updatedAt: date,
    active: true,
  });
}

export async function updateOne(
  source: string,
  query: any,
  content: Record<string, unknown>
): Promise<boolean> {
  const date = new Date();
  return await updateFirst(source, query, {
    $set: {
      ...content,
      updatedAt: date,
    },
  });
}

export async function dbHealthCheck() {
  return await imHealthy();
}
