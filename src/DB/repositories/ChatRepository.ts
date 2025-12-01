import { Model } from 'mongoose'
import { DBRepo } from './DBRepository'

import { ChatModel, IChat } from '../models/ChatModel'

export class ChatRepo extends DBRepo<IChat> {
  constructor(protected override readonly model: Model<IChat> = ChatModel) {
    super(ChatModel)
  }
}
