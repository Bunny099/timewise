import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/zod/task.schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    try{
        const session = await getServerSession(authOptions);
        if(!session) return NextResponse.json({error:"unauthorized"},{status:401})
        const userId = session?.user?.id
        const tasks = await prisma.task.findMany({where:{userId}});
        return NextResponse.json({tasks},{status:200})

    }catch(error){
        return NextResponse.json({error:"Server Error while fetcing Tasks!"},{status:400})
    }

}
export async function POST(req:NextRequest){
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:"unauthorized"},{status:401})
        }
        const userId = session?.user?.id;

        
        const body = await req.json();
        const parsed = taskSchema.safeParse(body);
        if(!parsed.success){
            return NextResponse.json({error:parsed.error.errors},{status:400})
        }
        const {title,description,priority,projectId,status} = parsed.data;
       
        let finalProjectId : string | null=null;
        if(projectId){
            const project = await prisma.project.findUnique({where:{id:projectId}});
            if(!project){ return NextResponse.json({error:"Invalid projectId"},{status:400})}
            finalProjectId = projectId
        }
        const task = await prisma.task.create({data:{title,description,priority,userId,projectId:finalProjectId,status}});
        if(!task){
            return NextResponse.json({error:"Task is not Created!"},{status:400})
        }
        return NextResponse.json({task},{status:201})
    }catch(error){
        console.error("error is for creating task:",error);
        return NextResponse.json({error:"Server error while Creating Task!"},{status:400})
    }

}
export async function PUT(req:NextRequest){
    try{
        const body = await req.json();
        
    }catch(error){
        
    }

}
export async function DELETE(){
    try{

    }catch(error){
        
    }

}