import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
        }
        const { searchParams } = req.nextUrl;
        const start = searchParams.get("start");
        const end = searchParams.get("end");
        const projectId = searchParams.get("projectId");
        if (!start || !end) {
            return NextResponse.json({ error: "start and end field required!" }, { status: 400 })
        }
        const timeEntries = await prisma.timeEntry.findMany({
            where: {
                userId: session.user?.id,
                startTime: {
                    gte: new Date(start),
                    lte: new Date(end)
                },
                ...(projectId && { projectId })
            },
            include: {
                project: true
            }
        })

        let totalHours = 0;
        const perProject: Record<string, { id: string, name: string, hours: number }> = {};
        const perDay: Record<string, number> = {};

        for (const entry of timeEntries) {
            if (!entry.endTime || !entry.projectId || !entry.project?.name) continue;
            const startTime = new Date(entry.startTime);
            const endTime = new Date(entry.endTime);
            const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
            totalHours += duration;

            const projectKey = entry.projectId;
            if (!perProject[projectKey]) {
                perProject[projectKey] = {
                    id: entry.projectId,
                    name: entry.project?.name,
                    hours: 0
                }
            }
            perProject[projectKey].hours += duration;

            const dateKey = startTime.toISOString().split("T")[0];
            if (!perDay[dateKey]) {
                perDay[dateKey] = 0;
            }
            perDay[dateKey] += duration;
        }

        return NextResponse.json({
            totalHours: parseFloat(totalHours.toFixed(2)),
            perProject: Object.values(perProject).map(p => ({
                ...p,
                hours: parseFloat(p.hours.toFixed(2))
            })),
            perDay: Object.entries(perDay).map(([date, hours]) => ({
                date,
                hours: parseFloat(hours.toFixed(2))
            }))
        }, { status: 200 })

    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: "Server error!" }, { status: 500 })
    }
}