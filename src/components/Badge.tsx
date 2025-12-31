export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`group relative w-fit rounded-2xl border-2 border-[#C62D76] bg-linear-to-b from-[#AC166C] to-[#6F0E4E] px-6 py-3 text-lg tracking-wide text-[#FFDB8C] uppercase shadow-[0px_2px_0px_0px_#F3414E] transition-all duration-150 ease-in-out hover:brightness-110 active:translate-y-1 active:shadow-[0px_2px_0px_0px_#F3414E] sm:w-max md:text-2xl`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-linear-to-b from-white/10 to-transparent" />
      <span className="relative z-10 drop-shadow-md">
        <h3 className="whitespace-nowrap text-shadow-sm">{children}</h3>
      </span>
    </div>
  );
}
