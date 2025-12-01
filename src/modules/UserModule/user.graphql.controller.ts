import { GraphQLString } from 'graphql'
import { hello, me } from './user.graphql.services'
import { QIUser } from './UserTypes'

export const UserQuery = {
  hello: {
    type: GraphQLString,
    args: {
      name: { type: GraphQLString },
    },
    resolve: hello,
  },

  me: {
    type: QIUser, 
    resolve: me,
  },
}

export const UserMutation = {
  hello: {
    type: GraphQLString,
    resolve: () => 'hello',
  },
}
