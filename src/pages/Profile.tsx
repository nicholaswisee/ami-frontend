import { CgProfile } from "react-icons/cg";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { IoIosArrowBack, IoIosLogOut, IoIosRefresh } from "react-icons/io";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { useReservations } from "../hooks/useReservations";
import {
  useReservationDetails,
  useTalkshowRegistrations,
  queryKeys,
} from "../hooks/queries";
import { useQueryClient } from "@tanstack/react-query";

type TicketStatus = "PENDING" | "CONFIRMED";
type Participant = {
  id: string;
  fullName: string;
  school: string;
  region: string;
};
type Reservation = {
  id: string;
  barcode: string;
  status: TicketStatus;
  email: string;
  contactFullName: string;
  contactPhone: string;
  contactSchool: string | null;
  contactRegion: string;
  parentName: string;
  parentPhone: string;
  wantsTalkshow: boolean;
  talkshowExpectation: string | null;
  createdAt: string | Date;
  participants?: Participant[];
  session: null | {
    id: string;
    code: string;
    name: string;
    description: string | null;
  };
};

function TicketBarcode({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, {
      margin: 1,
      scale: 6,
      errorCorrectionLevel: "H",
    }).catch((error: unknown) => {
      console.error("Failed to render QR", error);
    });
  }, [value]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={`QR ${value}`}
      className={className ?? "h-24 w-24"}
    />
  );
}

