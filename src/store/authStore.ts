import { authClient } from "../lib/auth-client";

export type AuthSession = typeof authClient.$Infer.Session;
export type AuthUser = AuthSession["user"];
export type AuthSessionData = AuthSession["session"];

export const useAuthStore = () => {
  const { data, isPending, isRefetching, error, refetch } =
    authClient.useSession();

  const logOut = authClient.signOut;

  return {
    user: data?.user ?? null,
    session: data?.session ?? null,
    isAuthenticated: Boolean(data?.user),
    isPending,
    isRefetching,
    error,
    refetch,
    logOut,
  };
};
