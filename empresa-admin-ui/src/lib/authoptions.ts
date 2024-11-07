import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { IUser } from "@/types/next-auth";
import { NEXTAUTH_SECRET } from "@/utils/constants";
import { axiosInternalApi } from "./axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/sign-in'
  },
  secret: NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: { },
      async authorize(credentials) {
        try {
          const res = await axiosInternalApi.post(`v1/auth/autenticar`, credentials);
          const user: IUser = await res.data;
          if (res.status === 200 && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Um erro ocorreu durante o processo de autorização!", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.usuarioToken.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.expiresIn = user.expiresIn;
        token.refreshToken = user.refreshToken;
        token.usuarioToken = user.usuarioToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = `${token.id}`;
        session.user.usuarioToken = token.usuarioToken;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
        session.user.expiresIn = token.expiresIn;
        session.user.role = token.role
        session.user.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  session: {
    maxAge: 60 * 480,
  },
  jwt: {
    maxAge: 60 * 480,
  },
}