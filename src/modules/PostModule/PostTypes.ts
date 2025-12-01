import { Types } from "mongoose";

export interface IPost {
  CreatedBy: Types.ObjectId
  content: string
  images: string[]
  likes: Types.ObjectId[]
  isFrozen: boolean
  createdAt: Date
  updatedAt: Date
}