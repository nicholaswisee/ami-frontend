import type { Session } from "@auth/core/types";
import { authClient } from "../lib/auth-client";

export type AuthUser = Session["user"];
export type AuthSessionData = Session;

export const useAuthStore = () => {
  const { data, status } = authClient.useSession();
  const logOut = (callbackUrl = window.location.origin) =>
    authClient.signOut({ callbackUrl });

  return {
    user: data?.user ?? null,
    session: data ?? null,
    isAuthenticated: status === "authenticated",
    isPending: status === "loading",
    logOut,
  };
};
