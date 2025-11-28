"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMutation = exports.UserQuery = void 0;
const graphql_1 = require("graphql");
const user_graphql_services_1 = require("./user.graphql.services");
const UserTypes_1 = require("./UserTypes");
exports.UserQuery = {
    hello: {
        type: graphql_1.GraphQLString,
        args: {
            name: { type: graphql_1.GraphQLString },
        },
        resolve: user_graphql_services_1.hello,
    },
    me: {
        type: new graphql_1.GraphQLList(UserTypes_1.QIUser),
        resolve: user_graphql_services_1.me,
    },
};
exports.UserMutation = {
    hello: {
        type: graphql_1.GraphQLString,
        resolve: () => {
            return 'hello';
        },
    },
};
