import {Request,Response, NextFunction } from "express";
import { GraphQLError } from "graphql";
import { ZodObject } from "zod";

const validation = (schema: ZodObject) => {
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


export const GraphQlValidation = (schema: ZodObject , args:any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    
    const validationRes = await schema.safeParseAsync(args)
    if (!validationRes.success) {
     throw new GraphQLError('validation error')
    }
  
  }
}
export default validation