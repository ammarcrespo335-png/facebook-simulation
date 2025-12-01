import { Types } from 'mongoose'
import { PostRepo } from '../../../DB/repositories/PostRepository'
import { NextFunction, Request, Response } from 'express'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'
import { AuthRequest } from '../../../middleware/authMiddleware'

export class CreatePost {
  private readonly postRepo = new PostRepo()

  async CreatePost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req .user?._id
      if (!userId) {
        throw new NotFoundExceptions('User not found')
      }

      const { content, images } = req.body

      const post = await this.postRepo.create({
        data: {
          CreatedBy: new Types.ObjectId(userId),
          content,
          images: images || [],
        },
      })

      return SuccessHandler({
        res,
        msg: 'post is created',
        data: { post },
      })
    } catch (error) {
      next(error)
    }
  }
}
