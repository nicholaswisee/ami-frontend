import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { env } from "@/env";
import { useAuthStore } from "@/store/authStore";

type ReservationParticipantRow = {
  id: string;
  reservationId: string;
  fullName: string;
  email: string;
  phone: string;
  school: string;
  region: string;
  createdAt: string;
  barcode: string;
  status: "PENDING" | "CONFIRMED";
  reservationCreatedAt: string;
};

type ParticipantCounts = {
  total: number;
  pending: number;
  confirmed: number;
};

type ParticipantPageInfo = {
  limit: number;
  hasMore: boolean;
  nextCursor: string | null;
};

type User = {
  id: string;
  email: string;
  name: string;
  role: "USER" | "SCANNER";
};

const addScannerSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

export default function Dashboard() {
  const { isAuthenticated } = useAuthStore();
  const [participants, setParticipants] = useState<ReservationParticipantRow[]>(
    [],
  );
  const [participantCounts, setParticipantCounts] = useState<ParticipantCounts>(
    { total: 0, pending: 0, confirmed: 0 },
  );
  const [participantPageInfo, setParticipantPageInfo] =
    useState<ParticipantPageInfo>({
      limit: 25,
      hasMore: false,
      nextCursor: null,
    });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMoreParticipants, setLoadingMoreParticipants] = useState(false);
  const [scannerEmail, setScannerEmail] = useState("");
  const [addingScanner, setAddingScanner] = useState(false);
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [isAuthenticated]);

  const safeJson = async <T,>(res: Response): Promise<T | null> => {
    try {
      return (await res.json()) as T;
    } catch {
      return null;
    }
  };

  const scannerUsers = users.filter((u) => u.role === "SCANNER");
  const pendingCount = participantCounts.pending;
  const confirmedCount = participantCounts.confirmed;
  const totalCount = participantCounts.total;

  const fetchData = async (
    signal?: AbortSignal,
    opts?: { silent?: boolean },
  ) => {
    try {
      if (opts?.silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const [participantsResult, usersResult] = await Promise.allSettled([
        fetch(`${env.API_URL}/admin/reservation-participants?limit=25`, {
          credentials: "include",
          signal,
        }).then(async (res) => {
          if (!res.ok) {
            const data = await safeJson<{ error?: string }>(res);
            throw new Error(
              data?.error || "Failed to fetch reservation participants",
            );
          }
          const data = await safeJson<{
            data?: ReservationParticipantRow[];
            counts?: ParticipantCounts;
            pageInfo?: ParticipantPageInfo;
          }>(res);
          return {
            rows: data?.data ?? [],
            counts: data?.counts ?? { total: 0, pending: 0, confirmed: 0 },
            pageInfo: data?.pageInfo ?? {
              limit: 25,
              hasMore: false,
              nextCursor: null,
            },
          };
        }),
        fetch(`${env.API_URL}/admin/users`, {
          credentials: "include",
          signal,
        }).then(async (res) => {
          if (!res.ok) {
            const data = await safeJson<{ error?: string }>(res);
            throw new Error(data?.error || "Failed to fetch users");
          }
          const data = await safeJson<{ data?: User[] }>(res);
          return data?.data ?? [];
        }),
      ]);

      if (participantsResult.status === "fulfilled") {
        setParticipants(participantsResult.value.rows);
        setParticipantCounts(participantsResult.value.counts);
        setParticipantPageInfo(participantsResult.value.pageInfo);
      } else {
        toast.error(
          participantsResult.reason?.message || "Gagal memuat data reservasi",
        );
      }

      if (usersResult.status === "fulfilled") {
        setUsers(usersResult.value);
      } else {
        toast.error(usersResult.reason?.message || "Gagal memuat user");
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

  const loadMoreParticipants = async () => {
    if (loadingMoreParticipants) return;
    if (!participantPageInfo.hasMore || !participantPageInfo.nextCursor) return;

    try {
      setLoadingMoreParticipants(true);

      const res = await fetch(
        `${env.API_URL}/admin/reservation-participants?limit=${participantPageInfo.limit}&cursor=${encodeURIComponent(participantPageInfo.nextCursor)}`,
        {
          credentials: "include",
        },
      );

      if (!res.ok) {
        const data = await safeJson<{ error?: string }>(res);
        throw new Error(data?.error || "Gagal memuat data pengunjung");
      }

      const data = await safeJson<{
        data?: ReservationParticipantRow[];
        counts?: ParticipantCounts;
        pageInfo?: ParticipantPageInfo;
      }>(res);

      setParticipants((prev) => [...prev, ...(data?.data ?? [])]);
      if (data?.counts) setParticipantCounts(data.counts);
      if (data?.pageInfo) setParticipantPageInfo(data.pageInfo);
    } catch (error) {
      console.error("Error loading more participants:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal memuat data pengunjung",
      );
    } finally {
      setLoadingMoreParticipants(false);
    }
  };

  const refreshUsers = async () => {
    try {
      const res = await fetch(`${env.API_URL}/admin/users`, {
        credentials: "include",
      });

      if (!res.ok) {
        const data = await safeJson<{ error?: string }>(res);
        throw new Error(data?.error || "Failed to fetch users");
      }

      const data = await safeJson<{ data?: User[] }>(res);
      setUsers(data?.data ?? []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error instanceof Error ? error.message : "Gagal memuat user");
    }
  };

  const addScannerRole = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = addScannerSchema.safeParse({ email: scannerEmail.trim() });
    if (!parsed.success) {
      toast.error(parsed.error.issues?.[0]?.message || "Email tidak valid");
      return;
    }

    try {
      setAddingScanner(true);
      const res = await fetch(
        `${env.API_URL}/admin/users/${encodeURIComponent(parsed.data.email)}/scanner`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const data = await safeJson<{ error?: string }>(res);
        throw new Error(data?.error || "Gagal menambahkan scanner role");
      }

      setScannerEmail("");
      toast.success("Scanner role berhasil ditambahkan");
      await refreshUsers();
    } catch (error) {
      console.error("Error adding scanner role:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal menambahkan scanner role",
      );
    } finally {
      setAddingScanner(false);
    }
  };

  const removeScannerRole = async (email: string) => {
    try {
      setRemovingEmail(email);
      const res = await fetch(
        `${env.API_URL}/admin/users/${encodeURIComponent(email)}/scanner`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const data = await safeJson<{ error?: string }>(res);
        throw new Error(data?.error || "Gagal menghapus scanner role");
      }

      toast.success("Scanner role berhasil dihapus");
      await refreshUsers();
    } catch (error) {
      console.error("Error removing scanner role:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal menghapus scanner role",
      );
    } finally {
      setRemovingEmail(null);
    }
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
      <div className="mx-auto max-w-7xl py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-body text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
          </div>

          <button
            type="button"
            onClick={() => fetchData(undefined, { silent: true })}
            disabled={refreshing}
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-60"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
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
                  Account Management
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Admin accounts: {scannerUsers.length}
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
            <h2 className="font-body mb-4 text-xl font-semibold text-gray-800">
              Reservasi
            </h2>

            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {pendingCount}
                  </div>
                  <div className="text-gray-600">Menunggu</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {confirmedCount}
                  </div>
                  <div className="text-gray-600">Terkonfirmasi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {totalCount}
                  </div>
                  <div className="text-gray-600">Total</div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Kode Tiket
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Pengunjung
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Email
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Status
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Dibuat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">
                        {p.barcode}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {p.fullName}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {p.email}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            p.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {new Date(p.createdAt).toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center text-sm text-gray-600 sm:text-left">
                  Menampilkan {participants.length} dari {totalCount} pengunjung
                </p>

                {participantPageInfo.hasMore && (
                  <button
                    type="button"
                    onClick={loadMoreParticipants}
                    disabled={loadingMoreParticipants}
                    className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-60"
                  >
                    {loadingMoreParticipants ? "Memuat..." : "Muat lagi"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
