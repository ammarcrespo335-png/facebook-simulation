"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'UserData',
    fields: {
        name: {
            type: graphql_1.GraphQLString
        },
        age: {
            type: graphql_1.GraphQLInt
        }
    }
});
