import { GraphQlAuth } from '../../middleware/authMiddleware'
import { GraphQlValidation } from '../../middleware/ValidationMiddleware'
import { GraphQLSchema } from './user.graphQl.validation'

const Users = [
  {
    name: 'ammar',
    age: 21,
  },
  {
    name: 'ahmed',
    age: 20,
  },
  { name: 'aly', age: 19 },
]

export const hello = async (_: any, args: any, ctx: any) => {
  await GraphQlValidation(GraphQLSchema, args)

  return ' hello' + args.name
}
export const me = async (_: any, args: any, ctx: any) => {
  const user = await GraphQlAuth(ctx.authorization)
    if (!user) {
      throw new Error('Authentication failed')
    }
  console.log({ user })

  return user
}
