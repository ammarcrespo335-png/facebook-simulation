import { HUserDocument } from './../../UserModule/UserTypes';
import { Types } from 'mongoose'
import { PostRepo } from '../../../DB/repositories/PostRepository'
import {
  ForbiddenException,
  NotFoundExceptions,
} from '../../../utils/errors/ErrorTypes'
import { Response, NextFunction } from 'express'
import { SuccessHandler } from '../../../utils/SuccessHandler'
import { AuthRequest } from '../../../middleware/authMiddleware';

export class ReactToPost {
  private readonly postRepo = new PostRepo()

  async reactToPost(req: AuthRequest, res: Response, next: NextFunction) {
    const postId = req.params.postId as string
    const userId = req.user?._id.toString() 
       if (!userId) {
         throw new NotFoundExceptions('userId not found')
       }
      
    const post = await this.postRepo.findById({ id: postId })
    if (!post) {
      throw new NotFoundExceptions('No post yet')
    }
    if (post.isFrozen) {
      throw new ForbiddenException('post is frozen and can`t be liked')
    }
    const userPostId = new Types.ObjectId(userId)
    const alreadyLiked = post.likes.some(id => id.equals(userPostId))
    if (alreadyLiked) {
      post.likes = post.likes.filter(id => !id.equals(userPostId))
    } else {
      post.likes.push(userPostId)
    }
    await post.save()
    return SuccessHandler({ res, msg: 'Post reaction updated' , data:{post}})
  }
}
