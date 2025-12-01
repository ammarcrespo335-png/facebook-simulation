"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQlValidation = void 0;
const graphql_1 = require("graphql");
const validation = (schema) => {
    return async (req, res, next) => {
        const data = {
            ...req.body,
            ...req.params,
            ...req.query
        };
        const validationRes = await schema.safeParseAsync(data);
        if (!validationRes.success) {
            return res.status(422).json({
                validationError: JSON.parse(validationRes.error)
            });
        }
        next();
    };
};
const GraphQlValidation = async (schema, args) => {
    const validationRes = await schema.safeParseAsync(args);
    if (!validationRes.success) {
        const error = new graphql_1.GraphQLError('validation error');
        error.extensions = {
            errors: validationRes.error.format(),
        };
        throw error;
    }
};
exports.GraphQlValidation = GraphQlValidation;
exports.default = validation;
