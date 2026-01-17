// Re-export from centralized queries
export {
  useScannerUsers,
  useParticipantCounts,
  useAddScannerRole,
  useRemoveScannerRole,
  useExportParticipants,
  queryKeys,
} from "./queries";

// Legacy exports for backward compatibility
export type { User, ParticipantCounts } from "@/types/dashboard";
