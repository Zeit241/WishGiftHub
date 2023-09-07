import { PrismaAdapter } from "@next-auth/prisma-adapter"
//import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email";
import CredentialProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/database/prisma"
import { UserSession } from "@/types/custom-types"
import CustomSendVerificationRequest from "@/lib/mail/mail"
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // CredentialProvider({
        //     type: "credentials",
        //     name: "credentials",
        //     credentials: {
        //         username: { type: "text" },
        //         password: { type: "password" },
        //     },
        //     async authorize(credentials) {
        //         // if (!credentials?.username || !credentials?.password) return null
        //         // const { username, password } = credentials
        //         // //const user = await SignIn({ username })
        //         // if (!user) return null

        //         // const isPassportValid = await bcrypt.compare(password, user.password!)
        //         // if (!isPassportValid) return null
        //         // return {
        //         //     id: user.id,
        //         //     username: user.username,
        //         //     role: user.role,
        //         // }

        //     },
        // }),
        // GitHubProvider({
        //     clientId: process.env?.GITHUB_CLIENT_ID!,
        //     clientSecret: process.env?.GITHUB_CLIENT_SECRET!,
        //     name: "GitHub",
        //     profile(profile) {
        //         return {
        //             id: profile.id,
        //             email: profile.email,
        //             image: profile.avatar_url,
        //             name: profile.login,
        //             status: "ACTIVE",
        //             verified: false,
        //             role: "USER",
        //         }
        //     },
        // }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            async sendVerificationRequest({
                identifier: email,
                url,
                provider: { server, from }
            }) {
                return await CustomSendVerificationRequest({
                    identifier: email,
                    url,
                    provider: { server, from }
                })
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                console.log("profile", profile)
                return {
                    id: profile.sub,
                    email: profile.email,
                    emailVerified: profile.email_verified,
                    image: profile.picture,
                    name: profile.name,
                    username: profile.email.split("@")[0],
                    status: "ACTIVE",
                    verified: false,
                    role: "USER",
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },
    callbacks: {
        async signIn({ user }) {
            return !!user
        },
        jwt: async ({ token, user }) => {
            user ? (token.user = <UserSession>user) : null
            return token
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user = {
                    ...token.user,
                    username: token.user?.username || token.user?.name || "John Doe",
                }
            }
            return session
        },
    },
    debug: process.env.NODE_ENV === "production",
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: "/login",
    // },
}
