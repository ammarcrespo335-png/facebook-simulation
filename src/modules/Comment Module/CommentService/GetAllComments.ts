import { Request, Response, NextFunction } from 'express'
import { CommentRepo } from '../../../DB/repositories/Comment Repository'
import { SuccessHandler } from '../../../utils/SuccessHandler'

import { NotFoundExceptions } from '../../../utils/errors/ErrorTypes'
import { AuthRequest } from '../../../middleware/authMiddleware'
export class GetAllComments {
  private readonly commentRepo = new CommentRepo()
  async getAllComments(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params
      if (!postId) {
        return res.status(400).json({ msg: 'postId is required' })
      }
      const page = Math.max(1, parseInt(req.query.page as string) || 1)
      const limit = 10
      const comments = await this.commentRepo.GetAllComments(
        postId,
        page,
        limit
      )
      if (!comments || comments.length === 0) {
        throw new NotFoundExceptions('No comments yet')
      }
      return SuccessHandler({ res, data: { comments } })
    } catch (error) {
      next(error)
    }
  }
}
