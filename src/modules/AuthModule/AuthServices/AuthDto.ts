import z from "zod";
import { SignUpSchema } from "../AuthValidation";

export type SignUpDto = z.Infer<typeof SignUpSchema>