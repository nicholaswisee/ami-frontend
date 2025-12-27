import React from "react";
import { useParams } from "react-router";

export default function AcaraPage() {
  const { name } = useParams<{ name?: string }>();

  return (
    <div 
      className="min-h-screen w-full bg-white text-gray-800 font-sans bg-cover bg-center bg-scroll" 
      style={{backgroundImage: "url('/src/assets/bg-acara.png')", fontFamily: "Darker Grotesque"}}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-12">
          {/* <h1 className="text-3xl font-bold">Acara: {name ?? "Nama Acara"}</h1> */}
        
        {/* HEADER */}
        <section className="flex flex-col items-center text-center gap-4 my-24 md:my-48">
          <CTAButton text="AKU MASUK ITB"/>
          <h3 className="max-w-sm px-4 text-[#590844] text-base md:text-lg text-shadow-xs text-shadow-[#EF5D23] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
            finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc
            a nibh ullamcorper tempus.
          </h3>
        </section>

        {/* carousel */}
        <section className="w-full relative group">
            <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-4 justify-center">
                <AcaraCard title="Acara 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus"/>
                <AcaraCard title="Acara 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus"/>
                <AcaraCard title="Acara 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus"/>
            </div>
        </section>

        {/* rundown  */}
        <section className="flex flex-col items-center w-full gap-6 px-2">
            <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800">
                Rundown Acara
            </h2>
            
            <div className="bg-[#FFDB8C] border border-[#FFC76E] px-8 py-2 rounded-2xl font-bold text-gray-700 text-sm">
                <h3>DD / MM / YYYY</h3>
            </div>

            <div className="w-full max-w-lg flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-4 w-full text-sm">
                        <div className="w-1/3 bg-[#FFC763] border-0 rounded-full py-2 flex items-center justify-center font-mono text-xs font-bold text-gray-600">
                            <p>00.00-00.00</p>
                        </div>
                        <div className="w-2/3 bg-[#FFC763] border-0 rounded-full py-2 flex items-center justify-center font-bold text-gray-700 text-center px-2">
                            <p className="line-clamp-1">ACARA ITEM {i + 1}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* talkshow */}
        <section className="w-full relative mt-8 mb-8 flex flex-col items-center px-2 md:px-0">
            <div className="w-full flex flex-col items-center">
              <TalkshowCard title="Talkshow" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus." sourceName="Lorem" sourceDesc="Ipsum" time="00:00" place="Lorem"/>
            <div className="flex justify-center items-center my-8 md:my-5">
              <CTAButton text="RSPV Talkshow"/>
            </div>
            </div>
        </section>

        {/* location */}
        <section className="w-full flex flex-col items-center gap-4 pb-12 px-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800">
                Lokasi
            </h2>
            <div className="w-full max-w-2xl aspect-video bg-gray-100 rounded-xl border-4 border-[#FFDB8C] flex flex-col items-center justify-center text-gray-400 gap-2">
                <span className="font-medium text-sm">Map Placeholder</span>
            </div>
            <button
              onClick={() => {console.log("Lokasi Detail clicked")}}
              className={` relative group w-full sm:w-auto px-10 py-3 rounded-2xl font-bold tracking-wide uppercase transition-all duration-150 ease-in-out bg-linear-0 from-[#FFC76E] to-[#FFDB8C] border-4 border-[#FFC76E] hover:brightness-110 active:translate-y-[4px] active:shadow-[0px_2px_0px_0px_##FFDB8C]
              `}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#FFDB8C] to-90% to-transparent rounded-t-xl pointer-events-none" />
              <span className="relative z-10 drop-shadow-md">
                Lokasi Detail
              </span>
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
      className={` relative group w-full sm:w-auto px-6 py-3 text-lg md:text-2xl rounded-2xl text-[#FFDB8C] tracking-wide uppercase transition-all duration-150 ease-in-out bg-gradient-to-b from-[#AC166C] to-[#6F0E4E] border-2 border-[#C62D76] shadow-[0px_2px_0px_0px_#F3414E] hover:brightness-110 active:translate-y-[4px] active:shadow-[0px_2px_0px_0px_#F3414E]
      `}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none" />
      <span className="relative z-10 drop-shadow-md ">
        <h3 className="text-shadow-sm whitespace-nowrap">{text}</h3>
      </span>
    </button>
  );
};

