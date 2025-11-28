import { model, models, Schema } from 'mongoose'
import { IUser } from '../../modules/UserModule/UserTypes'

const userSchema = new Schema<IUser>(
  {
    F_NAME: {
      type: String,
      required: true,
    },
    L_NAME: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
    },
    CoverImages: [String],
    ProfileImage: String,
    FolderID: String,

    VerificationEmailCode: {
      otp: {
        type: String,
      },
      expiredAt: {
        type: Date,
      },
    },

    fieldAttemptsCode: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    CodeBan: {
      type: Date,
      default: null,
    },
    EmailOtp: {
      otp: String,
      expiredAt: Date,
    },
    PasswordOtp: {
      otp: String,
      expiredAt: Date,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const UserModel = models.users || model<IUser>('users', userSchema)
