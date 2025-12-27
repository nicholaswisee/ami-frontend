import Countdown from '../components/countdown';
import Rundown from '../components/rundown';
import EventBlocks from '../components/EventBlocks';
import PastEvents from '../components/PastEvents';

export default function ItbDayPage() {
  return (
    <section>
      <div className="h-full w-full"
        style={{
          backgroundImage: 'url(/homepage-bg-second.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        {/* Countdown */}
        <Countdown />
        <div className="relative flex flex-col justify-center items-center py-[400px] gap-[132px]">
          {/* Left Flower Decoration */}
          <img
            src="/Copy of Bunga_2_Ayu.webp"
            alt=""
            className="absolute right-30 top-[1200px] w-[120px] h-auto z-20 pointer-events-none"
          />

          <img
            src="/Copy of Bunga_2_Ayu.webp"
            alt=""
            className="absolute left-15 top-[1150px] w-[120px] h-auto z-20 pointer-events-none"
            style={{ transform: 'scaleX(-1) rotate(40deg)' }}
          />

          {/* Right Vine Decoration */}
          <img
            src="/Vines_3_Ical 1.webp"
            alt=""
            className="absolute right-0 top-[980px] w-[300px] h-auto z-10 pointer-events-none"
          />

          <img
            src="/Vines_1_Ical 1.webp"
            alt=""
            className="absolute left-0 top-[980px] w-[300px] h-auto z-15 pointer-events-none"
          />

          {/* Title */}
          <div className="flex flex-col gap-6 items-center">
            <div className="p-2 bg-linear-to-t rounded-4xl from-[#590844] to-[#BF1192] drop-shadow-2xl">
              <div className="px-10 py-6 rounded-4xl bg-[#87095A] ">
                <h1 className="text-orange-300 font-bold text-[54px] text-shadow-lg text-justify leading-none">ITB Day</h1>
              </div>
            </div>
            <h2 className="max-w-[836px] text-[#590844] text-[40px] font-bold text-center text-shadow-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus. </h2>
          </div>

          {/* Event Blocks Component */}
          <EventBlocks />

          {/* Rundown Component */}
          <Rundown />

          {/* Foto2 Tahun lalu */}
          <PastEvents />
        </div>
      </div>
    </section>
  );
}
