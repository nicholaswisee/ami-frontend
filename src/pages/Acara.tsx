import React from "react";
import { useParams } from "react-router";

export default function AcaraPage() {
  const { name } = useParams<{ name?: string }>();

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 font-sans" style={{backgroundImage: "url('/src/assets/bg-acara.png')", fontFamily: "Darker Grotesque"}}>
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-12">
        
        {/* HEADER */}
        <section className="flex flex-col items-center text-center gap-4">
          <CTAButton text="AKU MASUK ITB"/>
          <h1 className="text-3xl font-bold">Acara: {name ?? "Nama Acara"}</h1>
          <p className="max-w-lg text-black font-extrabold text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
            finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc
            a nibh ullamcorper tempus.
          </p>
        </section>

        {/* CAROUSEL */}
        <section className="w-full relative group">
            <div className="w-full flex items-center gap-4 justify-center">
                <AcaraCard title="Acara 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus"/>
                <AcaraCard title="Acara 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus"/>
                <AcaraCard title="Acara 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus"/>
            </div>
        </section>

        {/* RUNDOWN  */}
        <section className="flex flex-col items-center w-full gap-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800">
                Rundown Acara
            </h2>
            
            <div className="bg-[#FFDB8C] border border-[#FFC76E] px-8 py-2 rounded-2xl font-bold text-gray-700 text-sm">
                DD / MM / YYYY
            </div>

            <div className="w-full max-w-lg flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-4 w-full text-sm">
                        <div className="w-1/3 bg-[#FFC763] border-0 rounded-full py-2 flex items-center justify-center font-mono text-xs font-bold text-gray-600">
                            00.00-00.00
                        </div>
                        <div className="w-2/3 bg-[#FFC763] border-0 rounded-full py-2 flex items-center justify-center font-bold text-gray-700">
                            ACARA ITEM {i + 1}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* TALKSHOW */}
        <section className="w-full relative mt-8 mb-8 flex flex-col items-center">
            <div className="flex-row items-center">
              <TalkshowCard title="Talkshow" desc="Lorem Ipsum" sourceName="Lorem" sourceDesc="Ipsum" time="00:00" place="Lorem"/>
            <div className="flex justify-center items-center">
              <CTAButton text="RSPV Talkshow"/>
            </div>
            </div>
        </section>

        {/* LOCATION  */}
        <section className="w-full flex flex-col items-center gap-4 pb-12">
            <h2 className="text-xl font-bold uppercase tracking-wider text-gray-800">
                Lokasi
            </h2>
            <div className="w-full max-w-2xl aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-2">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                 <span className="font-medium text-sm">Map Placeholder</span>
            </div>
        </section>

      </div>
    </div>
  );
}

const CTAButton = ({ onClick, text }: { onClick?: () => void; text?: string;}) => {
  return (
    <button
      onClick={onClick}
      className={` relative group w-full sm:w-auto px-10 py-3 rounded-2xl font-bold text-white font-[] tracking-wide uppercase transition-all duration-150 ease-in-out bg-gradient-to-b from-[#AC166C] to-[#6F0E4E] border-2 border-[#C62D76] shadow-[0px_2px_0px_0px_#F3414E] hover:brightness-110 active:translate-y-[4px] active:shadow-[0px_2px_0px_0px_#F3414E]
      `}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none" />
      <span className="relative z-10 drop-shadow-md">
        {text}
      </span>
    </button>
  );
};
const AcaraCard = ({title, description, imageUrl}: {title: string; description: string; imageUrl: string;}) => {
  // Colors derived from image_2.png
  const colors = {
    cardBg: '#FFDB8C', // Orange-200
    cardBorder: '#F87F42', // Orange-600
    titleBg: '#FFC76E', // Orange-300
    textColor: '#050836', // Purple-900 
  };

  return (
    <div
      className="w-72 rounded-3xl p-6 mx-4 flex flex-col items-center text-center relative shadow-sm shadow-[#590844]"
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
  return (
    <div>
      {title} - {desc} - {sourceName} - {sourceDesc} - {time} - {place}
    </div>
  )
}