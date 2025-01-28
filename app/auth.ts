import { getServerSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
}

export const getAuth = () => getServerSession(authOptions)