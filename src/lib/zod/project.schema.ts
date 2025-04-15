
import {z} from "zod";

export const projectSchema = z.object({
    name:z.string()
})
export type ProjectInput = z.infer<typeof projectSchema>