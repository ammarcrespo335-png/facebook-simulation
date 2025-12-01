import { z } from 'zod'

export const CreateCommentSchema = z.object({
  content: z.string().min(1),
  postId: z
    .string()
    .min(1)
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid postId format'), 
})
