import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { env } from "../env";
import { useAuthStore } from "../store/authStore";
import { AnimatePresence, motion } from "framer-motion";

type EventSessionCode = "1" | "2";
type TicketStatus = "PENDING" | "CONFIRMED";

type EventSession = {
  id: string;
  code: EventSessionCode;
  name: string;
  description: string | null;
};

type ReservationParticipant = {
  id: string;
  fullName: string;
  school: string;
  region: string;
};

type Reservation = {
  id: string;
  email: string;
  contactFullName: string;
  contactSchool: string;
  contactRegion: string;
  wantsTalkshow: boolean;
  talkshowExpectation: string | null;
  barcode: string;
  status: TicketStatus;
  createdAt: string;
  session: EventSession | null;
  participants: ReservationParticipant[];
};

export default function RsvpPage() {
  const { isAuthenticated, isPending, user } = useAuthStore();
  const navigate = useNavigate();

  type Step = "CONTACT" | "TALKSHOW" | "PARTICIPANTS" | "REVIEW" | "SUCCESS";

  const [step, setStep] = useState<Step>("CONTACT");
  const [, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const [sessions, setSessions] = useState<EventSession[]>([]);
  const [, setCreatedReservation] = useState<Reservation | null>(null);
  const [isFirstParticipantSynced, setIsFirstParticipantSynced] =
    useState(true);

  const [formData, setFormData] = useState({
    email: "",
    contactFullName: "",
    contactPhone: "",
    contactSchool: "",
    contactRegion: "",
    sessionCode: "" as "" | EventSessionCode,
    wantsTalkshow: false,
    talkshowExpectation: "",
  });

  const [participants, setParticipants] = useState<
    Array<{ fullName: string; phone: string; school: string; region: string }>
  >([{ fullName: "", phone: "", school: "", region: "" }]);
  const [activeParticipantIndex, setActiveParticipantIndex] = useState(0);

  const sessionOptions = useMemo(() => {
    if (sessions.length > 0) return sessions;
    return [
      { id: "1", code: "1" as const, name: "Sesi 1", description: null },
      { id: "2", code: "2" as const, name: "Sesi 2", description: null },
    ];
  }, [sessions]);

  useEffect(() => {
    if (!user) return;

    setFormData((prev) => ({
      ...prev,
      email: prev.email || user.email || "",
      contactFullName: prev.contactFullName || user.name || "",
    }));
  }, [user]);

  useEffect(() => {
    if (!isFirstParticipantSynced) return;
    setParticipants((prev) => {
      if (prev.length === 0) return prev;
      return [
        {
          ...prev[0],
          fullName: formData.contactFullName,
          phone: formData.contactPhone,
          school: formData.contactSchool,
          region: formData.contactRegion,
        },
        ...prev.slice(1),
      ];
    });
  }, [
    formData.contactFullName,
    formData.contactPhone,
    formData.contactSchool,
    formData.contactRegion,
    isFirstParticipantSynced,
  ]);

  useEffect(() => {
    const run = async () => {
      setIsLoadingSessions(true);
      try {
        const res = await fetch(`${env.API_URL}/sessions`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) return;
        const json = (await res.json()) as { sessions: EventSession[] };
        setSessions(json.sessions ?? []);
      } catch {
        // ignore: UI falls back to static session options
      } finally {
        setIsLoadingSessions(false);
      }
    };

    void run();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    // Filter non-digits for phone fields
    const filteredValue =
      name === "contactPhone" ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: filteredValue }));
  };

  const handleParticipantChange = (
    index: number,
    key: "fullName" | "phone" | "school" | "region",
    value: string,
  ) => {
    if (index === 0 && isFirstParticipantSynced) {
      setIsFirstParticipantSynced(false);
    }
    // Filter non-digits for phone field
    const filteredValue = key === "phone" ? value.replace(/\D/g, "") : value;
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [key]: filteredValue } : p)),
    );
  };

  const addParticipant = () => {
    const missing = getMissingActiveParticipantFields();
    if (missing.length) {
      toast.info("Lengkapi data yang dibutuhkan");
      return;
    }
    setParticipants((prev) => [
      ...prev,
      { fullName: "", phone: "", school: "", region: "" },
    ]);
    setActiveParticipantIndex((prev) => prev + 1);
  };

  const removeParticipant = (index: number) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
    setActiveParticipantIndex((prev) => {
      if (index < prev) return prev - 1;
      if (index === prev) return Math.max(0, prev - 1);
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      participants.some(
        (p) => !p.fullName.trim() || !p.phone.trim() || !p.region.trim(),
      )
    ) {
      toast.error("Lengkapi data semua pengunjung (nama, telepon, daerah).");
      return;
    }

    if (formData.wantsTalkshow && !formData.talkshowExpectation.trim()) {
      toast.error("Harapan ikut talkshow wajib diisi jika kamu ikut talkshow.");
      return;
    }

    if (formData.wantsTalkshow && !formData.sessionCode) {
      toast.error("Pilih sesi talkshow terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${env.API_URL}/reservations`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          contactFullName: formData.contactFullName,
          contactPhone: formData.contactPhone,
          contactSchool: formData.contactSchool,
          contactRegion: formData.contactRegion,
          wantsTalkshow: formData.wantsTalkshow,
          talkshowExpectation: formData.wantsTalkshow
            ? formData.talkshowExpectation
            : undefined,
          sessionCode: formData.wantsTalkshow
            ? formData.sessionCode
            : undefined,
          participants,
        }),
      });

      if (res.status === 401) {
        toast.error("Silakan login terlebih dahulu.");
        return;
      }

      if (res.status === 409) {
        const json = await res.json().catch(() => null);
        toast.error(
          json?.message ?? "Email ini sudah terdaftar untuk sesi yang dipilih.",
        );
        return;
      }

      if (!res.ok) {
        toast.error("Gagal membuat reservasi. Coba lagi.");
        return;
      }

      const json = (await res.json()) as { reservation: Reservation };
      setCreatedReservation(json.reservation);
      setIsSuccess(true);
      setStep("SUCCESS");
      window.scrollTo(0, 0);
      toast.success("Pemesanan tiket berhasil!");
    } catch {
      toast.error("Gagal membuat reservasi. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) return <div className="bg-mixed min-h-lvh w-full"></div>;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  const canNextFromContact =
    formData.email.trim() &&
    formData.contactFullName.trim() &&
    formData.contactPhone.trim() &&
    formData.contactRegion.trim();

  const canNextFromTalkshow =
    !formData.wantsTalkshow ||
    (Boolean(formData.sessionCode) &&
      Boolean(formData.talkshowExpectation.trim()));

  const activeParticipant = participants[activeParticipantIndex] ?? {
    fullName: "",
    phone: "",
    school: "",
    region: "",
  };

  const getMissingContactFields = () => {
    const missing: string[] = [];
    if (!formData.email.trim()) missing.push("Email");
    if (!formData.contactFullName.trim()) missing.push("Nama Lengkap");
    if (!formData.contactPhone.trim()) missing.push("Nomor Telepon");
    if (!formData.contactRegion.trim()) missing.push("Asal Daerah");
    return missing;
  };

  const getMissingTalkshowFields = () => {
    const missing: string[] = [];
    if (!formData.wantsTalkshow) return missing;
    if (!formData.sessionCode) missing.push("Sesi Talkshow");
    if (!formData.talkshowExpectation.trim()) missing.push("Harapan Talkshow");
    return missing;
  };

  const getMissingActiveParticipantFields = () => {
    const missing: string[] = [];
    if (!activeParticipant.fullName.trim()) missing.push("Nama Pengunjung");
    if (!activeParticipant.phone.trim()) missing.push("Telepon Pengunjung");
    if (!activeParticipant.region.trim()) missing.push("Daerah Pengunjung");
    return missing;
  };

  const getMissingParticipantFields = (p: {
    fullName: string;
    phone: string;
    school: string;
    region: string;
  }) => {
    const missing: string[] = [];
    if (!p.fullName.trim()) missing.push("Nama");
    if (!p.phone.trim()) missing.push("Telepon");
    if (!p.region.trim()) missing.push("Daerah");
    return missing;
  };

  const getFirstIncompleteParticipant = () => {
    for (let index = 0; index < participants.length; index++) {
      const missing = getMissingParticipantFields(participants[index]);
      if (missing.length) return { index, missing };
    }
    return null;
  };

  return (
    <div className="bg-mixed flex min-h-screen w-full items-center justify-center px-4 py-10">
      <AnimatePresence mode="wait">
        {step !== "SUCCESS" ? (
          <motion.div
            key={step}
            className="relative my-auto max-h-[80svh] w-full max-w-lg overflow-y-auto rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-8 shadow-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h3 className="font-subheading text-center font-bold text-[#FFEBB8] drop-shadow-md">
              Reservasi Tiket
            </h3>

            <div className="mt-6 pr-1">
              {step === "CONTACT" ? (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
                      Email *
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      required
                      placeholder="Email"
                      className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
                      Nama Lengkap *
                    </label>
                    <input
                      name="contactFullName"
                      value={formData.contactFullName}
                      onChange={handleInputChange}
                      type="text"
                      required
                      placeholder="Nama Lengkap"
                      className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
                      Nomor Telepon *
                    </label>
                    <input
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      type="tel"
                      required
                      pattern="[0-9]*"
                      placeholder="Nomor Telepon"
                      className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
                      Asal Sekolah
                    </label>
                    <input
                      name="contactSchool"
                      value={formData.contactSchool}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Asal Sekolah"
                      className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
                      Asal Daerah *
                    </label>
                    <input
                      name="contactRegion"
                      value={formData.contactRegion}
                      onChange={handleInputChange}
                      type="text"
                      required
                      placeholder="Asal Daerah"
                      className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                    />
                  </div>
                </div>
              ) : null}

              {step === "TALKSHOW" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl bg-[#FFEBB8]/30 px-4 py-3">
                    <input
                      id="wantsTalkshow"
                      name="wantsTalkshow"
                      type="checkbox"
                      checked={formData.wantsTalkshow}
                      onChange={handleInputChange}
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor="wantsTalkshow"
                      className="mb-1 text-lg font-bold text-[#FFEBB8]"
                    >
                      Mau ikut talkshow?
                    </label>
                  </div>

                  {formData.wantsTalkshow ? (
                    <>
                      <div>
                        <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
                          Pilih Sesi Talkshow *
                        </label>
                        <div className="relative">
                          <select
                            name="sessionCode"
                            value={formData.sessionCode}
                            onChange={handleInputChange}
                            disabled={isLoadingSessions}
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
                      </div>

                      <div>
                        <label className="mb-1 ml-1 block text-lg font-bold text-[#FFEBB8]">
                          Harapan Ikut Talkshow *
                        </label>
                        <textarea
                          name="talkshowExpectation"
                          value={formData.talkshowExpectation}
                          onChange={handleInputChange}
                          rows={3}
                          required
                          placeholder="Harapan Ikut Talkshow"
                          className="w-full resize-none rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              ) : null}

              {step === "PARTICIPANTS" ? (
                <div className="space-y-4">
                  <div className="pt-2">
                    <h2 className="font-body text-xl font-bold text-[#FFEBB8]">
                      Data Pengunjung
                    </h2>
                    <p className="font-bold text-[#FFEBB8]/90"></p>
                  </div>

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
                            Pengunjung {idx + 1}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={addParticipant}
                        className="rounded-xl bg-[#FFEBB8] px-4 py-1.5 text-xs font-bold text-[#B64556] hover:bg-[#FFEBB8]/90"
                      >
                        + Pengunjung
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-[#FFEBB8]/30 bg-[#FFEBB8]/10 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-lg font-bold text-[#FFEBB8]">
                        Pengunjung {activeParticipantIndex + 1}
                      </p>
                      {participants.length > 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            removeParticipant(activeParticipantIndex)
                          }
                          className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-4 py-1.5 text-xs font-bold text-[#FFEBB8] hover:bg-[#1B165E]"
                        >
                          Hapus
                        </button>
                      ) : null}
                    </div>

                    <div className="space-y-3">
                      <input
                        value={activeParticipant.fullName}
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
                        value={activeParticipant.phone}
                        onChange={(e) =>
                          handleParticipantChange(
                            activeParticipantIndex,
                            "phone",
                            e.target.value,
                          )
                        }
                        type="tel"
                        required
                        pattern="[0-9]*"
                        placeholder="Nomor Telepon *"
                        className="w-full rounded-xl bg-[#FFEBB8] px-5 py-3 text-lg font-bold text-[#B64556] placeholder-[#B64556]/60 shadow-inner focus:ring-4 focus:ring-[#D97D68] focus:outline-none"
                      />
                      <input
                        value={activeParticipant.school}
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
                        value={activeParticipant.region}
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
              ) : null}

              {step === "REVIEW" ? (
                <form
                  id="rsvp-review-form"
                  className="space-y-4"
                  onSubmit={handleSubmit}
                >
                  <div className="rounded-2xl bg-white/80 p-4 text-[#302A77] shadow">
                    <p className="font-bold">Email: {formData.email}</p>
                    <p className="font-bold">
                      Nama: {formData.contactFullName}
                    </p>
                    <p className="font-bold">
                      Telepon: {formData.contactPhone}
                    </p>
                    <p className="font-bold">
                      Sekolah: {formData.contactSchool}
                    </p>
                    <p className="font-bold">
                      Daerah: {formData.contactRegion}
                    </p>
                    <p className="font-bold">
                      Ikut talkshow: {formData.wantsTalkshow ? "Ya" : "Tidak"}
                    </p>
                    {formData.wantsTalkshow ? (
                      <>
                        <p className="font-bold">
                          Sesi: {formData.sessionCode}
                        </p>
                        <p className="font-bold">
                          Harapan: {formData.talkshowExpectation}
                        </p>
                      </>
                    ) : null}
                    <p className="font-bold">
                      Jumlah pengunjung: {participants.length}
                    </p>
                  </div>
                </form>
              ) : null}
            </div>

            <div className="pt-6">
              {step === "CONTACT" ? (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const missing = getMissingContactFields();
                      if (missing.length) {
                        toast.info("Lengkapi data yang dibutuhkan");
                        return;
                      }
                      setStep("TALKSHOW");
                    }}
                    aria-disabled={!canNextFromContact}
                    className={`rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-1.5 text-xs font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E] ${!canNextFromContact ? "opacity-60" : ""}`}
                  >
                    Next
                  </button>
                </div>
              ) : null}

              {step === "TALKSHOW" ? (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep("CONTACT")}
                    className="rounded-xl border-2 border-[#FFEBB8] bg-[#FFEBB8] px-6 py-1.5 text-xs font-bold text-[#B64556] shadow-lg transition-all hover:bg-[#FFEBB8]/90"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const missing = getMissingTalkshowFields();
                      if (missing.length) {
                        toast.info("Lengkapi data yang dibutuhkan");
                        return;
                      }
                      setStep("PARTICIPANTS");
                    }}
                    aria-disabled={!canNextFromTalkshow}
                    className={`rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-1.5 text-xs font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E] ${!canNextFromTalkshow ? "opacity-60" : ""}`}
                  >
                    Next
                  </button>
                </div>
              ) : null}

              {step === "PARTICIPANTS" ? (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep("TALKSHOW")}
                    className="rounded-xl border-2 border-[#FFEBB8] bg-[#FFEBB8] px-6 py-1.5 text-xs font-bold text-[#B64556] shadow-lg transition-all hover:bg-[#FFEBB8]/90"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const incomplete = getFirstIncompleteParticipant();
                      if (incomplete) {
                        setActiveParticipantIndex(incomplete.index);
                        toast.info("Lengkapi data yang dibutuhkan");
                        return;
                      }
                      setStep("REVIEW");
                    }}
                    className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-1.5 text-xs font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E]"
                  >
                    Next
                  </button>
                </div>
              ) : null}

              {step === "REVIEW" ? (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep("PARTICIPANTS")}
                    className="rounded-xl border-2 border-[#FFEBB8] bg-[#FFEBB8] px-6 py-1.5 text-xs font-bold text-[#B64556] shadow-lg transition-all hover:bg-[#FFEBB8]/90"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="rsvp-review-form"
                    disabled={isSubmitting}
                    className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-1.5 text-xs font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E] disabled:opacity-60"
                  >
                    {isSubmitting ? "Memproses..." : "Submit"}
                  </button>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="flex w-full flex-col items-center px-2 pb-20"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h1 className="font-subheading text-center leading-tight font-extrabold text-[#302a77] drop-shadow-md">
              Reservasi Tiket Berhasil!
            </h1>

            <p className="mb-8 text-lg font-bold tracking-wide text-[#302A77]">
              Lihat reservasi pada halaman profil kamu
            </p>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-1.5 text-xs font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E]"
            >
              Ke Profil
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
