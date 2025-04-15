
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { timeEntrySchema } from "@/lib/zod/timeEntry.schema";


export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "aunthorized" }, { status: 401 })
        const entries = await prisma.timeEntry.findMany({
            where: { userId: session.user?.id },
            orderBy: { startTime: "desc" }

        });
        if (entries.length === 0) {
            return NextResponse.json({ error: "No Entries found!" }, { status: 400 })
        }
        return NextResponse.json({ entries }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Error while fetching Entries!" }, { status: 400 })
    }

}
export async function POST(req: NextRequest) {


    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        const userId = session?.user?.id;

        const body = await req.json();
        const parsed = timeEntrySchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.errors }, { status: 400 })
        }
        const { startTime, endTime, description, duration, projectId, taskId } = parsed.data;


        let finalProjectId: string | null = null;
        if (projectId) {
            const project = await prisma.project.findUnique({ where: { id: projectId } });
            if (!project) {
                return NextResponse.json({ error: "Invalid project Id" }, { status: 400 })
            }
            finalProjectId = projectId;
        }
        let finalTaskId: string | null = null;
        if (taskId) {
            const task = await prisma.task.findUnique({ where: { id: taskId } });
            if (!task) {
                return NextResponse.json({ error: "Invalid Task id!" }, { status: 400 })
            }
            finalTaskId = taskId;
        }
        const timeEntries = await prisma.timeEntry.create({
            data: {
                startTime: new Date(startTime),
                endTime: endTime ? new Date(endTime) : undefined,
                duration: duration ?? undefined,
                description,
                userId,
                projectId: finalProjectId,
                taskId: finalTaskId
            }
        })
        if (!timeEntries) {
            return NextResponse.json({ error: "Entry not created!" }, { status: 400 })
        }
        return NextResponse.json({ timeEntries }, { status: 201 })
    } catch (error) {
        console.error("TimeEntries post Error:", error)
        return NextResponse.json({ error: "server error while creating entries!" }, { status: 400 })
    }

}
export async function PUT(req: NextRequest) {

}
export async function DELETE(req: NextRequest) {

}