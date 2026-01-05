import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { env } from "../env";

export const ScannerRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isPending } = useAuthStore();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (isPending || !isAuthenticated) return;
    let active = true;

    const run = async () => {
      try {
        const res = await fetch(`${env.API_URL}/scanner/access`, {
          method: "GET",
          credentials: "include",
        });
        if (!active) return;
        if (!res.ok) {
          setIsAllowed(false);
          return;
        }
        const json = (await res.json()) as { allowed?: boolean };
        setIsAllowed(Boolean(json.allowed));
      } catch {
        if (active) setIsAllowed(false);
      }
    };

    setIsAllowed(null);
    void run();

    return () => {
      active = false;
    };
  }, [isAuthenticated, isPending]);

  if (isPending) return null;
  if (!isAuthenticated) {
    toast.info("Anda harus autentikasi terlebih dahulu.");
    return <Navigate to="/auth" replace />;
  }

  if (isAllowed === null) return null;
  if (!isAllowed) {
    toast.error("Akses khusus panitia scanner.");
    return <Navigate to="/" replace />;
  }

  return children;
};
