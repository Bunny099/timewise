import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { projectSchema } from "@/lib/zod/project.schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        const projects = await prisma.project.findMany({ where: { userId: session.user?.id } });
        if (projects.length === 0) {
            return NextResponse.json({ message: "No report for this User!" }, { status: 200 })
        }
        return NextResponse.json({ projects }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "server error while geting projects!" }, { status: 500 })
    }

}
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        const userId = session.user?.id;
        const body = await req.json();
        const parsed = projectSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.errors }, { status: 400 })
        }
        const { name } = parsed.data;
        const project = await prisma.project.create({ data: { name, userId: userId } });
        return NextResponse.json({ project }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: "Server Error while creating creating project" }, { status: 500 })
    }

}

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const body = await req.json();
        const { id, newName } = await body;
        if (!id || !newName) {
            return NextResponse.json({ error: "Invalid Input!" });
        }
        const existing = await prisma.project.findUnique({ where: { id: id } });
        if (!existing) {
            return NextResponse.json({ error: "No project is exisit with this Id!" }, { status: 404 })
        };
        const updatedProject = await prisma.project.update({ where: { id: id }, data: { name: newName } });
        return NextResponse.json({ updatedProject }, { status: 200 })
    } catch (error) {
        console.error("Error while updating project:", error);
        return NextResponse.json({ error: "Server error while updating project!" }, { status: 500 })
    }
}
export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const body = await req.json()
        const { id } = await body;;
        if (!id || typeof id !== "string") {
            return NextResponse.json({ error: "Invalid Input!" }, { status: 400 })
        }
        const existing = await prisma.project.findUnique({ where: { id: id } });
        if (!existing) {
            return NextResponse.json({ error: "Project not found with this Id!" }, { status: 400 })
        }
        const newProjects = await prisma.project.delete({ where: { id: id } });
        return NextResponse.json({ newProjects }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Server error while deleting project!" }, { status: 500 })
    }
}