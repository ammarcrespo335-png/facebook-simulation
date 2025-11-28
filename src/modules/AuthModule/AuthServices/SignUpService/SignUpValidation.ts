import { z } from 'zod'

export const SignUpSchema = z
  .object({
    F_NAME: z.string().trim().min(1, 'First name is required'),
    L_NAME: z.string().trim().min(1, 'Last name is required'),
    Age: z.number().optional(),
    Phone: z
      .string()
      .regex(/^\d{11}$/, 'Phone number must be exactly 11 digits')
      .trim(),
    email: z
      .string()
      .email('Invalid email format')

      .trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((args, ctx) => {
    if (args.confirmPassword != args.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'confirmPassword must be equal password ',
      })
    }
    const blacklistedDomains = [
      'tempmail.com',
      'mailinator.com',
      '10minutemail.com',
    ]

    if (args.email) {
      const domain = args.email.split('@')[1]?.toLowerCase()
      if (domain && blacklistedDomains.includes(domain)) {
        ctx.addIssue({
          code: 'custom',
          path: ['email'],
          message: 'This email domain is not allowed',
        })
      }
    }
  })
