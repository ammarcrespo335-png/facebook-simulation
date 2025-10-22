import Router from "express";
 import authRouter from './AuthModule/AuthController'
const router = Router()

router.use('/auth',authRouter)
export default router