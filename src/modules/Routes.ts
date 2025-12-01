
import Router from 'express'

import authRouter from './AuthModule/AuthController'
import chatRouter from './chatModule/ChatController'
import { PostRouter } from './PostModule/PostController'
import { CommentRouter } from './Comment Module/CommentController'

const router = Router()

router.use('/auth', authRouter)
router.use('/chat', chatRouter)
router.use('/post', PostRouter)

router.use('/post', CommentRouter)
export default router
