'use strict'

import { ObjectId } from 'mongodb'

export type GenericDTO = {
  _id: ObjectId,
  createdAt: string | Date,
  updatedAt: string | Date,
  deletedAt?: string | Date,
  active: boolean,
}

export type GenericObject = {
  query: Record<string, any>
}

export enum CustomMongoErrors {
  NOT_FOUND = 'NOT_FOUND'
}