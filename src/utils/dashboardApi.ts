import { env } from "@/env";
import type { User, ParticipantCounts } from "@/types/dashboard";
import { z } from "zod";

export const addScannerSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

export const safeJson = async <T>(res: Response): Promise<T | null> => {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
};

export const fetchScannerUsers = async (
  signal?: AbortSignal,
): Promise<User[]> => {
  const res = await fetch(`${env.API_URL}/admin/users/scanners`, {
    credentials: "include",
    signal,
  });

  if (!res.ok) {
    const data = await safeJson<{ error?: string }>(res);
    throw new Error(data?.error || "Failed to fetch scanner users");
  }

  const data = await safeJson<{ data?: User[] }>(res);
  return data?.data ?? [];
};

export const fetchParticipantCounts = async (
  signal?: AbortSignal,
): Promise<ParticipantCounts> => {
  const res = await fetch(
    `${env.API_URL}/admin/reservation-participants/counts`,
    {
      credentials: "include",
      signal,
    },
  );

  if (!res.ok) {
    const data = await safeJson<{ error?: string }>(res);
    throw new Error(data?.error || "Failed to fetch participant counts");
  }

  const data = await safeJson<{
    total?: number;
    pending?: number;
    confirmed?: number;
  }>(res);

  return {
    total: data?.total ?? 0,
    pending: data?.pending ?? 0,
    confirmed: data?.confirmed ?? 0,
  };
};

export const addScannerRoleApi = async (email: string): Promise<void> => {
  const parsed = addScannerSchema.safeParse({ email: email.trim() });
  if (!parsed.success) {
    throw new Error(parsed.error.issues?.[0]?.message || "Email tidak valid");
  }

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
};

export const removeScannerRoleApi = async (email: string): Promise<void> => {
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
};

export const exportParticipantsApi = async (): Promise<void> => {
  const res = await fetch(
    `${env.API_URL}/admin/reservation-participants/export`,
    {
      credentials: "include",
    },
  );

  if (!res.ok) {
    const data = await safeJson<{ error?: string }>(res);
    throw new Error(data?.error || "Gagal mengekspor peserta");
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `itbday-export-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
