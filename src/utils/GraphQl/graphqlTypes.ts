import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'UserData',
    fields: {
        name: {
            type:GraphQLString
        },
        age: {
            type:GraphQLInt
        }
    }
})