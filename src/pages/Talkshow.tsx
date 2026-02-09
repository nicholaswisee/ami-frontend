import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { useReservationCacheStore } from "../store/reservationCacheStore";
import {
  useReservations,
  useTalkshowRegistrations,
  // useTalkshowCounts,
  useCreateTalkshowRegistration,
  useSessions,
} from "../hooks/queries";
import { motion } from "framer-motion";

// Set to true to enable talkshow registration
const TALKSHOW_REGISTRATION_OPEN = false;

export default function TalkshowPage() {
  const { isAuthenticated, isPending, user } = useAuthStore();
  const navigate = useNavigate();
  const userId = user?.id;

  const getReservations = useReservationCacheStore((s) => s.getReservations);
  const cachedReservations = userId ? getReservations(userId) : null;

  const { data: reservationsData, isLoading: isLoadingReservations } =
    useReservations(!cachedReservations?.length, userId);
  const reservations = cachedReservations?.length
    ? cachedReservations
    : (reservationsData?.reservations ?? []);
  const hasReservation = reservations.length > 0;
  const firstReservation = reservations[0];

  const { isLoading: isLoadingTalkshow } = useTalkshowRegistrations(
    hasReservation,
    userId,
  );

  const { data: sessionsData } = useSessions();
  // const { data: talkshowCounts } = useTalkshowCounts(isAuthenticated);
  const sessionOptions = sessionsData?.sessions ?? [
    { id: "1", code: "1", name: "Sesi 1", description: null },
    { id: "2", code: "2", name: "Sesi 2", description: null },
  ];

  const createTalkshow = useCreateTalkshowRegistration(userId);

  const [formData, setFormData] = useState({
    sessionCode: "" as "" | "1" | "2",
    expectation: "",
  });
  const [participants, setParticipants] = useState<
    Array<{ fullName: string; email: string; school: string; region: string }>
  >([{ fullName: "", email: "", school: "", region: "" }]);
  const [activeParticipantIndex, setActiveParticipantIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user && !firstReservation) return;
    setParticipants((prev) => {
      if (prev.length === 0) return prev;
      return [
        {
          ...prev[0],
          email: prev[0].email || user?.email || firstReservation?.email || "",
          fullName:
            prev[0].fullName ||
            user?.name ||
            firstReservation?.contactFullName ||
            "",
          school: prev[0].school || firstReservation?.contactSchool || "",
          region: prev[0].region || firstReservation?.contactRegion || "",
        },
        ...prev.slice(1),
      ];
    });
  }, [
    user?.email,
    user?.name,
    firstReservation?.email,
    firstReservation?.contactFullName,
    firstReservation?.contactSchool,
    firstReservation?.contactRegion,
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (
    index: number,
    key: "fullName" | "email" | "school" | "region",
    value: string,
  ) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [key]: value } : p)),
    );
  };

  const addParticipant = () => {
    const active = participants[activeParticipantIndex];
    if (
      active &&
      (!active.fullName.trim() || !active.email.trim() || !active.region.trim())
    ) {
      toast.info("Lengkapi data peserta yang aktif terlebih dahulu.");
      return;
    }
    setParticipants((prev) => [
      ...prev,
      { fullName: "", email: "", school: "", region: "" },
    ]);
    setActiveParticipantIndex(participants.length);
  };

  const removeParticipant = (index: number) => {
    if (participants.length <= 1) return;
    setParticipants((prev) => prev.filter((_, i) => i !== index));
    setActiveParticipantIndex((prev) => {
      if (index < prev) return prev - 1;
      if (index === prev) return Math.max(0, prev - 1);
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!TALKSHOW_REGISTRATION_OPEN) {
      toast.info(
        "Registrasi ulang talkshow akan dibuka segera ya, Luminettes!",
      );
      return;
    }
    if (!firstReservation?.id) {
      toast.error("Reservasi tidak ditemukan.");
      return;
    }
    if (!formData.sessionCode) {
      toast.error("Pilih sesi talkshow.");
      return;
    }
    if (!formData.expectation.trim()) {
      toast.error("Harapan ikut talkshow wajib diisi.");
      return;
    }
    const validParticipants = participants.filter(
      (p) => p.fullName.trim() && p.email.trim() && p.region.trim(),
    );
    if (validParticipants.length === 0) {
      toast.error("Lengkapi data minimal satu peserta (nama, email, daerah).");
      return;
    }
    const first = validParticipants[0]!;
    setIsSubmitting(true);
    try {
      await createTalkshow.mutateAsync({
        reservationId: firstReservation.id,
        sessionCode: formData.sessionCode as "1" | "2",
        email: first.email,
        fullName: first.fullName,
        school: first.school || undefined,
        region: first.region,
        expectation: formData.expectation,
        participants: validParticipants.map((p) => ({
          fullName: p.fullName,
          email: p.email,
          school: p.school || undefined,
          region: p.region,
        })),
      });
      toast.success("Pendaftaran talkshow berhasil!");
      navigate("/profile");
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof err.message === "string"
          ? err.message
          : "Gagal mendaftar. Coba lagi.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) return <div className="bg-mixed min-h-lvh w-full" />;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  const loading =
    isLoadingReservations || (hasReservation && isLoadingTalkshow);
  if (loading) {
    return (
      <div className="bg-mixed flex min-h-screen w-full items-center justify-center">
        <p className="text-lg font-bold text-[#302A77]">Memuat...</p>
      </div>
    );
  }

  if (!hasReservation) {
    return (
      <div className="bg-mixed flex min-h-screen w-full flex-col items-center justify-center px-4 py-10">
        <motion.div
          className="max-w-lg rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-8 shadow-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="font-subheading text-center font-bold text-[#FFEBB8] drop-shadow-md">
            Daftar Talkshow
          </h2>
          <p className="mt-4 text-center font-bold text-[#FFEBB8]">
            Kamu belum memiliki reservasi ITB Day. Silakan daftar tiket dulu
            sebelum mendaftar talkshow.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/rsvp")}
              className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-2 text-sm font-bold text-[#FFEBB8] shadow-lg hover:bg-[#1B165E]"
            >
              Reservasi Tiket ITB Day
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!TALKSHOW_REGISTRATION_OPEN) {
    return (
      <div className="bg-mixed flex min-h-screen w-full flex-col items-center justify-center px-4">
        <motion.div
          className="max-w-lg rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-8 shadow-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="font-subheading text-center font-bold text-[#FFEBB8] drop-shadow-md"></h2>
          <p className="mt-4 text-center font-bold text-[#FFEBB8]">
            Pendaftaran talkshow akan dibuka segera ya, Luminettes!
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-2 text-sm font-bold text-[#FFEBB8] shadow-lg hover:bg-[#1B165E]"
            >
              Kembali
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-mixed flex min-h-screen w-full items-center justify-center px-4 py-10">
      <motion.div
        className="relative my-auto mt-10 w-full max-w-lg overflow-y-auto rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-8 shadow-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h3 className="font-subheading text-center font-bold text-[#FFEBB8] drop-shadow-md">
          Daftar Talkshow
        </h3>
        {/* {talkshowCounts && (
          <p className="mt-2 text-center text-sm font-bold text-[#FFEBB8]/95">
            Jumlah peserta terdaftar: {talkshowCounts.total} (Sesi 1:{" "}
            {talkshowCounts.session1}, Sesi 2: {talkshowCounts.session2})
          </p>
        )} */}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 pr-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-center text-sm font-bold text-[#FFEBB8]">
                Sesi 1 (09.10 - 11.10)
              </p>
              <img
                src="/talkshow/poster-sesi1.webp"
                alt="Poster Sesi 1"
                className="aspect-3/4 w-full rounded-xl bg-[#FFEBB8]/20 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/itbday/talkshow.webp";
                }}
              />
            </div>
            <div>
              <p className="mb-1 text-center text-sm font-bold text-[#FFEBB8]">
                Sesi 2 (12.00 - 14.00)
              </p>
              <img
                src="/talkshow/poster-sesi2.webp"
                alt="Poster Sesi 2"
                className="aspect-3/4 w-full rounded-xl bg-[#FFEBB8]/20 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/itbday/talkshow.webp";
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-body text-lg font-bold text-[#FFEBB8]">
              Data Peserta
            </h4>
            <div className="rounded-2xl border-2 border-[#FFEBB8]/20 bg-[#FFEBB8]/10 p-4">
              <div className="flex gap-2 overflow-x-auto pb-1 *:shrink-0">
                {participants.map((_, idx) => {
                  const active = idx === activeParticipantIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveParticipantIndex(idx)}
                      className={`shrink-0 rounded-lg border px-3 py-1 text-[11px] font-bold transition ${
                        active
                          ? "border-[#FFEBB8] bg-[#302A77] text-[#FFEBB8]"
                          : "border-[#FFEBB8]/30 bg-[#FFEBB8]/10 text-[#FFEBB8] hover:bg-[#FFEBB8]/20"
                      }`}
                    >
                      Peserta {idx + 1}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={addParticipant}
                  className="rounded-xl bg-[#FFEBB8] px-4 py-1.5 text-xs font-bold text-[#B64556] hover:bg-[#FFEBB8]/90"
                >
                  + Tambah Peserta
                </button>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-[#FFEBB8]/30 bg-[#FFEBB8]/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-lg font-bold text-[#FFEBB8]">
                  Peserta {activeParticipantIndex + 1}
                </p>
                {participants.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeParticipant(activeParticipantIndex)}
                    className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-4 py-1.5 text-xs font-bold text-[#FFEBB8] hover:bg-[#1B165E]"
                  >
                    Hapus
                  </button>
                ) : null}
              </div>
              <div className="space-y-3">
                <input
                  value={participants[activeParticipantIndex]?.fullName ?? ""}
                  onChange={(e) =>
                    handleParticipantChange(
                      activeParticipantIndex,
                      "fullName",
                      e.target.value,
                    )
                  }
                  type="text"
                  required
                  placeholder="Nama Lengkap *"
                  className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                />
                <input
                  value={participants[activeParticipantIndex]?.email ?? ""}
                  onChange={(e) =>
                    handleParticipantChange(
                      activeParticipantIndex,
                      "email",
                      e.target.value,
                    )
                  }
                  type="email"
                  required
                  placeholder="Email *"
                  className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                />
                <input
                  value={participants[activeParticipantIndex]?.school ?? ""}
                  onChange={(e) =>
                    handleParticipantChange(
                      activeParticipantIndex,
                      "school",
                      e.target.value,
                    )
                  }
                  type="text"
                  placeholder="Asal Sekolah"
                  className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                />
                <input
                  value={participants[activeParticipantIndex]?.region ?? ""}
                  onChange={(e) =>
                    handleParticipantChange(
                      activeParticipantIndex,
                      "region",
                      e.target.value,
                    )
                  }
                  type="text"
                  required
                  placeholder="Asal Daerah *"
                  className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
              Pilih Sesi Talkshow *
            </label>
            <select
              name="sessionCode"
              value={formData.sessionCode}
              onChange={handleChange}
              required
              className="w-full cursor-pointer appearance-none rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
            >
              <option value="">Pilih Sesi</option>
              {sessionOptions.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
              Harapan Ikut Talkshow *
            </label>
            <textarea
              name="expectation"
              required
              rows={3}
              value={formData.expectation}
              onChange={handleChange}
              placeholder="Harapan Ikut Talkshow"
              className="w-full resize-none rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-3 text-sm font-bold text-[#FFEBB8] shadow-lg hover:bg-[#1B165E] disabled:opacity-60"
            >
              {isSubmitting ? "Memproses..." : "Daftar Talkshow"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
