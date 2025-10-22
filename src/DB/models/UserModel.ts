import { model, Schema } from 'mongoose'
import { IUser } from '../../modules/UserModule/UserTypes'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
export const UserModel = model<IUser>('users', userSchema)