const AcaraCard = ({title, description, imageUrl}: {title: string; description: string; imageUrl: string;}) => {
  const colors = {
    cardBg: '#FFDB8C', // Orange-200
    cardBorder: '#F87F42', // Orange-600
    titleBg: '#FFC76E', // Orange-300
    textColor: '#050836', // Purple-900 
  };

  return (
    <div
      // Changed width to be responsive: w-full max-w-[18rem] on mobile, w-72 on desktop
      className="w-full max-w-[18rem] md:w-72 rounded-3xl p-6 mx-0 md:mx-4 flex flex-col items-center text-center relative shadow-sm shadow-[#590844]"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.cardBorder,
        borderWidth: '4px',
      }}
    >
      {/* Image */}
      <div className="w-full aspect-[4/3] bg-gray-300 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          //placeholder image 
          <svg
            className="w-24 h-24 text-gray-100"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        )}
      </div>

      <div
        className="w-full py-3 rounded-3xl mb-4 border-4 border-[#FFB336]"
        style={{ backgroundColor: colors.titleBg }}
      >
        <h3
          className="font-extrabold text-2xl"
          style={{ color: colors.textColor }}
        >
          {title}
        </h3>
      </div>

      <p
        className="text-sm leading-relaxed font-medium"
        style={{ color: colors.textColor }}
      >
        {description}
      </p>
    </div>
  );
};

const TalkshowCard = ({title, desc, sourceName, sourceDesc, time, place }: {title: string; desc: string, sourceName: string; sourceDesc: string; time: string; place: string}) => {
  const colors = {
    cardBg: '#302A77', // Purple-700
    accentBg: '#FFDB8C', // Orange-200 
    textColorDark: '#302A77', // Purple-700
    textColorLight: '#FFFFFF', // White
  };

  return (
    <div
      className="rounded-3xl p-6 md:p-8 relative overflow-hidden bg-linear-0 from-[#302A77] to-[#6E46B2] border-4 border-[#302A77] w-full max-w-5xl"
    >
      <div className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 md:w-10 md:h-10"
          style={{ color: colors.accentBg }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>

      {/* Right Arrow */}
      <div className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 md:w-10 md:h-10"
          style={{ color: colors.accentBg }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
        {/* left box (Image) */}
        <div className="w-full md:w-1/3 md:mx-8 shrink-0">
          <div className="aspect-square bg-white flex items-center justify-center p-8 rounded-2xl">
            <svg
              className="w-full h-full text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        </div>

        {/* Right box (Text) */}
        <div className="flex flex-col gap-6 grow justify-center content-between text-center md:text-left">
          <div
            className="bg-[#FFDB8C] border-4 border-[#FFC76E] py-3 px-8 rounded-3xl w-full text-center"
          >
            <h3
              className="font-extrabold text-xl tracking-wide"
              style={{ color: colors.textColorDark }}
            >
              {title}
            </h3>
          </div>

            <p className="text-sm leading-relaxed text-justify px-2" style={{ color: colors.textColorLight }}>
            {desc}
          </p>
        </div>
      </div>

      {/* Bottom Boxes: Stack on small mobile, row on larger */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 justify-evenly items-center z-10 w-full">
        <div
          className="w-full sm:flex-1 bg-[#FFDB8C] rounded-3xl py-4 px-6 max-w-xs sm:max-w-56 text-center"
        >
          <span
            className="block font-bold text-lg"
            style={{ color: colors.textColorDark }}
          >
            <p>{sourceName}</p>
          </span>
          <span className="text-sm" style={{ color: colors.textColorDark }}>
            <p>{sourceDesc}</p>
          </span>
        </div>

        <div
          className="w-full sm:flex-1 rounded-full py-4 px-6 max-w-xs sm:max-w-40 text-center"
          style={{ backgroundColor: colors.accentBg }}
        >
          <span
            className="block font-bold text-lg"
            style={{ color: colors.textColorDark }}
          >
            <p>{time}</p>
          </span>
          <span className="text-sm" style={{ color: colors.textColorDark }}>
            <p>{place}</p>
          </span>
        </div>
      </div>

      <img
        src="/src/assets/rock-1.png"
        alt="Decorative Rock Left"
        className="absolute bottom-0 left-0 w-16 md:w-32 -z-0 pointer-events-none opacity-80 md:opacity-100"
      />
      <img
        src="/src/assets/rock-2.png"
        alt="Decorative Rock Right"
        className="absolute bottom-0 right-0 w-16 md:w-32 -z-0 pointer-events-none opacity-80 md:opacity-100"
      />
    </div>
  );
}