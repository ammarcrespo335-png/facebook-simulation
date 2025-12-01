import { HydratedDocument, model, Schema } from 'mongoose'
import { IPost } from '../../modules/PostModule/PostTypes'

export const PostSchema = new Schema<IPost>(
  {
    CreatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
   images: {
  type: [String],
  default: [],
},

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    isFrozen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
export type HPostDocument = HydratedDocument<IPost>
export const PostModel = model<IPost>('posts', PostSchema)
