import express, { NextFunction, type Request, type Response } from 'express'
import router from './modules/Routes'
import { IAppError } from './utils/errors/ErrorTypes'
import { DBconnection } from './DB/config/connectDB'
import morgan from 'morgan'
import cors from 'cors'
import { initialize } from './modules/gateway/gateway'
import authRouter from './modules/AuthModule/AuthController'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { schema } from './modules/graphQl/main.graphQl'

import { graphqlHTTP } from 'express-graphql'
import { PostRouter } from './modules/PostModule/PostController'
import { CommentRouter } from './modules/Comment Module/CommentController'
const app = express()
export const bootstrap = async () => {
  const port = process.env.PORT || 5500
  app.use(express.json())
  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))

  const createRateLimiter = (maxRequests: number) =>
    rateLimit({
      windowMs: 60 * 1000,
      max: maxRequests,
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many requests, please try again later.',
    })

  app.use('/api/v1/auth', createRateLimiter(5), authRouter)
  app.use('/api/v1/post', createRateLimiter(5), PostRouter)
  app.use('/api/v1/comment', createRateLimiter(5), CommentRouter)
  app.use('/api/v1/chat', createRateLimiter(20))
  app.use('/api/v1', router)
  app.use(
    '/api/v1/graphql',
    createRateLimiter(5),
    graphqlHTTP(req => ({
      schema,
      graphiql: true,
      context: { authorization: req.headers.authorization || null },
    }))
  )

  await DBconnection()

  app.use((req, res, next) => {
    next({ statusCode: 404, message: 'Route Not Found' })
  })

  app.use((err: IAppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      msg: err.message,
      status: err.statusCode || 500,
    })
  })

  const Server = app.listen(port, () => {
    console.log('server is running on', port)
  })
  initialize(Server)
}
