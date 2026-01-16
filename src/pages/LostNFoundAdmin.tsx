import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Badge from "@/components/Badge";
import { env } from "@/env";
import type { LostFoundReport, LostFoundStatus } from "@/types/lostnfound";

export default function LostNFoundAdmin() {
  const [reports, setReports] = useState<LostFoundReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

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

  const updateStatus = async (id: string, status: LostFoundStatus) => {
    try {
      const res = await fetch(`${env.API_URL}/lostnfound/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success("Status berhasil diupdate");
        fetchReports();
      } else {
        const data = await res.json();
        toast.error(data.error || "Gagal mengupdate status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Terjadi kesalahan");
    }
  };

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

  if (loading) {
    return (
      <section className="bg-mixed min-h-lvh">
        <div className="py-20 text-center">
          <p className="font-body text-xl font-bold text-[#FFEBB8]">
            Memuat data...
          </p>
        </div>
      </section>
    );
  }

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
            <Badge>Lost & Found Admin</Badge>
          </motion.div>
        </motion.div>

        <div className="w-full">
          {/* Summary Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-[#B64556] p-4 text-center">
              <p className="text-3xl font-bold text-[#FFEBB8]">
                {reports.length}
              </p>
              <p className="text-sm text-[#FFEBB8]">Total Laporan</p>
            </div>
            <div className="rounded-xl bg-[#F3414E]/80 p-4 text-center">
              <p className="text-3xl font-bold text-[#FFEBB8]">
                {reports.filter((r) => r.type === "LOST").length}
              </p>
              <p className="text-sm text-[#FFEBB8]">Barang Hilang</p>
            </div>
            <div className="rounded-xl bg-[#4CAF50]/80 p-4 text-center">
              <p className="text-3xl font-bold text-[#FFEBB8]">
                {reports.filter((r) => r.type === "FOUND").length}
              </p>
              <p className="text-sm text-[#FFEBB8]">Barang Ditemukan</p>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-6">
            {reports.map((report, idx) => (
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
              >
                {/* Header with Type and Status */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-body rounded-full px-3 py-1 text-sm font-semibold"
                      style={{
                        background:
                          report.type === "LOST" ? "#F3414E" : "#4CAF50",
                        color: "#ffebb8",
                      }}
                    >
                      {report.type === "LOST" ? " Hilang" : " Ditemukan"}
                    </span>
                    <span
                      className="font-body rounded-full px-3 py-1 text-sm font-semibold text-[#FFEBB8]"
                      style={{
                        background:
                          report.status === "REPORTED"
                            ? "#FFC107"
                            : report.status === "AT_POST"
                              ? "#2196F3"
                              : "#4CAF50",
                      }}
                    >
                      {getStatusText(report.status)}
                    </span>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Image Section */}
                  {report.photoUrl && (
                    <div className="lg:col-span-1">
                      <img
                        src={report.photoUrl}
                        alt={report.itemType}
                        className="h-full w-full rounded-lg object-contain"
                      />
                    </div>
                  )}

                  {/* Content Section */}
                  <div
                    className={
                      report.photoUrl ? "lg:col-span-2" : "lg:col-span-3"
                    }
                  >
                    <div className="mb-4">
                      <h3 className="font-body mb-2 text-2xl font-bold text-[#FFEBB8]">
                        {report.itemType}
                      </h3>
                      <p className="font-body text-[#FFEBB8]/90">
                        {report.specification}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-[#FFEBB8]/10 p-3">
                        <p className="text-xs text-[#FFEBB8]/60"> Lokasi</p>
                        <p className="font-body text-sm font-semibold text-[#FFEBB8]">
                          {report.location}
                        </p>
                      </div>
                      <div className="rounded-lg bg-[#FFEBB8]/10 p-3">
                        <p className="text-xs text-[#FFEBB8]/60"> Waktu</p>
                        <p className="font-body text-sm font-semibold text-[#FFEBB8]">
                          {new Date(report.lostFoundTime).toLocaleString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                      <div className="rounded-lg bg-[#FFEBB8]/10 p-3">
                        <p className="text-xs text-[#FFEBB8]/60"> Dilaporkan</p>
                        <p className="font-body text-sm font-semibold text-[#FFEBB8]">
                          {new Date(report.createdAt).toLocaleString("id-ID", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="rounded-lg bg-[#FFEBB8]/10 p-3">
                        <p className="text-xs text-[#FFEBB8]/60"> Tipe</p>
                        <p className="font-body text-sm font-semibold text-[#FFEBB8]">
                          {report.type === "LOST"
                            ? "Barang Hilang"
                            : "Barang Ditemukan"}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="rounded-lg bg-[#FFEBB8]/5 p-4">
                      <p className="mb-3 text-sm font-semibold text-[#FFEBB8]/80">
                        Update Status:
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => updateStatus(report.id, "REPORTED")}
                          disabled={report.status === "REPORTED"}
                          className="font-body rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition-all"
                          style={{
                            background:
                              report.status === "REPORTED"
                                ? "#D9D9D9"
                                : "linear-gradient(to bottom,#FFD88C,#FFB366)",
                            border:
                              report.status === "REPORTED"
                                ? "2px solid #999"
                                : "2px solid #FFB366",
                            color: "#3b0526",
                            cursor:
                              report.status === "REPORTED"
                                ? "not-allowed"
                                : "pointer",
                            opacity: report.status === "REPORTED" ? 0.6 : 1,
                            transform:
                              report.status === "REPORTED"
                                ? "scale(0.95)"
                                : "scale(1)",
                          }}
                        >
                          Terlaporkan
                        </button>
                        <button
                          onClick={() => updateStatus(report.id, "AT_POST")}
                          disabled={report.status === "AT_POST"}
                          className="font-body rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition-all"
                          style={{
                            background:
                              report.status === "AT_POST"
                                ? "#D9D9D9"
                                : "linear-gradient(to bottom,#8DD5FF,#4FA8D5)",
                            border:
                              report.status === "AT_POST"
                                ? "2px solid #999"
                                : "2px solid #4FA8D5",
                            color:
                              report.status === "AT_POST" ? "#3b0526" : "#fff",
                            cursor:
                              report.status === "AT_POST"
                                ? "not-allowed"
                                : "pointer",
                            opacity: report.status === "AT_POST" ? 0.6 : 1,
                            transform:
                              report.status === "AT_POST"
                                ? "scale(0.95)"
                                : "scale(1)",
                          }}
                        >
                          Di Pos
                        </button>
                        <button
                          onClick={() => updateStatus(report.id, "CLAIMED")}
                          disabled={report.status === "CLAIMED"}
                          className="font-body rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition-all"
                          style={{
                            background:
                              report.status === "CLAIMED"
                                ? "#D9D9D9"
                                : "linear-gradient(to bottom,#8DFF8D,#4CAF50)",
                            border:
                              report.status === "CLAIMED"
                                ? "2px solid #999"
                                : "2px solid #4CAF50",
                            color:
                              report.status === "CLAIMED" ? "#3b0526" : "#fff",
                            cursor:
                              report.status === "CLAIMED"
                                ? "not-allowed"
                                : "pointer",
                            opacity: report.status === "CLAIMED" ? 0.6 : 1,
                            transform:
                              report.status === "CLAIMED"
                                ? "scale(0.95)"
                                : "scale(1)",
                          }}
                        >
                          Sudah Diambil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {reports.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-body text-xl font-bold text-[#FFEBB8]">
              Belum ada laporan
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
