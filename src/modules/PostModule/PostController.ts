import { GetAllPosts } from './PostServices/GetAllPosts'
import { Router } from 'express'

import { auth } from '../../middleware/authMiddleware'
import validation from '../../middleware/ValidationMiddleware'
import { CreatePostSchema } from './PostSchema'

import { ReactToPost } from './PostServices/ReactToPost'
import { GetSinglePost } from './PostServices/GetSinglePost'
import { UpdatePost } from './PostServices/UpdatePost'
import { DeletePost } from './PostServices/DeletePost'
import { getMyPosts } from './PostServices/GetMyPosts'
import { CreatePost } from './PostServices/CreatePost'

export const PostRouter = Router()

// Create Post
const createPostService = new CreatePost()
PostRouter.post(
  '/Create-Post',
  auth,
  validation(CreatePostSchema),
  createPostService.CreatePost.bind(createPostService)
)

// Get All Posts
const getAllPostsService = new GetAllPosts()
PostRouter.get(
  '/Get-All-Posts',
  auth,
  getAllPostsService.GetAllPosts.bind(getAllPostsService)
)

// Get Single Post
const getSinglePostService = new GetSinglePost()
PostRouter.get(
  '/get-single-post/:postId',
  auth,
  getSinglePostService.getSinglePost.bind(getSinglePostService)
)

// Update Post
const updatePostService = new UpdatePost()
PostRouter.patch(
  '/update-post/:postId',
  auth,
  updatePostService.UpdatePost.bind(updatePostService)
)
// delete Post
const deletePostService = new DeletePost()
PostRouter.delete(
  '/delete-post/:postId',
  auth,
  deletePostService.DeletePost.bind(deletePostService)
)

// React to Post
const reactToPostService = new ReactToPost()
PostRouter.patch(
  '/react-post/:postId',
  auth,
  reactToPostService.reactToPost.bind(reactToPostService)
)

// get all my Posts
const getMyPostsService = new getMyPosts()
PostRouter.get(
  '/get-my-posts',
  auth,
  getMyPostsService.getMyPosts.bind(getMyPostsService)
)
