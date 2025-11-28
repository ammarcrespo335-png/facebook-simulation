import { bootstrap } from './bootstrap'
import authRouter from './modules/AuthModule/AuthController'
import router from './modules/Routes'
router.use('/api/v1/auth', authRouter)
bootstrap()
