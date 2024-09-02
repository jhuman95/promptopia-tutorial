import NextAuth from "next-auth/next";
import GoogleProdvider from "next-auth/providers/google"

import User from "@models/user";
import { connectToDB } from "@utils/database";


const handler = NextAuth({
    providers: [
        GoogleProdvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString()
    
            return session
        },
        async signIn({ profile }) {
            try {
                await connectToDB()
                /* Check if user already exists */
                const userExists = await User.findOne({
                    email: profile.email
                })
                /* else create new user and save it to DB */
                if (!userExists) {
                    const newUser = {
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    }
                    await User.create(newUser)
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }    
})

export {handler as GET, handler as POST}