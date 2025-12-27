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
        <div className="relative flex flex-col justify-center items-center py-50 gap-50 md:py-[400px] md:gap-[132px]">
          {/* Decorations Layer - Behind content */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* for event blocks */}
            {/* Vines Layer - Bottom */}
            <img
              src="/Vines_3_Ical 1.webp"
              alt=""
              className="absolute right-0 top-[980px] w-[300px] h-auto z-0"
            />

            <img
              src="/Vines_1_Ical 1.webp"
              alt=""
              className="absolute left-0 top-[980px] w-[300px] h-auto z-0"
            />

            {/* Flowers Layer - On top of vines */}
            <img
              src="/Copy of Bunga_2_Ayu.webp"
              alt=""
              className="absolute right-30 top-[1200px] w-[120px] h-auto z-10"
            />

            <img
              src="/Copy of Bunga_2_Ayu.webp"
              alt=""
              className="absolute left-15 top-[1150px] w-[120px] h-auto z-10"
              style={{ transform: 'scaleX(-1) rotate(40deg)' }}
            />

            {/* for past events */}
            <img
              src="/Copy of Bunga_1_Ayu.webp"
              alt=""
              className="absolute right-125 top-[2650px] w-[120px] h-auto z-10"
            />
            
            <img
              src="/Copy of Bunga_1_Ayu.webp"
              alt=""
              className="absolute left-145 top-[2390px] w-[120px] h-auto z-10"
            />
            
            <img
              src="/Vines baru(1) 1.webp"
              alt=""
              className="absolute left-0 top-[2260px] w-[300px] h-auto z-0"
            />
            
            <img
              src="/Vines baru(1) 2.webp"
              alt=""
              className="absolute left-100 top-[2300px] w-[400px] h-auto z-0"
            />

            <img
              src="/Vines baru(1) 3.webp"
              alt=""
              className="absolute right-95 top-[2500px] w-[400px] h-auto z-0"
            />

            <img
              src="/Vines baru(1) 4.webp"
              alt=""
              className="absolute right-0 top-[2550px] w-[300px] h-auto z-0"
            />

          </div>

          {/* Title */}
          <div className="relative z-10 flex flex-col gap-6 items-center">
            <div className="p-2 bg-linear-to-t md:rounded-4xl rounded-2xl from-[#590844] to-[#9B0E76]"
              style={{
                boxShadow: '0px 4px 0px rgba(243, 65, 78, 1), 0px 4px 0px rgba(243, 65, 78, 1)'
              }}>
              <div className="md:px-10 md:py-6 px-2 py-2 md:rounded-4xl rounded-2xl bg-[#87095A] ">
                <h1 className="text-[#FFB366] md:text-orange-300 font-bold text-[26px] md:text-[54px] text-justify leading-none"
                  style={{
                    fontFamily: 'Euskadi, serif',
                    textShadow: '0px 4px 0.3px rgba(89, 8, 68, 1), 0px 4px 0.3px rgba(89, 8, 68, 1)'
                  }}>ITB Day</h1>
              </div>
            </div>
            <h2 className="max-w-[290px] md:max-w-[836px] text-[#590844] text-[20px] md:text-[40px] font-bold text-center text-shadow-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus. </h2>
          </div>

          {/* Event Blocks Component */}
          <div className="relative z-10 w-full flex justify-center">
            <EventBlocks />
          </div>

          {/* Rundown Component */}
          <div className="relative z-10 w-full flex justify-center">
            <Rundown />
          </div>

          {/* Foto2 Tahun lalu */}
          <div className="relative z-10 w-full flex justify-center">
            <PastEvents />
          </div>
        </div>
      </div>
    </section>
  );
}
