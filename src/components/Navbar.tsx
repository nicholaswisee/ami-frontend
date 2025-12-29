import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router";
import { useAuthStore } from "../store/authStore";
import { CgProfile } from "react-icons/cg";

const navOpts = [
  {
    icon: "/flower/flower01.webp",
    label: "ITB Day",
    url: "/itb-day",
  },
  {
    icon: "/flower/flower04.webp",
    label: "Acara",
    url: "/acara",
  },
  {
    icon: "/flower/flower03.webp",
    label: "Ticket",
    url: "/rsvp",
  },
  {
    icon: "/flower/flower04.webp",
    label: "Oleat",
    url: "/oleat",
  },
  {
    icon: "/flower/flower02.webp",
    label: "FAQ",
    url: "/faq",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  return (
    <>
      <nav className="bg-purple fixed top-0 z-50 flex h-18 w-full px-3 py-1">
        <a href="/" className="h-18 w-18">
          <img src="/logo.png" alt="Logo AMI 2026" />
        </a>
        <div className="mx-8 flex items-center gap-4 text-[#ffeabb] max-lg:hidden">
          {navOpts.map((n, i) => (
            <NavLink
              key={i}
              to={n.url}
              className={({ isActive }) =>
                `${isActive ? "border-[#ffeabb]" : "border-transparent"} flex h-12 items-center gap-2 rounded-xl border-2 bg-[#1b165e]/20 p-2`
              }
            >
              <img src={n.icon} className="w-8" alt="Icon" />
              <span className="font-body font-bold">{n.label}</span>
            </NavLink>
          ))}
        </div>
        {!isAuthenticated ? (
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `${isActive ? "border-[#ffeabb]" : "border-transparent"} font-body mx-6 my-auto ml-auto h-12 min-w-20 rounded-xl border-2 bg-[#3c59cf] p-2 text-center font-bold text-[#ffeabb] max-lg:hidden`
            }
          >
            Login
          </NavLink>
        ) : (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${isActive ? "border-[#ffeabb]" : "border-transparent"} font-body mx-6 my-auto ml-auto flex h-12 min-w-20 items-center justify-center gap-2 rounded-xl border-2 bg-[#1b165e]/20 p-2 text-center font-bold text-[#ffeabb] max-lg:hidden`
            }
          >
            <CgProfile size={32} />
            <span className="mb-1 font-bold">
              Hai, {user?.name?.trim().split(/\s+/)[0]}!
            </span>
          </NavLink>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="ml-auto lg:hidden"
        >
          <IoIosMenu size={32} fill="#ffeabb" />
        </button>
      </nav>
      <div
        className={`${isOpen ? "z-100 opacity-100" : "-z-10 opacity-0"} bg-purple fixed flex h-lvh w-full flex-col items-center justify-center gap-10 transition-opacity duration-75`}
      >
        <a
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          href="/"
          className="h-40 w-40"
        >
          <img src="/logo.png" alt="Logo AMI 2026" />
        </a>
        <div className="mx-8 flex flex-col items-center gap-4 text-[#ffeabb]">
          {navOpts.map((n, i) => (
            <NavLink
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              key={i}
              to={n.url}
              className={({ isActive }) =>
                `${isActive ? "border-[#ffeabb]" : "border-transparent"} flex h-12 min-w-28 items-center justify-center gap-2 rounded-xl border-2 bg-[#1b165e]/20 p-2`
              }
            >
              <img src={n.icon} className="w-8" alt="Icon" />
              <span className="font-body text-lg font-bold">{n.label}</span>
            </NavLink>
          ))}
        </div>
        {!isAuthenticated ? (
          <NavLink
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            to="/auth"
            className={({ isActive }) =>
              `${isActive ? "border-[#ffeabb]" : "border-transparent"} font-body h-12 min-w-20 rounded-xl border-2 bg-[#3c59cf] p-2 pt-3 text-center font-bold text-[#ffeabb]`
            }
          >
            Login
          </NavLink>
        ) : (
          <NavLink
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            to={"/profile"}
            className={({ isActive }) =>
              `${isActive ? "border-[#ffeabb]" : "border-transparent"} font-body bg-[#1b165e]/20bg-[#3c59cf] flex h-12 min-w-28 items-center gap-2 rounded-xl border-2 p-2 pt-3 text-center font-bold text-[#ffeabb]`
            }
          >
            <CgProfile size={32} />
            <span className="mb-1 font-bold">
              Hai, {user?.name?.trim().split(/\s+/)[0]}!
            </span>
          </NavLink>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <IoClose size={24} fill="#ffeabb" />
        </button>
      </div>
    </>
  );
}
