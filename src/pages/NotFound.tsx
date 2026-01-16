import { Navigate } from "react-router";
import { toast } from "sonner";

export default function NotFoundPage() {
  toast.info("Halaman yang kamu cari tidak ditemukan.");
  return <Navigate to="/" replace />;
}
