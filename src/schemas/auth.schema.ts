import { z } from "zod"

const emailSchema = z.email("Enter a valid email address.").trim().toLowerCase().max(254)
export const passwordSchema = z
    .string()
    .trim()
    .min(12, 'Password must be a minimum of 12 characters!')
    .max(128, 'Password must be a maximum of 128 characters!')

export const registerSchema = z.object({
    body: z.object({
        name: z.string().trim().min(1),
        email: emailSchema,
        password: passwordSchema
    })
})

const loginSchema = z.object({
    body: z.object({
        email: emailSchema,
        password: z.string().min(12).max(128)
    })
})

export type RegisterBody = z.infer<typeof registerSchema>["body"]
export type LoginBody = z.infer<typeof loginSchema>["body"]