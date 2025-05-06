import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
        }
        const reports = await prisma.report.findMany({ where: { userId: session.user?.id } });
        if (reports.length === 0) {
            return NextResponse.json({ message: "No reports found for this user." }, { status: 200 });
        }
        return NextResponse.json({ report: reports }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "server error while getting reports!" }, { status: 500 })

    }
}
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
        }

        const body = await req.json();
        const { title, dataSnapshot, filterUsed } = body;
        if (!title || !dataSnapshot) {
            return NextResponse.json({ error: "Invalid input!" }, { status: 400 })
        };
        const report = await prisma.report.create({
            data: {
                title,
                dataSnapshot,
                filterUsed: filterUsed || null,
                userId: session.user?.id
            }
        });
        return NextResponse.json({ report, message: "report created!", reportId: report.id }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Server error while creating report!" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }
        const body = await req.json()
        const { id } = body;
        if (!id || typeof id !== "string") {
            return NextResponse.json({ error: "Invalid reportId!" }, { status: 400 })

        }
        const existing = await prisma.report.findUnique({ where: { id: id } });
        if (!existing) {
            return NextResponse.json({ error: "No report is found with this ID!" }, { status: 400 })
        }
        await prisma.report.delete({ where: { id: id } });
        return NextResponse.json({ message: "Report deleted successfully!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Server Error while deleting report!" }, { status: 500 })
    }
}
