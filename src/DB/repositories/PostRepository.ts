
import { IPost } from '../../modules/PostModule/PostTypes'
import { DBRepo } from './DBRepository'
import { PostModel } from '../models/PostModels'

export class PostRepo extends DBRepo<IPost> {
  constructor() {
    super(PostModel)
  }
  async getAllPosts(page: number, limit: number) {
    const skip = (page - 1) * limit
    return this.model
      .find()
      .populate('CreatedBy', 'F_NAME L_NAME profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
  }
  async getSinglePost(id: string) {
    return this.model.findById(id).populate('CreatedBy', 'F_NAME L_NAME')
  }

  async updatePost(postId: string, userId: string, data: Partial<IPost>) {
    return this.model.findOneAndUpdate(
      { _id: postId, CreatedBy: userId },
      { $set: data },
      { new: true }
    )
  }
  async deletePost(postId: string, userId: string) {
    return PostModel.findOneAndDelete({
      _id: postId,
      CreatedBy: userId,
    })
  }
  async getMyPosts(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit

    return this.model
      .find({ CreatedBy: userId })
      .populate('CreatedBy', 'F_NAME L_NAME profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
  }
}

