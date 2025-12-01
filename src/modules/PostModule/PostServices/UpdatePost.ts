import { Response, NextFunction } from 'express'
import { PostRepo } from '../../../DB/repositories/PostRepository'

import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { AuthRequest } from '../../../middleware/authMiddleware'

export class UpdatePost {
  private readonly postRepo = new PostRepo()
  async UpdatePost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params
      const userId = req.user?._id.toString()
         if (!userId) {
              throw new NotFoundExceptions('userId not found')
            }
         
      const { content, images } = req.body
      const updated = await this.postRepo.updatePost(
        postId as string,
        userId as string,
        {
          content,
          images,
        }
      )
      if (!updated) {
        throw new NotFoundExceptions('No post yet')
      }
      return SuccessHandler({ res, msg: 'post is updated', data: { updated } })
    } catch (error) {
      next(error)
    }
  }
}
