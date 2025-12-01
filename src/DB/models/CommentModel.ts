import { model, Schema } from 'mongoose'
import { IComment } from '../../modules/Comment Module/CommentTypes'

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  },
  {
    timestamps: true,
  }
)
export const CommentModel = model<IComment>('comment', CommentSchema)
