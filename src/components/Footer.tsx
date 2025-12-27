import type { IconType } from "react-icons";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials: { icon: IconType; label: string; url: string }[] = [
  {
    icon: FaInstagram,
    label: "akumasukitb",
    url: "https://www.instagram.com/akumasukitb/",
  },
  {
    icon: FaTiktok,
    label: "akumasukitb",
    url: "https://www.tiktok.com/@akumasukitb",
  },
  {
    icon: FaXTwitter,
    label: "AkuMasukITB",
    url: "https://x.com/AkuMasukITB",
  },
];

export default function Footer() {
  return (
    <footer className="bg-purple flex w-full flex-col gap-y-2 p-6 text-[#ffeabb]">
      <img src="/logo.png" className="order-1 aspect-square w-24 lg:w-36" />
      <div className="order-2 flex gap-4 max-lg:order-3 max-lg:mt-4 max-lg:justify-between">
        {socials.map((s, i) => (
          <a
            href={s.url}
            target="_blank"
            key={i}
            className="flex items-center gap-2 max-lg:w-full max-lg:*:mx-auto"
          >
            <s.icon className="max-lg:size-5" />{" "}
            <p className="max-lg:hidden">{s.label}</p>
          </a>
        ))}
      </div>
      <div className="order-3 flex max-lg:order-2 max-lg:flex-col lg:items-center lg:justify-between">
        <a href="/faq" className="font-semibold">
          FAQ
        </a>
        <p className="max-w-md max-md:max-w-2xs max-md:text-xs lg:max-w-lg lg:text-end">
          Institut Teknologi Bandung, Jalan Ganesha No.10, Lb. Siliwangi,
          Kecamatan Coblong, Kota Bandung, Jawa Barat 40132
        </p>
      </div>
    </footer>
  );
}
