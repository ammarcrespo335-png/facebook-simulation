import { z } from 'zod'

export const SignUpSchema = z
  .object({
    name: z.string().trim(),
    email: z
      .string()
      .email('Invalid email format')
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid domain').trim(),
    password: z.string().min(6, 'Password must be at least 6 characters').trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((args, ctx) => {
    if (args.confirmPassword != args.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['password', 'confirmPassword'],
        message: 'confirmPassword must be equal password ',
      })
    }
  })
