import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
    }),
});

export type RegisterInput = z.TypeOf<typeof registerSchema>;
export type LoginInput = z.TypeOf<typeof loginSchema>;