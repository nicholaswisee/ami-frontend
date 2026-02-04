import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiClient, ApiError } from "@/lib/api";
import { useReservationCacheStore } from "@/store/reservationCacheStore";
import type { User } from "@/types/dashboard";

// Query keys
export const queryKeys = {
  scannerUsers: ["scannerUsers"] as const,
  participantCounts: ["participantCounts"] as const,
  reservations: (userId?: string) => ["reservations", userId] as const,
  reservationDetails: (id: string) => ["reservationDetails", id] as const,
  sessions: ["sessions"] as const,
  scannerAccess: ["scannerAccess"] as const,
} as const;

// Cache TTL for localStorage (5 minutes)
const CACHE_TTL_MS = 5 * 60 * 1000;

// Queries
export function useScannerUsers(enabled = true) {
  return useQuery({
    queryKey: queryKeys.scannerUsers,
    queryFn: () =>
      apiClient
        .get<{ data: User[] }>("/admin/users/scanners")
        .then((res) => res.data ?? []),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 404) return false;
      return failureCount < 2;
    },
  });
}

export function useParticipantCounts(enabled = true) {
  return useQuery({
    queryKey: queryKeys.participantCounts,
    queryFn: () =>
      apiClient
        .get<{
          total: number;
          pending: number;
          confirmed: number;
          talkshow?: {
            total: number;
            session1: number;
            session2: number;
          };
        }>("/admin/reservation-participants/counts")
        .then((res) => ({
          total: res.total ?? 0,
          pending: res.pending ?? 0,
          confirmed: res.confirmed ?? 0,
          talkshow: {
            total: res.talkshow?.total ?? 0,
            session1: res.talkshow?.session1 ?? 0,
            session2: res.talkshow?.session2 ?? 0,
          },
        })),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchInterval: false, // Disabled (use manual refresh)
  });
}

type ReservationData = {
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
};

export function useReservations(enabled = true, userId?: string) {
  const { getReservations, setReservations, isCacheValid } =
    useReservationCacheStore();

  // Get cached data if available and valid
  const cachedReservations = userId ? getReservations(userId) : null;
  const hasFreshCache = userId ? isCacheValid(userId, CACHE_TTL_MS) : false;

  const query = useQuery({
    queryKey: queryKeys.reservations(userId),
    queryFn: () => apiClient.get<ReservationData>("/reservations"),
    enabled,
    // Use cached data as initial data for instant display
    initialData:
      hasFreshCache && cachedReservations
        ? { reservations: cachedReservations }
        : undefined,
    // If we have fresh cache, mark as not stale initially
    initialDataUpdatedAt: hasFreshCache ? Date.now() : undefined,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Update Zustand cache when data is fetched
  useEffect(() => {
    if (
      query.data?.reservations &&
      userId &&
      query.isFetched &&
      !query.isPlaceholderData
    ) {
      setReservations(userId, query.data.reservations);
    }
  }, [
    query.data,
    userId,
    query.isFetched,
    query.isPlaceholderData,
    setReservations,
  ]);

  return query;
}

type ReservationDetailsData = {
  status?: "PENDING" | "CONFIRMED";
  wantsTalkshow?: boolean;
  session?: {
    id: string;
    code: string;
    name: string;
    description: string | null;
  } | null;
  participants?: Array<{
    id: string;
    fullName: string;
    school: string;
    region: string;
  }>;
};

export function useReservationDetails(
  id?: string | null,
  enabled = true,
  userId?: string,
) {
  const { getReservationDetails, setReservationDetails, isCacheValid } =
    useReservationCacheStore();

  // Get cached details if available
  const cachedDetails = userId && id ? getReservationDetails(userId, id) : null;
  const hasFreshCache = userId ? isCacheValid(userId, CACHE_TTL_MS) : false;

  const query = useQuery({
    queryKey: queryKeys.reservationDetails(id ?? ""),
    queryFn: async () => {
      const res = await apiClient.get<{
        reservation: ReservationDetailsData;
      }>(`/reservations/${encodeURIComponent(id ?? "")}`);
      return res.reservation;
    },
    enabled: enabled && Boolean(id),
    // Use cached data as initial data for instant display
    initialData: hasFreshCache && cachedDetails ? cachedDetails : undefined,
    initialDataUpdatedAt: hasFreshCache ? Date.now() : undefined,
    // Backend cache is 2 minutes, so 30s staleTime allows fresh data on manual refresh
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Update Zustand cache when data is fetched
  useEffect(() => {
    if (
      query.data &&
      userId &&
      id &&
      query.isFetched &&
      !query.isPlaceholderData
    ) {
      setReservationDetails(userId, id, query.data);
    }
  }, [
    query.data,
    userId,
    id,
    query.isFetched,
    query.isPlaceholderData,
    setReservationDetails,
  ]);

  return query;
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
