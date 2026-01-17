import type { Session } from "@auth/core/types";
import { authClient } from "../lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { queryKeys } from "../hooks/queries";

export type AuthUser = Session["user"];
export type AuthSessionData = Session;

export const useAuthStore = () => {
  const { data, status } = authClient.useSession();
  const queryClient = useQueryClient();

  const logOut = (callbackUrl = window.location.origin) => {
    // Invalidate scanner access cache on logout
    void queryClient.invalidateQueries({ queryKey: queryKeys.scannerAccess });
    return authClient.signOut({ callbackUrl });
  };

  // Invalidate scanner access cache on login (status changes to authenticated)
  const prevStatusRef = useRef(status);
  if (prevStatusRef.current !== status) {
    if (status === "authenticated") {
      void queryClient.invalidateQueries({ queryKey: queryKeys.scannerAccess });
    }
    prevStatusRef.current = status;
  }

  return {
    user: data?.user ?? null,
    session: data ?? null,
    isAuthenticated: status === "authenticated",
    isPending: status === "loading",
    logOut,
  };
};
