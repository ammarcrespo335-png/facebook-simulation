import {Request,Response, NextFunction } from "express";
import { GraphQLError } from "graphql";
import { ZodObject } from "zod";

const validation = (schema: ZodObject<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const data = {
            ...req.body,
            ...req.params,
            ...req.query
        }
        const validationRes = await schema.safeParseAsync(data)
        if (!validationRes.success) {
            return res.status(422).json({
                validationError:JSON.parse(validationRes.error as unknown as string)
            })
        }
        next()
    }
}


export const GraphQlValidation = async (schema: ZodObject<any>, args: any) => {
  const validationRes = await schema.safeParseAsync(args)

  if (!validationRes.success) {
    const error = new GraphQLError('validation error')

    ;(error as any).extensions = {
      errors: validationRes.error.format(),
    }

    throw error
  }
}

export default validation