import { useState, useEffect } from 'react';

interface RundownEvent {
    name: string;
    startTime: string; // Format: "HH:MM"
    endTime: string;   // Format: "HH:MM"
}

interface RundownData {
    date: string; // Format: "DD/MM/YYYY"
    events: RundownEvent[];
}

export default function Rundown() {
    const [rundownData, setRundownData] = useState<RundownData>({
        date: 'DD/MM/YYYY',
        events: []
    });

    useEffect(() => {
        // Expected API response
        // {
        //     "date": "17/04/2026",
        //     "events": [
        //         { "name": "Event Name", "startTime": "08:00", "endTime": "09:00" }
        //     ]
        // }

        // Placeholder data
        setRundownData({
            date: '17/04/2026',
            events: [
                { name: 'Opening Ceremony', startTime: '08:00', endTime: '09:00' },
                { name: 'Main Event', startTime: '09:00', endTime: '12:00' },
                { name: 'Lunch Break', startTime: '12:00', endTime: '13:00' },
                { name: 'Workshop Session', startTime: '13:00', endTime: '15:00' },
                { name: 'Closing Ceremony', startTime: '15:00', endTime: '16:00' }
            ]
        });
    }, []);

    return (
        <div className='flex flex-col gap-4 md:gap-10 items-center'>
            {/* Title */}
            <div className="relative inline-block">
                {/* Base yellow text */}
                <h1
                    className="text-[26px] md:text-[54px] font-bold leading-none text-[#EFFF8D]"
                    style={{
                        fontFamily: 'Euskadi, serif',
                        textShadow: '0px 4px 2px #F3414E'
                    }}
                >
                    RUNDOWN ITB DAY
                </h1>

                {/* Gradient overlay at 50% opacity */}
                <h1
                    className="absolute top-0 left-0 text-[26px] md:text-[54px] font-bold leading-none text-transparent"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(248, 127, 66, 0) 39%, rgba(248, 127, 66, 1) 100%)`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        opacity: 0.5,
                        fontFamily: 'Euskadi, serif',
                    }}
                >
                    RUNDOWN ITB DAY
                </h1>
            </div>

            {/* Rundown Content */}
            <div className='flex flex-col items-center gap-6 md:gap-6'>

                {/* Date Display */}
                <div className="p-2 rounded-2xl md:rounded-4xl bg-[#FFB366] inline-block">
                    <div className="relative inline-block">
                        <div className="md:px-18 py-1 absolute inset-0 rounded-2xl md:rounded-4xl bg-[#FFD88C]" />
                        <div
                            className="absolute inset-0 rounded-2xl md:rounded-4xl"
                            style={{
                                backgroundImage:
                                    "linear-gradient(180deg, rgba(255,179,102,0), rgba(255,179,102,0.8))",
                            }}
                        />
                        <h2
                            className="relative z-10 px-10 md:px-18 py-1 text-[#87095A] text-[16px] md:text-[40px] font-bold"
                            style={{
                                fontFamily: 'Euskadi, serif',
                            }}
                        >
                            {rundownData.date}
                        </h2>
                    </div>
                </div>

                {/* Events List */}
                <div className='flex flex-col gap-6 md:gap-4 justify-center items-center'>
                    {rundownData.events.map((event, index) => (
                        <div key={index} className='flex flex-row gap-4'>
                            {/* Time */}
                            <div className='flex items-center justify-center w-[116px] py-2.5 md:w-[291px] md:h-16.75 md:py-[1px] bg-[#FFB366] md:bg-[#FFC76E] rounded-4xl '>
                                <h3
                                    className='text-[#590844] text-[16px] md:text-[32px] font-bold'
                                    style={{
                                        fontFamily: 'Euskadi, serif',
                                    }}
                                >
                                    {event.startTime} - {event.endTime}
                                </h3>
                            </div>

                            {/* Event Name */}
                            <div className='flex items-center justify-center w-[216px] py-2.5 md:w-[420px] md:h-16.75 md:py-[1px] bg-[#FFB366] md:bg-[#FFC76E] rounded-4xl '>
                                <h3
                                    className='text-[#590844] text-[16px] md:text-[32px] font-bold'
                                    style={{
                                        fontFamily: 'Euskadi, serif',
                                    }}
                                >
                                    {event.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
