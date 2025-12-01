import { Model } from 'mongoose'
import { IComment } from '../../modules/Comment Module/CommentTypes'
import { CommentModel } from '../models/CommentModel'
import { DBRepo } from './DBRepository'

export class CommentRepo extends DBRepo<IComment> {
  constructor(
    protected override readonly model: Model<IComment> = CommentModel
  ) {
    super(CommentModel)
  }
  async GetAllComments(postId: string, page: number, limit: number) {
    const skip = (page - 1) * limit
    return this.model
      .find({ postId })
      .populate('CreatedBy', 'F_NAME L_NAME profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
  }
  async AddComment(data: Partial<IComment>) {
    return this.model.create(data)
  }
  async DeleteComment(commentId: string, userId: string) {
    return this.model.findOneAndDelete({
      _id: commentId,
      CreatedBy: userId,
    })
  }

  async UpdateComment(
    commentId: string,
    userId: string,
    data: Partial<IComment>
  ) {
    return this.model.findOneAndUpdate(
      { _id: commentId, CreatedBy: userId },
      { $set: data },
      { new: true }
    )
  }
  
}
