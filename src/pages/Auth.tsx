import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  return (
    <section className="bg-mixed relative flex min-h-screen w-full items-center justify-center p-6">
      <div className="relative max-w-96 overflow-hidden rounded-2xl lg:max-w-150">
        <div className="absolute inset-0 bg-linear-to-br from-[#AC166C] to-[#6F0E4E]/85"></div>

        {/* Content */}
        <div className="relative space-y-4 px-5 py-10 lg:px-16 lg:py-20">
          {/* Title */}
          <div className="space-y-0 text-center">
            <h2 className="font-bold tracking-wide text-[#FFD88C] drop-shadow-md">
              Masuk
            </h2>
          </div>
          <p className="text-center font-bold text-[#FFC76E] lg:text-xl">
            Masukkan detail akunmu atau gunakan akun Google untuk melanjutkan
          </p>

          {/* Username Field */}
          <div className="space-y-2">
            <label
              className="text-[16px] font-bold text-[#FFDB8C] lg:text-[24px]"
              style={{ fontFamily: "Darker Grotesque" }}
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-xl bg-[#FFDB8C] px-4 py-2 text-[12px] font-bold text-[#302A77] placeholder-[#302A77] focus:outline-none lg:text-[16px]"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              className="text-[16px] font-bold text-[#FFDB8C] lg:text-[24px]"
              style={{ fontFamily: "Darker Grotesque" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl bg-[#FFDB8C] px-4 py-2 text-[12px] font-bold text-[#302A77] placeholder-[#302A77] focus:outline-none lg:text-[16px]"
            />
          </div>

          {/* TODO: onClick untuk handle login */}
          <button className="w-full rounded-xl bg-[#F87F42] px-16 py-2 font-bold text-[#FFDB8C] transition">
            Log in
          </button>

          <p className="text-center font-bold text-[#FFC76E]">atau</p>

          {/* Google Button */}
          {/* TODO: onClick untuk login dengan Google */}
          <button className="mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-white px-6 py-2 font-semibold text-black">
            <FcGoogle className="size-6 lg:size-8" />
            <span className="mb-1">Lanjutkan dengan Google</span>
          </button>
        </div>
      </div>
    </section>
  );
}
