import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'
import { IUser } from '../UserModule/UserTypes'
import { HydratedDocument } from 'mongoose'
import { decodeToken } from '../../middleware/authMiddleware'
import { ChatGateway } from '../chatModule/ChatGateway'

export interface AuthSocketData extends Socket {
  user?: HydratedDocument<IUser>
}
export const ConnectedSockets = new Map<String, string[]>()
export const initialize = (HttpServer: HttpServer) => {
  const ChatGatewayData = new ChatGateway()
  const io = new Server(HttpServer, {
    cors: {
      origin: '*',
    },
  })
  io.use(async (socket: AuthSocketData, next: any) => {
    try {
      const token = socket.handshake.auth.authorization as string
      const user = await decodeToken({ authorization: token })

      socket.user = user as HydratedDocument<IUser>
      next()
    } catch (error) {
      next(new Error('Authentication error'))
    }
  })
  const connect = (socket: AuthSocketData) => {
    const CurrentSockets =
      ConnectedSockets.get(socket.user?._id.toString() as string) || []
    CurrentSockets.push(socket.id)
    ConnectedSockets.set(socket.user?._id.toString() as string, CurrentSockets)
    console.log({ ConnectedSockets })
  }

  const disconnect = (socket: AuthSocketData) => {
    socket.on('disconnect', () => {
      let CurrentSockets = ConnectedSockets.get(
        socket.user?._id.toString() as string
      )
      CurrentSockets = CurrentSockets?.filter(id => {
        return id !== socket.id
      })
      ConnectedSockets.set(
        socket.user?._id.toString() as string,
        CurrentSockets || []
      )
      console.log({ ConnectedSockets })
    })
  }

  io.on('connection', (socket: AuthSocketData) => {
    ChatGatewayData.register(socket)
    connect(socket)
    disconnect(socket)
  })
}
