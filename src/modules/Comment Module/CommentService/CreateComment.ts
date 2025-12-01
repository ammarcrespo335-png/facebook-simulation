import { Request, Response, NextFunction } from 'express'
import { CommentRepo } from '../../../DB/repositories/Comment Repository'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { AuthRequest } from '../../../middleware/authMiddleware'
import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'
import { Types } from 'mongoose'


export class CreateComment {
  private readonly commentRepo = new CommentRepo()
  async CreateComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?._id.toString()
           if (!userId) {
                throw new NotFoundExceptions('userId not found')
              }
              
      const { content, postId } = req.body
      const comment = await this.commentRepo.AddComment({
        content,
        postId,
        CreatedBy: new Types.ObjectId(userId),
      })

      return SuccessHandler({
        res,
        msg: 'your comment is added',
        data: { comment },
      })
    } catch (error) {
      next(error)
    }
  }
}
