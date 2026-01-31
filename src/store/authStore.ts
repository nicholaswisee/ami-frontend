import type { Session } from "@auth/core/types";
import { authClient } from "../lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../hooks/queries";

export type AuthUser = Session["user"];
export type AuthSessionData = Session;

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
