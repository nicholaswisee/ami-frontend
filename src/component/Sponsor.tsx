export function SponsorLarge() {
  const sponsors = [
    { id: 1, name: 'Sponsor 1', logoUrl: '/sponsor1-logo.png' },
    { id: 2, name: 'Sponsor 2', logoUrl: '/sponsor2-logo.png' },
    { id: 3, name: 'Sponsor 3', logoUrl: '/sponsor3-logo.png' },
    { id: 4, name: 'Sponsor 4', logoUrl: '/sponsor4-logo.png' },
  ];

  return (
    <div className="relative z-[20] w-full px-4 md:px-6 lg:px-12 py-6 md:py-8">
      <div className="flex flex-nowrap justify-center gap-2 md:gap-3 lg:gap-4 max-w-full overflow-auto">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="flex-shrink-0 w-32 h-24 md:w-48 md:h-32 lg:w-64 lg:h-48 flex items-center justify-center bg-white rounded-lg shadow-md overflow-hidden">
            <img src={sponsor.logoUrl} alt={sponsor.name} className="max-w-full max-h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SponsorSmall() {
  const sponsors = [
    { id: 1, name: 'Sponsor A', logoUrl: '/sponsorA-logo.png' },
    { id: 2, name: 'Sponsor B', logoUrl: '/sponsorB-logo.png' },
    { id: 3, name: 'Sponsor C', logoUrl: '/sponsorC-logo.png' },
    { id: 4, name: 'Sponsor D', logoUrl: '/sponsorD-logo.png' },
    { id: 5, name: 'Sponsor E', logoUrl: '/sponsorE-logo.png' },
    { id: 6, name: 'Sponsor F', logoUrl: '/sponsorF-logo.png' },
  ];

  return (
    <div className="relative z-[20] w-full px-4 md:px-6 lg:px-12 py-6 md:py-8">
      <div className="flex flex-nowrap justify-center gap-2 md:gap-3 lg:gap-4 max-w-full overflow-auto">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 flex items-center justify-center bg-white rounded-lg shadow-md">
            <img src={sponsor.logoUrl} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Sponsor() {
  return (
    <div className="relative z-[20] w-full">
      <h2
        className="text-[54px] font-normal text-center pt-12 md:pt-16 pb-4 md:pb-6"
        style={{
          color: '#EFFF8D',
          textShadow: '0 4px 2px rgba(243, 65, 78, 0.80)',
          fontFamily: 'Euskadi, serif',
          fontSize: '54px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        SPONSORS
      </h2>

      {/* Large Sponsors */}
      <SponsorLarge />

      {/* Small Sponsors */}
      <SponsorSmall />
    </div>
  );
}