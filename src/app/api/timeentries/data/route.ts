import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }
        const { searchParams } = req.nextUrl;
        const day = searchParams.get("day");
        if (!day) {
            return NextResponse.json({ error: "Day field is required!" }, { status: 400 })
        }
        const date = new Date(day);
        const starOfDay = new Date(date.setHours(0, 0, 0, 0))
        const endOfDay = new Date(date.setHours(23, 59, 59, 999))
        const dayEntries = await prisma.timeEntry.findMany({
            where: {
                userId: session?.user?.id,
                createdAt: {
                    gte: starOfDay,
                    lte: endOfDay
                }
            },
            orderBy: { createdAt: "asc" },
            include: { project: true }
        })
        return NextResponse.json({ dayEntries: dayEntries ?? [] }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server error while geting time entry data!" }, { status: 500 })
    }
}