import type { Session } from "@auth/core/types";
import { authClient } from "../lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../hooks/queries";
import { useEffect, useRef } from "react";

export type AuthUser = Session["user"];
export type AuthSessionData = Session;

export const useAuthStore = () => {
  const { data, status } = authClient.useSession();
  const queryClient = useQueryClient();
  const previousUserIdRef = useRef<string | null>(null);

  const currentUserId = data?.user?.id ?? null;

  // Invalidate scanner access cache when user switches accounts
  useEffect(() => {
    // If user ID changes (account switch), invalidate scanner access
    if (previousUserIdRef.current !== null && previousUserIdRef.current !== currentUserId) {
      queryClient.invalidateQueries({ queryKey: queryKeys.scannerAccess });
      queryClient.removeQueries({ queryKey: ["reservations"] });
      queryClient.removeQueries({ queryKey: ["reservationDetails"] });
    }
    previousUserIdRef.current = currentUserId;
  }, [currentUserId, queryClient]);

  const logOut = (callbackUrl = window.location.origin) => {
    // Clear React Query in-memory cache for user-specific data
    // Note: We keep localStorage caches (both React Query and Zustand) because:
    // - They are keyed by userId, so no data leakage between users
    // - Allows instant load when the same user logs back in
    queryClient.removeQueries({ queryKey: queryKeys.scannerAccess });
    queryClient.removeQueries({ queryKey: ["reservations"] }); // Partial match for all reservations
    queryClient.removeQueries({ queryKey: ["reservationDetails"] }); // Partial match for all reservation details
    queryClient.removeQueries({ queryKey: queryKeys.scannerUsers });
    queryClient.removeQueries({ queryKey: queryKeys.participantCounts });

    // Zustand reservation cache persists in localStorage (keyed by userId)
    // This allows instant ticket display on re-login

    return authClient.signOut({ callbackUrl });
  };

  return {
    user: data?.user ?? null,
    session: data ?? null,
    isAuthenticated: status === "authenticated",
    isPending: status === "loading",
    logOut,
  };
};
