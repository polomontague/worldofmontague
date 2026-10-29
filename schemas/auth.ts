import z from "zod"
import { Validation } from "@/lib/Validation"

export const registerBodySchema = z.object({
    name: z.object({
        first: z.string().min(1),
        last: z.string().min(1)
    }),
    email: z.string().refine(value => Validation.email(value)),
    password: z.string().refine(value => Validation.password(value))
})

export const loginBodySchema = z.object({
    email: z.string().refine(value => Validation.email(value)),
    password: z.string().refine(value => Validation.password(value))
})