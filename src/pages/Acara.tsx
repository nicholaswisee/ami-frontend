import React from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import { toast } from "sonner";
import { useNavigate } from "react-router";
import CountDown from "@/components/CountDown";
import { motion } from "framer-motion";

export default function AcaraPage() {
  const carouselItems = [
    {
      title: "ITB Day",
      description:
        "Pada salah satu rangkaian acara utama AMI 2026 ini terdapat banyak mata acara seperti Tour Kampus, Talkshow, Bioskop AMI, dan lainnya yang dapat kalian jalani secara gratis loh, Luminettes!",
      imageUrl: "/acara/itbday.webp",
    },
    {
      title: "Paguyuban Membangun",
      description:
        "AMI bekerja sama dengan paguyuban dan komunitas-komunitas daerah mahasiswa ITB untuk melakukan roadshow ke SMA di daerah masing-masing!",
      imageUrl: "/acara/paguyuban.webp",
    },
    {
      title: "Diseminasi",
      description:
        "Diseminasi ini bertujuan untuk meningkatkan minat siswa-siswa di penjuru negeri terhadap pendidikan tinggi, khususnya di ITB. Diseminasi ini dilakukan pada siswa SMA/SMK di wilayah Bandung dan sekitarnya serta di daerah 3T.",
      imageUrl: "/acara/diseminasi.webp",
    },
  ];
  const talkshowItems = [
    {
      title: "Talkshow AMI 2026",
      desc: "Jadwal dan narasumber sedang disiapkan. Stay tuned ya, Luminettes!",
      imageUrl: "/itbday/talkshow.webp",
      sourceName: "Segera Hadir",
      sourceDesc: "Narasumber",
      time: "14 Feb, 2026",
      place: "ITB Day",
    },
  ];
  const navigate = useNavigate();

  const [acaraApi, setAcaraApi] = React.useState<CarouselApi | null>(null);
  const [_talkshowApi, setTalkshowApi] = React.useState<CarouselApi | null>(
    null,
  );
  return (
    <div className="bg-mixed min-h-screen w-full bg-cover bg-scroll bg-center text-gray-800">
      <CountDown />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8">
        {/* <h1 className="text-3xl font-bold">Acara: {name ?? "Nama Acara"}</h1> */}

        {/* header */}
        <motion.section
          className="my-24 flex flex-col items-center gap-6 text-center md:my-48"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <CTAButton text="Aku Masuk ITB 2026" />
          </motion.div>
          <motion.h3
            className="font-body max-w-3xl px-4 leading-relaxed text-[#590844] text-shadow-[#EF5D23] text-shadow-xs"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          >
            Rangkaian acara Aku Masuk ITB 2026 siap nemenin Luminettes kenalan
            lebih dekat sama ITB, yuk simak lebih lanjut!
          </motion.h3>
        </motion.section>

        {/* acara carousel */}
        <motion.section
          className="group relative w-full px-4 md:px-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Carousel
            setApi={setAcaraApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 pb-4">
              {carouselItems.map((item) => (
                <CarouselItem
                  key={item.title}
                  className="flex min-w-0 basis-full justify-center pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full w-full px-2">
                    <AcaraCard
                      title={item.title}
                      description={item.description}
                      imageUrl={item.imageUrl}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/*prev button */}
            <button
              onClick={() => acaraApi?.scrollPrev()}
              className="absolute top-1/2 -left-6 z-10 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none md:-left-16"
              aria-label="Previous Slide"
            >
              <img
                src="/arrow.png"
                alt="Previous"
                className="h-9 w-9 object-contain drop-shadow-md md:h-11 md:w-11"
              />
            </button>

            {/* next button */}
            <button
              onClick={() => acaraApi?.scrollNext()}
              className="absolute top-1/2 -right-6 z-10 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none md:-right-16"
              aria-label="Next Slide"
            >
              <img
                src="/arrow.png"
                alt="Next"
                className="h-9 w-9 scale-x-[-1] object-contain drop-shadow-md md:h-11 md:w-11"
              />
            </button>
          </Carousel>
        </motion.section>

        {/* rundown  */}
        {/* <section className="flex w-full flex-col items-center gap-6 px-2 py-24">
          <h1 className="mb-6 text-center text-4xl font-bold tracking-wider text-[#87095A] uppercase text-shadow-[#F3414E] text-shadow-sm">
            Rundown Acara
          </h1>

          <div className="rounded-3xl border-4 border-[#FFC76E] bg-[#FFDB8C] px-8 py-1 text-sm font-bold text-[#6F0E4E]">
            <h3>DD / MM / YYYY</h3>
          </div>

          <div className="flex w-full max-w-lg flex-col gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex w-full gap-4 text-sm">
                <div className="font flex w-1/3 items-center justify-center rounded-full border-0 bg-[#FFC763] py-2 text-xs font-bold text-[#590844]">
                  <p>00.00-00.00</p>
                </div>
                <div className="flex w-2/3 items-center justify-center rounded-full border-0 bg-[#FFC763] px-2 py-2 text-center font-bold text-[#590844]">
                  <p className="line-clamp-1">ACARA {i + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* talkshow */}
        <motion.section
          className="relative mt-8 mb-8 flex w-full flex-col items-center px-2 md:px-0"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-4xl">
            <Carousel
              setApi={setTalkshowApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {talkshowItems.map((item) => (
                  <CarouselItem
                    key={item.title}
                    className="flex basis-full justify-center"
                  >
                    <TalkshowCard
                      title={item.title}
                      desc={item.desc}
                      imageUrl={item.imageUrl}
                      sourceName={item.sourceName}
                      sourceDesc={item.sourceDesc}
                      time={item.time}
                      place={item.place}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* previous button */}
              {/* <button
                onClick={() => talkshowApi?.scrollPrev()}
                className="absolute top-1/2 -left-6 z-20 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none md:-left-16"
                aria-label="Previous Slide"
              >
                <img
                  src="/arrow.png"
                  alt="Previous"
                  className="h-9 w-9 object-contain drop-shadow-md md:h-11 md:w-11"
                />
              </button> */}

              {/* next button */}
              {/* <button
                onClick={() => talkshowApi?.scrollNext()}
                className="absolute top-1/2 -right-6 z-20 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none md:-right-16"
                aria-label="Next Slide"
              >
                <img
                  src="/arrow.png"
                  alt="Next"
                  className="h-9 w-9 scale-x-[-1] object-contain drop-shadow-md md:h-11 md:w-11"
                />
              </button> */}
            </Carousel>
          </div>

          <div className="my-8 flex items-center justify-center md:my-5">
            <motion.button
              onClick={() => navigate("/talkshow")}
              className="mt-6 rounded-2xl border-4 border-[#C62D76] bg-linear-to-b from-[#AC166C] to-[#6F0E4E] px-8 pt-3 pb-4 text-xl font-extrabold tracking-wide text-[#FFDB8C] shadow-[0px_2px_0px_0px_#F3414E] transition-all duration-200 hover:brightness-110"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            >
              Registrasi Talkshow
            </motion.button>
          </div>
        </motion.section>

        {/* location */}
        <motion.section
          className="my-16 flex w-full flex-col items-center gap-5 px-4 pb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="font-bold tracking-wider text-[#EFFF8D] uppercase text-shadow-[#F3414E] text-shadow-sm"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Lokasi
          </motion.h2>
          <div className="flex aspect-4/5 w-full max-w-2xl flex-col items-center justify-center gap-2 rounded-3xl border-8 border-[#FFB366] bg-gray-100 text-gray-400 md:aspect-video">
            <iframe
              title="Peta ITB Ganesha"
              src="https://www.openstreetmap.org/export/embed.html?bbox=107.608371%2C-6.892925%2C107.612371%2C-6.888925&layer=mapnik&marker=-6.890925%2C107.610371"
              className="h-full w-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <motion.button
            onClick={() => {
              // toast.info(
              //   "Untuk lokasi acara akan diadakan di ITB Ganesha, lebih lengkapnya menyusul ya, Luminettes!",
              // );
              navigate("/oleat");
            }}
            className={`group relative w-fit rounded-2xl border-4 border-[#FFB366] bg-linear-0 from-[#FFC76E] to-[#FFDB8C] px-10 py-3 font-bold tracking-wide uppercase transition-all duration-150 ease-in-out hover:brightness-110 active:translate-y-1 active:shadow-[0px_2px_0px_0px_##FFDB8C] sm:w-auto`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-linear-to-b from-[#FFDB8C] to-transparent to-90%" />
            <h3 className="z-10 text-xl text-[#87095A] drop-shadow-md">
              Lokasi Detail
            </h3>
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}

const CTAButton = ({
  onClick,
  text,
}: {
  onClick?: () => void;
  text?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`group relative w-fit rounded-2xl border-2 border-[#C62D76] bg-linear-to-b from-[#AC166C] to-[#6F0E4E] px-6 py-3 text-lg tracking-wide text-[#FFDB8C] uppercase shadow-[0px_2px_0px_0px_#F3414E] transition-all duration-150 ease-in-out hover:brightness-110 active:translate-y-1 active:shadow-[0px_2px_0px_0px_#F3414E] sm:w-max md:text-2xl`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-linear-to-b from-white/10 to-transparent" />
      <span className="relative z-10 drop-shadow-md">
        <h3 className="whitespace-nowrap text-shadow-sm">{text}</h3>
      </span>
    </button>
  );
};

const AcaraCard = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) => {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[18rem] flex-col items-center rounded-3xl border-4 border-[#FF9955] bg-[#FFC76E] p-4 text-center shadow-md shadow-[#590844]">
      <div className="mb-3 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-300">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mb-4 w-full rounded-2xl border-4 border-[#FFB366] bg-linear-180 from-[#FFDB8C] to-95% py-1">
        <p className="text-lg font-bold text-[#6F0E4E]">{title}</p>
      </div>

      <p className="w-full flex-1 text-justify text-sm leading-relaxed font-extrabold text-[#590844]">
        {description}
      </p>
    </div>
  );
};

const TalkshowCard = ({
  title,
  desc,
  imageUrl,
  sourceName,
  sourceDesc,
  time,
  place,
}: {
  title: string;
  desc: string;
  imageUrl: string;
  sourceName: string;
  sourceDesc: string;
  time: string;
  place: string;
}) => {
  return (
    <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border-4 border-[#302A77] bg-linear-to-t from-[#302A77] to-[#6E46B2] p-6 sm:mx-16 md:p-8">
      <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row-reverse">
        {/* judul & desc */}
        <div className="flex w-full grow flex-col content-between justify-start gap-6 text-center md:text-left">
          <div className="w-full rounded-xl border-4 border-[#FFC76E] bg-linear-to-b from-[#FFDB8C] to-[#FFC76E] px-8 py-2 text-center">
            <h3 className="font-body text-xl font-extrabold tracking-wide text-[#87095A] uppercase max-sm:text-base">
              {title}
            </h3>
          </div>

          <p className="px-2 text-justify text-sm leading-relaxed font-semibold text-[#FFEABB] max-md:text-center">
            {desc}
          </p>
        </div>

        {/* img */}
        <div className="mx-auto w-full max-w-xs shrink-0 md:mx-8 md:w-1/3 md:max-w-none">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-300">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* narasumber dan waktu */}
      <div className="z-10 mt-8 flex w-full items-center justify-evenly gap-4 max-sm:flex-row md:gap-6">
        <div className="z-10 w-full max-w-xs rounded-3xl border-4 border-[#FFC76E] bg-linear-to-b from-[#FFDB8C] to-[#FFC76E] px-6 py-4 text-center shadow-md sm:max-w-56 sm:flex-1">
          <p className="block text-xl font-extrabold text-[#590844] max-sm:text-base">
            {sourceName}
          </p>
          <p className="text-lg font-semibold text-[#AC166C] max-sm:text-xs">
            {sourceDesc}
          </p>
        </div>

        <div className="z-10 w-full max-w-xs rounded-3xl border-4 border-[#FFC76E] bg-linear-to-b from-[#FFDB8C] to-[#FFC76E] px-6 py-4 text-center shadow-md sm:max-w-56 sm:flex-1 md:max-w-40">
          <p className="block text-xl font-extrabold text-[#590844] max-sm:text-base">
            {time}
          </p>
          <p className="text-lg font-semibold text-[#AC166C] max-sm:text-xs">
            {place}
          </p>
        </div>
      </div>

      <img
        src="/rock-1.png"
        alt="Decorative Rock Left"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-16 opacity-80 md:w-32 md:opacity-100"
      />
      <img
        src="/rock-2.png"
        alt="Decorative Rock Right"
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-16 opacity-80 md:w-32 md:opacity-100"
      />
    </div>
  );
};
