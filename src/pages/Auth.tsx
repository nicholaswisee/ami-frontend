export default function AuthPage() {
  return (
    <section className="flex relative min-h-screen bg-cover bg-center bg-fixed w-full justify-center items-center" 
    style={{backgroundImage: "url('/oren-ijo.webp')", fontFamily:"Darker Grotesque"} }>
    <div className="relative rounded-2xl overflow-hidden shadow-xl w-120 ">
        <div className="absolute inset-0 bg-linear-to-r from-[#AC166C] to-[#6F0E4E] opacity-70 backdrop-blur-md "></div>
        
        {/* Content */}
        <div className="relative z-10 p-8 space-y-5 ">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-[#FFD88C] text-3xl font-bold drop-shadow-md" style={{fontFamily: 'Euskadi'}}>
              LOG IN
            </h1>
          </div>
          <p className="text-[#FFC76E] font-bold text-center">Masukkan detail akunmu atau gunakan akun Google untuk melanjutkan</p>
          {/* Tab Buttons */}
          <div className="flex gap-3 bg-[#FFB366] py-1 px-2 rounded-xl">
            {/* TODO: onClick untuk switch tab ke Pengunjung */}
            <button className="w-[211px] py-1.5 bg-[#FFD88C] text-[#87095A] font-medium rounded-sm">
              Pengunjung
            </button>
            {/* TODO: onClick untuk switch tab ke Pantia */}
            <button className="w-[211px] py-1.5 bg-transparent text-[#87095A] font-medium rounded-sm hover:bg-[#FFD88C] transition">
              Pantia
            </button> 
          </div>

          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-[#FFDB8C] font-bold  text-xl " style={{fontFamily:"Darker Grotesque"}}>Username</label>
            <input 
              type="text"
              placeholder="Username"
              className="w-full bg-[#FFDB8C] text-[#302A77] font-bold placeholder-[#302A77] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-yellow-100 font-medium text-sm"style={{fontFamily:"Darker Grotesque"}} >Password</label>
            <input 
              type="password"
              placeholder="Password"
              className="w-full  bg-[#FFDB8C] text-[#302A77] font-bold placeholder-[#302A77] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* TODO: onClick untuk handle login */}
          <button className="w-full bg-[#F87F42] hover:bg-orange-600 text-[#FFDB8C] font-bold py-2 rounded-full transition">
            Log in
          </button>

          <div className="text-center font-bold text-[#FFC76E]  text-[24px]">
            atau
          </div>

          {/* Google Button */}
          {/* TODO: onClick untuk login dengan Google */}
          <button className="w-full bg-[#F87F42] hover:bg-orange-600 text-[#FFDB8C] font-bold py-2 rounded-full flex items-center justify-center gap-2 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Lanjutkan dengan Google
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-[#FFC76E] text-md font-bold" style={{fontFamily:"Darker Grotesque"}}>
            Belum punya akun? {" "}
            {/* TODO: onClick untuk navigate ke Sign Up page */}
            <button className="underline hover:text-yellow-50 font-medium" style={{fontFamily:"Darker Grotesque"}}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
