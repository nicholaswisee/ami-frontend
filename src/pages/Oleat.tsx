import bg from '../assets/Copy of IMG_9788.png';
import doImg from '../assets/Copy of Bunga_1_Jeby.png';
import dontImg from '../assets/Copy of Bunga_1_Ayu.png';

export default function OleatPage() {
  return (
    <section
      className="min-h-screen bg-center bg-cover flex flex-col items-center py-12"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-3xl px-6 text-center ">
        <div className="inline-block px-10 py-2 rounded-xl bg-[#87095A] text-[#FFC76E] font-bold text-xl mb-4 font-['Euskadi']"
        style={{ boxShadow: '0px 3px 0px #F3414E',
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(#87095A, #87095A), linear-gradient( #BF1192 , #590844 )',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box'
        }}>
          OLEAT ITB DAY
        </div>

        <p className="text-lg md:text-xl text-[#3b0526] max-w-xl mx-auto mb-8 font-['Euskadi']"
        style={{ textShadow: '0px 3px 4px #F87F42' }}>
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper.
          Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus.
        </p>

        <h2 className="text-xl text-[#7a1646] font-bold mb-6 font-['Euskadi'] 
        bg-gradient-to-b from-[#BF1192] to-[#590844]  
        bg-clip-text text-transparent">ALUR ITB DAY</h2>

        <div className="mx-auto bg-gray-200 w-72 md:w-96 h-96 rounded-2xl border-4 border-[#5a1130] shadow-lg" style={{ boxShadow: '0px 3px 0px #F3414E',
          border: '4px solid transparent', 
          
          backgroundImage: 'linear-gradient(#D9D9D9, #D9D9D9), linear-gradient(to bottom, #BF1192, #590844)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box'
        }}></div>

        {/* DO / DONT section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="px-4">
            <div className="flex items-center justify-center mb-4 relative">
              <img src={doImg} alt="do" className="w-12 h-12 absolute -top-7 left-1/2 transform -translate-x-1/2 z-20" />
              <div
                className="w-36 h-12 rounded-full flex items-center justify-center font-bold z-10"
                style={{ background: 'linear-gradient(to bottom,#FFD88C,#FFB366)', border: '3px solid #FFB366' }}
              >
                <span className="text-[#7a1646] text-xl font-['Euskadi']">DO</span>
              </div>
            </div>
            <div
              className="p-6 w-full rounded-xl shadow-lg text-sm text-[#3b0526] mt-6 font-['DarkerGrotesque'] font-bold"
              style={{ background: 'linear-gradient(to bottom,#FFD88C,#FFB366)', border: '2px solid #FFB366' }}
            >
              <ul className="list-disc list-outside space-y-2 text-justify px-4">
                <li>Sudah mendaftarkan diri melalui GOERS ataupun mau registrasi di tempat juga boleh banget!</li>
                <li>Disarankan datang pagi yaa!!</li>
                <li>Baca-baca lagi informasi mengenai seluruh mata acara ITB Day beserta jamnya, supaya ga ketinggalan.</li>
                <li>Pakai pakaian yang sopan dan rapih yaa!</li>
                <li>Download Booklet ITB Day di: bit.ly/BookletAMI2025</li>
                <li>Datang dengan sahabat ataupun keluargamu!</li>
                <li>Jangan lupa untuk membawa topi/payung/ponco yaa!</li>
                <li>Kalau ada yang ingin ditanyakan, silahkan bertanya ke panitia yang sedang bertugas nanti yaa!!  </li>
              </ul>
            </div>
          </div>

          <div className="px-4">
            <div className="flex items-center justify-center mb-4 relative">
              <img src={dontImg} alt="dont" className="w-12 h-12 absolute -top-7 left-1/2 transform -translate-x-1/2 z-20" />
              <div
                className="w-36 h-12 rounded-full flex items-center justify-center font-bold z-10"
                style={{ background: 'linear-gradient(to bottom,#FFD88C,#FFB366)', border: '3px solid #FFB366' }}
              >
                <span className="text-[#7a1646] text-xl font-['Euskadi']">DONT</span>
              </div>
            </div>
            <div
              className="p-6 w-full rounded-xl shadow-lg text-sm text-[#3b0526] mt-6 font-['DarkerGrotesque'] font-bold"
              style={{ background: 'linear-gradient(to bottom,#FFD88C,#FFB366)', border: '2px solid #FFB366' }}
            >
              <ul className="list-disc list-outside space-y-2 text-justify px-4">
                <li>Dilarang melakukan tindakan menyinggung SARA, berbau seksual, maupun unsur negatif lainnya selama ITB Day.</li>
                <li>    Dilarang membawa dan menggunakan alat yang berbahaya ataupun menimbulkan kekacauan seperti (tetapi tidak terbatas pada):
                  <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
                    <li>Hewan peliharaan</li>
                    <li>Senjata api, senjata tajam ataupun senjata tumpul</li>
                    <li>Bahan peledak dan benda rawan meledak</li>
                    <li>Minuman keras</li>
                  </ul>
                </li>
                <li>Dilarang merusak properti ITB dan AMI 2025.</li>
                <li>Dilarang merokok kecuali di area yang telah ditentukan (Area Merokok).</li>
                <li>Dan jangan telat yaa!! Nanti ketinggalan mata acaranya, rugi dong!!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Protokol Keamanan */}
        <div className="mt-12">
          <h3
            className="text-3xl font-extrabold mb-4 font-['Euskadi']"
            style={{
              background: 'linear-gradient(to bottom, #EFFF8D, #ffe48dff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              
            }}
          >
        
            PROTOKOL KEAMANAN
          </h3>
          <div 
            className="mx-auto max-w-xl text-[#FFEABB] py-6 px-10 rounded-2xl font-['DarkerGrotesque'] font-bold"
            style={{
              border: '4px solid transparent',
              backgroundImage: `
                linear-gradient(#51307f, #3b1460),
                linear-gradient(to bottom, #825AC3, #1B165E)
              `,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <ul className="list-disc list-inside space-y-3 text-md text-justify font-['DarkerGrotesque'] font-bold">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper.</li>
              <li>Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus.</li>
              <li>Praesent a iaculis felis, sed efficitur ipsum.</li>
              <li>Donec malesuada viverra velit quis accumsan.</li>
              <li>Nullam bibendum, ex ac finibus tempor, nisi est rhoncus turpis.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}











{/* radhit ajg kaga dilanjutin*/}
{/* Lanjutinn besokk dehhh kontooooooooooooooooooooooooooooooooooo */}
