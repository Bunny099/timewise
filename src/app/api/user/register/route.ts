import { userSchema } from "@/lib/zod/user.schema";
import {prisma} from "@/lib/prisma"
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req:NextRequest){
    try{
        
        const body = await req.json();
        const parsed = userSchema.safeParse(body);
        if(!parsed.success){
            return NextResponse.json({error:parsed.error.errors},{status:400})
        }
        const {name,email,password} = parsed.data;
       
        const existingUser = await prisma.user.findUnique({where:{provider_email:{
            provider:"credentials",
            email
        }}});
        if(existingUser){
            return NextResponse.json({error:"User Already exist!"},{status:400})
        }
        const hashPassword = await bcrypt.hash(password,4);
        const user = await prisma.user.create({data:{name,email,password:hashPassword,provider:"credentials"}});
        return NextResponse.json({user},{status:200})
    }catch(error){
        console.error("Post user Error is:",error)
        return NextResponse.json({error:"Server error while creating user!"},{status:400})
    }
}