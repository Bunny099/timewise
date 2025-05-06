import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        const user = await prisma.user.findUnique({ where: { id: session?.user?.id } });
        if (!user) return NextResponse.json({ error: "User not found!" }, { status: 400 })
        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "user not found!" }, { status: 400 })
    }
}



export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }
        const body = await req.json();
        const { name, email, password } = body;
        const userFound = await prisma.user.findUnique({
            where: { id: session.user.id },
        });
        if (!userFound) {
            return NextResponse.json({ error: "User not found." }, { status: 200 });
        }

        const dataToUpdate: Record<string, any> = {};

        if (name) dataToUpdate.name = name;
        if (email) dataToUpdate.email = email;

        if (password) {
            if (userFound.provider === "credentials") {
                const newHashPass = await bcrypt.hash(password, 4);
                dataToUpdate.password = newHashPass;
            } else {
                return NextResponse.json(
                    { error: "Password update is not allowed for Google users." },
                    { status: 400 }
                );
            }
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return NextResponse.json(
                { error: "No valid fields provided to update." },
                { status: 400 }
            );
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: dataToUpdate,
        });

        return NextResponse.json({
            message: "User data updated successfully!",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "Server error while updating user data." },
            { status: 500 }
        );
    }
}

