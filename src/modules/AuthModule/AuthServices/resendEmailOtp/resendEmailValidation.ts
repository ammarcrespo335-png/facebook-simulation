import z from "zod";

export const resendEmailOtpSchema= z.object({
    email: z.email()
})