import { Request, Response, NextFunction } from 'express'
import { SuccessHandler } from '../../../../utils/SuccessHandler'
import { HUserDocument } from '../../../UserModule/UserTypes'

import { ChatRepo } from '../../../../DB/repositories/ChatRepository'

export class GetUserService {
  private readonly ChatModel = new ChatRepo()
  getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    let user: HUserDocument = res.locals.user

    user = await user.populate([
      {
        path: 'friends',
        select: 'F_NAME L_NAME profileImage',
      },
    ])
    const GROUPS = await this.ChatModel.find({
      filter: {
        participants: {
          $in: [user._id],
        },
        group: { $exists: true },
      },
    })
    return SuccessHandler({
      res,
      msg: 'User profile fetched successfully',
      data: { user, GROUPS },
    })
  }
}
