import { AuthSocketData } from '../gateway/gateway'
import { ChatSocketEvents } from './ChatSocketEvents'

export class ChatGateway {
  private readonly ChatGateway = new ChatSocketEvents()
  register = (socket: AuthSocketData) => {
    this.ChatGateway.SendMessage(socket)
    this.ChatGateway.JoinRoom(socket)
    this.ChatGateway.SendGroupMessage(socket)
  }
}
