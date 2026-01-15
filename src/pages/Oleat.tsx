import Badge from "@/components/Badge";
import { motion } from "framer-motion";

export default function OleatPage() {
  const doImg = "/flower/flower01.webp";
  const dontImg = "/flower/flower04.webp";

  return (
    <section className="bg-mixed min-h-lvh">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 py-28 text-center">
        <motion.div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge>Oleat ITB Day</Badge>
          </motion.div>
          <motion.p
            className="mx-auto mb-8 max-w-xl text-lg text-[#3b0526] md:text-xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          >
            Alur lebih lengkapnya akan diperbarui secara berkala ya, Luminettes!
          </motion.p>
        </motion.div>

        {/* <h2 className="mb-6 bg-linear-to-b from-[#BF1192] to-[#590844] bg-clip-text font-bold text-[#7a1646]">
          ALUR ITB DAY
        </h2> */}

        <motion.div className="mx-auto w-full max-w-3xl">
          <div className="mb-3 flex items-center justify-between px-1">
            <motion.h3
              className="font-body text-lg font-bold text-[#5a1130]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Peta ITB Ganesha
            </motion.h3>
            <motion.a
              href="https://maps.app.goo.gl/pCb5TASoBW296gGv5"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[#BF1192] underline underline-offset-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            >
              Buka di tab baru
            </motion.a>
          </div>
          <motion.div
            className="h-96 overflow-hidden rounded-2xl border-4 border-[#5a1130] shadow-lg"
            style={{
              boxShadow: "0px 3px 0px #F3414E",
              border: "4px solid transparent",
              backgroundImage:
                "linear-gradient(#D9D9D9, #D9D9D9), linear-gradient(to bottom, #BF1192, #590844)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
          >
            <iframe
              title="Peta ITB Ganesha"
              src="https://www.openstreetmap.org/export/embed.html?bbox=107.608371%2C-6.892925%2C107.612371%2C-6.888925&layer=mapnik&marker=-6.890925%2C107.610371"
              className="h-full w-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>

        {/* DO / DONT section */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            className="px-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative mb-4 flex items-center justify-center">
              <img
                src={doImg}
                alt="do"
                className="absolute -top-7 left-1/2 z-20 h-12 w-12 -translate-x-1/2 transform"
              />
              <div
                className="z-10 flex h-12 w-36 items-center justify-center rounded-full font-bold"
                style={{
                  background: "linear-gradient(to bottom,#FFD88C,#FFB366)",
                  border: "3px solid #FFB366",
                }}
              >
                <span className="text-xl font-bold text-[#7a1646]">DO</span>
              </div>
            </div>
            <div
              className="mt-6 w-full rounded-xl p-6 font-['DarkerGrotesque'] text-sm font-bold text-[#3b0526] shadow-lg"
              style={{
                background: "linear-gradient(to bottom,#FFD88C,#FFB366)",
                border: "2px solid #FFB366",
              }}
            >
              <ul className="list-outside list-disc space-y-2 px-4 text-justify">
                <li>
                  Sudah mendaftarkan diri melalui website ini dan mendapatkan
                  tiket ITB Day ya Luminettes!
                </li>
                <li>Disarankan datang pagi yaa!</li>
                <li>
                  Baca-baca lagi informasi mengenai seluruh mata acara ITB Day
                  beserta jamnya, supaya ga ketinggalan.
                </li>
                <li>Pakai pakaian yang sopan dan rapih yaa!</li>
                {/* <li>Download Booklet ITB Day di: bit.ly/BookletAMI2025</li> */}
                <li>Datang dengan sahabat ataupun keluargamu!</li>
                <li>Jangan lupa untuk membawa topi/payung/ponco yaa!</li>
                <li>
                  Kalau ada yang ingin ditanyakan, silahkan bertanya ke panitia
                  yang sedang bertugas nanti yaa!!{" "}
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="px-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          >
            <div className="relative mb-4 flex items-center justify-center">
              <img
                src={dontImg}
                alt="dont"
                className="absolute -top-7 left-1/2 z-20 h-12 w-12 -translate-x-1/2 transform"
              />
              <div
                className="z-10 flex h-12 w-36 items-center justify-center rounded-full font-bold"
                style={{
                  background: "linear-gradient(to bottom,#FFD88C,#FFB366)",
                  border: "3px solid #FFB366",
                }}
              >
                <span className="text-xl font-bold text-[#7a1646]">DON'T</span>
              </div>
            </div>
            <div
              className="mt-6 w-full rounded-xl p-6 font-['DarkerGrotesque'] text-sm font-bold text-[#3b0526] shadow-lg"
              style={{
                background: "linear-gradient(to bottom,#FFD88C,#FFB366)",
                border: "2px solid #FFB366",
              }}
            >
              <ul className="list-outside list-disc space-y-2 px-4 text-justify">
                <li>
                  Dilarang melakukan tindakan menyinggung SARA, berbau seksual,
                  maupun unsur negatif lainnya selama ITB Day.
                </li>
                <li>
                  {" "}
                  Dilarang membawa dan menggunakan alat yang berbahaya ataupun
                  menimbulkan kekacauan seperti (tetapi tidak terbatas pada):
                  <ul className="mt-2 ml-6 list-outside list-disc space-y-1">
                    <li>Hewan peliharaan</li>
                    <li>Senjata api, senjata tajam ataupun senjata tumpul</li>
                    <li>Bahan peledak dan benda rawan meledak</li>
                    <li>Minuman keras</li>
                  </ul>
                </li>
                <li>Dilarang merusak properti ITB dan AMI 2026.</li>
                <li>
                  Dilarang merokok kecuali di area yang telah ditentukan (Area
                  Merokok).
                </li>
                <li>
                  Dan jangan telat yaa!! Nanti ketinggalan mata acaranya, rugi
                  dong!!
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Protokol Keamanan
        <div className="mt-12">
          <h3
            className="mb-4 text-3xl font-extrabold"
            style={{
              background: "linear-gradient(to bottom, #EFFF8D, #ffe48dff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            PROTOKOL KEAMANAN
          </h3>
          <div
            className="mx-auto max-w-xl rounded-2xl px-10 py-6 font-['DarkerGrotesque'] font-bold text-[#FFEABB]"
            style={{
              border: "4px solid transparent",
              backgroundImage: `
                linear-gradient(#51307f, #3b1460),
                linear-gradient(to bottom, #825AC3, #1B165E)
              `,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <ul className="text-md list-inside list-disc space-y-3 text-justify font-['DarkerGrotesque'] font-bold">
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tincidunt finibus risus in ullamcorper.
              </li>
              <li>
                Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper
                tempus.
              </li>
              <li>Praesent a iaculis felis, sed efficitur ipsum.</li>
              <li>Donec malesuada viverra velit quis accumsan.</li>
              <li>
                Nullam bibendum, ex ac finibus tempor, nisi est rhoncus turpis.
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </section>
  );
}

{
  /* radhit ajg kaga dilanjutin*/
}
{
  /* Lanjutinn besokk dehhh kontooooooooooooooooooooooooooooooooooo */
}
{
  /* dit mandi ditttt */
}
