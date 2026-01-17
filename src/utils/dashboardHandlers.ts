import { toast } from "sonner";
import type { User, ParticipantCounts } from "@/types/dashboard";
import {
  fetchScannerUsers,
  fetchParticipantCounts,
  addScannerRoleApi,
  removeScannerRoleApi,
  exportParticipantsApi,
} from "./dashboardApi";

interface FetchDataOptions {
  signal?: AbortSignal;
  opts?: { silent?: boolean };
  setLoading: (loading: boolean) => void;
  setRefreshing: (refreshing: boolean) => void;
  setScannerUsers: (users: User[]) => void;
  setParticipantCounts: (counts: ParticipantCounts) => void;
}

export const handleFetchData = async ({
  signal,
  opts,
  setLoading,
  setRefreshing,
  setScannerUsers,
  setParticipantCounts,
}: FetchDataOptions) => {
  try {
    if (opts?.silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    const [scannersResult, participantCountsResult] = await Promise.allSettled([
      fetchScannerUsers(signal),
      fetchParticipantCounts(signal),
    ]);

    if (scannersResult.status === "fulfilled") {
      setScannerUsers(scannersResult.value);
    } else {
      toast.error(
        scannersResult.reason?.message || "Gagal memuat scanner users",
      );
    }

    if (participantCountsResult.status === "fulfilled") {
      setParticipantCounts(participantCountsResult.value);
    } else {
      toast.error(
        participantCountsResult.reason?.message ||
          "Gagal memuat participant counts",
      );
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    console.error("Error fetching dashboard data:", error);
    toast.error(
      error instanceof Error ? error.message : "Gagal memuat data dashboard",
    );
  } finally {
    if (opts?.silent) {
      setRefreshing(false);
    } else {
      setLoading(false);
    }
  }
};

interface RefreshScannersOptions {
  setScannerUsers: (users: User[]) => void;
}

export const handleRefreshScanners = async ({
  setScannerUsers,
}: RefreshScannersOptions) => {
  try {
    const users = await fetchScannerUsers();
    setScannerUsers(users);
  } catch (error) {
    console.error("Error fetching scanner users:", error);
    toast.error(
      error instanceof Error ? error.message : "Gagal memuat scanner users",
    );
  }
};

interface AddScannerRoleOptions {
  email: string;
  setAddingScanner: (adding: boolean) => void;
  setScannerEmail: (email: string) => void;
  refreshScanners: () => Promise<void>;
}

export const handleAddScannerRole = async ({
  email,
  setAddingScanner,
  setScannerEmail,
  refreshScanners,
}: AddScannerRoleOptions) => {
  try {
    setAddingScanner(true);
    await addScannerRoleApi(email);
    setScannerEmail("");
    toast.success("Scanner role berhasil ditambahkan");
    await refreshScanners();
  } catch (error) {
    console.error("Error adding scanner role:", error);
    toast.error(
      error instanceof Error ? error.message : "Gagal menambahkan scanner role",
    );
  } finally {
    setAddingScanner(false);
  }
};

interface RemoveScannerRoleOptions {
  email: string;
  setRemovingEmail: (email: string | null) => void;
  refreshScanners: () => Promise<void>;
}

export const handleRemoveScannerRole = async ({
  email,
  setRemovingEmail,
  refreshScanners,
}: RemoveScannerRoleOptions) => {
  try {
    setRemovingEmail(email);
    await removeScannerRoleApi(email);
    toast.success("Scanner role berhasil dihapus");
    await refreshScanners();
  } catch (error) {
    console.error("Error removing scanner role:", error);
    toast.error(
      error instanceof Error ? error.message : "Gagal menghapus scanner role",
    );
  } finally {
    setRemovingEmail(null);
  }
};

interface ExportParticipantsOptions {
  setExportingParticipants: (exporting: boolean) => void;
}

export const handleExportParticipants = async ({
  setExportingParticipants,
}: ExportParticipantsOptions) => {
  try {
    setExportingParticipants(true);
    await exportParticipantsApi();
    toast.success("Peserta berhasil diekspor");
  } catch (error) {
    console.error("Error exporting participants:", error);
    toast.error(
      error instanceof Error ? error.message : "Gagal mengekspor peserta",
    );
  } finally {
    setExportingParticipants(false);
  }
};
