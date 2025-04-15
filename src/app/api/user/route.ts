
import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"
import { userSchema } from "@/lib/zod/user.schema";
export async function GET(){
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:"unauthorized"},{status:401})
        }
        const user = await prisma.user.findUnique({where:{id:session?.user?.id}});
        if(!user) return NextResponse.json({error:"User not found!"},{status:400})
        return NextResponse.json({user},{status:200})
    }catch(error){
        return NextResponse.json({error:"user not found!"},{status:400})
    }
}
