import { Request, Response, NextFunction } from 'express'
import { PostRepo } from '../../../DB/repositories/PostRepository'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { IPost } from '../PostTypes'
import { AuthRequest } from '../../../middleware/authMiddleware'
import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'

export class getMyPosts {
  private readonly postRepo = new PostRepo()

  async getMyPosts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id.toString()
         if (!userId) {
              throw new NotFoundExceptions('userId not found')
            }
       
      const page = Math.max(1, parseInt(req.query.page as string)) || 1
      const limit = 10
      const MyPosts = await this.postRepo.getMyPosts(
        userId as string,
        page,
        limit
      )
      return SuccessHandler({
        res,
        msg: 'user posts are fetched',
        data: { MyPosts },
      })
    } catch (error) {
      next(error)
    }
  }
}
