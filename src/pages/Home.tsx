import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

export default function HomePage() {
  return (
    <ParallaxProvider>
      <section className="relative w-full overflow-hidden bg-[#1a1a3e]">
        {/* Background Image - First background (covers sections 1-3 + top half of transition) */}
        <div className="absolute inset-0 z-0 h-[350vh]">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: 'url(/homepage-bg.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        {/* Background Image - Second background (starts at middle of transition section) */}
        <div className="absolute top-[350vh] left-0 right-0 z-0 h-[350vh]">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: 'url(/homepage-bg-second.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        {/* === FIRST SECTION: Percikan Cahaya === */}
        <div className="relative z-[20] flex min-h-screen flex-col items-center justify-center px-4">
          <Parallax speed={-15} scale={[0.8, 1.1]} opacity={[1, 1]}>
            <h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-orange-200 drop-shadow-lg italic"
              style={{ 
                fontFamily: 'Euskadi, serif',
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
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-orange-200 drop-shadow-2xl italic"
              style={{ 
                fontFamily: 'Euskadi, serif',
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
            className="absolute left-[-15%] md:left-[-5%] top-[-10%]md:top-[-20%] z-[12] pointer-events-none"
          >
            <img 
              src="/tree-left-main.webp" 
              alt="Tree Left"
              className="h-[65vh] md:h-[110vh] w-auto object-contain"
            />
          </Parallax>

          {/* AMI Logo */}
          <Parallax speed={-12} scale={[0.7, 1.2]} rotate={[-5, 5]}>
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
        <div className="relative z-[20] top-[-100%] min-h-screen w-full">
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
              className="text-base md:text-3xl text-[#600949] font-bold mb-8 px-4"
              style={{ 
                fontFamily: 'Euskadi, serif',
                textShadow: '2px 2px 4px rgba(96, 9, 73, 0.3)'
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper. Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus.
            </p>
            <button 
              className="bg-[#6b1557] hover:bg-[#7a1a64] text-yellow-300 font-bold py-3 px-10 rounded-2xl text-base md:text-3xl transition-all duration-300 border-4 border-[#39112e] shadow-lg"
              style={{ 
                fontFamily: 'Euskadi, serif',
                boxShadow: '0 4px 6px rgba(74, 13, 58, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              ITB DAY
            </button>
          </div>
        </div>

        {/* TO DO!! === FIFTH SECTION: Event Masuk ITB === */}
        

        {/* TO DO ! === SIXTH SECTION: Timeline === */}
        
      </section>
    </ParallaxProvider>
  );
}
