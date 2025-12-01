import { Request, Response, NextFunction } from 'express'
import { CommentRepo } from '../../../DB/repositories/Comment Repository'
import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { AuthRequest } from '../../../middleware/authMiddleware'

export class UpdateComment {
  private readonly commentRepo = new CommentRepo()
  async updateComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params
      const userId = req.user?._id.toString()
      const { content } = req.body
      const updated = await this.commentRepo.UpdateComment(
        commentId as string,
        userId as string,
       { content}
      )
      if (!updated) {
        throw new NotFoundExceptions('No comment yet')
      }
      return SuccessHandler({ res, msg: 'comment is updated', data: { updated } })
    } catch (error) {
      next(error)
    }
  }
}
