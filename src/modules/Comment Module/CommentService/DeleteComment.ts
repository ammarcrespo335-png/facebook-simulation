import { Request, Response, NextFunction } from 'express'
import { CommentRepo } from '../../../DB/repositories/Comment Repository'
import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { AuthRequest } from '../../../middleware/authMiddleware'

export class DeleteComment {
  private readonly commentRepo = new CommentRepo()
  async deleteComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params
      const userId = req .user?._id.toString()

      const deleted = await this.commentRepo.DeleteComment(
        commentId as string,
        userId as string
      )
      if (!deleted) {
        throw new NotFoundExceptions('No comment yet')
      }
      return SuccessHandler({
        res,
        msg: 'comment is deleted',
        data: { deleted },
      })
    } catch (error) {
      next(error)
    }
  }
}
