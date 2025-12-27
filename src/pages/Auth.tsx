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
          toast.error("Masukkan email dan password terlebih dahulu.");
          return;
        }
        const data = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
          callbackURL: `${window.location.origin}/profile`,
        });
        if (data.error) {
          toast.error("Kredensial salah.");
        }
      } else if (type === "google") {
        if (isInAppBrowser()) {
          toast.error(
            "Lakukan autentikasi langsung di browser seperti Chrome atau Safari.",
          );
          return;
        }
        const data = await authClient.signIn.social({
          provider: "google",
          callbackURL: `${window.location.origin}/profile`,
          errorCallbackURL: `${window.location.origin}`,
          newUserCallbackURL: `${window.location.origin}/profile`,
        });
        if (data.error) {
          toast.error("Gagal melakukan autentikasi Google.");
        }
      }
    } catch (error) {
      toast.error("Gagal melakukan autentikasi.");
    }
  };
  return (
    <section className="bg-mixed relative flex min-h-screen w-full items-center justify-center p-6">
      <div className="relative max-w-96 overflow-hidden rounded-2xl border-2 border-[#ffd88c] shadow-md lg:max-w-150">
        <div className="absolute inset-0 bg-linear-to-br from-[#AC166C] to-[#6F0E4E]/85"></div>
        <div className="relative space-y-4 px-5 py-10 lg:px-16 lg:py-20">
          <div className="space-y-0 text-center">
            <h2 className="font-bold tracking-wide text-[#FFD88C] drop-shadow-md">
              Masuk
            </h2>
          </div>
          <p className="text-center font-bold text-[#FFC76E] lg:text-xl">
            Masukkan detail akunmu atau gunakan akun Google untuk melanjutkan
          </p>
          <div className="space-y-2">
            <label className="text-[16px] font-bold text-[#FFDB8C] lg:text-[24px]">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
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
            className="w-full cursor-pointer rounded-xl bg-[#F87F42] px-16 py-2 font-bold text-[#FFDB8C] transition-colors hover:bg-[#F87F42]/90"
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
