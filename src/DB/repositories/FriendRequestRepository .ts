import { Model, ProjectionType, QueryOptions } from 'mongoose'
import { DBRepo } from './DBRepository'

import {
  FriendRequestModel,
  IFriendRequest,
} from '../models/FriendRequestModel'

export class FriendRequestRepo extends DBRepo<IFriendRequest> {
  constructor(
    protected override readonly model: Model<IFriendRequest> = FriendRequestModel
  ) {
    super(FriendRequestModel)
  }
}
