"use client";

import { AuthProvider } from "@refinedev/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { AUTH_PROVIDERS } from "@/constants";

export const useAuthProvider = () => {
  const { data, status } = useSession();
  const to = usePathname();

  const authProvider: AuthProvider = {
    login: async ({ providerName, email, password }: any) => {
      if (providerName) {
        signIn(providerName, {
          callbackUrl: to ? to.toString() : "/",
          redirect: true,
        });

        return {
          success: true,
        };
      }

      const signInResponse = await signIn(AUTH_PROVIDERS.CREDENTIALS_LOGIN, {
        email,
        password,
        callbackUrl: to ? to.toString() : "/",
        redirect: false,
      });

      console.log("Sign in response:", signInResponse);

      if (!signInResponse) {
        return {
          success: false,
        };
      }

      const { ok, error } = signInResponse;

      if (ok) {
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: new Error(error?.toString()),
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error: any) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  return authProvider;
};
