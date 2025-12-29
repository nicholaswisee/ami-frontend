import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isPending } = useAuthStore();

  if (isPending) return null;
  if (!isAuthenticated) {
    toast.info("Anda harus autentikasi terlebih dahulu.");
    return <Navigate to="/auth" replace />;
  }

  return children;
};
