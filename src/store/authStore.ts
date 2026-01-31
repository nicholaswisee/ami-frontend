import type { Session } from "@auth/core/types";
import { authClient } from "../lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../hooks/queries";

export type AuthUser = Session["user"];
export type AuthSessionData = Session;

// Key used by @tanstack/query-sync-storage-persister
const REACT_QUERY_OFFLINE_CACHE_KEY = "REACT_QUERY_OFFLINE_CACHE";

export const useAuthStore = () => {
  const { data, status } = authClient.useSession();
  const queryClient = useQueryClient();

  const logOut = (callbackUrl = window.location.origin) => {
    // Remove all user-specific caches on logout
    queryClient.removeQueries({ queryKey: queryKeys.scannerAccess });
    queryClient.removeQueries({ queryKey: queryKeys.reservations });
    queryClient.removeQueries({ queryKey: ["reservationDetails"] }); // Partial match for all reservation details
    queryClient.removeQueries({ queryKey: queryKeys.scannerUsers });
    queryClient.removeQueries({ queryKey: queryKeys.participantCounts });
    
    // Also clear localStorage persisted cache to prevent stale data on next login
    try {
      localStorage.removeItem(REACT_QUERY_OFFLINE_CACHE_KEY);
    } catch (e) {
      console.warn("Failed to clear localStorage cache:", e);
    }
    
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
