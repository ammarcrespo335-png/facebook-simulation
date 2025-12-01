
import mongoose, {
  Schema,
  model,
  Types,
  HydratedDocument,
} from 'mongoose'
import { IMessage } from '../../modules/chatModule/ChatTypes'


const MessageSchema = new Schema<IMessage>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
export interface IChat {
  participants: Types.ObjectId[]
  messages: IMessage[]

  //OVM
  createdBy: Types.ObjectId
  group?: string
  groupImage?: string
  roomId: string
  createdAt: Date
  updatedAt: Date
}
const ChatSchema = new Schema<IChat>(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    messages: [MessageSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    group: {
      type: String,
    },
    groupImage: {
      type: String,
    },
    roomId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
export type HChatDocument = HydratedDocument<IChat>
export const ChatModel = model<IChat>('chat', ChatSchema)
