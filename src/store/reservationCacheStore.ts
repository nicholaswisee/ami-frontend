import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Types
type TicketStatus = "PENDING" | "CONFIRMED";

type Session = {
  id: string;
  code: string;
  name: string;
  description: string | null;
};

type Reservation = {
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
  status: TicketStatus;
  createdAt: string | Date;
  session: Session | null;
};

type ReservationDetails = {
  status?: TicketStatus;
  wantsTalkshow?: boolean;
  session?: Session | null;
  participants?: Array<{
    id: string;
    fullName: string;
    school: string;
    region: string;
  }>;
};

type UserCache = {
  reservations: Reservation[];
  details: Record<string, ReservationDetails>; // keyed by reservation id
  updatedAt: number;
};

type ReservationCacheState = {
  // Cache keyed by userId
  cache: Record<string, UserCache>;

  // Actions
  setReservations: (userId: string, reservations: Reservation[]) => void;
  getReservations: (userId: string) => Reservation[] | null;
  setReservationDetails: (
    userId: string,
    reservationId: string,
    details: ReservationDetails,
  ) => void;
  getReservationDetails: (
    userId: string,
    reservationId: string,
  ) => ReservationDetails | null;
  isCacheValid: (userId: string, ttlMs?: number) => boolean;
  clearUserCache: (userId: string) => void;
  clearAllCache: () => void;
};

// Default TTL: 5 minutes
const DEFAULT_TTL_MS = 5 * 60 * 1000;

// Maximum number of cached users (LRU eviction)
const MAX_CACHED_USERS = 10;

export const useReservationCacheStore = create<ReservationCacheState>()(
  persist(
    (set, get) => ({
      cache: {},

      setReservations: (userId, reservations) => {
        set((state) => {
          const newCache = { ...state.cache };

          // LRU eviction: if we're at max capacity and adding a new user
          if (
            !newCache[userId] &&
            Object.keys(newCache).length >= MAX_CACHED_USERS
          ) {
            // Find oldest entry and remove it
            let oldestUserId: string | null = null;
            let oldestTime = Infinity;
            for (const [uid, data] of Object.entries(newCache)) {
              if (data.updatedAt < oldestTime) {
                oldestTime = data.updatedAt;
                oldestUserId = uid;
              }
            }
            if (oldestUserId) {
              delete newCache[oldestUserId];
            }
          }

          newCache[userId] = {
            reservations,
            details: newCache[userId]?.details ?? {},
            updatedAt: Date.now(),
          };

          return { cache: newCache };
        });
      },

      getReservations: (userId) => {
        const userCache = get().cache[userId];
        if (!userCache) return null;
        return userCache.reservations;
      },

      setReservationDetails: (userId, reservationId, details) => {
        set((state) => {
          const userCache = state.cache[userId];
          if (!userCache) return state;

          return {
            cache: {
              ...state.cache,
              [userId]: {
                ...userCache,
                details: {
                  ...userCache.details,
                  [reservationId]: details,
                },
                updatedAt: Date.now(),
              },
            },
          };
        });
      },

      getReservationDetails: (userId, reservationId) => {
        const userCache = get().cache[userId];
        if (!userCache) return null;
        return userCache.details[reservationId] ?? null;
      },

      isCacheValid: (userId, ttlMs = DEFAULT_TTL_MS) => {
        const userCache = get().cache[userId];
        if (!userCache) return false;
        return Date.now() - userCache.updatedAt < ttlMs;
      },

      clearUserCache: (userId) => {
        set((state) => {
          const newCache = { ...state.cache };
          delete newCache[userId];
          return { cache: newCache };
        });
      },

      clearAllCache: () => {
        set({ cache: {} });
      },
    }),
    {
      name: "reservation-cache", // localStorage key
      storage: createJSONStorage(() => localStorage), // Explicitly use localStorage
      partialize: (state) => ({ cache: state.cache }), // Only persist cache data
    },
  ),
);

// Helper hook to get cache validity
export const useCacheValidity = (
  userId: string | undefined,
  ttlMs?: number,
) => {
  const isCacheValid = useReservationCacheStore((state) => state.isCacheValid);
  if (!userId) return false;
  return isCacheValid(userId, ttlMs);
};
