"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QIUser = void 0;
const graphql_1 = require("graphql");
exports.QIUser = new graphql_1.GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        F_NAME: { type: graphql_1.GraphQLString },
        L_NAME: { type: graphql_1.GraphQLString },
        Phone: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        Age: { type: graphql_1.GraphQLInt },
        ProfileImage: { type: graphql_1.GraphQLString },
        CoverImages: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        FolderID: { type: graphql_1.GraphQLString },
        isVerified: { type: graphql_1.GraphQLString },
    }),
});
