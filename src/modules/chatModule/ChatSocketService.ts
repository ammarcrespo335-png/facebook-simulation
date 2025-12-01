import { HChatDocument } from './../../DB/models/ChatModel'
import { UserRepo } from '../../DB/repositories/UserRepository'
import { AuthSocketData, ConnectedSockets } from '../gateway/gateway'
import { ChatRepo } from '../../DB/repositories/ChatRepository'
import { NotFoundExceptions } from '../../utils/errors/ErrorTypes'
import { Types } from 'mongoose'

export class ChatSocketService {
  private readonly UserModel = new UserRepo()
  private readonly ChatModel = new ChatRepo()

  SendMessage = async (
    socket: AuthSocketData,
    data: {
      content: string
      SendTo: string
    }
  ) => {
    const createdBy = socket.user!._id
    const { content, SendTo } = data

    const receiver = await this.UserModel.findById({ id: SendTo })
    if (!receiver) throw new Error('user not found')

    let chat: HChatDocument | null = await this.ChatModel.findOne({
      filter: {
        group: { $exists: false },
        participants: { $all: [createdBy, receiver._id] },
      },
    })

    if (!chat) {
      chat = (await this.ChatModel.create({
        data: {
          participants: [createdBy, receiver._id],
          createdBy,
          messages: [],
        },
      })) as HChatDocument
    }

    const message = {
      content,
      createdBy,
      createdAt: new Date(),
    }

    chat.messages.push(message as any)
    await chat.save()

    socket.emit('message:sent', {
      chatId: chat._id,
      message,
    })

    const receiverSockets = ConnectedSockets.get(receiver._id.toString()) || []

    receiverSockets.forEach(sid => {
      socket.to(sid).emit('message:receive', {
        chatId: chat._id,
        message,
      })
    })
  }
  joinRoom = async (socket: AuthSocketData, roomId: string) => {
    try {
      const group = await this.ChatModel.findOne({
        filter: {
          roomId,
          participants: { $in: [socket.user?._id] },
          group: { $exists: true },
        },
      })
      if (!group) {
        throw new NotFoundExceptions('group  not found')
      }
      socket.join(roomId as string)
      console.log('user joined successfully')
    } catch (error) {
      socket.emit('error', {
        type: 'joinRoom',
        message: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
  SendGroupMessage = async (
    socket: AuthSocketData,
    {
      content,
      groupId,
    }: {
      content: string
      groupId: Types.ObjectId
    }
  ) => {
    try {
      const user = socket.user
      const group = await this.ChatModel.findOne({
        filter: {
          _id: groupId,
          participants: { $in: [socket.user?._id] },
          group: { $exists: true },
        },
      })
      if (!group) {
        throw new NotFoundExceptions('group  not found')
      }
      await group.updateOne({
        $push: {
          messages: {
            content,
            createdBy: user?._id as Types.ObjectId,
          },
        },
      })
      socket.emit('success message', content)
      socket.to(group.roomId).emit('new group message', {
        content,
        from: user?._id,
        groupId,
      })
    } catch (error) {
      socket.emit('error', {
        type: 'joinRoom',
        message: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}
