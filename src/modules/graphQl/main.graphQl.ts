import {  GraphQLObjectType, GraphQLSchema} from "graphql"
import { UserMutation, UserQuery } from "../UserModule/user.graphql.controller"


  export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'MainQuery',
      fields: {
        ...UserQuery,
       
      },
    }),

    mutation: new GraphQLObjectType({
      name: 'MainMutation',
      fields: {
        ...UserMutation,
      },
    }),
  })