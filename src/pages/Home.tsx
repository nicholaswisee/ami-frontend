import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

export default function HomePage() {
  return (
    <ParallaxProvider>
      <section className="relative min-h-[300vh] w-full overflow-hidden bg-[#1a1a3e]">
        {/* Background Image - Scrolls normally */}
        <div className="absolute inset-0 z-0">
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
              className="h-[90vh] md:h-[110vh] lg:h-[130vh] w-auto object-contain"
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
            className="absolute left-[-5%] md:left-[-5%] top-[-20%] z-[12] pointer-events-none"
          >
            <img 
              src="/tree-left-main.webp" 
              alt="Tree Left"
              className="h-[90vh] md:h-[110vh] lg:h-[130vh] w-auto object-contain"
            />
          </Parallax>

          {/* AMI Logo */}
          <Parallax speed={-12} scale={[0.7, 1.2]} rotate={[-5, 5]}>
            <img 
              src="/ami-logo.webp" 
              alt="AMI Logo"
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
            />
          </Parallax>

          {/* Right leaf */}
          <Parallax 
            speed={-8} 
            translateX={['100px', '-20px']}
            className="absolute right-[-10%] md:right-[0%] top-[50%] z-[12] pointer-events-none"
          >
            <img 
              src="/leaf-right-main.webp" 
              alt="leaf right"
              className="h-[20vh] md:h-[40vh] lg:h-[60vh] w-auto object-contain"
            />
          </Parallax>
        </div>
      </section>
    </ParallaxProvider>
  );
}
