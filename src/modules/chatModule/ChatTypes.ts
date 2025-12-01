import { Types } from "mongoose"

export interface IMessage {
  createdBy: Types.ObjectId
  content: string
  chatId: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}
