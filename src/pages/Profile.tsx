import { CgProfile } from "react-icons/cg";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import bgRsvp from "../assets/bg-rsvp.png";
import { useEffect, useState } from "react";
import { env } from "../env";
import { toast } from "sonner";

type TicketStatus = "PENDING" | "CONFIRMED";
type Reservation = {
  id: string;
  barcode: string;
  status: TicketStatus;
  email: string;
  wantsTalkshow: boolean;
  talkshowExpectation: string | null;
  createdAt: string;
  session: null | {
    id: string;
    code: "1" | "2";
    name: string;
    description: string | null;
  };
};

export default function ProfilePage() {
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();

  const [isLoadingReservations, setIsLoadingReservations] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

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

  const copyBarcode = async (barcode: string) => {
    try {
      await navigator.clipboard.writeText(barcode);
      toast.success("Kode berhasil disalin.");
    } catch {
      toast.error("Gagal menyalin kode.");
    }
  };

  return (
    <section
      className="flex w-full flex-col items-center justify-center px-4 py-10 text-[#FFEBB8]"
      style={{
        backgroundImage: `url(${bgRsvp})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mb-6 grid w-full max-w-5xl grid-cols-3 items-center">
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
      <div className="relative max-h-[80svh] w-full max-w-5xl overflow-y-auto rounded-[30px] border-4 border-[#FFEBB8]/20 bg-[#B64556] p-8 shadow-2xl">
        <div className="mt-6 flex flex-col gap-4 lg:flex-row">
          <div className="w-full rounded-2xl border-2 border-[#FFEBB8]/20 bg-[#FFEBB8]/10 p-5 lg:w-1/2">
            <div className="flex items-center gap-4">
              <CgProfile size={56} />
              <div className="min-w-0">
                <p className="truncate font-bold">{user?.name}</p>
                <p className="truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="w-full rounded-2xl border-2 border-[#FFEBB8]/20 bg-[#FFEBB8]/10 p-5 lg:w-1/2">
            <h2 className="font-body text-lg font-bold">Tiket Saya</h2>
            {isLoadingReservations ? (
              <p className="mt-2 text-sm opacity-90">Memuat...</p>
            ) : reservations.length === 0 ? (
              <p className="mt-2 text-sm opacity-90">Belum ada tiket.</p>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {reservations.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-xl border-2 border-[#FFEBB8]/20 bg-[#B64556]/40 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-white p-2 shadow">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                            r.barcode,
                          )}`}
                          alt="Barcode"
                          className="h-24 w-24 mix-blend-multiply"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="break-words font-bold">{r.barcode}</p>
                        <button
                          type="button"
                          onClick={() => void copyBarcode(r.barcode)}
                          className="mt-2 rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-4 py-1.5 text-xs font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E]"
                        >
                          Salin
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => void logOut()}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-1.5 text-xs font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E]"
          >
            <IoIosLogOut size={18} />
            Keluar
          </button>
        </div>
      </div>
    </section>
  );
}
