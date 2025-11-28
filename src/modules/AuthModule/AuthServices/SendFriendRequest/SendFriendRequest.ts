import { Request, Response, NextFunction } from 'express'
import { SuccessHandler } from '../../../../utils/SuccessHandler'
import { HUserDocument } from '../../../UserModule/UserTypes'
import {
  CAppError,
  NotFoundExceptions,
} from '../../../../utils/errors/ErrorTypes'
import { FriendRequestModel } from '../../../../DB/models/FriendRequestModel'
import { UserRepo } from '../../../../DB/repositories/DBRepository'

export class SendFriendRequest {
  private FriendModel = FriendRequestModel
  private UserModel = new UserRepo()

  FriendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const authUser: HUserDocument = res.locals.user
    const from = authUser._id
    const { to } = req.body

    if (to.toString() === from.toString()) {
      throw new CAppError('you can`t send friend request to yourself', 400)
    }

    if (!(await this.UserModel.findById({ id: to }))) {
      throw new NotFoundExceptions('id not found')
    }

    const IsFriends = await this.FriendModel.findOne({
      $or: [
        { from: from, to: to },
        { from: to, to: from },
      ],
    })

    if (IsFriends) {
      throw new CAppError('friend request already sent or you are friends', 409)
    }

    const friendRequest = await this.FriendModel.create({
      from,
      to,
    })

    return SuccessHandler({ res, data: friendRequest })
  }

  AcceptFriendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const authUser: HUserDocument = res.locals.user
    const { id } = req.params as { id: string }
    const friendRequest = await this.FriendModel.findOne({
      _id: id,
      to: authUser._id,
      acceptedAt: { $exists: false },
    })

    if (!friendRequest) {
      throw new NotFoundExceptions('friend request not found')
    }

    await friendRequest.updateOne({
      $set: {
        acceptedAt: new Date(),
      },
    })
    await this.UserModel.findOneAndUpdate({
      filter: {
        _id: friendRequest.to,
      },
      update: {
        $addToSet: {
          friends: friendRequest.from,
        },
      },
    })
    await this.UserModel.findOneAndUpdate({
      filter: {
        _id: friendRequest.from,
      },
      update: {
        $addToSet: {
          friends: authUser._id,
        },
      },
    })
    return SuccessHandler({ res, data: friendRequest })
  }
}
