import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import BlockEventAMI from '../component/BlockEventAMI';
import AmiImage from '../component/AmiImage';
import Sponsor from '../component/Sponsor';
import MediaPartner from '../component/MediaPartner';

export default function HomePage() {
  return (
    <ParallaxProvider>
      <section className="relative w-full overflow-hidden bg-[#1a1a3e]">
        {/* Background Image - First background (covers sections 1-3 + top half of transition) */}
        {/* Keep the backdrop static so only the foreground objects parallax */}
        <div className="pointer-events-none absolute inset-0 z-0 h-[350vh]">
          <div 
            className="h-full w-full bg-fixed"
            style={{
              backgroundImage: 'url(/homepage-bg.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }}
          />
        </div>

        {/* Background Image - Second background (starts at middle of transition section) */}
        <div className="pointer-events-none absolute top-[350vh] left-0 right-0 z-0 h-[550vh]">
          <div 
            className="h-full w-full bg-fixed"
            style={{
              backgroundImage: 'url(/homepage-bg-second.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }}
          />
        </div>

        {/* Background Extension - Third background for additional sections */}
        <div className="pointer-events-none absolute top-[850vh] left-0 right-0 z-0 h-[350vh]">
          <div 
            className="h-full w-full bg-[#1a1a3e]"
          />
        </div>

        {/* === FIRST SECTION: Percikan Cahaya === */}
        <div className="relative z-[20] flex min-h-screen flex-col items-center justify-center px-4">
          <Parallax speed={-15} scale={[0.8, 1.1]} opacity={[1, 1]}>
            <h1 
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-orange-200 drop-shadow-lg italic"
              style={{ 
                textShadow: '0 0 30px rgba(232, 185, 35, 0.5)'
              }}
            >
              Percikan Cahaya
            </h1>
          </Parallax>
        </div>

        {/* === SECOND SECTION: Menembus Kegelapan + Tree Right === */}
        <div className="relative z-[20] flex min-h-screen flex-col items-center justify-center px-4">
          <Parallax 
            speed={-8} 
            translateX={['200px', '0px']}
            className="absolute right-[-10%] md:right-[0%] top-[-5%] z-[12] pointer-events-none"
          >
            <img 
              src="/tree-right-main.webp" 
              alt="Tree Right"
              className="h-[80vh] md:h-[110vh] w-auto object-contain"
            />
          </Parallax>

          {/* Glowing orb effect */}
          <Parallax 
            speed={12} 
            translateY={['80px', '-80px']}
            opacity={[1, 0]}
            className="absolute left-[8%] md:left-[12%] bottom-[30%] md:bottom-[35%] z-[8]"
          >
            <div 
              className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full bg-yellow-300 blur-md animate-pulse"
              style={{
                boxShadow: '0 0 60px 30px rgba(253, 224, 71, 0.8), 0 0 100px 50px rgba(253, 224, 71, 0.4)'
              }}
            />
          </Parallax>

          <Parallax speed={-15} scale={[0.9, 1.05]} className="relative z-[16] mr-[25%] md:mr-[30%] lg:mr-[35%]">
            <h1 
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-orange-200 drop-shadow-2xl italic"
              style={{ 
                textShadow: '0 0 40px rgba(232, 185, 35, 0.7), 0 0 80px rgba(232, 185, 35, 0.3)'
              }}
            >
              Menembus kegelapan
            </h1>
          </Parallax>
        </div>

        {/* === THIRD SECTION: AMI Logo + Tree Left === */}
        <div className="relative z-[20] flex min-h-screen flex-col items-center justify-center px-4">
          {/* Tree Left */}
          <Parallax 
            speed={-8} 
            translateX={['-80px', '100px']}
            className="absolute left-[-15%] md:left-[-5%] top-[-10%]md:top-[-20%] z-[50] pointer-events-none"
          >
            <img 
              src="/tree-left-main.webp" 
              alt="Tree Left"
              className="h-[65vh] md:h-[110vh] w-auto object-contain"
            />
          </Parallax>

          {/* AMI Logo */}
          <Parallax speed={-12} scale={[0.7, 1.2]} rotate={[-5, 5]} opacity={[1, 0]}>
            <img 
              src="/ami-logo.webp" 
              alt="AMI Logo"
              className="w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
            />
          </Parallax>

          {/* Right leaf */}
          <Parallax 
            speed={-8} 
            translateX={['100px', '-20px']}
            className="absolute right-[-5%] md:right-[0%] bottom-[10%] top-40% md:top-[40%] z-[30] pointer-events-none"
          >
            <img 
              src="/leaf-right-main.webp" 
              alt="leaf right"
              className="h-[35vh] md:h-[40vh] lg:h-[60vh] w-auto object-contain"
            />
          </Parallax>
        </div>

        {/* === FOURTH SECTION: Transition === */}
        <div className="relative z-[12] top-[-100%] min-h-screen w-full">
          {/* Transition Layer 1 - Mountains at top */}
          <img 
            src="/transition-1.webp" 
            alt="Transition 1"
            className="absolute top-[20%] md:top-[-45%] left-0 w-full h-auto z-[10]"
          />
    
          {/* Transition Layer 2 - Purple mountains below */}
          <img 
            src="/transition-2.webp" 
            alt="Transition 2"
            className="absolute top-[30%] md:top-[-25%] left-0 w-full h-auto z-[11]"
          />
        </div>

        {/* === FIFTH SECTION: ITB Day === */}
        <div className="relative z-[20] flex min-h-screen flex-col items-center justify-center px-6 md:px-12 pb-20">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <p
              className="font-subheading text-[#87095A] text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8"
              style={{
                textShadow: '0 4px 5.3px rgba(245, 55, 55, 0.99)'
              }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias similique dolorum illo quaerat placeat repudiandae, sequi quae consectetur quam recusandae natus incidunt. Atque, quos itaque nam consectetur saepe molestias unde?
            </p>
            <button 
              className="font-heading bg-[#6b1557] hover:bg-[#7a1a64] text-yellow-300 font-bold py-3 px-10 rounded-2xl text-lg md:text-2xl lg:text-3xl transition-all duration-300 border-4 border-[#39112e] shadow-lg"
              style={{ 
                boxShadow: '0 4px 6px rgba(74, 13, 58, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              ITB DAY
            </button>
          </div>
          
        </div>

        {/* TO DO!! === FIFTH SECTION: Event Masuk ITB === */}
        <BlockEventAMI/>
        

        {/* TO DO ! === SIXTH SECTION: Timeline === */}
        <AmiImage/>
        
        <div className="hidden md:block">
          <Sponsor/>
          <MediaPartner/>
        </div>

        
        
      </section>
    </ParallaxProvider>
  );
}
