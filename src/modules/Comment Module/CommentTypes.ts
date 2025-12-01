import { Schema, Types } from "mongoose"

export interface IComment {
  content: string
  CreatedBy: Types.ObjectId
  postId: Types.ObjectId
  likes: Types.ObjectId[]
  isFrozen?: boolean
  createdAt?: Date
  updatedAt?: Date
}
