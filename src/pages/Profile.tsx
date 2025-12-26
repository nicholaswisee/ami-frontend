export default function ProfilePage() {
  return (
    <section className="flex relative min-h-screen bg-cover bg-center bg-fixed w-full text-[#FFEABB] justify-center items-center" 
      style={{backgroundImage: "url('/oren-ijo.webp')", fontFamily:"Darker Grotesque"} }>
      <div className="flex flex-col lg:flex-row space-x-20"> 
        {/* Box Profil */}
        <div className="rounded-t-2xl overflow-hidden w-125">
          {/* Box Atas */}
          <div className="bg-[#C62D76] px-10 py-10">
            <div className="flex flex-row gap-5">
              <img src="/profil-logo.webp" alt="Profile" className="w-16.75 h-16.75 rounded-full object-contain" />
              <div className="flex flex-col justify-center space-y-[10px]"> 
                <h1 className="font-bold text-2xl">Nama Pengguna</h1>
                <h1>Email</h1>
              </div>
            </div>
          </div>

          {/* Box Bawah - Warna 2, Opacity 60% */}
          <div className="flex flex-col bg-[#6F0E4E]/60 px-10 py-10    rounded-b-2xl space-y-[24px] items-center">
            <div className="space-y-[0px] w-full">
              <p className="font-bold text-2xl">Nama lengkap</p>
              <p className=""> Nama</p>
            </div>
            <div className="space-y-[0px] w-full">
              <p className="font-bold text-2xl"  > Asal sekolah</p>
              <p> Sekolah</p>
            </div>
            <button className="w-[127px] bg-orange-600 text-[#FFDB8C] font-bold py-2 rounded-full transition hover:bg-orange-700">
              Log Out
            </button>
          </div>
        </div>
        <div className="rounded-t-2xl overflow-hidden w-125">
          {/* Box Atas */}
        <div className="bg-[#C62D76] p-10 flex justify-center items-center">
          <h1 className="font-bold text-2xl ">
             Tiket Saya
          </h1>
        </div>

        {/* Box Bawah - Warna 2, Opacity 60% */}
        <div className="flex flex-col bg-[#6F0E4E]/60 px-[40px] p-10 rounded-b-2xl space-y-[24px] items-center">
          {/* Tiket Content */}
          <div className="flex flex-row space-y-[0px] w-full rounded-2xl text-center items-center p-5 gap-x-5 bg-[#1B165E] "> 
            <img src="/Vector.webp" alt="Tiket Icon" className="w-13.25  object-contain"/>
            <div className="flex flex-col  w-full gap-y-[20px] ">
              <p className="font-bold text-left text-2xl">Jenis Tiket</p>
              {/*Bagian jumlah dan check qr */}
              <div className="flex flex-row justify-between ">
                <p className="text-xl">1x</p>
                <div className="bg-[#F3414E] px-5 w-33.25 rounded-2xl">
                  <button className="font-bold text-[24px]">Check QR</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row space-y-[0px] w-full rounded-2xl text-center items-center p-5 gap-x-5 bg-[#1B165E] "> 
            <img src="/Vector.webp" alt="Tiket Icon" className="w-13.25  object-contain"/>
            <div className="flex flex-col  w-full gap-y-[20px] ">
              <p className="font-bold text-left text-2xl">Jenis Tiket</p>
              {/*Bagian jumlah dan check qr */}
              <div className="flex flex-row justify-between ">
                <p className="text-xl">1x</p>
                <div className="bg-[#F3414E] px-5 w-33.25 rounded-2xl">
                  <button className="font-bold text-[24px]">Check QR</button>
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
