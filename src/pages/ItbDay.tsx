import type React from "react";
import Badge from "@/components/Badge";
import CountDown from "../components/CountDown";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

type EventCardProps = {
  label: string;
  thumbnail: string;
  tooltip?: string;
  position: { row: number; col: number };
};

const badgeStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #6f1d82 0%, #5d227a 55%, #2d0f55 100%)",
  boxShadow:
    "inset 0 10px 18px rgba(255,255,255,0.08), inset 0 -12px 20px rgba(0,0,0,0.35), 0 10px 0 #44245f, 0 14px 0 #18113a",
};

const eventDetail: Array<{
  label: string;
  thumbnail: string;
  tooltip?: string;
}> = [
  {
    label: "Tour Kampus",
    thumbnail: "/itbday/tour.webp",
    tooltip:
      "Luminettes bakal ditemenin tour guide keliling kampus sambil mendapatkan informasi menarik seputar ITB!",
  },
  {
    label: "Bioskop AMI",
    thumbnail: "/itbday/bioskop.webp",
    tooltip: "Disini akan ada banyak film menarik yang dapat Luminettes lihat!",
  },
  {
    label: "Talkshow",
    thumbnail: "/itbday/talkshow.webp",
    tooltip:
      "Akan hadir narasumber inspiratif buat memotivasi dan memberikan wawasannya kepada Luminettes!",
  },
  {
    label: "Parade",
    thumbnail: "/itbday/parade.webp",
    tooltip:
      "UKM yang hadir di ITB mengadakan pawai menarik untuk Luminettes tonton!",
  },
  {
    label: "HMPS Fair",
    thumbnail: "/itbday/hmps.webp",
    tooltip:
      "Himpunan Mahasiswa di ITB mengadakan pameran untuk mengenalkan program studinya masing-masing",
  },
  {
    label: "Performance",
    thumbnail: "/itbday/performance.webp",
    tooltip:
      "Unit-unit menampilkan pertunjukan menarik untuk menghibur dan menunjukkan keberagaman bakat yang dimiliki mereka!",
  },
  {
    label: "Jejak Eksplorasa",
    thumbnail: "",
    tooltip:
      "Pada acara ini Luminettes dapat bermain sekaligus menambah wawasan kalian!",
  },
  {
    label: "Treasure Hunt",
    thumbnail: "",
    tooltip: "Seru-seruan dan bawa pulang hadiah menarik dari AMI!",
  },
  {
    label: "& masih banyak acara keren lainnya!",
    thumbnail: "",
    tooltip: "See you there!",
  },
];

const colSequence = [1, 2, 3, 2, 1, 2, 3, 2, 1, 2];

