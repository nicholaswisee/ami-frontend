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
    label: "akumasukitb26",
    url: "https://x.com/akumasukitb26",
  },
];

type sponsorsItem = {
  name: string;
  size: number;
  url: string;
};

const sponsors: sponsorsItem[] = [
  { name: "Casio", size: 1, url: "/sponsors/casio-xs.webp" },
  { name: "Zebra", size: 1, url: "/sponsors/zebra-xs.webp" },
];

export default function Footer() {
  return (
    <footer className="bg-purple relative z-50 flex w-full flex-col gap-y-2 p-6 text-[#ffeabb]">
      <a href="/">
        <img
          src="/logo.png"
          alt="Logo AMI 2026"
          className="order-1 aspect-square w-24 lg:w-36"
        />
      </a>
      <div className="spacey-0">
        <p className="font-body font-semibold">Sponsored by</p>
        <div className="flex justify-start gap-4">
          {sponsors.map((item, i) => (
            <div
              key={i}
              style={{ width: `${100 * item.size}px` }}
              className={`relative flex aspect-square items-center justify-center`}
            >
              <img
                src={item.url}
                alt={item.name}
                className="bg-white object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="order-3 flex gap-4 max-lg:order-4 max-lg:mt-4 max-lg:justify-between">
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
      <div className="order-4 flex max-lg:order-3 max-lg:flex-col lg:items-center lg:justify-between">
        <a href="/faq" className="font-semibold underline">
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
