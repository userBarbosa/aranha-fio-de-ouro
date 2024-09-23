"use strict";

import { findOne, insert } from "./mongodb";

export async function selectOne<T>(source: string, data: any): Promise<T | null> {
  return await findOne<T>(source, data);
}

export async function insertOne(
  source: string,
  content: Record<string, unknown>
): Promise<string | null> {
  return await insert(source, content);
}