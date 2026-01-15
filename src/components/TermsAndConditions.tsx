import { useState } from "react";

interface TermsAndConditionsProps {
  onAccept?: () => void;
  onDecline?: () => void;
  showAsModal?: boolean;
}

export default function TermsAndConditions({
  onAccept,
  onDecline,
  showAsModal = false,
}: TermsAndConditionsProps) {
  const [isOpen, setIsOpen] = useState(showAsModal);

  const handleAccept = () => {
    setIsOpen(false);
    onAccept?.();
  };

  const handleDecline = () => {
    setIsOpen(false);
    onDecline?.();
  };

  if (!isOpen && showAsModal) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-body text-2xl font-bold text-[#FFEBB8]">
        Syarat dan Ketentuan
      </h2>

      <div className="max-h-[50vh] overflow-y-auto rounded-xl bg-white p-6 text-black shadow-inner">
        <div className="space-y-4 text-sm">
          <section>
            <h3 className="font-body mb-2 text-lg font-bold">1. Admission</h3>
            <ol className="ml-4 list-decimal space-y-1">
              <li>Acara ini tidak dipungut biaya (free admission).</li>
              <li>
                Registrasi bersifat wajib dan dapat berlaku untuk lebih dari 1
                (satu) orang.
              </li>
              <li>
                Akses masuk acara hanya diberikan kepada peserta yang telah
                terdaftar dan terverifikasi.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="font-body mb-2 text-lg font-bold">
              2. Entry & Access Control
            </h3>
            <ol className="ml-4 list-decimal space-y-1">
              <li>
                Penyelenggara berhak melakukan pemeriksaan identitas dan barang
                bawaan demi keamanan acara.
              </li>
              <li>
                Penyelenggara berhak menolak atau mengeluarkan pengunjung yang
                tidak mematuhi peraturan tanpa kewajiban memberikan kompensasi
                apa pun.
              </li>
              <li>
                Tiket/QR code akan terlampir pada website setelah registrasi.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="font-body mb-2 text-lg font-bold">
              3. Code of Conduct
            </h3>
            <ol className="ml-4 list-decimal space-y-2">
              <li>
                <div>
                  Dilarang membawa barang terlarang, termasuk namun tidak
                  terbatas pada:
                </div>
                <ul className="mt-1 ml-4 list-disc space-y-0.5">
                  <li>Senjata tajam</li>
                  <li>Narkotika dan zat terlarang</li>
                  <li>Alkohol</li>
                  <li>Benda berbahaya lainnya</li>
                </ul>
              </li>
              <li>
                Pengunjung wajib menjaga ketertiban, keamanan, dan kenyamanan
                selama acara berlangsung.
              </li>
              <li>
                Segala bentuk tindakan yang mengganggu jalannya acara dapat
                berakibat pengeluaran dari area acara.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="font-body mb-2 text-lg font-bold">4. Liability</h3>
            <ol className="ml-4 list-decimal space-y-1">
              <li>
                Pengunjung bertanggung jawab penuh atas keselamatan diri dan
                barang pribadi masing-masing.
              </li>
              <li>
                Penyelenggara tidak bertanggung jawab atas kehilangan, cedera,
                atau kerugian yang terjadi selama acara, kecuali ditentukan lain
                oleh peraturan perundang-undangan yang berlaku.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="font-body mb-2 text-lg font-bold">
              5. Penggunaan Data
            </h3>
            <ol className="ml-4 list-decimal space-y-1">
              <li>
                Data yang dikumpulkan akan digunakan untuk keperluan acara,
                serta dapat digunakan oleh pihak sponsor dan/atau mitra terkait
                untuk keperluan promosi, pemasaran, dan penyampaian informasi.
              </li>
              <li>
                Pengunjung menyetujui bahwa data dapat dibagikan kepada pihak
                sponsor dan/atau mitra resmi yang bekerja sama dengan
                penyelenggara, sepanjang digunakan sesuai dengan tujuan yang
                telah disebutkan.
              </li>
              <li>
                Penyelenggara berkomitmen untuk menjaga keamanan data pengunjung
                dan mengambil langkah-langkah yang wajar untuk melindungi data
                dari akses, penggunaan, atau pengungkapan yang tidak sah.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="font-body mb-2 text-lg font-bold">
              6. Force Majeure
            </h3>
            <p className="ml-4">
              Penyelenggara tidak bertanggung jawab atas pembatalan atau
              perubahan acara akibat keadaan di luar kendali, termasuk bencana
              alam, kebijakan pemerintah, atau kondisi darurat lainnya.
            </p>
          </section>

          <section className="mt-6 rounded-lg bg-[#302A77]/10 p-4">
            <p className="font-bold">
              Dengan menyetujui syarat dan ketentuan ini, Anda menyatakan bahwa
              Anda telah membaca, memahami, dan menerima semua ketentuan di
              atas.
            </p>
          </section>
        </div>
      </div>

      {showAsModal && (
        <div className="flex justify-end gap-3">
          {onDecline && (
            <button
              type="button"
              onClick={handleDecline}
              className="rounded-xl border-2 border-[#FFEBB8] bg-[#FFEBB8] px-6 py-2 text-sm font-bold text-[#B64556] shadow-lg transition-all hover:bg-[#FFEBB8]/90"
            >
              Tolak
            </button>
          )}
          {onAccept && (
            <button
              type="button"
              onClick={handleAccept}
              className="rounded-xl border-2 border-[#FFEBB8] bg-[#302A77] px-6 py-2 text-sm font-bold text-[#FFEBB8] shadow-lg transition-all hover:bg-[#1B165E]"
            >
              Setuju
            </button>
          )}
        </div>
      )}
    </div>
  );
}
