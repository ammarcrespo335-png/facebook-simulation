import { Request, Response, NextFunction } from 'express'
import { ChatRepo } from '../../DB/repositories/ChatRepository'
import { SuccessHandler } from '../../utils/SuccessHandler'
import { HUserDocument } from '../UserModule/UserTypes'
import { UserRepo } from '../../DB/repositories/UserRepository'
import { NotFoundExceptions } from '../../utils/errors/ErrorTypes'
import { HChatDocument } from '../../DB/models/ChatModel'
import { Types } from 'mongoose'
import { nanoid } from 'nanoid'

export class ChatService {
  private readonly ChatModel = new ChatRepo()
  private readonly UserModel = new UserRepo()

  getChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const authUser: HUserDocument | undefined = res.locals.user
      if (!authUser) throw new Error('Authenticated user missing')

      const { id } = req.params as { id: string }
      const friend = await this.UserModel.findById({ id })
      if (!friend) throw new NotFoundExceptions('user not found')

      let chat: HChatDocument | null = await this.ChatModel.findOne({
        filter: {
          group: { $exists: false },
          participants: { $all: [authUser._id, friend._id] },
        },
        options: {
          populate: [
            { path: 'participants', select: 'F_NAME L_NAME profileImage' },
          ],
        },
      })

      if (!chat) {
        chat = (await this.ChatModel.create({
          data: {
            participants: [authUser._id, friend._id],
            createdBy: authUser._id,
            messages: [],
          },
        })) as HChatDocument

        chat = (await chat?.populate('participants')) as HChatDocument
      }

      return SuccessHandler({ res, data: chat })
    } catch (err) {
      next(err)
    }
  }

  CreateGroupChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        group,
        participants,
      }: {
        group: string
        participants: Types.ObjectId[]
      } = req.body
      const user = res.locals.user as HUserDocument
      const DbParticipants = await this.UserModel.find({
        filter: {
          _id: {
            $in: participants,
          },
        },
      })
      if (participants.length !== DbParticipants.length) {
        throw new NotFoundExceptions('some Participants not found')
      }
      const roomId = nanoid(15)
      const NewGroupChat = (await this.ChatModel.create({
        data: {
          participants: [...participants, user._id],
          group,
          createdBy: user._id,
          roomId,
        },
      })) as HChatDocument
      await NewGroupChat.populate('participants', 'F_NAME L_NAME profileImage')

      return SuccessHandler({ res, data: { group: NewGroupChat } })
    } catch (err) {
      next(err)
    }
  }
  getGroupChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { groupId } = req.params as { groupId: string }
      const user = res.locals.user as HUserDocument
      const groupChat = await this.ChatModel.findOne({
        filter: {
          group: { $exists: true },
          _id: groupId,
          participants: { $in: user._id },
        },
        options: {
          populate: [
            { path: 'participants', select: 'F_NAME L_NAME profileImage' },
            {
              path: 'messages.createdBy',
              select: 'F_NAME L_NAME profileImage',
            },
          ],
        },
      })
      return SuccessHandler({ res, data: { groupChat } })
    } catch (err) {
      next(err)
    }
  }
}
