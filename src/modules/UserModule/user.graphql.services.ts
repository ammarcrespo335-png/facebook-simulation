import { GraphQlAuth } from '../../middleware/authMiddleware'
import { GraphQlValidation } from '../../middleware/ValidationMiddleware'
import { GraphQLSchema } from './user.graphQl.validation'
import { GraphQLError } from 'graphql'

export const hello = async (_: any, args: any, ctx: any) => {
  await GraphQlValidation(GraphQLSchema, args)
  return 'hello ' + args.name
}

export const me = async (_: any, args: any, ctx: any) => {
  const user = await GraphQlAuth(ctx.authorization)

  if (!user) {
    throw new GraphQLError('Authentication failed', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    })
  }

  return user 
}
