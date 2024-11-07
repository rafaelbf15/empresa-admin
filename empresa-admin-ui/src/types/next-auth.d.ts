import NextAuth from "next-auth";

// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";


interface UsuarioToken {
  id: string;
  nome: string;
  email: string;
  claims?: UsuarioClaim[];
}

interface UsuarioClaim {
  value: string;
  type: string;
}

// common interface for JWT and Session
interface IUser extends DefaultUser {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  usuarioToken: UsuarioToken;
  role: string;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user: User;
  }
  interface SignInResponse extends Session {
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
