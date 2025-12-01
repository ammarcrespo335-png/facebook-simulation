import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
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
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    F_NAME: { type: GraphQLString },
    L_NAME: { type: GraphQLString },
    Phone: { type: GraphQLString },
    email: { type: GraphQLString },

    Age: { type: GraphQLInt },
    ProfileImage: { type: GraphQLString },
    CoverImages: { type: new GraphQLList(GraphQLString) },
    FolderID: { type: GraphQLString },
    isVerified: { type: GraphQLString },
  }),
})
export type HUserDocument = HydratedDocument<IUser>
