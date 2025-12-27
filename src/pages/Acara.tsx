import React from "react";
import { useParams } from "react-router";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

export default function AcaraPage() {
  const { name } = useParams<{ name?: string }>();

  {/* dummy data carousel */}
  const carouselItems = Array.from({ length: 6 });
  const talkshowItems = Array.from({ length: 5 });

  const [acaraApi, setAcaraApi] = React.useState<CarouselApi | null>(null);
  const [talkshowApi, setTalkshowApi] = React.useState<CarouselApi | null>(null);
  return (
    <div 
      className="min-h-screen w-full bg-white text-gray-800 font-sans bg-cover bg-center bg-scroll" 
      style={{backgroundImage: "url('/src/assets/bg-acara.png')", fontFamily: "Darker Grotesque"}}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-12">
          {/* <h1 className="text-3xl font-bold">Acara: {name ?? "Nama Acara"}</h1> */}
        
        {/* header */}
        <section className="flex flex-col items-center text-center gap-4 my-24 md:my-48">
          <CTAButton text="AKU MASUK ITB"/>
          <h3 className="max-w-sm px-4 text-[#590844] text-base md:text-lg text-shadow-xs text-shadow-[#EF5D23] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
            finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc
            a nibh ullamcorper tempus.
          </h3>
        </section>

        {/* acara carousel */}
        <section className="w-full relative group px-4 md:px-12">
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
                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 flex justify-center"
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
                className="absolute left-1 md:-left-20 top-1/2 -translate-y-1/2 z-10 transition-transform hover:scale-110 focus:outline-none"
                aria-label="Previous Slide"
              >
                <img 
                    src="/src/assets/arrow.png" 
                    alt="Previous" 
                    className="w-10 h-10 md:w-16 md:h-16 object-contain drop-shadow-md"
                />
              </button>
              
              {/* next button */}
              <button 
                onClick={() => acaraApi?.scrollNext()}
                className="absolute right-1 md:-right-20 top-1/2 -translate-y-1/2 z-10 transition-transform hover:scale-110 focus:outline-none"
                aria-label="Next Slide"
              >
                <img 
                    src="/src/assets/arrow.png" 
                    alt="Next" 
                    className="w-10 h-10 md:w-16 md:h-16 object-contain scale-x-[-1] drop-shadow-md"
                />
              </button>
            </Carousel>
        </section>

        {/* rundown  */}
        <section className="flex flex-col items-center w-full gap-6 px-2 py-24">
            <h1 className="text-4xl font-bold uppercase tracking-wider text-[#87095A] text-shadow-sm text-shadow-[#F3414E]">
                Rundown Acara
            </h1>
            
            <div className="bg-[#FFDB8C] border-4 border-[#FFC76E] px-8 py-1 rounded-3xl font-bold text-[#6F0E4E] text-sm">
                <h3>DD / MM / YYYY</h3>
            </div>

            <div className="w-full max-w-lg flex flex-col gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex gap-4 w-full text-sm">
                        <div className="w-1/3 bg-[#FFC763] border-0 rounded-full py-2 flex items-center justify-center font text-xs font-bold text-[#590844]">
                            <p>00.00-00.00</p>
                        </div>
                        <div className="w-2/3 bg-[#FFC763] border-0 rounded-full py-2 flex items-center justify-center font-bold text-[#590844] text-center px-2">
                            <p className="line-clamp-1">ACARA ITEM {i + 1}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* talkshow */}
        <section className="w-full relative mt-8 mb-8 flex flex-col items-center px-2 md:px-0">
            <div className="w-full max-w-4xl relative">
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
                      className="basis-full flex justify-center"
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
                  className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 z-20 transition-transform hover:scale-110 focus:outline-none"
                  aria-label="Previous Slide"
                >
                  <img
                    src="/src/assets/arrow.png"
                    alt="Previous"
                    className="w-10 h-10 md:w-16 md:h-16 object-contain drop-shadow-md"
                  />
                </button>
                
                {/* next button */}
                <button
                  onClick={() => talkshowApi?.scrollNext()}
                  className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 z-20 transition-transform hover:scale-110 focus:outline-none"
                  aria-label="Next Slide"
                >
                  <img
                    src="/src/assets/arrow.png"
                    alt="Next"
                    className="w-10 h-10 md:w-16 md:h-16 object-contain scale-x-[-1] drop-shadow-md"
                  />
                </button>
              </Carousel>
            </div>

            <div className="flex justify-center items-center my-8 md:my-5">
              <CTAButton text="RSVP Talkshow"/>
            </div>
        </section>

        {/* location */}
        <section className="w-full flex flex-col items-center gap-5 pb-12 px-4 my-16">
            <h2 className="text-3xl font-bold uppercase tracking-wider text-[#EFFF8D] text-shadow-sm text-shadow-[#F3414E]">
                Lokasi
            </h2>
            <div className="w-full max-w-2xl aspect-video bg-gray-100 rounded-3xl border-8 border-[#FFB366] flex flex-col items-center justify-center text-gray-400 gap-2">
                <span className="font-medium text-sm">Map Placeholder</span>
            </div>
            <button
              onClick={() => {console.log("Lokasi Detail clicked")}}
              className={` relative group w-full sm:w-auto px-10 py-3 rounded-2xl font-bold tracking-wide uppercase transition-all duration-150 ease-in-out bg-linear-0 from-[#FFC76E] to-[#FFDB8C] border-4 border-[#FFB366] hover:brightness-110 active:translate-y-1 active:shadow-[0px_2px_0px_0px_##FFDB8C]
              `}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-[#FFDB8C] to-90% to-transparent rounded-t-xl pointer-events-none" />
              <h3 className="text-xl text-[#87095A] z-10 drop-shadow-md">
                Lokasi Detail
              </h3>
            </button>
        </section>

      </div>
    </div>
  );
}

