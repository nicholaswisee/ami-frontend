import bg from "../assets/Copy of IMG_9788.png";
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
      <button //795376
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left hover:cursor-pointer"
      >
        <span className="font-['DarkerGrotesque'] text-lg font-bold text-[#FFEABB] md:text-xl">
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
        <div className="overflow-hidden px-6 pb-4 font-['DarkerGrotesque'] text-xl text-[#FFEABB]">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <section
      className="flex min-h-screen flex-col items-center bg-cover bg-center py-12"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <img
        src={FAQFlower}
        alt="faqFlower"
        className="absolute top-3 right-1/2 z-20 h-20 w-20 translate-x-32 transform"
      />
      <div
        className="mb-4 inline-block rounded-xl bg-[#87095A] px-20 py-2 font-['Euskadi'] text-3xl font-bold text-[#FFC76E]"
        style={{
          boxShadow: "0px 3px 0px #F3414E",
          border: "2px solid transparent",
          backgroundImage:
            "linear-gradient(#87095A, #87095A), linear-gradient( #BF1192 , #590844 )",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        FAQ
      </div>
      <div className="mt-12 w-full max-w-3xl space-y-4 px-4">
        <AccordionItem
          question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
          answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt finibus risus in ullamcorper."
        />
        <AccordionItem
          question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
          answer="Aliquam erat volutpat. Proin vitae nunc a nibh ullamcorper tempus."
        />
        <AccordionItem
          question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
          answer="Praesent a iaculis felis, sed efficitur ipsum. Donec malesuada viverra velit."
        />
        <AccordionItem
          question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
          answer="Nullam bibendum, ex ac finibus tempor, nisi est rhoncus turpis."
        />
        <AccordionItem
          question="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
          answer="Vivamus et fringilla tortor. Sed at metus non magna commodo pretium."
        />
      </div>
    </section>
  );
}
