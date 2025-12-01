import { z } from 'zod'

export const PostSchema = z.object({
  postId: z
    .string()
    .min(1)
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid postId format'),
})



export const CreatePostSchema = z.object({
  content: z.string().min(1, "content is required"),
  images: z.array(z.string()).optional(),
});
