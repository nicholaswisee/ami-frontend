import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

export default function HomePage() {
  return (
    <ParallaxProvider>
      <section className="relative min-h-[300vh] w-full overflow-hidden bg-[#1a1a3e]">
        {/* Background Image - Slowest layer */}
        <div className="fixed inset-0 z-0">
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
          <Parallax speed={-10}>
            <h2 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#e8b923] drop-shadow-lg italic"
              style={{ 
                fontFamily: 'serif',
                textShadow: '0 0 30px rgba(232, 185, 35, 0.5)'
              }}
            >
              Percikan Cahaya
            </h2>
          </Parallax>
        </div>

        {/* === SECOND SECTION: Menembus Kegelapan + Tree Right === */}
        <div className="relative z-[20] flex min-h-screen flex-col items-center justify-center px-4">
          {/* Tree Right - appears from right */}
          <Parallax 
            speed={-5} 
            translateX={['100px', '-50px']}
            className="absolute right-0 top-0 z-[12] pointer-events-none"
          >
            <img 
              src="/tree-right-main.webp" 
              alt="Tree Right"
              className="h-[70vh] md:h-[85vh] w-auto object-contain"
            />
          </Parallax>

          {/* Leaf Right */}
          <Parallax 
            speed={-3} 
            translateX={['80px', '-30px']}
            className="absolute right-0 bottom-[10%] z-[14] pointer-events-none"
          >
            <img 
              src="/leaf-right-main.webp" 
              alt="Leaf Right"
              className="h-[40vh] md:h-[50vh] w-auto object-contain"
            />
          </Parallax>

          <Parallax speed={-8}>
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#e8b923] drop-shadow-lg italic"
              style={{ 
                fontFamily: 'serif',
                textShadow: '0 0 30px rgba(232, 185, 35, 0.5)'
              }}
            >
              Menembus kegelapan
            </h1>
          </Parallax>
        </div>

        {/* === THIRD SECTION: AMI Logo + Tree Left === */}
        <div className="relative z-[20] flex min-h-screen flex-col items-center justify-center px-4">
          {/* Tree Left - appears from left */}
          <Parallax 
            speed={-5} 
            translateX={['-100px', '50px']}
            className="absolute left-0 top-[10%] z-[15] pointer-events-none"
          >
            <img 
              src="/tree-left-main.webp" 
              alt="Tree Left"
              className="h-[70vh] md:h-[85vh] w-auto object-contain"
            />
          </Parallax>

          {/* Glowing orb effect */}
          <Parallax 
            speed={5} 
            translateY={['50px', '-50px']}
            className="absolute left-[10%] md:left-[15%] top-[55%] z-[8]"
          >
            <div 
              className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-yellow-300 blur-sm animate-pulse"
              style={{
                boxShadow: '0 0 40px 20px rgba(253, 224, 71, 0.7)'
              }}
            />
          </Parallax>

          {/* AMI Logo */}
          <Parallax speed={-5} scale={[0.8, 1.1]}>
            <img 
              src="/ami-logo.webp" 
              alt="AMI Logo"
              className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-2xl"
            />
          </Parallax>
        </div>
      </section>
    </ParallaxProvider>
  );
}
