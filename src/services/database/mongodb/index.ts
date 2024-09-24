import { MongoClient, ObjectId, Document } from "mongodb";
import { environment } from "../../../config/environment";
import logger from "../../../utils/logger";
import { CustomMongoErrors } from "./types";

export type IndexType = ObjectId;

const mongoDbClient = new MongoClient(environment.MONGODB_URI);
const mongoDataBase = environment.MONGODB_DATABASE;

export async function findFirst<T>(
  collection: string,
  query: Record<string, unknown>,
  options?: Record<string, unknown>
): Promise<T | null> {
  try {
    await mongoDbClient.connect();

    const data = await mongoDbClient
      .db(mongoDataBase)
      .collection(collection)
      .findOne<T>(query, options);

    return data;
  } catch (error) {
    logger.error("MONGO ERROR", error);
  } finally {
    setTimeout(() => {
      mongoDbClient.close();
    }, 1000);
  }

  return null;
}

export async function insert(
  collection: string,
  document: Record<string, unknown>,
  options?: Record<string, unknown>
): Promise<string | null> {
  try {
    await mongoDbClient.connect();

    const data = await mongoDbClient
      .db(mongoDataBase)
      .collection(collection)
      .insertOne(document, options);

    return data?.insertedId?.toString();
  } catch (error) {
    logger.error("MONGO ERROR", error);
  } finally {
    setTimeout(() => {
      mongoDbClient.close();
    }, 1000);
  }

  return null;
}

export async function updateFirst(
  collection: string,
  filter: Record<string, unknown>,
  update: Record<string, unknown>,
  options?: Record<string, unknown>
): Promise<boolean> {
  try {
    await mongoDbClient.connect();

    const data = await mongoDbClient
      .db(mongoDataBase)
      .collection(collection)
      .updateOne(filter, update, options);

    if (data.matchedCount === 0) {
      throw { errCode: CustomMongoErrors.NOT_FOUND };
    }
    return data.modifiedCount > 0;
  } catch (error) {
    logger.error("MONGO ERROR", error);
  } finally {
    setTimeout(() => {
      mongoDbClient.close();
    }, 1000);
  }

  return false;
}
