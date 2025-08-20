// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    CredentialsProvider({
      id: "otp-credentials",
      name: "Credentials",
      
      credentials: {
        mobileNumber: { label: "Mobile Number", type: "text" },
      },
      
      async authorize(credentials) {
        if (!credentials?.mobileNumber) {
          return null;
        }

        await dbConnect();
        
        try {
          const user = await User.findOne({ mobileNumber: credentials.mobileNumber });

          if (user) {
            // Any object returned will be saved in the 'user' property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed
            return null;
          }
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      }
    })
  ],
  
  session: {
    strategy: "jwt",
  },
  
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/', // We are using a modal, so users will stay on the homepage
    error: '/', // Redirect to homepage on error
  },

  callbacks: {
    // This callback is called whenever a JWT is created or updated.
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id; // Add user's MongoDB ID to the token
        token.mobileNumber=user.mobileNumber;
      }
      return token;
    },
    // This callback is called whenever a session is checked.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; // Add the ID to the session object
        session.user.mobileNumber = token.mobileNumber
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };