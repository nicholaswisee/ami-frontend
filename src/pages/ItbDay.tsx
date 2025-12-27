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
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
        }}>
        {/* Countdown */}
        <Countdown />
        <div className="flex flex-col justify-center items-center py-[400px] gap-[132px]">

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
