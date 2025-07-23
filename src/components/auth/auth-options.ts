import type { NextAuthOptions } from "next-auth";
import { authProviders } from "./providers";

export const authOptions: NextAuthOptions = {
  providers: authProviders,
  session: {
    strategy: "jwt",
    maxAge: 300,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
