import { Request, Response, NextFunction } from 'express'
import { PostRepo } from '../../../DB/repositories/PostRepository'
import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { AuthRequest } from '../../../middleware/authMiddleware'

export class GetSinglePost {
  private readonly postRepo = new PostRepo()
  async getSinglePost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params
      const post = await this.postRepo.getSinglePost(postId as string)
      if (!post) {
        throw new NotFoundExceptions('No post yet')
      }
      return SuccessHandler({
        res,
        msg: 'Post fetched successfully',
        data: { post },
      })
    } catch (error) {
      next(error)
    }
  }
}
