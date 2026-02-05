import { FcGoogle } from "react-icons/fc";
import { isInAppBrowser } from "../utils/checkBrowser";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import { useState } from "react";

export default function AuthPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleAuth = async (type: "email" | "google") => {
    try {
      if (type === "email") {
        if (!formData.email || !formData.password) {
          toast.error("Masukkan email dan password.");
          return;
        }
        const data = await authClient.signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
          callbackUrl: `${window.location.origin}/profile`,
        });
        if (data?.error) {
          toast.error("Kredensial salah.");
          return;
        }
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
        window.location.href = `${window.location.origin}/profile`;
      } else if (type === "google") {
        if (isInAppBrowser()) {
          toast.error(
            "Lakukan autentikasi langsung di browser seperti Chrome atau Safari.",
          );
          return;
        }
        const data = await authClient.signIn("google", {
          redirect: false,
          callbackUrl: `${window.location.origin}/profile`,
        });
        if (data?.error) {
          toast.error("Gagal melakukan autentikasi Google.");
          window.location.href = `${window.location.origin}/`;
          return;
        }
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
        window.location.href = `${window.location.origin}/profile`;
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal melakukan autentikasi.");
    }
  };
  return (
    <section className="bg-mixed relative flex min-h-screen w-full items-center justify-center p-6">
      <div className="relative my-6 max-w-96 overflow-hidden rounded-2xl border-4 border-[#FFEBB8]/20 bg-[#B64556] shadow-md lg:max-w-150">
        <div className="absolute inset-0 bg-[#B64556]"></div>
        <div className="relative space-y-4 px-5 py-10 lg:px-16 lg:py-20">
          <div className="space-y-0 text-center">
            <h2 className="font-body font-bold tracking-wide text-[#FFEBB8] drop-shadow-md">
              Masuk
            </h2>
          </div>
          <p className="text-center font-bold text-[#FFC76E] lg:text-xl">
            Masukkan detail akunmu atau gunakan akun Google untuk melanjutkan
          </p>
          <div className="space-y-2">
            <label className="text-[16px] font-bold text-[#FFDB8C] lg:text-[24px]">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
              }}
              className="w-full rounded-xl bg-[#FFDB8C] px-4 py-2 text-[12px] font-bold text-[#302A77] placeholder-[#302A77] focus:outline-none lg:text-[16px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[16px] font-bold text-[#FFDB8C] lg:text-[24px]">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              className="w-full rounded-xl bg-[#FFDB8C] px-4 py-2 text-[12px] font-bold text-[#302A77] placeholder-[#302A77] focus:outline-none lg:text-[16px]"
            />
          </div>
          <button
            onClick={() => {
              handleAuth("email");
            }}
            className="w-full cursor-pointer rounded-xl bg-[#F87F42] px-16 py-2 font-bold text-[#FFEBB8] transition-colors hover:bg-[#F87F42]/90"
          >
            Log in
          </button>
          <p className="text-center font-bold text-[#FFC76E]">atau</p>
          <button
            onClick={() => {
              handleAuth("google");
            }}
            className="mx-auto flex max-w-sm cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-2 font-semibold text-black transition-colors hover:bg-gray-100"
          >
            <FcGoogle className="size-6 lg:size-8" />
            <span className="mb-1">Lanjutkan dengan Google</span>
          </button>
        </div>
      </div>
    </section>
  );
}
