import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { useScannerAccess } from "../hooks/useScannerAccess";

export const ScannerRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isPending } = useAuthStore();
  const { data: isAllowed, isLoading } = useScannerAccess(isAuthenticated);

  if (isPending || isLoading) return null;

  if (!isAuthenticated) {
    toast.info("Anda harus autentikasi terlebih dahulu.");
    return <Navigate to="/auth" replace />;
  }

  if (!isAllowed) {
    toast.info("Halaman yang kamu cari tidak ditemukan.");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
