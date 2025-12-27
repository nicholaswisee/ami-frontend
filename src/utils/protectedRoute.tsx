import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isPending } = useAuthStore();

  if (isPending) return null;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
};
