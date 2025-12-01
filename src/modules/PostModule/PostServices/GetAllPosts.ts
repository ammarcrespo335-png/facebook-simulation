import { Response, Request, NextFunction } from 'express'
import { PostRepo } from '../../../DB/repositories/PostRepository'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'
import { AuthRequest } from '../../../middleware/authMiddleware'

export class GetAllPosts {
  private readonly postRepo = new PostRepo()

  async GetAllPosts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1)
      const limit = 10

      const posts = await this.postRepo.getAllPosts(page, limit)
      if (!posts || posts.length === 0) {
        throw new NotFoundExceptions('No posts yet')
      }
      return SuccessHandler({
        res,
        msg: ' Posts fetched successfully',
        data: { posts },
      })
    } catch (error) {
      next(error)
    }
  }
}
