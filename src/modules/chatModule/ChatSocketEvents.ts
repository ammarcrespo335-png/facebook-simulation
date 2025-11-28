import { AuthSocketData } from '../gateway/gateway'
import { ChatSocketService } from './ChatSocketService'

export class ChatSocketEvents {
  private readonly ChatSocketServices = new ChatSocketService()
  SendMessage = async (socket: AuthSocketData) => {
    socket.on('Send Message', data => {
      this.ChatSocketServices.SendMessage(socket, data)
    })
  }
  JoinRoom = async (socket: AuthSocketData) => {
    socket.on('join group', ({ roomId }) => {
      this.ChatSocketServices.joinRoom(socket, roomId)
    })
  }
  SendGroupMessage = async (socket: AuthSocketData) => { 
    socket.on('send group message', (data) => {
      this.ChatSocketServices.SendGroupMessage(socket, data)
    })
  }
}
