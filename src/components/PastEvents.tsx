export default function PastEvents() {
  const pastEvents = [
    {
      year: 2023,
      imageUrl: "/itb-day-2023.jpg",
      offset: "md:-mt-16 lg:-mt-28 xl:-mt-40",
    },
    {
      year: 2024,
      imageUrl: "/itb-day-2024.jpg",
      offset: "md:mt-8 lg:mt-12 xl:mt-16",
    },
    {
      year: 2025,
      imageUrl: "/itb-day-2025.jpg",
      offset: "md:mt-16 lg:mt-28 xl:mt-40",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-8 px-4 py-12">
      {/* Title */}
      <h1
        className="font-heading text-center text-3xl font-bold text-[#EFFF8D] md:text-5xl lg:text-6xl"
        style={{
          textShadow:
            "0 4px 5.3px rgba(48, 42, 119, 1), 0 4px 5.3px rgba(48, 42, 119, 1)",
        }}
      >
        Lorem Ipsum dolor sit amet
      </h1>

      {/* Past Events Gallery */}
      <div className="flex w-full flex-col items-center gap-10 md:flex-row md:flex-wrap md:items-start md:justify-center md:gap-16 lg:gap-24 xl:gap-32">
        {pastEvents.map((event, index) => (
          <div
            key={event.year}
            className={`relative flex flex-col items-center ${event.offset}`}
            style={{ zIndex: index, minWidth: "14rem" }}
          >
            {/* Image */}
            <div className="mb-4 h-40 w-56 overflow-hidden rounded-2xl bg-gray-200 shadow-lg md:h-44 md:w-60">
              <img
                src={event.imageUrl}
                alt={`ITB Day ${event.year}`}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Year Label */}
            <div
              className="inline-block rounded-3xl border-4 border-[#302A77] px-10 py-2 font-heading text-lg font-bold md:px-12 md:text-xl"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(14, 9, 77, 0.18), rgba(43, 35, 117, 1))",
                backgroundColor: "#825AC3",
                color: "#FFB6B0",
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
