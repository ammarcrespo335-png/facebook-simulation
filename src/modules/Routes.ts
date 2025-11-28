import Router from 'express'
import authRouter from './AuthModule/AuthController'
import chatRouter from './chatModule/ChatController'
const router = Router()

router.use('/auth', authRouter)
router.use('/chat', chatRouter)
export default router
