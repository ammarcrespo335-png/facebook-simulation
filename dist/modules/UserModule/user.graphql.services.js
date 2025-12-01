"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.hello = void 0;
const authMiddleware_1 = require("../../middleware/authMiddleware");
const ValidationMiddleware_1 = require("../../middleware/ValidationMiddleware");
const user_graphQl_validation_1 = require("./user.graphQl.validation");
const graphql_1 = require("graphql");
const hello = async (_, args, ctx) => {
    await (0, ValidationMiddleware_1.GraphQlValidation)(user_graphQl_validation_1.GraphQLSchema, args);
    return 'hello ' + args.name;
};
exports.hello = hello;
const me = async (_, args, ctx) => {
    const user = await (0, authMiddleware_1.GraphQlAuth)(ctx.authorization);
    if (!user) {
        throw new graphql_1.GraphQLError('Authentication failed', {
            extensions: {
                code: 'UNAUTHORIZED',
            },
        });
    }
    return user;
};
exports.me = me;
