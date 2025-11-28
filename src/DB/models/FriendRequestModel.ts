import { model, Schema, Types } from 'mongoose'


export interface IFriendRequest {
  from: Types.ObjectId
  to: Types.ObjectId
  status: 'pending' | 'accepted' | 'rejected'
  acceptedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const FriendRequestSchema = new Schema<IFriendRequest>(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
    },
    acceptedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)
export const FriendRequestModel = model<IFriendRequest>(
  'FriendRequest',
  FriendRequestSchema
)