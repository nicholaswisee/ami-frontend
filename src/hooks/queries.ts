import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, ApiError } from "@/lib/api";
import type { User } from "@/types/dashboard";

// Query keys
export const queryKeys = {
  scannerUsers: ["scannerUsers"] as const,
  participantCounts: ["participantCounts"] as const,
  reservations: ["reservations"] as const,
  reservationDetails: (id: string) => ["reservationDetails", id] as const,
  sessions: ["sessions"] as const,
  scannerAccess: ["scannerAccess"] as const,
} as const;

// Queries
export function useScannerUsers() {
  return useQuery({
    queryKey: queryKeys.scannerUsers,
    queryFn: () =>
      apiClient
        .get<{ data: User[] }>("/admin/users/scanners")
        .then((res) => res.data ?? []),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 404) return false;
      return failureCount < 2;
    },
  });
}

export function useParticipantCounts() {
  return useQuery({
    queryKey: queryKeys.participantCounts,
    queryFn: () =>
      apiClient
        .get<{
          total: number;
          pending: number;
          confirmed: number;
        }>("/admin/reservation-participants/counts")
        .then((res) => ({
          total: res.total ?? 0,
          pending: res.pending ?? 0,
          confirmed: res.confirmed ?? 0,
        })),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchInterval: false, // Disabled (use manual refresh)
  });
}

export function useReservations() {
  return useQuery({
    queryKey: queryKeys.reservations,
    queryFn: () =>
      apiClient.get<{
        reservations: Array<{
          id: string;
          email: string;
          contactFullName: string;
          contactPhone: string;
          contactSchool: string | null;
          contactRegion: string;
          parentName: string;
          parentPhone: string;
          wantsTalkshow: boolean;
          talkshowExpectation: string | null;
          barcode: string;
          status: "PENDING" | "CONFIRMED";
          createdAt: string | Date;
          session: {
            id: string;
            code: string;
            name: string;
            description: string | null;
          } | null;
        }>;
      }>("/reservations"),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export function useReservationDetails(id?: string | null, enabled = true) {
  return useQuery({
    queryKey: queryKeys.reservationDetails(id ?? ""),
    queryFn: async () => {
      const res = await apiClient.get<{
        reservation: {
          status?: "PENDING" | "CONFIRMED";
          participants?: Array<{
            id: string;
            fullName: string;
            school: string;
            region: string;
          }>;
        };
      }>(`/reservations/${encodeURIComponent(id ?? "")}`);
      return res.reservation;
    },
    enabled: enabled && Boolean(id),
    // Backend cache is 2 minutes, so 30s staleTime allows fresh data on manual refresh
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

export function useSessions() {
  return useQuery({
    queryKey: queryKeys.sessions,
    queryFn: () =>
      apiClient.get<{
        sessions: Array<{
          id: string;
          code: string;
          name: string;
          description: string | null;
        }>;
      }>("/sessions"),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
  });
}

export function useScannerAccess(enabled = true) {
  return useQuery({
    queryKey: queryKeys.scannerAccess,
    queryFn: () =>
      apiClient
        .get<{ allowed: boolean }>("/scanner/access")
        .then((res) => Boolean(res.allowed)),
    enabled,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 1,
  });
}

// Mutations
export function useAddScannerRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) =>
      apiClient.post<void>(
        `/admin/users/${encodeURIComponent(email.trim())}/scanner`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.scannerUsers });
    },
    onError: (error) => {
      console.error("Failed to add scanner role:", error);
    },
  });
}

export function useRemoveScannerRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) =>
      apiClient.delete<void>(
        `/admin/users/${encodeURIComponent(email)}/scanner`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.scannerUsers });
    },
    onError: (error) => {
      console.error("Failed to remove scanner role:", error);
    },
  });
}

export function useExportParticipants() {
  return useMutation({
    mutationFn: () =>
      apiClient.download(
        "/admin/reservation-participants/export",
        `itbday-export-${new Date().toISOString().split("T")[0]}.csv`,
      ),
    onError: (error) => {
      console.error("Failed to export participants:", error);
    },
  });
}