function EventCard({ label, thumbnail, tooltip, position }: EventCardProps) {
  let pos = "start";
  if (position.col == 2) {
    pos = "center";
  } else if (position.col == 3) {
    pos = "end";
  }
  return (
    <>
      <motion.div
        className={`z-3 flex items-center justify-${pos} w-full`}
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div
          className="relative flex flex-col items-center gap-3 md:items-center md:justify-center"
          style={{
            gridColumn: position.col,
            gridRow: position.row,
          }}
        >
          {thumbnail && (
            <div className="relative aspect-6/5 w-full max-w-65 shadow-xl md:max-w-[320px]">
              <img
                src={thumbnail}
                alt={label}
                className="h-full w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="relative w-full max-w-52.5">
            <div
              className="group relative w-full rounded-3xl px-6 py-3 text-center text-lg font-extrabold tracking-[0.08em] text-[#fdd6be] uppercase drop-shadow outline-none focus-visible:ring-2 focus-visible:ring-[#fdd6be]/60"
              style={badgeStyle}
              tabIndex={0}
              role="button"
              aria-label={label}
            >
              {label}
              {tooltip && tooltip.trim() !== "" && (
                <span className="pointer-events-none absolute -top-2 left-1/2 w-full -translate-x-1/2 -translate-y-full rounded-md bg-[#2d0f55] p-3 text-xs font-semibold text-[#fdd6be] normal-case opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100">
                  {tooltip}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function ItbDayPage() {
  const navigate = useNavigate();

  return (
    <section className="bg-mixed relative min-h-lvh overflow-hidden">
      <CountDown />
      <motion.div
        className="relative z-10 mx-auto flex min-h-lvh max-w-5xl flex-col items-center justify-center gap-8 px-6 pt-28 pb-16 text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Badge>ITB Day</Badge>
        <h3 className="font-body max-w-3xl text-[#6f0e4e]">
          Puncak dari Aku Masuk ITB, ITB Day mengusung semangat perguruan tinggi
          sekaligus memperkenalkan ITB kepada masyarakat luas. Acara ini terdiri
          dari berbagai rangkaian kegiatan menarik loh, Luminettes!
        </h3>
      </motion.div>
      <motion.div
        className="relative z-10 mx-auto flex min-h-lvh flex-col items-center justify-center pb-28"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-center text-[#6f0e4e] text-shadow-[#bf1192] text-shadow-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          EVENT ITB DAY
        </motion.h1>
        <div className="relative z-10 mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-10 px-4 pb-28 md:place-items-center md:gap-16 md:pb-10">
          {eventDetail.map((event, idx) => {
            const col = colSequence[(idx + 1) % colSequence.length];
            const row = Math.floor(idx / 3) + 1;
            return (
              <EventCard
                key={event.label}
                label={event.label}
                tooltip={event.tooltip}
                thumbnail={event.thumbnail}
                position={{ row, col }}
              />
            );
          })}
        </div>
        <motion.h1
          className="mt-12 text-[#ffdb8c] text-shadow-[#bf1192] text-shadow-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          TREASURE HUNT
        </motion.h1>
        <div className="p-6">
          <div
            className="w-full max-w-3xl rounded-2xl p-6 text-center text-[#ffdb8c] shadow-lg"
            style={{
              background: "linear-gradient(to bottom,#FFD88C,#FFB366)",
              border: "2px solid #FFB366",
            }}
          >
            <motion.div
              className="my-6 space-y-4 text-center text-[#7a1646]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="font-bold tracking-wide">
                TEKNIS TREASURE HUNT ITB DAY!!
              </p>
              <p className="font-semibold">
                Hahh?! Apaan tuh? Mau seru-seruan dan bawa pulang hadiah
                menarik?
              </p>
              <p className="font-semibold">Caranya gampang, ikuti ini ya:</p>
              <div className="mx-auto w-fit space-y-2 text-left text-sm font-semibold sm:text-base">
                <p>1. Temukan clue di Instagram @akumasukitb.</p>
                <p>2. Ikuti petunjuk dan cari maskot Aku Masuk ITB 2026.</p>
                <p>
                  3. Foto bareng maskot Aku Masuk ITB, pose sekreatif mungkin.
                </p>
                <p>
                  4. Post fotomu di Instagram Story pakai template "Add Yours"
                  dari @akumasukitb.
                </p>
                <p>5. Tukarkan dengan hadiah menarik di booth sponsor!</p>
              </div>
              <p className="text-center font-semibold">
                Ajak temanmu dan buktikan siapa treasure hunter sejati.
                Kesempatan terbatas!
              </p>
            </motion.div>
          </div>
        </div>
        <motion.h3
          className="mt-12 text-center text-[#ffdb8c]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Sampai jumpa di ITB Day 2026, Luminettes!
        </motion.h3>
        <motion.button
          onClick={() => navigate("/rsvp")}
          className="mt-6 rounded-2xl border-4 border-[#C62D76] bg-linear-to-b from-[#AC166C] to-[#6F0E4E] px-8 pt-3 pb-4 text-lg font-extrabold tracking-wide text-[#FFDB8C] shadow-[0px_2px_0px_0px_#F3414E] transition-all duration-200 hover:brightness-110"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        >
          RSVP ITB Day
        </motion.button>
      </motion.div>
    </section>
  );
}
