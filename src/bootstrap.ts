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

import { createHandler } from 'graphql-http'
import { AuthRequest, GraphQlAuth } from './middleware/authMiddleware'
const app = express()
export const bootstrap = async () => {
  const port = process.env.PORT || 5500
  app.use(express.json())
  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(
    '/api/v1/auth',
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 5,
      message: 'Too many login attempts, please try again later.',
    }),
    authRouter
  )
  app.use(
    '/api/v1/chat',
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 20,
      message: 'Too many requests from this IP, try again later',
    })
  )

  app.use('/api/v1', router)
  app.all(
    '/GraphQl',
    GraphQlAuth,
    createHandler({
      schema,
      context: req => ({
        authorization: (req.raw as AuthRequest).user,
      }),
    })
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
