import express, { NextFunction, type Request, type Response } from 'express'
import router from './modules/Routes'
import { IAppError } from './utils/errors/ErrorTypes'
import { DBconnection } from './DB/config/connectDB'

const app = express()
export const bootstrap = async () => {
  const port = process.env.PORT || 5500
  app.use(express.json())
  app.use('/api/v1', router)
  await DBconnection()
  app.use((err: IAppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      msg: err.message,
      stack: err.stack,
      status: err.statusCode || 500,
    })
  })

  app.listen(port, () => {
    console.log('server is running on',port)
  })
}
