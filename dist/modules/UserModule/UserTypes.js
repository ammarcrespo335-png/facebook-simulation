"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QIUser = void 0;
const graphql_1 = require("graphql");
exports.QIUser = new graphql_1.GraphQLObjectType({
    name: 'User Type',
    fields: {
        _id: { type: graphql_1.GraphQLID },
        F_NAME: { type: graphql_1.GraphQLString },
        L_NAME: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt }
    },
});
