import { Router } from 'express'
import { CreateComment } from './CommentService/CreateComment'
import { auth } from '../../middleware/authMiddleware'
import validation from '../../middleware/ValidationMiddleware'
import { CreateCommentSchema } from './CommentSchema'

import { DeleteComment } from './CommentService/DeleteComment'
import { UpdateComment } from './CommentService/UpdateComment'

import { ReactToComment } from './CommentService/ReactToComment'
import { GetAllComments } from './CommentService/GetAllComments'

export const CommentRouter = Router()

//create-comment
const createCommentService = new CreateComment()
CommentRouter.post(
  '/create-comment',
  auth,
  validation(CreateCommentSchema),
  createCommentService.CreateComment.bind(createCommentService)
)

//get-all-comments
const getAllComments = new GetAllComments()
CommentRouter.get(
  '/Get-Comments/:postId',
  auth,
  getAllComments.getAllComments.bind(getAllComments)
)

//Delete-comment
const deleteComment = new DeleteComment()
CommentRouter.delete(
  '/delete-comment/:commentId',
  auth,
  deleteComment.deleteComment.bind(deleteComment)
)
//update-Comments
const updateComment = new UpdateComment()
CommentRouter.patch(
  '/update-comment/:commentId',
  auth,
  updateComment.updateComment.bind(updateComment)
)

//React-to-comments
const reactToComments = new ReactToComment()
CommentRouter.post(
  '/react-to-comment/:commentId',
  auth,
  reactToComments.reactToComment.bind(reactToComments)
)
