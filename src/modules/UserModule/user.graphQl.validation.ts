import z from "zod";

export const GraphQLSchema = z.object({
    name: z.string().min(5)
    
})