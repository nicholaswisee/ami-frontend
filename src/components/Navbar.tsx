import { useEffect, useMemo, useRef, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router";
import { useAuthStore } from "../store/authStore";
import { CgProfile } from "react-icons/cg";
import { useScannerAccess } from "../hooks/useScannerAccess";

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
  {
    icon: "/flower/flower01.webp",
    label: "Lost & Found",
    url: "/lostnfound",
  },
  {
    icon: "/flower/flower04.webp",
    label: "Merch",
    url: "https://findmi.akumasukitb.com",
    external: true,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const { data: isScannerAllowed } = useScannerAccess(isAuthenticated);
  const mobileListRef = useRef<HTMLDivElement | null>(null);
  const mobileItemRefs = useRef<
    Array<HTMLAnchorElement | HTMLDivElement | null>
  >([]);

  const navItems = useMemo(() => {
    if (!Boolean(isScannerAllowed)) return navOpts;
    return [
      ...navOpts,
      {
        icon: "/flower/flower01.webp",
        label: "Dashboard",
        url: "/dashboard",
      },
    ];
  }, [isScannerAllowed]);

  useEffect(() => {
    if (!isOpen) return;
    const container = mobileListRef.current;
    if (!container) return;

    let frame = 0;
    const updateScales = () => {
      const rect = container.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const maxDistance = rect.height / 2;

      mobileItemRefs.current.forEach((el) => {
        if (!el) return;
        const itemRect = el.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const distance = Math.min(Math.abs(centerY - itemCenter), maxDistance);
        const ratio = 1 - distance / maxDistance;
        const scale = 0.85 + ratio * 0.35;
        el.style.transform = `scale(${scale.toFixed(3)})`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScales);
    };

    updateScales();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isOpen, navItems.length]);

  return (
    <>
      <nav className="bg-purple fixed top-0 z-60 flex h-18 w-full px-3 py-1">
        <a href="/" className="h-18 w-18">
          <img src="/logo.png" alt="Logo AMI 2026" />
        </a>
        <div className="mx-8 flex flex-nowrap items-center gap-4 overflow-x-auto text-[#ffeabb] max-lg:hidden">
          {navItems.map((n) =>
            n.external ? (
              <a
                key={n.label}
                href={n.url}
                className="flex h-12 shrink-0 items-center gap-2 rounded-xl border-2 border-transparent bg-[#1b165e]/20 p-2 whitespace-nowrap"
              >
                <img src={n.icon} className="w-8" alt="Icon" />
                <span className="font-body font-bold">{n.label}</span>
              </a>
            ) : (
              <NavLink
                key={n.label}
                to={n.url}
                className={({ isActive }) =>
                  `${isActive ? "border-[#ffeabb]" : "border-transparent"} flex h-12 shrink-0 items-center gap-2 rounded-xl border-2 bg-[#1b165e]/20 p-2 whitespace-nowrap`
                }
              >
                <img src={n.icon} className="w-8" alt="Icon" />
                <span className="font-body font-bold">{n.label}</span>
              </NavLink>
            ),
          )}
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
        <div
          ref={mobileListRef}
          className="mx-8 flex max-h-[40lvh] flex-col items-center gap-4 overflow-y-auto px-8 text-[#ffeabb]"
        >
          {navItems.map((n, idx) =>
            n.external ? (
              <a
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                key={n.label}
                href={n.url}
                ref={(el) => {
                  mobileItemRefs.current[idx] = el;
                }}
                className="flex h-12 min-w-28 items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-[#1b165e]/20 p-2 transition-transform duration-75"
              >
                <img src={n.icon} className="w-8" alt="Icon" />
                <span className="font-body text-lg font-bold">{n.label}</span>
              </a>
            ) : (
              <NavLink
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                key={n.label}
                to={n.url}
                ref={(el) => {
                  mobileItemRefs.current[idx] = el;
                }}
                className={({ isActive }) =>
                  `${isActive ? "border-[#ffeabb]" : "border-transparent"} flex h-12 min-w-28 items-center justify-center gap-2 rounded-xl border-2 bg-[#1b165e]/20 p-2 transition-transform duration-75`
                }
              >
                <img src={n.icon} className="w-8" alt="Icon" />
                <span className="font-body text-lg font-bold">{n.label}</span>
              </NavLink>
            ),
          )}
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
