
import {z} from "zod";

export const taskSchema =   z.object({
    title: z.string().min(3).max(50),
    description: z.string().optional(),
    status:z.enum(["pending","inprogress","completed"]),
    priority: z.enum(["low","mid","high"]),
    projectId: z.string().optional()
})

export type TaskInputEntry = z.infer<typeof taskSchema>