import { Types } from 'mongoose'
import { PostRepo } from '../../../DB/repositories/PostRepository'
import {
  ForbiddenException,
  NotFoundExceptions,
} from '../../../utils/errors/ErrorTypes'
import { Request, Response, NextFunction } from 'express'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { CommentRepo } from '../../../DB/repositories/Comment Repository'
import { AuthRequest } from '../../../middleware/authMiddleware'

export class ReactToComment {
  private readonly commentRepo = new CommentRepo()

  async reactToComment(req: AuthRequest, res: Response, next: NextFunction) {
    const commentId = req.params.commentId as string
    const userId = req.user?._id.toString()
    const comment = await this.commentRepo.findById({ id: commentId })
    if (!comment) {
      throw new NotFoundExceptions('No comment yet')
    }
    if (comment.isFrozen) {
      throw new ForbiddenException('post is frozen and can`t be liked')
    }
    const userCommentId = new Types.ObjectId(userId)
    const alreadyLiked = comment.likes.some(
      id => id.toString() === userCommentId.toString()
    )
    if (alreadyLiked) {
      comment.likes = comment.likes.filter(
        id => id.toString() !== userCommentId.toString()
      )
    } else {
      comment.likes.push(userCommentId)
    }
    await comment.save()
    return SuccessHandler({
      res,
      msg: 'comment reaction updated',
      data: { comment },
    })
  }
}
