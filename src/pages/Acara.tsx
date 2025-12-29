import React from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function AcaraPage() {
  const carouselItems = Array.from({ length: 6 });
  const talkshowItems = Array.from({ length: 5 });

  const [acaraApi, setAcaraApi] = React.useState<CarouselApi | null>(null);
  const [talkshowApi, setTalkshowApi] = React.useState<CarouselApi | null>(
    null,
  );
  return (
    <div
      className="min-h-screen w-full bg-white bg-cover bg-scroll bg-center text-gray-800"
      style={{
        backgroundImage: "url('/src/assets/bg-acara.png')",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8">
        {/* <h1 className="text-3xl font-bold">Acara: {name ?? "Nama Acara"}</h1> */}

        {/* header */}
        <section className="my-24 flex flex-col items-center gap-4 text-center md:my-48">
          <CTAButton text="AKU MASUK ITB" />
          <h3 className="max-w-lg px-4 text-base leading-relaxed text-[#590844] text-shadow-[#EF5D23] text-shadow-xs md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin
            vitae nunc a nibh ullamcorper tempus.
          </h3>
        </section>

        {/* acara carousel */}
        <section className="group relative w-full px-4 md:px-12">
          <Carousel
            setApi={setAcaraApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 pb-4">
              {carouselItems.map((_, index) => (
                <CarouselItem
                  key={index}
                  className="flex basis-full justify-center pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <AcaraCard
                      title={`Acara ${index + 1}`}
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper."
                      imageUrl="/src/assets/img-placeholder.png"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/*prev button */}
            <button
              onClick={() => acaraApi?.scrollPrev()}
              className="absolute top-1/2 left-1 z-10 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none md:-left-15"
              aria-label="Previous Slide"
            >
              <img
                src="/src/assets/arrow.png"
                alt="Previous"
                className="h-10 w-10 object-contain drop-shadow-md md:h-16 md:w-16"
              />
            </button>

            {/* next button */}
            <button
              onClick={() => acaraApi?.scrollNext()}
              className="absolute top-1/2 right-1 z-10 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none md:-right-15"
              aria-label="Next Slide"
            >
              <img
                src="/src/assets/arrow.png"
                alt="Next"
                className="h-10 w-10 scale-x-[-1] object-contain drop-shadow-md md:h-16 md:w-16"
              />
            </button>
          </Carousel>
        </section>

        {/* rundown  */}
        <section className="flex w-full flex-col items-center gap-6 px-2 py-24">
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
        </section>

        {/* talkshow */}
        <section className="relative mt-8 mb-8 flex w-full flex-col items-center px-2 md:px-0">
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
                {talkshowItems.map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="flex basis-full justify-center"
                  >
                    <TalkshowCard
                      title={`Judul Talkshow ${index + 1}`}
                      desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus."
                      imageUrl="/src/assets/img-placeholder.png"
                      sourceName="Nama Narasumber"
                      sourceDesc="Deskripsi"
                      time="Waktu"
                      place="Tempat"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* previous button */}
              <button
                onClick={() => talkshowApi?.scrollPrev()}
                className="absolute top-1/2 left-2 z-20 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none md:-left-5"
                aria-label="Previous Slide"
              >
                <img
                  src="/src/assets/arrow.png"
                  alt="Previous"
                  className="h-10 w-10 object-contain drop-shadow-md md:h-16 md:w-16"
                />
              </button>

              {/* next button */}
              <button
                onClick={() => talkshowApi?.scrollNext()}
                className="absolute top-1/2 right-2 z-20 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none md:-right-5"
                aria-label="Next Slide"
              >
                <img
                  src="/src/assets/arrow.png"
                  alt="Next"
                  className="h-10 w-10 scale-x-[-1] object-contain drop-shadow-md md:h-16 md:w-16"
                />
              </button>
            </Carousel>
          </div>

          <div className="my-8 flex items-center justify-center md:my-5">
            <CTAButton text="RSVP Talkshow" />
          </div>
        </section>

        {/* location */}
        <section className="my-16 flex w-full flex-col items-center gap-5 px-4 pb-12">
          <h2 className="text-3xl font-bold tracking-wider text-[#EFFF8D] uppercase text-shadow-[#F3414E] text-shadow-sm">
            Lokasi
          </h2>
          <div className="flex aspect-video w-full max-w-2xl flex-col items-center justify-center gap-2 rounded-3xl border-8 border-[#FFB366] bg-gray-100 text-gray-400">
            <span className="text-sm font-medium">Map Placeholder</span>
          </div>
          <button
            onClick={() => {
              console.log("Lokasi Detail clicked");
            }}
            className={`group relative w-fit rounded-2xl border-4 border-[#FFB366] bg-linear-0 from-[#FFC76E] to-[#FFDB8C] px-10 py-3 font-bold tracking-wide uppercase transition-all duration-150 ease-in-out hover:brightness-110 active:translate-y-1 active:shadow-[0px_2px_0px_0px_##FFDB8C] sm:w-auto`}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-linear-to-b from-[#FFDB8C] to-transparent to-90%" />
            <h3 className="z-10 text-xl text-[#87095A] drop-shadow-md">
              Lokasi Detail
            </h3>
          </button>
        </section>
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
    <div className="relative mx-0 flex w-full max-w-[18rem] flex-col items-center rounded-3xl border-4 border-[#FF9955] bg-[#FFC76E] p-4 text-center shadow-md shadow-[#590844] md:mx-4 md:w-72">
      <div className="mb-3 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-300">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mb-4 w-full rounded-2xl border-4 border-[#FFB366] bg-linear-180 from-[#FFDB8C] to-95% py-1">
        <h3 className="text-2xl font-bold text-[#6F0E4E]">{title}</h3>
      </div>

      <p className="text-justify text-sm leading-relaxed font-extrabold text-[#590844]">
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
          <div className="w-full rounded-3xl border-4 border-[#FFC76E] bg-linear-to-b from-[#FFDB8C] to-[#FFC76E] px-8 py-2 text-center">
            <h3 className="text-2xl font-extrabold tracking-wide text-[#87095A] uppercase">
              {title}
            </h3>
          </div>

          <p className="px-2 text-justify text-sm leading-relaxed font-semibold text-[#FFEABB]">
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
      <div className="z-10 mt-8 flex w-full flex-col items-center justify-evenly gap-4 sm:flex-row md:gap-6">
        <div className="z-10 w-full max-w-xs rounded-3xl bg-[#FFDB8C] px-6 py-4 text-center sm:max-w-56 sm:flex-1">
          <p className="block text-xl font-extrabold text-[#590844]">
            {sourceName}
          </p>
          <p className="text-lg font-semibold text-[#AC166C]">{sourceDesc}</p>
        </div>

        <div className="z-10 w-full max-w-xs rounded-3xl bg-[#FFDB8C] px-6 py-4 text-center sm:max-w-56 sm:flex-1 md:max-w-40">
          <p className="block text-xl font-extrabold text-[#590844]">{time}</p>
          <p className="text-lg font-semibold text-[#AC166C]">{place}</p>
        </div>
      </div>

      <img
        src="/src/assets/rock-1.png"
        alt="Decorative Rock Left"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-16 opacity-80 md:w-32 md:opacity-100"
      />
      <img
        src="/src/assets/rock-2.png"
        alt="Decorative Rock Right"
        className="pointer-events-none absolute right-0 bottom-0 z-0 w-16 opacity-80 md:w-32 md:opacity-100"
      />
    </div>
  );
};
