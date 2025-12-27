import { useState } from 'react';

interface EventBlock {
  id: number;
  title: string;
  isLarge: boolean;
  imageUrl?: string;
}

export default function EventBlocks() {
  const [expandedBlocks, setExpandedBlocks] = useState<number[]>([]);

  const events: EventBlock[] = [
    { id: 1, title: 'Nama Acara', isLarge: true, imageUrl: '/event-placeholder.jpg' },
    { id: 2, title: 'Nama Acara', isLarge: true, imageUrl: '/event-placeholder.jpg' },
    { id: 3, title: 'Nama Acara', isLarge: true, imageUrl: '/event-placeholder.jpg' },
    { id: 4, title: 'Nama Acara', isLarge: true, imageUrl: '/event-placeholder.jpg' },
    { id: 5, title: 'Nama Acara', isLarge: false },
    { id: 6, title: 'Nama Acara', isLarge: false },
    { id: 7, title: 'Nama Acara', isLarge: false },
    { id: 8, title: 'Nama Acara', isLarge: false },
    { id: 9, title: 'Nama Acara', isLarge: false },
    { id: 10, title: 'Nama Acara', isLarge: false },
    { id: 11, title: 'Nama Acara', isLarge: false },
  ];

  const handleBlockClick = (id: number, isLarge: boolean) => {
    if (isLarge) {
      if (expandedBlocks.includes(id)) {
        setExpandedBlocks(expandedBlocks.filter(blockId => blockId !== id));
      } else {
        setExpandedBlocks([...expandedBlocks, id]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-7 w-full max-w-[1200px] px-4">
      {/* Title */}
      <h2
        className="text-[#87095A] text-[54px] font-bold text-center mb-4"
        style={{
          fontFamily: 'Euskadi, serif',
          textShadow: '0 4px 5.3px rgba(245, 55, 55, 0.99)'
        }}
      >
        EVENT ITB DAY 2026
      </h2>

      {/* Large blocks grid (top 4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-end">
        {events.slice(0, 4).map((event) => (
          <button
            key={event.id}
            onClick={() => handleBlockClick(event.id, event.isLarge)}
            className={`w-full rounded-[32px] font-bold text-[32px] transition-all duration-300 hover:scale-105 cursor-pointer flex items-center ${
              expandedBlocks.includes(event.id) ? 'p-5 gap-4 flex-col' : 'py-3 px-6 justify-center'
            }`}
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(255,179,102,0), rgba(255,179,102,0.8))',
              backgroundColor: '#FFD88C',
              border: '7px solid #FFB366',
              color: '#87095A'
            }}
          >
            {/* Expanded Image */}
            {expandedBlocks.includes(event.id) && (
              <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 animate-in fade-in zoom-in-95 duration-300">
                <img
                  src={event.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Title */}
            <span className="text-center">{event.title}</span>
          </button>
        ))}
      </div>

      {/* Small blocks grid (remaining 7) */}
      <div className="flex flex-wrap gap-4 w-full justify-center">
        {events.slice(4).map((event) => (
          <button
            key={event.id}
            onClick={() => handleBlockClick(event.id, event.isLarge)}
            className="px-8 py-2 rounded-[40px] font-bold text-[25px] transition-all duration-300 hover:scale-105 w-[calc(20%-12px)] min-w-200px]"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(255,179,102,0), rgba(255,179,102,0.8))',
              backgroundColor: '#FFD88C',
              border: '7px solid #FFB366',
              color: '#87095A'
            }}
          >
            {event.title}
          </button>
        ))}
      </div>
    </div>
  );
}
