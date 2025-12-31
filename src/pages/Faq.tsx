import React from 'react'
import bg from '../assets/Copy of IMG_9788.png';
import FAQFlower from '../assets/faqflower.png'
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string,
    answer: string
}

import { useState } from "react";

function AccordionItem({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden transition-all hover:cursor-pointer"
      style={{
        border: "3px solid #302A77", 
        background: "linear-gradient(to bottom, #795376, #302A77)",
      }}
    >
      <button //795376
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 text-left hover:cursor-pointer"
      >
        <span className="text-[#FFEABB] font-bold font-['DarkerGrotesque'] text-lg md:text-xl">
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
        <div className="overflow-hidden px-6 pb-4 text-[#FFEABB] text-xl font-['DarkerGrotesque']">
          {answer}
        </div>
      </div>
    </div>
  );
}


export default function FaqPage() {
  return (
    <section
      className="min-h-screen bg-center bg-cover flex flex-col items-center py-12"
      style={{ backgroundImage: `url(${bg})` }}
    >
    <img src={FAQFlower} alt="faqFlower" className="w-20 h-20 absolute top-3 right-1/2 transform translate-x-32 z-20" />
        <div className="inline-block px-20 py-2 rounded-xl bg-[#87095A] text-[#FFC76E] font-bold text-3xl mb-4 font-['Euskadi']"
            style={{ boxShadow: '0px 3px 0px #F3414E',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(#87095A, #87095A), linear-gradient( #BF1192 , #590844 )',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box'
            }}>
            FAQ
        </div>
    <div className="w-full max-w-3xl mt-12 space-y-4 px-4">
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
  )
}
