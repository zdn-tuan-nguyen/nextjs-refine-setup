export const AUTH_PROVIDERS = {
  CREDENTIALS_LOGIN: "credential-login",
  CREDENTIALS_REGISTER: "credential-register",
} as const;

export const AUTH_PAGES = {
  LOGIN: "/login",
  REGISTER: "/register",
  ERROR: "/auth/error",
  HOME: "/",
} as const;

export type AuthProvider = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS];
export type AuthPage = (typeof AUTH_PAGES)[keyof typeof AUTH_PAGES];
