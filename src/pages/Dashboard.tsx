import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  useScannerUsers,
  useParticipantCounts,
  queryKeys,
} from "@/hooks/useDashboard";
import { useQueryClient } from "@tanstack/react-query";
import {
  handleAddScannerRole,
  handleRemoveScannerRole,
  handleExportParticipants,
} from "@/utils/dashboardHandlers";

export default function Dashboard() {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: scannersData, isLoading: loadingScanners } = useScannerUsers();
  const { data: countsData, isLoading: loadingCounts } = useParticipantCounts();

  const scannerUsers = scannersData ?? [];
  const participantCounts = countsData ?? {
    total: 0,
    pending: 0,
    confirmed: 0,
    talkshow: {
      total: 0,
      session1: 0,
      session2: 0,
    },
  };
  const loading = loadingScanners || loadingCounts;

  const [scannerEmail, setScannerEmail] = useState("");
  const [addingScanner, setAddingScanner] = useState(false);
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);
  const [exportingParticipants, setExportingParticipants] = useState(false);

  const refreshScanners = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.scannerUsers });
  };

  const addScannerRole = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAddScannerRole({
      email: scannerEmail,
      setAddingScanner,
      setScannerEmail,
      refreshScanners,
    });
  };

  const removeScannerRole = async (email: string) => {
    await handleRemoveScannerRole({
      email,
      setRemovingEmail,
      refreshScanners,
    });
  };

  const exportParticipants = async () => {
    await handleExportParticipants({ setExportingParticipants });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-body text-2xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600">Silakan login terlebih dahulu</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-lvh justify-center bg-gray-50 p-8">
      <div className="mx-auto w-full max-w-7xl py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-body text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
          </div>

          <button
            type="button"
            onClick={() => {
              queryClient.invalidateQueries({
                queryKey: queryKeys.scannerUsers,
              });
              queryClient.invalidateQueries({
                queryKey: queryKeys.participantCounts,
              });
            }}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-start justify-between gap-4">
              <a href="/scanner">
                <h2 className="font-body my-0 text-xl font-semibold text-blue-500 underline">
                  Scan Reservasi ITB Day
                </h2>
              </a>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-body text-xl font-semibold text-gray-800">
                  Manajemen Akun
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Akun Admin: {scannerUsers.length}
                </p>
              </div>
            </div>

            <form onSubmit={addScannerRole} className="mb-6">
              <h3 className="font-body mb-3 text-lg font-medium">
                Tambah Admin
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={scannerEmail}
                  onChange={(e) => setScannerEmail(e.target.value)}
                  placeholder="Email user"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={addingScanner || !scannerEmail}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {addingScanner ? "Menambahkan..." : "Tambah"}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Gunakan email user yang sudah terdaftar.
              </p>
            </form>

            <div>
              <h3 className="font-body mb-3 text-lg font-medium">Role Admin</h3>

              <div className="max-h-96 space-y-2 overflow-y-auto">
                {scannerUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between rounded-md border border-gray-200 p-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="truncate font-medium">{u.name}</div>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          SCANNER
                        </span>
                      </div>
                      <div className="truncate text-sm text-gray-600">
                        {u.email}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeScannerRole(u.email)}
                      disabled={removingEmail === u.email}
                      className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      {removingEmail === u.email ? "Menghapus..." : "Hapus"}
                    </button>
                  </div>
                ))}

                {scannerUsers.length === 0 && (
                  <div className="rounded-md border border-dashed border-gray-300 p-6 text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Belum ada user dengan scanner role
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Tambahkan scanner dengan email di atas, lalu klik Refresh
                      bila perlu.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-body text-xl font-semibold text-gray-800">
                  Jumlah Reservasi
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Total: {participantCounts.total} | Terdaftar:{" "}
                  {participantCounts.pending} | Sudah Hadir:{" "}
                  {participantCounts.confirmed}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">Talkshow</span> — Total:{" "}
                  {participantCounts.talkshow.total} | Sesi 1:{" "}
                  {participantCounts.talkshow.session1} | Sesi 2:{" "}
                  {participantCounts.talkshow.session2}
                </p>
              </div>
              <button
                type="button"
                onClick={exportParticipants}
                disabled={exportingParticipants}
                className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-60"
              >
                {exportingParticipants ? "Exporting..." : "Export Pengunjung"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
