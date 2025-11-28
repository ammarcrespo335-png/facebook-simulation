import { email, z } from 'zod'
import { createOtp } from '../../../../utils/Email/CreateOtp'
export const ConfirmEmailSchema = z.object({
    email: z.email(),
   otp:z.string().length(6)
})
