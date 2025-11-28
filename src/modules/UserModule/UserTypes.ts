import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'
import { HydratedDocument, Schema, Types } from 'mongoose'

export interface IUser {
  F_NAME: string
  L_NAME: string
  Phone: string
  email: string
  password: string
  Age: number
  _id?: Types.ObjectId
  ProfileImage: string
  CoverImages: string[]
  FolderID: string
  EmailOtp: {
    otp: String
    expiredAt: Date
  }
  PasswordOtp: {
    otp: String
    expiredAt: Date
  }
  VerificationEmailCode: {
    otp: string
    expiredAt: Date
  }

  friends: Types.ObjectId[]

  fieldAttemptsCode: number
  CodeBan: Date | null
  isVerified: boolean
}
export const QIUser = new GraphQLObjectType({
  name: 'User Type',
  fields: {
    _id: { type: GraphQLID },
    F_NAME: { type: GraphQLString },
    L_NAME: { type: GraphQLString },
    email: { type: GraphQLString },
    age:{type:GraphQLInt}
  },
})
export type HUserDocument = HydratedDocument<IUser>
