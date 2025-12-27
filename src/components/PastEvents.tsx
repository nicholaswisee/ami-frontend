export default function PastEvents() {
  const pastEvents = [
    { year: 2023, imageUrl: '/itb-day-2023.jpg', marginTop: -210 },
    { year: 2024, imageUrl: '/itb-day-2024.jpg', marginTop: 80 },
    { year: 2025, imageUrl: '/itb-day-2025.jpg', marginTop: 250 },
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
      <div className="flex justify-center items-center gap-40 w-full">
        {pastEvents.map((event, index) => (
          <div
            key={event.year}
            className="relative"
            style={{
              marginTop: `${event.marginTop}px`,
              zIndex: index,
            }}
          >
            {/* Image */}
            <div className="w-[240px] h-[170px] rounded-2xl overflow-hidden bg-gray-200 shadow-lg mb-4">
              <img
                src={event.imageUrl} 
                alt={`ITB Day ${event.year}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Year Label */}
            <div
              className="px-13 py-2 rounded-3xl font-bold text-[20px] inline-block"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(14, 9, 77, 0.18), rgba(43, 35, 117, 1))',
                backgroundColor: '#825AC3',
                border: '6px solid #302A77',
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
