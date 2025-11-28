import { GraphQLList, GraphQLString } from 'graphql'
import { UserType } from '../../utils/GraphQl/graphqlTypes'
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
    type: new GraphQLList(QIUser),
    resolve: me,
  },
}

export const UserMutation = {
  hello: {
    type: GraphQLString,
    resolve: () => {
      return 'hello'
    },
  },
}
