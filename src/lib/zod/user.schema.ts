
import {z} from "zod";

export const userSchema = z.object({
    name: z.string().min(4).max(70).optional(),
    email:z.string().email().max(70),
    password: z.string().min(8).max(45),

})

export type UserInput = z.infer<typeof userSchema>