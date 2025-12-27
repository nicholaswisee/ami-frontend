export default function PastEvents() {
  const pastEvents = [
    { year: 2023, imageUrl: '/itb-day-2023.jpg' },
    { year: 2024, imageUrl: '/itb-day-2024.jpg' },
    { year: 2025, imageUrl: '/itb-day-2025.jpg' },
  ];

  return (
    <div className="flex flex-col items-center gap-8 w-full px-4 py-12">
      {/* Title */}
      <h1
        className="text-[#EFFF8D] text-[54px] font-bold text-center"
        style={{
          fontFamily: 'Euskadi, serif',
          textShadow: '0 4px 5.3px rgba(48, 42, 119, 1), 0 4px 5.3px rgba(48, 42, 119, 1)'
        }}>
        Lorem Ipsum dolor sit amet
      </h1>

      {/* Past Events Gallery */}
      <div className="relative w-full max-w-[1200px] h-[600px]">
        {pastEvents.map((event, index) => (
          <div
            key={event.year}
            className="absolute"
            style={{
              left: `${index * 280}px`,
              top: `${index * 120}px`,
              zIndex: index,
            }}
          >
            {/* Image */}
            <div className="w-[280px] h-[200px] rounded-2xl overflow-hidden bg-gray-200 shadow-lg mb-4">
              <img
                src={event.imageUrl}
                alt={`ITB Day ${event.year}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Year Label */}
            <div
              className="px-8 py-3 rounded-full font-bold text-[20px] inline-block"
              style={{
                backgroundColor: '#825AC3',
                border: '4px solid #302A77',
                color: '#FFB6B0',
              }}
            >
              ITB DAY {event.year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
