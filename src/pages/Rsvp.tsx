import { useState } from "react";
import bgRsvp from "../assets/bg-rsvp.png"; 

interface TicketData {
  email: string;
  nama: string;
  sekolah: string;
  daerah: string;
  sesi: string;
  harapan: string;
}

const TicketIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9C3.65685 9 5 7.65685 5 6H19C19 7.65685 20.3431 9 22 9V15C20.3431 15 19 16.3431 19 18H5C5 16.3431 3.65685 15 2 15V9Z" stroke="#FFEBB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6V18" stroke="#FFEBB8" strokeWidth="2" strokeDasharray="2 2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" fill="#FFEBB8"/>
  </svg>
);

export default function RsvpPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [formData, setFormData] = useState<TicketData>({
    email: "",
    nama: "",
    sekolah: "",
    daerah: "",
    sesi: "",
    harapan: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TO-DO: Panggil API untuk mengirim data pendaftaran (POST /rsvp)
    // TO-DO: Validasi response dari server sebelum lanjut
    setTickets((prevTickets) => [...prevTickets, formData]);
    
    setIsSuccess(true);
    window.scrollTo(0, 0);
  };

  const handleTambahPengunjung = () => {
    setFormData({
        email: "",
        nama: "",
        sekolah: "",
        daerah: "",
        sesi: "",
        harapan: ""
    });
    setIsSuccess(false);
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center py-10 px-4"
      style={{
        backgroundImage: `url(${bgRsvp})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {!isSuccess ? (
        <div className="bg-[#B64556] p-8 rounded-[30px] w-full max-w-lg shadow-2xl relative border-4 border-[#FFEBB8]/20">
          <h1 className="text-3xl font-['Euskadi'] text-[#FFEBB8] text-center mb-6 uppercase tracking-wider drop-shadow-md">
            Registrasi Tiket
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#FFEBB8] text-lg font-['DarkerGrotesque'] font-bold mb-1 ml-1">Email *</label>
              <input name="email" value={formData.email} onChange={handleInputChange} type="email" required placeholder="Email" 
                className="w-full font-['DarkerGrotesque'] bg-[#FFEBB8] text-[#B64556] placeholder-[#B64556]/60 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#D97D68] font-bold text-lg shadow-inner" />
            </div>

            <div>
              <label className="block text-[#FFEBB8] text-lg font-['DarkerGrotesque'] font-bold mb-1 ml-1">Nama *</label>
              <input name="nama" value={formData.nama} onChange={handleInputChange} type="text" required placeholder="Nama Lengkap" 
                className="w-full font-['DarkerGrotesque'] bg-[#FFEBB8] text-[#B64556] placeholder-[#B64556]/60 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#D97D68] font-bold text-lg shadow-inner" />
            </div>

            <div>
              <label className="block text-[#FFEBB8] text-lg font-['DarkerGrotesque'] font-bold mb-1 ml-1">Asal Sekolah *</label>
              <input name="sekolah" value={formData.sekolah} onChange={handleInputChange} type="text" required placeholder="Asal Sekolah" 
                className="w-full font-['DarkerGrotesque'] bg-[#FFEBB8] text-[#B64556] placeholder-[#B64556]/60 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#D97D68] font-bold text-lg shadow-inner" />
            </div>

            <div>
              <label className="block text-[#FFEBB8] text-lg font-['DarkerGrotesque'] font-bold mb-1 ml-1">Asal Daerah</label>
              <input name="daerah" value={formData.daerah} onChange={handleInputChange} type="text" placeholder="Asal Daerah" 
                className="w-full font-['DarkerGrotesque'] bg-[#FFEBB8] text-[#B64556] placeholder-[#B64556]/60 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#D97D68] font-bold text-lg shadow-inner" />
            </div>

            <div>
              <label className="block text-[#FFEBB8] text-lg font-['DarkerGrotesque'] font-bold mb-1 ml-1">Mau Ikut Talkshow Sesi Berapa</label>
              <div className="relative">
                <select name="sesi" value={formData.sesi} onChange={handleInputChange} className="w-full bg-[#FFEBB8] text-[#B64556] px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#D97D68] appearance-none font-bold cursor-pointer shadow-inner font-['DarkerGrotesque'] text-lg">
                    <option value="">Pilih Sesi Talkshow</option>
                    <option value="1">Sesi 1</option>
                    <option value="2">Sesi 2</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#B64556]">▼</div>
              </div>
            </div>

             <div>
              <label className="block text-[#FFEBB8] text-lg font-['DarkerGrotesque'] font-bold mb-1 ml-1">Harapan Ikut Talkshow</label>
              <textarea name="harapan" value={formData.harapan} onChange={handleInputChange} rows={3} placeholder="Harapan Ikut Talkshow" 
                className="w-full font-['DarkerGrotesque'] bg-[#FFEBB8] text-[#B64556] placeholder-[#B64556]/60 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#D97D68] resize-none font-bold text-lg shadow-inner" />
            </div>

            <div className="flex justify-center pt-6">
              <button type="submit" className="bg-[#302A77] text-white px-12 py-3 rounded-full font-bold shadow-lg hover:bg-[#1B165E] hover:scale-105 transition-all border-2 border-[#FFEBB8] tracking-wide font-['DarkerGrotesque'] text-lg">
                  Selesai
              </button>
            </div>
          </form>
        </div>

      ) : (
        
        <div className="w-full max-w-lg flex flex-col items-center animate-fade-in-up px-2 pb-20">
          
          <h1 className="text-3xl font-['Euskadi'] text-[#302A77] text-center mb-2 uppercase tracking-wider font-bold drop-shadow-sm">
            Pemesanan Tiket Berhasil!
          </h1>
          
          <p className="text-[#302A77] font-['DarkerGrotesque'] font-bold text-lg mb-8 tracking-wide">
            Tunjukan barcode di Pintu Masuk
          </p>

          <div className="bg-white p-4 rounded-3xl shadow-xl mb-8 border-4 border-white">
            <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${tickets[tickets.length - 1]?.email || 'Ticket'}`} 
                alt="QR Code Ticket" 
                className="w-48 h-48 md:w-56 md:h-56 mix-blend-multiply"
            />
          </div>

          <div className="w-full space-y-4 mb-8">
            {tickets.map((ticket, index) => (
                <div key={index} className="bg-[#1e1b4b] w-full p-5 rounded-2xl flex items-center gap-6 shadow-xl text-white animate-fade-in-up">
                    <div className="flex-shrink-0">
                        <TicketIcon />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-[#FFEBB8] font-bold text-2xl font-['Euskadi'] tracking-wide">
                            {ticket.nama || "Nama Pengunjung"}
                        </span>
                        <span className="text-lg text-gray-200 font-['DarkerGrotesque'] font-bold truncate uppercase">
                            {ticket.sekolah || "Asal Sekolah"}
                        </span>
                    </div>
                </div>
            ))}
          </div>

          <button 
            onClick={handleTambahPengunjung}
            className="bg-[#9c1c6b] text-[#FFEBB8] px-10 py-3 rounded-full font-bold shadow-lg hover:bg-[#7a1553] hover:scale-105 transition-all border-2 border-[#FFEBB8] font-['DarkerGrotesque'] text-xl tracking-wide"
          >
            Tambah Pengunjung
          </button>

        </div>
      )}
    </div>
  );
}