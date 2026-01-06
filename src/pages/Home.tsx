import Badge from "@/components/Badge";
import { Link } from "react-router";
import { motion } from "framer-motion";

const itbDayEvents: Array<{
  thumbnail: string;
}> = [
  {
    thumbnail: "/acara/itbday.webp",
  },
  {
    thumbnail: "/flashback01.webp",
  },
  {
    thumbnail: "/flashback02.webp",
  },
  {
    thumbnail: "/itbday/bioskop.webp",
  },
  {
    thumbnail: "/itbday/hmps.webp",
  },
  {
    thumbnail: "/itbday/parade.webp",
  },
  {
    thumbnail: "/itbday/performance.webp",
  },
  {
    thumbnail: "/itbday/talkshow.webp",
  },
  {
    thumbnail: "/itbday/tour.webp",
  },
];

export default function HomePage() {
  // const treeOpacityLeft = useTransform(scrollY, [0, 700], [0, 1]);
  // const treeXLeft = useTransform(scrollY, [0, 700], [-120, 0]);
  // const treeYLeft = useTransform(scrollY, [0, 700], [20, 0]);
  // const treeOpacityRight = useTransform(scrollY, [60, 760], [0, 1]);
  // const treeXRight = useTransform(scrollY, [60, 760], [120, 0]);
  // const treeYRight = useTransform(scrollY, [60, 760], [20, 0]);

  return (
    <div>
      <section className="bg-purple relative min-h-[120lvh] overflow-hidden sm:min-h-[180lvh] lg:min-h-[220lvh]">
        <motion.img
          src="/glow-1.png"
          alt=""
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute bottom-72 left-1/4 z-40 w-20 animate-pulse max-md:left-4 md:bottom-2/3"
        />
        <motion.img
          src="/glow-1.png"
          alt=""
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute right-1/4 bottom-84 z-40 w-20 animate-pulse max-md:right-8 md:bottom-2/5"
        />
        {/* <img
          src="/leaf-right-main.webp"
          alt=""
          className="absolute top-0 right-2 z-20 -rotate-90"
        />
        <img
          src="/leaf-right-main.webp"
          alt=""
          className="absolute top-0 left-0 z-20 -scale-x-100 rotate-90"
        /> */}
        <img
          src="/transition-1.webp"
          alt=""
          draggable="false"
          className="absolute bottom-0 z-25 w-full"
          // initial={{ opacity: 0, y: 12 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true, amount: 0.2 }}
          // transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="pointer-events-none absolute inset-0 z-33 bg-linear-to-b from-black/35 via-black/10 to-black/45" />
        <div className="flex h-lvh flex-col items-center justify-center">
          {/* <img
            className="absolute bottom-0 left-0 z-20 mb-32 max-w-1/2 max-sm:max-w-2/3 sm:mb-36 md:mb-40 lg:mb-56 xl:mb-96"
            src="/tree-left-main.webp"
            alt=""
            draggable="false"
          />
          <img
            className="absolute right-0 bottom-0 z-20 mb-32 max-w-1/2 max-sm:-right-6 max-sm:max-w-2/3 sm:mb-36 md:mb-40 lg:mb-56 xl:mb-96"
            src="/tree-right-main.webp"
            alt=""
            draggable="false"
          /> */}
          <motion.img
            className="absolute bottom-0 left-0 z-20 mb-32 max-w-1/2 max-sm:max-w-2/3 sm:mb-36 md:mb-40 lg:mb-56 xl:mb-96"
            src="/tree-left-main.webp"
            alt=""
            draggable="false"
            initial={{ opacity: 0, x: -50, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          />
          <motion.img
            className="absolute right-0 bottom-0 z-20 mb-32 max-w-1/2 max-sm:-right-6 max-sm:max-w-2/3 sm:mb-36 md:mb-40 lg:mb-56 xl:mb-96"
            src="/tree-right-main.webp"
            alt=""
            draggable="false"
            initial={{ opacity: 0, x: 50, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          />
          <motion.img
            src="/logo.png"
            alt="AMI 2026"
            draggable="false"
            className="relative z-32 aspect-square w-full max-w-64"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          <motion.h2
            className="relative z-34 bg-linear-to-b from-[#ffdb8c] via-[#ffd37a] to-[#ffb066] bg-clip-text text-[#ffdb8c] drop-shadow-[0_4px_10px_rgba(255,197,107,0.55)]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.65 }}
          >
            Aku Masuk ITB 2026
          </motion.h2>
        </div>
      </section>
      <section className="bg-mixed relative flex min-h-[120lvh] flex-col items-center pb-28 sm:min-h-[180lvh] lg:min-h-[180lvh]">
        <img
          src="/transition-2.webp"
          alt=""
          draggable="false"
          className="absolute -top-12 z-35 w-full drop-shadow-2xl drop-shadow-white/65 sm:-top-16 md:-top-18 lg:-top-24 xl:-top-40"
          // initial={{ opacity: 0, y: -12 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true, amount: 0.2 }}
          // transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="relative z-30 mt-64 flex w-full max-w-5xl flex-col items-center px-6 text-center sm:mt-96 xl:mt-128"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Badge>Aku Masuk ITB</Badge>
          </motion.div>
          <motion.p
            className="relative z-3 mt-4 max-w-3xl leading-relaxed font-semibold text-[#6f0e4e]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 }}
          >
            Aku Masuk ITB adalah rangkaian kegiatan yang mengenalkan ITB serta
            meningkatkan semangat berpendidikan tinggi untuk calon mahasiswa
            baru. Luminettes akan diajak mengenal ITB lewat acara seru,
            inspiratif, dan penuh kebersamaan!
          </motion.p>
          <div className="relative z-3 mx-auto mt-12 w-fit max-w-5xl space-y-6 px-4">
            <div className="mx-auto grid w-fit grid-cols-3 justify-center gap-4 sm:gap-6 md:place-items-center">
              {["ITB Day", "Paguyuban Membangun", "Diseminasi"].map(
                (title, index) => (
                  <motion.div
                    key={title}
                    className="flex w-full max-w-72 items-center justify-center rounded-3xl border-4 border-[#FFC76E] bg-linear-to-b from-[#FFDB8C] to-[#FFC76E] px-5 py-3 text-center shadow-md sm:max-w-72 sm:px-6 sm:py-4"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: 0.08 + index * 0.04,
                    }}
                  >
                    <p className="text-base font-extrabold tracking-wide text-[#87095A] uppercase max-sm:text-xs sm:text-lg">
                      {title}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
            <div className="mx-auto grid w-fit grid-cols-3 justify-center gap-3 sm:gap-4 md:place-items-center">
              {["Talkshow", "Tour Kampus", "Bioskop AMI"].map(
                (title, index) => (
                  <motion.div
                    key={title}
                    className="flex w-full max-w-52 items-center justify-center rounded-3xl border-4 border-[#FFC76E] bg-linear-to-b from-[#FFDB8C] to-[#FFC76E] px-3.5 py-2 text-center shadow-md sm:max-w-56 sm:px-4 sm:py-2.5 lg:max-w-60 lg:px-5"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: 0.12 + index * 0.04,
                    }}
                  >
                    <p className="text-xs font-extrabold tracking-wide text-[#87095A] uppercase sm:text-sm lg:text-base">
                      {title}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </div>
          <img
            src="/vines/redvines01.png"
            alt=""
            draggable="false"
            className="absolute bottom-0 left-[calc((100vw-100%)/-2)] z-0 max-sm:max-w-1/3"
          />
          <img
            src="/vines/redvines02.png"
            alt=""
            draggable="false"
            className="absolute right-[calc((100vw-100%)/-2)] bottom-0 z-0 max-sm:max-w-1/3"
          />
          <motion.div
            className="relative z-3 my-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 }}
          >
            <Link
              to="/rsvp"
              className="rounded-2xl border-4 border-[#C62D76] bg-linear-to-b from-[#AC166C] to-[#6F0E4E] px-8 py-3 text-lg font-extrabold tracking-wide text-[#FFDB8C] shadow-[0px_2px_0px_0px_#F3414E] transition-all duration-200 hover:brightness-110"
            >
              RSVP ITB Day
            </Link>
          </motion.div>
        </motion.div>
        <div className="relative mt-36">
          <motion.h1
            className="text-center text-[#6f0e4e] text-shadow-[#bf1192] text-shadow-sm"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Kilas Balik ITB Day
          </motion.h1>
          <div className="relative z-10 mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-10 px-4 pb-28 md:grid-cols-3 md:place-items-center md:gap-16 md:pb-10">
            {itbDayEvents.map((event, index) => (
              <motion.div
                key={event.thumbnail}
                className="flex w-full items-center justify-center"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: 0.06 + index * 0.05,
                }}
              >
                <div className="relative aspect-4/5 w-full max-w-65 shadow-xl md:max-w-[320px]">
                  <img
                    src="/flower/flower01.webp"
                    alt=""
                    draggable="false"
                    className="absolute -top-8 -right-3 h-14 w-14"
                  />
                  <img
                    src={event.thumbnail}
                    alt=""
                    draggable="false"
                    className="h-full w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                  <img
                    src="/flower/flower01.webp"
                    alt=""
                    draggable="false"
                    className="absolute -bottom-8 -left-3 h-14 w-14"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
