import { useState, useEffect } from 'react';

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date('2026-04-17T00:00:00'); // Replace with API call

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate.getTime() - now;

            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Calculate immediately
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number) => String(num).padStart(2, '0');

    return (
        <div
            style={{
                backgroundImage: 'url(/TIMECOUNT.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            className="flex items-center justify-center h-[94px] md:h-32"
        >
            <div className="text-center">
                <h2 className="md:text-[40px] text-[20px] font-bold text-[#FFD88C]"
                    style={{
                        fontFamily: 'Euskadi, serif',
                        textShadow: '0px 4px 4px #590844, 0px 4px 4px #590844'
                    }}>
                    {formatNumber(timeLeft.hours)}. {formatNumber(timeLeft.minutes)}. {formatNumber(timeLeft.seconds)} menuju AKU MASUK ITB 2026!
                </h2>
            </div>
        </div>
    );
}