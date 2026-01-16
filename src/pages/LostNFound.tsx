import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Badge from "@/components/Badge";
import { env } from "@/env";
import { useAuthStore } from "@/store/authStore";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import type {
  LostFoundReport,
  CreateLostFoundReport,
  LostFoundType,
} from "@/types/lostnfound";

export default function LostNFoundPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [reports, setReports] = useState<LostFoundReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<LostFoundType | "ALL">("ALL");
  const [showReportForm, setShowReportForm] = useState(false);
  const [isScanner, setIsScanner] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    itemType: string;
  } | null>(null);

  useEffect(() => {
    fetchReports();
    checkScannerAccess();
  }, []);

  const checkScannerAccess = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await fetch(`${env.API_URL}/scanner/access`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setIsScanner(data.allowed);
      }
    } catch (error) {
      console.error("Error checking scanner access:", error);
    }
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${env.API_URL}/lostnfound`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setReports(data.data);
      } else {
        toast.error("Gagal memuat data");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const filteredReports =
    filterType === "ALL"
      ? reports
      : reports.filter((r) => r.type === filterType);

  const getStatusText = (status: string) => {
    switch (status) {
      case "REPORTED":
        return "Terlaporkan";
      case "AT_POST":
        return "Di Pos Lost & Found";
      case "CLAIMED":
        return "Sudah Diambil";
      default:
        return status;
    }
  };

  return (
    <section className="bg-mixed min-h-lvh">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 py-28 text-center">
        <motion.div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge>Lost & Found</Badge>
          </motion.div>
        </motion.div>

        <div className="mb-8 flex w-full items-center justify-between">
          <motion.button
            className="justify-self-start rounded-xl bg-[#FFEBB8] px-3 py-1 text-[11px] font-bold text-[#B64556] hover:bg-[#FFEBB8]/90"
            onClick={() => navigate("/")}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="inline-flex items-center gap-1">
              <IoIosArrowBack size={16} />
              <span className="mb-1">Kembali</span>
            </p>
          </motion.button>
          <div className="flex gap-2">
            {user && (
              <motion.button
                onClick={() => setShowReportForm(true)}
                className="font-body rounded-lg px-3 py-2 font-bold text-[#5a1130] shadow-lg"
                style={{
                  background: "linear-gradient(to bottom,#FFD88C,#FFB366)",
                  border: "2px solid #FFB366",
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
              >
                Lapor Barang
              </motion.button>
            )}
            {isScanner && (
              <motion.button
                onClick={() => navigate("/lostnfound/admin")}
                className="font-body rounded-lg px-3 py-2 font-bold text-[#5a1130] shadow-lg"
                style={{
                  background: "linear-gradient(to bottom,#FFD88C,#FFB366)",
                  border: "2px solid #FFB366",
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
              >
                Admin Panel
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter */}
        <motion.div
          className="mb-6 flex justify-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
        >
          <button
            onClick={() => setFilterType("ALL")}
            className="font-body rounded-lg px-4 py-2 font-bold shadow-lg"
            style={{
              background:
                filterType === "ALL"
                  ? "linear-gradient(to bottom,#FFD88C,#FFB366)"
                  : "linear-gradient(to bottom, #FFD88C, #FFB366)",
              border:
                filterType === "ALL"
                  ? "2px solid #FFB366"
                  : "2px solid #FFB366",
              color: "#3b0526",
              opacity: filterType === "ALL" ? 1 : 0.6,
            }}
          >
            Semua
          </button>
          <button
            onClick={() => setFilterType("LOST")}
            className="font-body rounded-lg px-4 py-2 font-bold shadow-lg"
            style={{
              background:
                filterType === "LOST"
                  ? "linear-gradient(to bottom,#FFD88C,#FFB366)"
                  : "linear-gradient(to bottom, #FFD88C, #FFB366)",
              border:
                filterType === "LOST"
                  ? "2px solid #FFB366"
                  : "2px solid #FFB366",
              color: "#3b0526",
              opacity: filterType === "LOST" ? 1 : 0.6,
            }}
          >
            Barang Hilang
          </button>
          <button
            onClick={() => setFilterType("FOUND")}
            className="font-body rounded-lg px-4 py-2 font-bold shadow-lg"
            style={{
              background:
                filterType === "FOUND"
                  ? "linear-gradient(to bottom,#FFD88C,#FFB366)"
                  : "linear-gradient(to bottom, #FFD88C, #FFB366)",
              border:
                filterType === "FOUND"
                  ? "2px solid #FFB366"
                  : "2px solid #FFB366",
              color: "#3b0526",
              opacity: filterType === "FOUND" ? 1 : 0.6,
            }}
          >
            Barang Ditemukan
          </button>
        </motion.div>

        {/* Reports Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <p className="font-body text-xl font-bold text-[#FFEBB8]">
              Memuat data...
            </p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-body text-xl font-bold text-[#FFEBB8]">
              Belum ada laporan
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report, idx) => (
              <motion.div
                key={report.id}
                className="rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-6 shadow-2xl"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: idx * 0.08,
                }}
                onClick={() =>
                  setPreviewImage({
                    url: report.photoUrl!,
                    itemType: report.itemType,
                  })
                }
              >
                {report.photoUrl && (
                  <img
                    src={report.photoUrl}
                    alt={report.itemType}
                    className="mb-4 h-48 w-full cursor-pointer rounded-lg object-cover transition-transform hover:scale-105"
                  />
                )}
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="font-body rounded-full px-3 py-1 text-sm font-semibold"
                    style={{
                      background:
                        report.type === "LOST" ? "#F3414E" : "#4CAF50",
                      color: "#ffebb8",
                    }}
                  >
                    {report.type === "LOST" ? "Hilang" : "Ditemukan"}
                  </span>
                  <span
                    className="font-body rounded-full px-3 py-1 text-sm font-semibold text-[#FFEBB8] underline"
                    // style={{
                    //   background:
                    //     report.status === "REPORTED"
                    //       ? "#FFC107"
                    //       : report.status === "AT_POST"
                    //         ? "#2196F3"
                    //         : "#4CAF50",
                    // }}
                  >
                    {getStatusText(report.status)}
                  </span>
                </div>
                <h3 className="font-body mb-2 text-xl font-bold text-[#FFEBB8]">
                  {report.itemType}
                </h3>
                <p className="font-body mb-2 text-[#FFEBB8]">
                  {report.specification}
                </p>
                <div className="font-body space-y-1 text-sm text-[#FFEBB8]">
                  <p>Lokasi: {report.location}</p>
                  <p className="text-xs">
                    {report.type === "LOST" ? "Hilang" : "Ditemukan"}
                    {": "}
                    {new Date(report.lostFoundTime).toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs">
                    Dilaporkan:{" "}
                    {new Date(report.createdAt).toLocaleString("id-ID")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Report Form Modal */}
      {showReportForm && (
        <ReportFormModal
          onClose={() => setShowReportForm(false)}
          onSuccess={() => {
            setShowReportForm(false);
            fetchReports();
          }}
        />
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button
              className="font-body absolute -top-12 right-0 text-3xl font-bold text-[#FFEBB8] hover:text-white"
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>
            <img
              src={previewImage.url}
              alt={previewImage.itemType}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="font-body mt-4 text-center text-lg font-bold text-[#FFEBB8]">
              {previewImage.itemType}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function ReportFormModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState<CreateLostFoundReport>({
    type: "LOST",
    itemType: "",
    specification: "",
    lostFoundTime: "",
    location: "",
    photoUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { uploadImage, uploading, error: uploadError } = useCloudinaryUpload();
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let photoUrl = "";
      if (imageFile) {
        const url = await uploadImage(imageFile);
        if (!url) {
          toast.error(
            uploadError || "Gagal mengupload foto. Silakan coba lagi.",
          );
          setSubmitting(false);
          return;
        }
        photoUrl = url;
      }

      const res = await fetch(`${env.API_URL}/lostnfound`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          lostFoundTime: new Date(formData.lostFoundTime).toISOString(),
          photoUrl: photoUrl || undefined,
        }),
      });

      if (res.ok) {
        toast.success("Laporan berhasil dibuat");
        onSuccess();
      } else {
        const data = await res.json();
        toast.error(data.error || "Gagal membuat laporan");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
      <div className="my-auto w-full max-w-2xl rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-8 shadow-2xl">
        <h2 className="font-body mb-6 text-2xl font-bold text-[#FFEBB8]">
          Lapor Barang
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
              Jenis Laporan
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as LostFoundType,
                })
              }
              className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
              required
            >
              <option value="LOST">Barang Hilang</option>
              <option value="FOUND">Barang Ditemukan</option>
            </select>
          </div>

          <div>
            <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
              Jenis Barang
            </label>
            <input
              type="text"
              value={formData.itemType}
              onChange={(e) =>
                setFormData({ ...formData, itemType: e.target.value })
              }
              placeholder="e.g., Dompet, HP, Tas"
              className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
              Spesifikasi Barang
            </label>
            <textarea
              value={formData.specification}
              onChange={(e) =>
                setFormData({ ...formData, specification: e.target.value })
              }
              placeholder="Deskripsi detail barang"
              className="h-24 w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
              Waktu Hilang/Ditemukan
            </label>
            <input
              type="datetime-local"
              value={formData.lostFoundTime}
              onChange={(e) =>
                setFormData({ ...formData, lostFoundTime: e.target.value })
              }
              className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
              Lokasi
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Lokasi hilang/ditemukan"
              className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
              Foto Barang
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 h-48 w-full rounded object-cover"
              />
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="font-body flex-1 rounded-lg px-4 py-2 font-semibold text-[#3b0526] shadow-lg disabled:opacity-50"
              style={{
                background: "linear-gradient(to bottom,#FFD88C,#FFB366)",
                border: "2px solid #FFB366",
                opacity: 0.8,
              }}
              disabled={submitting || uploading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="font-body flex-1 rounded-lg px-4 py-2 font-semibold text-[#3b0526] shadow-lg disabled:opacity-50"
              style={{
                background: "linear-gradient(to bottom,#FFD88C,#FFB366)",
                border: "2px solid #FFB366",
              }}
              disabled={submitting || uploading}
            >
              {submitting || uploading ? "Mengirim..." : "Kirim Laporan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
