import {z} from "zod";

export const timeEntrySchema = z.object({
    startTime:z.string().datetime({message:"Inavlid Start Time!"}),
    endTime: z.string().datetime({message:"Inavlid End Time!"}).optional(),
    duration: z.number().int().optional(),
    description:z.string().trim().optional(),
    projectId: z.string().optional(),
    taskId: z.string().optional()
})

export type TimeEntryInput = z.infer<typeof timeEntrySchema>