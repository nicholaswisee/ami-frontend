import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 14 Feb 2026 00:00 at UTC+7 => 13 Feb 2026 17:00 UTC
    const targetDate = new Date("2026-02-13T17:00:00Z");

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const totalSeconds = Math.floor(difference / 1000);
        const days = Math.floor(totalSeconds / (60 * 60 * 24));

        setTimeLeft({
          days,
          hours: Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)),
          minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
          seconds: totalSeconds % 60,
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  const formatDays = (num: number) => String(num).padStart(2, "0");
  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div
      style={{
        backgroundImage: "url(/countdown.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex h-14 items-center justify-center md:h-18"
    >
      <div className="text-center">
        <p className="font-heading text-sm font-normal tracking-wider text-[#FFD88C] md:text-2xl lg:text-3xl">
          {formatDays(timeLeft.days)} hari {formatNumber(timeLeft.hours)} jam{" "}
          {formatNumber(timeLeft.minutes)} menit{" "}
          {formatNumber(timeLeft.seconds)} detik menuju ITB DAY 2026!
        </p>
      </div>
    </div>
  );
}