export default function ProfilePage() {
  const { user, logOut, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: reservationsData, isLoading: isLoadingReservations } =
    useReservations(isAuthenticated, user?.id);
  const { data: talkshowData } = useTalkshowRegistrations(
    isAuthenticated,
    user?.id,
  );
  const talkshowRegistrations = talkshowData?.registrations ?? [];

  const [activeReservation, setActiveReservation] =
    useState<Reservation | null>(null);
  const { data: reservationDetails, isFetching: isFetchingReservationDetails } =
    useReservationDetails(
      activeReservation?.id,
      isAuthenticated && Boolean(activeReservation),
      user?.id,
    );
  const activeParticipants = reservationDetails?.participants ?? [];
  const ticketStatus = reservationDetails?.status ?? activeReservation?.status;

  // Manual refresh function for ticket status
  const refreshTicketStatus = async () => {
    if (!activeReservation?.id) return;
    await queryClient.invalidateQueries({
      queryKey: queryKeys.reservationDetails(activeReservation.id),
    });
  };
  // const formatDate = (value: string) =>
  //   new Date(value).toLocaleDateString("id-ID", {
  //     dateStyle: "medium",
  //   });

  const reservations = reservationsData?.reservations ?? [];

  useEffect(() => {
    if (activeReservation) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeReservation]);

  // useEffect(() => {
  //   const hasSeenUpdate = sessionStorage.getItem("hasSeenReservationUpdate");
  //   if (!hasSeenUpdate) {
  //     toast.info(
  //       "Terdapat pembaruan reservasi tiket ITB Day, Bagi Luminettes yang telah mengisi sebelum pukul 21.00 tanggal 15/01/2026 dapat reservasi kembali ya!",
  //       { duration: 8000 },
  //     );
  //     sessionStorage.setItem("hasSeenReservationUpdate", "true");
  //   }
  // }, []);

  const openTicket = (reservation: Reservation) => {
    setActiveReservation(reservation);
  };

  return (
    <section className="bg-mixed flex w-full flex-col items-center justify-start px-4 py-10 text-[#FFEBB8]">
      <div className="mt-20 mb-6 grid w-full max-w-5xl grid-cols-3 items-center">
        <button
          className="justify-self-start rounded-xl bg-[#FFEBB8] px-3 py-1 text-[11px] font-bold text-[#B64556] hover:bg-[#FFEBB8]/90"
          onClick={() => navigate("/")}
        >
          <p className="inline-flex items-center gap-1">
            <IoIosArrowBack size={16} />
            <span className="mb-1">Kembali</span>
          </p>
        </button>
        <h1 className="font-body mb-2 justify-self-center font-bold drop-shadow-md">
          Profil
        </h1>
        <div className="justify-self-end" />
      </div>
      <div className="flex w-full max-w-5xl flex-col items-start gap-6">
        <div className="relative w-full space-y-4 overflow-hidden rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-8 shadow-2xl">
          <div className="w-full rounded-2xl border-2 border-[#FFEBB8]/20 bg-[#FFEBB8]/10 p-5">
            <div className="flex items-center gap-4">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name ?? "Foto profil"}
                  className="h-14 w-14 rounded-full border-2 border-[#FFEBB8]/40 object-cover shadow"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFEBB8]/20 text-[#FFEBB8] shadow-inner">
                  <CgProfile size={32} />
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate font-bold">{user?.name}</p>
                <p className="truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => void logOut()}
            className="mx-auto flex items-center justify-center gap-2 rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-4 py-1.5 text-xs font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E]"
          >
            <IoIosLogOut size={18} />
            Keluar
          </button>
        </div>
        <div className="flex w-full gap-6 *:h-fit max-sm:flex-col">
          <div className="relative w-full overflow-hidden rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-8 shadow-2xl">
            <div className="w-full rounded-2xl border-2 border-[#FFEBB8]/20 bg-[#FFEBB8]/10 p-5 pt-0">
              <div className="my-2 flex items-center justify-between gap-3">
                <h2 className="font-body font-bold">Talkshow</h2>
              </div>
              {talkshowRegistrations.length > 0 ? (
                <div className="mt-3 space-y-3">
                  {talkshowRegistrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="border-b border-b-amber-200/50 p-2"
                    >
                      <p className="font-semibold">
                        {reg.session?.name ?? "Talkshow"}
                      </p>
                      <p
                        className={`text-xs font-semibold ${reg.status === "PENDING" ? "text-green-300" : "text-blue-300"}`}
                      >
                        {reg.status === "PENDING" ? "Terdaftar" : "Sudah Hadir"}
                      </p>
                      {reg.participants && reg.participants.length > 0 ? (
                        <ul className="mt-2 space-y-1 text-sm opacity-90">
                          {reg.participants.map((p, i) => (
                            <li key={p.id}>
                              {i + 1}. {p.fullName}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : reservations.length > 0 ? (
                <div className="mt-3">
                  <button
                    onClick={() => navigate("/talkshow")}
                    className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-4 py-2 font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E]"
                  >
                    Daftar Talkshow
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-sm opacity-90">
                  Reservasi tiket terlebih dahulu untuk daftar talkshow.
                </p>
              )}
            </div>
          </div>
          <div className="relative w-full overflow-hidden rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-8 shadow-2xl">
            <div className="w-full rounded-2xl border-2 border-[#FFEBB8]/20 bg-[#FFEBB8]/10 p-5 pt-0">
              <div className="my-2 flex items-center justify-between gap-3">
                <h2 className="font-body font-bold">Tiket Kamu</h2>
              </div>
              {isLoadingReservations ? (
                <p className="mt-2 text-sm opacity-90">Memuat...</p>
              ) : reservations.length === 0 ? (
                <div className="mt-3 space-y-3 text-sm">
                  {/* <p className="opacity-90">Belum ada tiket.</p> */}
                  <button
                    onClick={() => navigate("/rsvp")}
                    className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-4 py-2 font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E]"
                  >
                    Reservasi tiketmu sekarang!
                  </button>
                </div>
              ) : (
                <div className="mt-3 grid gap-4">
                  {reservations.map((r) => (
                    <div
                      key={r.id}
                      className="border-b border-b-amber-200/50 p-4"
                    >
                      <div className="mt-3 flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-1 text-sm">
                          <p className="leading-tight font-semibold">
                            {r.contactFullName}
                          </p>
                          <p
                            className={`text-xs font-semibold ${r.status === "PENDING" ? "text-green-300" : "text-blue-300"}`}
                          >
                            {r.status === "PENDING"
                              ? "Terdaftar"
                              : "Sudah Hadir"}
                          </p>
                        </div>
                        <button
                          onClick={() => void openTicket(r)}
                          className="shrink-0 rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-3 py-1 font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E]"
                        >
                          Lihat Tiket
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${activeReservation ? "z-60 opacity-100" : "-z-50 opacity-0"} fixed inset-0 flex items-center justify-center overflow-y-auto bg-white/5 px-4 backdrop-blur-md transition-opacity`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveReservation(null);
        }}
      >
        <div
          className="bg-mixed relative max-h-[90svh] w-full max-w-md overflow-hidden overflow-y-auto rounded-xl text-[#111] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 px-3 py-1 font-semibold"
            onClick={() => setActiveReservation(null)}
          >
            Tutup
          </button>

          <div className="mt-3 space-y-4 bg-white px-6 py-5">
            <div className="text-center">
              <h2 className="font-body font-extrabold text-gray-900">
                ITB DAY 2026
              </h2>
              <p className="text-md">14 Februari 2026</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs tracking-wide text-gray-500">
              <div>
                <p>Nama</p>
                <p className="text-sm font-semibold text-gray-900">
                  {activeReservation?.contactFullName}
                </p>
              </div>
              <div className="text-right">
                <p>Nomor Telepon</p>
                <p className="text-sm font-semibold text-gray-900">
                  {activeReservation?.contactPhone}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs tracking-wide text-gray-500">
              <div>
                <p>Nama Orang Tua</p>
                <p className="text-sm font-semibold text-gray-900">
                  {activeReservation?.parentName}
                </p>
              </div>
              <div className="text-right">
                <p>Nomor Telepon Orang Tua</p>
                <p className="text-sm font-semibold text-gray-900">
                  {activeReservation?.parentPhone}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 text-xs tracking-wide text-gray-500 sm:grid-cols-2">
              <div>
                <p>Email</p>
                <p className="text-sm font-semibold text-gray-900">
                  {activeReservation?.email}
                </p>
              </div>
              <div className="sm:text-right">
                <p>Sekolah / Daerah</p>
                <p className="text-sm font-semibold text-gray-900">
                  {activeReservation?.contactSchool || "-"} /{" "}
                  {activeReservation?.contactRegion}
                </p>
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-200 px-4 py-3 text-xs tracking-wide text-gray-500">
              <p>Pengunjung</p>
              {isFetchingReservationDetails ? (
                <p className="text-sm font-semibold text-gray-800">
                  Memuat pengunjung...
                </p>
              ) : activeParticipants.length === 0 ? (
                <p className="text-sm text-gray-700">
                  Tidak ada pengunjung terdaftar.
                </p>
              ) : (
                <ul className="max-h-[13lvh] space-y-1 overflow-y-auto text-sm text-gray-800">
                  {activeParticipants.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2"
                    >
                      <span className="font-semibold">{p.fullName}</span>
                      <span className="text-xs tracking-wide text-gray-600">
                        {p.region}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* <div className="rounded-2xl border border-gray-300 px-4 py-3 text-xs tracking-wide text-gray-500">
              <p className="font-semibold text-gray-900">
                {ticketTalkshowLabel}
              </p>
            </div> */}
            <div className="-mx-4 mt-10 h-2 w-[calc(100%+2rem)] border-t-2 border-dotted border-gray-300"></div>
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-white px-4 py-3">
              <div className="flex w-full flex-col items-center justify-between">
                {ticketStatus === "PENDING" && (
                  <button
                    onClick={refreshTicketStatus}
                    disabled={isFetchingReservationDetails}
                    className="flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
                    title="Refresh status tiket"
                  >
                    <IoIosRefresh
                      className={
                        isFetchingReservationDetails ? "animate-spin" : ""
                      }
                      size={14}
                    />
                    Refresh
                  </button>
                )}
                <h4
                  className={`font-body font-bold ${ticketStatus === "PENDING" ? "text-green-500" : "text-blue-500"}`}
                >
                  {ticketStatus === "PENDING" ? "Terdaftar" : "Sudah Hadir"}
                </h4>
              </div>
              <TicketBarcode
                value={activeReservation?.barcode || ""}
                className="h-auto w-full"
              />
              <p className="text-xs font-semibold tracking-widest text-gray-700">
                {activeReservation?.barcode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
