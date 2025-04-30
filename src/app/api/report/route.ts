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
        const reports = await prisma.report.findMany({ where: { userId: session.user?.id } });
        return NextResponse.json({ reports }, { status: 200 })
    } catch (error) {
        console.error("Error for get report:", error);
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
            return NextResponse.json({ error: "All fields are required!" }, { status: 400 })
        };
        const report = await prisma.report.create({
            data: {
                title,
                dataSnapshot,
                filterUsed: filterUsed || null,
                userId: session.user?.id
            }
        });
        return NextResponse.json({ report,message:"report created!",reportId:report.id }, { status: 200 })

    } catch (error) {
        console.error("Error Post Report:", error);
        return NextResponse.json({ error: "Server error while creating report!" }, { status: 500 })
    }
}

