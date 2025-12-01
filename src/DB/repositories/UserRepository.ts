import { ProjectionType, QueryOptions } from 'mongoose'
import { DBRepo } from './DBRepository'
import { IUser } from '../../modules/UserModule/UserTypes'
import { UserModel } from '../models/UserModel'

export class UserRepo extends DBRepo<IUser> {
  constructor() {
    super(UserModel)
  }

  findByEmail = async ({
    email,
    Projection = {},
    options = {},
  }: {
    email: string
    Projection?: ProjectionType<IUser>
    options?: QueryOptions
  }) => {
    const doc = await this.model.findOne({ email }, Projection, options)
    return doc
  }
}
