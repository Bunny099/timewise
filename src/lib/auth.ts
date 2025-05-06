import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { getOrCreateAuthUser } from "./auth-utils";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

export const auth = () => getServerSession(authOptions);
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},

            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }
                const user = await prisma.user.findUnique({
                    where: {
                        provider_email:{
                            email:credentials.email,
                            provider:"credentials"
                        }
                        
                    }
                })
                if (!user || !user.password) {
                    return null
                }
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;
                return { id: user.id, email: user.email, name: user.name, provider: user.provider }
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, }) {
            if (account?.provider === "google") {
                const dbUser = await getOrCreateAuthUser(user);
                if(dbUser){
                    user.id = dbUser.id;
                    user.name = dbUser.name
                }
            }
            return true
        }
        ,
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.name
                session.user.id = token.id as string
            }

            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
            }
            return token
        }

    }

}

