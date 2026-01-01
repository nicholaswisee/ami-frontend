import Badge from "@/components/Badge";
import FAQFlower from "../assets/faqflower.png";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

import { useState } from "react";

function AccordionItem({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="w-full overflow-hidden rounded-2xl transition-all hover:cursor-pointer"
      style={{
        border: "3px solid #302A77",
        background: "linear-gradient(to bottom, #795376, #302A77)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 pt-3 pb-1 text-left hover:cursor-pointer"
      >
        <span className="text-lg font-bold text-[#FFEABB] md:text-xl">
          {question}
        </span>

        <ChevronDown
          className={`text-[#FFEABB] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-6 pb-4 text-xl text-[#FFEABB]">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const faqs: FAQItem[] = [
    {
      question: "Apa itu Aku Masuk ITB (AMI) 2026?",
      answer:
        "AMI adalah rangkaian acara penyambutan dan pengenalan kampus bagi calon mahasiswa baru ITB. Di sini Luminettes bisa mengenal fakultas, jurusan, fasilitas kampus, serta budaya akademik dan non-akademik ITB.",
    },
    {
      question: "Bagaimana cara daftar atau konfirmasi kehadiran?",
      answer:
        "Luminettes cukup mengikuti tautan pendaftaran yang dibagikan oleh panitia AMI 2026. Setelah mengisi formulir reservasi di website ini, Luminettes akan mendapatkan tiket dengan kode QR yang akan dipindai oleh panitia saat acara nanti. Jika butuh bantuan, Luminettes dapat menghubungi panitia lewat sosial media resmi ya!",
    },
    {
      question: "Kapan dan di mana ITB Day 2026 berlangsung?",
      answer:
        "Acara akan dilaksanakan di ITB Ganesha pada 14 Februari 2026 ya, Luminettes. Jadwal detail akan diumumkan melalui kanal resmi panitia, pantau terus pembaruan biar tidak ketinggalan!",
    },
    {
      question: "Apa yang perlu dibawa Luminettes saat hadir?",
      answer:
        "Bawa identitas diri, tiket reservasi dari handphone, pakai pakaian rapi-sopan dan alas kaki nyaman. Bila acara outdoor, siapkan topi, payung, atau ponco ya!",
    },
    {
      question: "Ke mana bertanya kalau ada kendala?",
      answer:
        "Luminettes dapat menghubungi panitia di media sosial Aku Masuk ITB 2026 atau bisa mendekati panitia lapangan yang mengenakan identitas panitia saat acara berlangsung ya!",
    },
  ];

  return (
    <section className="bg-mixed min-h-lvh">
      <div className="flex flex-col items-center justify-center gap-10 py-28">
        <div className="relative">
          <Badge>FAQ</Badge>
          <img
            src={FAQFlower}
            alt="faqFlower"
            className="pointer-events-none absolute -top-6 -right-4 z-20 aspect-square w-14 rotate-3 object-contain md:-top-8 md:-right-10 md:w-20"
          />
        </div>
        <div className="mt-12 w-full max-w-3xl space-y-4 px-4">
          {faqs.map((item) => (
            <AccordionItem key={item.question} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
