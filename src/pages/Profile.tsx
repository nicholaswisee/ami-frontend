import { CgProfile } from "react-icons/cg";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import bgRsvp from "../assets/bg-rsvp.png";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { env } from "../env";

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
  contactSchool: string;
  contactRegion: string;
  wantsTalkshow: boolean;
  talkshowExpectation: string | null;
  createdAt: string;
  participants?: Participant[];
  session: null | {
    id: string;
    code: "1" | "2";
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
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();

  const [activeReservation, setActiveReservation] =
    useState<Reservation | null>(null);
  const [activeParticipants, setActiveParticipants] = useState<Participant[]>(
    [],
  );
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("id-ID", {
      dateStyle: "medium",
    });

  const [isLoadingReservations, setIsLoadingReservations] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (activeReservation) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeReservation]);

  useEffect(() => {
    const run = async () => {
      setIsLoadingReservations(true);
      try {
        const res = await fetch(`${env.API_URL}/api/reservations`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) return;
        const json = (await res.json()) as { reservations: Reservation[] };
        setReservations(json.reservations ?? []);
      } finally {
        setIsLoadingReservations(false);
      }
    };

    void run();
  }, []);

  const openTicket = async (reservation: Reservation) => {
    setActiveReservation(reservation);
    setActiveParticipants([]);
    setIsLoadingParticipants(true);
    try {
      const res = await fetch(
        `${env.API_URL}/api/reservations/${reservation.id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!res.ok) return;
      const json = (await res.json()) as {
        reservation: Reservation & { participants?: Participant[] };
      };
      setActiveReservation(json.reservation);
      setActiveParticipants(json.reservation.participants ?? []);
    } finally {
      setIsLoadingParticipants(false);
    }
  };

  return (
    <section
      className="flex w-full flex-col items-center justify-start px-4 py-10 text-[#FFEBB8]"
      style={{
        backgroundImage: `url(${bgRsvp})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
      <div className="flex w-full max-w-5xl flex-col items-start gap-6 lg:flex-row">
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
                        <p className="text-xs opacity-75">{r.contactRegion}</p>
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
      {activeReservation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-white/5 px-4 backdrop-blur-md"
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
            {/* <div
              className="relative h-40 w-full overflow-hidden"
              style={{
                backgroundImage: `url(${bgRsvp})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="*:font-body relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
                <h2 className="font-extrabold">Aku Masuk ITB</h2>
              </div>
            </div> */}

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
                    {activeReservation.contactFullName}
                  </p>
                </div>
                <div className="text-right">
                  <p>Tanggal Reservasi</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatDate(activeReservation.createdAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 text-xs tracking-wide text-gray-500 sm:grid-cols-2">
                <div>
                  <p>Email</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {activeReservation.email}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p>Sekolah / Daerah</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {activeReservation.contactSchool} /{" "}
                    {activeReservation.contactRegion}
                  </p>
                </div>
              </div>

              <div className="space-y-2 rounded-2xl border border-gray-200 px-4 py-3 text-xs tracking-wide text-gray-500">
                <p>Pengunjung</p>
                {isLoadingParticipants ? (
                  <p className="text-sm font-semibold text-gray-800">
                    Memuat pengunjung...
                  </p>
                ) : activeParticipants.length === 0 ? (
                  <p className="text-sm text-gray-700">
                    Tidak ada pengunjung terdaftar.
                  </p>
                ) : (
                  <ul className="space-y-1 text-sm text-gray-800">
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

              <div className="rounded-2xl border border-gray-300 px-4 py-3 text-xs tracking-wide text-gray-500">
                <p className="font-semibold text-gray-900">
                  {activeReservation.wantsTalkshow
                    ? "Ikut Talkshow"
                    : "Tidak ikut talkshow"}{" "}
                  {activeReservation.session?.name}
                </p>
              </div>
              <div className="-mx-4 mt-10 h-2 w-[calc(100%+2rem)] border-t-2 border-dotted border-gray-300"></div>
              <div className="flex flex-col items-center gap-2 rounded-2xl bg-white px-4 py-3">
                <TicketBarcode
                  value={activeReservation.barcode}
                  className="h-auto w-full"
                />
                <p className="text-xs font-semibold tracking-widest text-gray-700">
                  {activeReservation.barcode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
