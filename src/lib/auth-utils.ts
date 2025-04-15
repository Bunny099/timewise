import {prisma} from "@/lib/prisma"
export const getOrCreateAuthUser = async(user:{email?:string | null, name?:string | null})=>{
    if(!user.email)return null;
    const existing = await prisma.user.findUnique({where:{provider_email:{
        provider:"google",
        email:user.email
    }}});
    if(existing) return existing;
    return prisma.user.create({
        data:{
            email:user.email,
            name:user.name ?? "No name",
            provider:"google"
        }
    })
}