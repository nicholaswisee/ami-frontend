import { CgProfile } from "react-icons/cg";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { IoIosArrowBack, IoIosLogOut } from "react-icons/io";

export default function ProfilePage() {
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();
  return (
    <section className="bg-mixed relative flex w-full flex-col items-center justify-center text-[#FFEABB]">
      <div className="flex w-full max-w-5xl justify-center px-6">
        <div className="flex w-full items-center justify-between py-10 lg:py-20">
          {/* Back Button */}
          <button
            className="mr-auto"
            onClick={() => {
              navigate("/");
            }}
          >
            <IoIosArrowBack size={32} fill="#6f0e4e" />
          </button>

          {/* Title */}
          <h1 className="flex-1 text-center font-bold text-[#590844]">
            Profil
          </h1>
        </div>
      </div>
      <div className="flex w-full max-w-5xl flex-col space-y-10 px-6">
        <div className="overflow-hidden rounded-t-2xl">
          <div className="bg-[#C62D76] px-10 py-5 lg:py-10">
            <div className="flex flex-row gap-5">
              <CgProfile size={64} />
              <div className="flex flex-col justify-center">
                <p className="font-bold">{user?.name}</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-6 rounded-b-2xl bg-[#6F0E4E]/60 px-10 py-5 lg:py-10">
            <h2 className="">Tiket Saya</h2>
            <div>
              <p>Tiket</p> {/* Implement Ticket Card later */}
            </div>
            <button
              onClick={() => void logOut()}
              className="flex w-28 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#e1461f] py-2 font-bold text-[#FFDB8C] transition hover:bg-[#e1461f]/90"
            >
              <IoIosLogOut size={24} />
              <span className="mb-0.5 font-bold">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