const CTAButton = ({ onClick, text }: { onClick?: () => void; text?: string;}) => {
  return (
    <button
      onClick={onClick}
      className={` relative group w-fit sm:w-max px-6 py-3 text-lg md:text-2xl rounded-2xl text-[#FFDB8C] tracking-wide uppercase transition-all duration-150 ease-in-out bg-linear-to-b from-[#AC166C] to-[#6F0E4E] border-2 border-[#C62D76] shadow-[0px_2px_0px_0px_#F3414E] hover:brightness-110 active:translate-y-1 active:shadow-[0px_2px_0px_0px_#F3414E]
      `}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none" />
      <span className="relative z-10 drop-shadow-md ">
        <h3 className="text-shadow-sm whitespace-nowrap">{text}</h3>
      </span>
    </button>
  );
};

const AcaraCard = ({title, description, imageUrl}: {title: string; description: string; imageUrl: string;}) => {
  return (
    <div className="w-full max-w-[18rem] md:w-72 rounded-3xl p-4 mx-0 md:mx-4 flex flex-col items-center text-center relative shadow-md shadow-[#590844] bg-[#FFC76E] border-4 border-[#FF9955]">
      <div className="w-full aspect-4/3 bg-gray-300 mb-3 overflow-hidden flex items-center justify-center">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="w-full py-1 rounded-2xl mb-4 border-4 border-[#FFB366] bg-linear-180 from-[#FFDB8C] to-95%">
        <h3 className="font-bold text-2xl text-[#6F0E4E]">
          {title}
        </h3>
      </div>

      <p
        className="text-sm leading-relaxed font-extrabold text-justify text-[#590844]">
        {description}
      </p>
    </div>
  );
};

const TalkshowCard = ({title, desc, imageUrl, sourceName, sourceDesc, time, place }: {title: string; desc: string; imageUrl: string; sourceName: string; sourceDesc: string; time: string; place: string}) => {
  return (
    <div className="rounded-3xl p-6 md:p-8 sm:mx-16 relative overflow-hidden bg-linear-to-t from-[#302A77] to-[#6E46B2] border-4 border-[#302A77] w-full max-w-5xl">
      <div className="flex flex-col md:flex-row-reverse gap-8 items-center relative z-10">
        
        {/* judul & desc */}
        <div className="flex flex-col gap-6 grow justify-start content-between text-center md:text-left w-full">
          <div className="bg-linear-to-b from-[#FFDB8C] to-[#FFC76E] border-4 border-[#FFC76E] py-2 px-8 rounded-3xl w-full text-center">
            <h3 className="font-extrabold text-2xl uppercase tracking-wide text-[#87095A]">
              {title}
            </h3>
          </div>

          <p className="text-sm font-semibold leading-relaxed text-justify px-2 text-[#FFEABB]">
            {desc}
          </p>
        </div>

        {/* img */}
        <div className="w-full max-w-xs mx-auto md:max-w-none md:w-1/3 md:mx-8 shrink-0">
          <div className="aspect-square bg-gray-300 flex items-center justify-center rounded-2xl">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-2xl" />
          </div>
        </div>

      </div>

      {/* narasumber dan waktu */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 justify-evenly items-center z-10 w-full">
        <div className="w-full sm:flex-1 bg-[#FFDB8C] rounded-3xl py-4 px-6 max-w-xs sm:max-w-56 z-10 text-center">
          <p className="block font-extrabold text-xl text-[#590844]">
            {sourceName}
          </p>
          <p className="text-lg font-semibold text-[#AC166C]">
            {sourceDesc}
          </p>
        </div>

        <div className="w-full sm:flex-1 bg-[#FFDB8C] rounded-3xl py-4 px-6 max-w-xs sm:max-w-56 md:max-w-40 z-10 text-center">
          <p className="block font-extrabold text-xl text-[#590844]">
            {time}
          </p>
          <p className="text-lg font-semibold text-[#AC166C]">
            {place}
          </p>
        </div>
      </div>

      <img
        src="/src/assets/rock-1.png"
        alt="Decorative Rock Left"
        className="absolute bottom-0 left-0 w-16 md:w-32 z-0 pointer-events-none opacity-80 md:opacity-100"
      />
      <img
        src="/src/assets/rock-2.png"
        alt="Decorative Rock Right"
        className="absolute bottom-0 right-0 w-16 md:w-32 z-0 pointer-events-none opacity-80 md:opacity-100"
      />
    </div>
  );
}