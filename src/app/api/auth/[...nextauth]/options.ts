import { env } from "@/config/env";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  image?: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credential-login",
      name: "Sign In",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          console.log("Signing in with credentials:", credentials);
          const response = await fetch(`${env.API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          // console.log("🚀 ~ authorize ~ response:", response);

          if (!response.ok) {
            return null;
          }

          const result: ApiResponse<UserResponse> = await response.json();
          console.log("🚀 ~ authorize ~ result:", result);

          // if (!result.success || !result.data) {
          //   return null;
          // }

          if (!result.data?.user) {
            return null;
          }
          const user: User = {
            id: result.data.user.id,
            name: result.data.user.name,
            email: result.data.user.email,
            image: "https://www.svgrepo.com/show/509008/avatar-thinking-2.svg",
          };

          return user;
        } catch (error) {
          console.error("Sign in error:", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "CredentialsSignUp",
      name: "Sign Up",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (
          !credentials?.name ||
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        try {
          console.log("Registering user with credentials:", credentials);
          const response = await fetch(`${env.API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const result: ApiResponse<UserResponse> = await response.json();

          if (!result.success || !result.data) {
            return null;
          }

          const user: User = {
            id: result.data.id,
            name: result.data.name,
            email: result.data.email,
            image: result.data.image,
          };

          return user;
        } catch (error) {
          console.error("Sign up error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: env.API_BASE_URL,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
};

export default authOptions;
