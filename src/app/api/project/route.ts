import { prisma } from "@/lib/prisma";
import { NextRequest,NextResponse } from "next/server";
import { ProjectInput, projectSchema } from "@/lib/zod/project.schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(){
    try{
        const session = await getServerSession(authOptions);
        if(!session) return NextResponse.json({error:"unauthorized"},{status:401})
        const projects = await prisma.project.findMany({where:{userId:session.user?.id}});
        return NextResponse.json({projects},{status:200})
    }catch(error){
        return NextResponse.json({error:"server error while geting projects!"},{status:500})
    }

}
export async function POST(req:NextRequest){
    try{
        const session = await getServerSession(authOptions);
        if(!session) return NextResponse.json({error:"unauthorized"},{status:401});
        const userId = session.user?.id;
        const body = await req.json();
        const parsed = projectSchema.safeParse(body)
        if(!parsed.success){
            return NextResponse.json({error:parsed.error.errors},{status:400})
        }
        const {name} = parsed.data;
        
        const project = await prisma.project.create({data:{name,userId:userId}});
        return NextResponse.json({project},{status:201})

    }catch(error){
        console.error("error creating project:",error)
        return NextResponse.json({error:"Server Error while creating creating project"},{status:500})
    }

}
