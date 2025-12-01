import { Request, Response, NextFunction } from 'express'
import { PostRepo } from '../../../DB/repositories/PostRepository'
import { HPostDocument } from '../../../DB/models/PostModels'
import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { AuthRequest } from '../../../middleware/authMiddleware'

export class DeletePost {
  private readonly postRepo = new PostRepo()
  async DeletePost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params
      const userId = req .user?._id.toString()
      if (!userId) {
        throw new NotFoundExceptions('userId not found')
      }
      const deleted = (await this.postRepo.deletePost(
        postId as string,
        userId as string
      )) as HPostDocument
      if (!deleted) {
        throw new NotFoundExceptions('No post yet')
      }
      return SuccessHandler({ res, msg: 'post is deleted', data: { deleted } })
    } catch (error) {
      next(error)
    }
  }
}
