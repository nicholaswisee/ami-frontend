export default function ProfilePage() {
  return (
    <section className="flex flex-col relative min-h-screen bg-cover bg-center bg-fixed w-full text-[#FFEABB] justify-center items-center " 
      style={{backgroundImage: "url('/oren-ijo.webp')", fontFamily:"Darker Grotesque"} }>
      <div className="w-full flex justify-center">
        <div className="w-[90%] max-w-150 flex justify-between items-center py-10 lg:py-20">
          {/* Back Button */}
          <button className="hover:opacity-70 transition">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 25 10 L 15 20 L 25 30" stroke="#590844" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Title */}
          <h1 className="font-bold text-xl lg:text-4xl text-[#590844] text-center flex-1" style={{fontFamily:"Euskadi"}}>PROFIL</h1>
          {/* Spacer untuk balance */}
          <div className="w-10"></div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-20  lg:px-20"> 
        {/* Box Profil */}
        <div className="rounded-t-2xl overflow-hidden w-76.75 lg:w-125">
          {/* Box Kiri*/}
          <div className="bg-[#C62D76] px-10 py-5 lg:py-10">
            <div className="flex flex-row gap-5">
              <img src="/profil-logo.webp" alt="Profile" className="w-16.75 h-16.75 rounded-full object-contain" />
              <div className="flex flex-col justify-center space-y-2.5"> 
                <h1 className="font-bold text-xl">Nama Pengguna</h1>
                <h1 className="text-[14px]">Email</h1>  
              </div>
            </div>
          </div>

          {/* Box Bawah - Warna 2, Opacity 60% */}
          <div className="flex flex-col bg-[#6F0E4E]/60 px-10 py-5 lg:py-10   rounded-b-2xl space-y-6 items-center">
            <div className="space-y-0 w-full">
              <p className="font-bold text-xl lg:text-2xl">Nama lengkap</p>
              <p className="text-[16px]"> Nama lengkap</p>
            </div>
            <div className="space-y-0 w-full">
              <p className="font-bold text-xl lg:text-2xl"  > Asal sekolah</p>
              <p className="text-[16px]">Asal Sekolah</p>
            </div>
            <button className="w-22.75 lg:w-31.75 bg-orange-600 text-[#FFDB8C] font-bold py-2 rounded-full transition hover:bg-orange-700">
              Log Out
            </button>
          </div>
        </div>
        <div className="rounded-t-2xl overflow-hidden lg:w-125">
          {/* Box Atas */}
        <div className="bg-[#C62D76] px-10 py-5 lg:py-10 text-center">
          <h1 className="font-bold text-xl lg:text-2xl ">
             Tiket Saya
          </h1>
        </div>

        <div className="flex flex-col bg-[#6F0E4E]/60 p-5 lg:px-10 lg:py-10 rounded-b-2xl  space-y-9 items-center">
          {/* Tiket Content */}
          <div className="flex flex-row lg:space-y-0 w-full rounded-2xl text-center items-center   p-5 gap-x-5 bg-[#1B165E] "> 
            <img src="/Vector.webp" alt="Tiket Icon" className=" w-13.25  object-contain"/>
            <div className="flex flex-col  w-full lg:gap-y-5 ">
              <p className="font-bold text-left text-l lg:text-2xl">Jenis Tiket</p>
              {/*Bagian jumlah dan check qr */}
              <div className="flex flex-row justify-between ">
                <p className="text-[14  px] lg:text-xl">1x</p>
                <div className="bg-[#F3414E] lg:px-5 w-19.75 lg:w-33.25 rounded-2xl">
                  <button className="font-bold text-[14px] lg:text-[24px]">Check QR</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row lg:space-y-0 w-full rounded-2xl text-center items-center   p-5 gap-x-5 bg-[#1B165E] "> 
            <img src="/Vector.webp" alt="Tiket Icon" className=" w-13.25  object-contain"/>
            <div className="flex flex-col  w-full lg:gap-y-5 ">
              <p className="font-bold text-left lg:text-2xl">Jenis Tiket</p>
              {/*Bagian jumlah dan check qr */}
              <div className="flex flex-row justify-between ">
                <p className="text-[14  px] lg:text-xl">1x</p>
                <div className="bg-[#F3414E] lg:px-5 w-19.75 lg:w-33.25 rounded-2xl">
                  <button className="font-bold text-[14px] lg:text-[24px]">Check QR</button>
                </div>
              </div>
            </div>
          </div>

        </div>
       </div>
      </div>
    </section>
  );
}
