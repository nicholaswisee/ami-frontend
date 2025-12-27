export function MediaPartnerLarge() {
  const mediaPartners = [
    { id: 1, name: 'Media Partner 1', logoUrl: '/mediapartner1-logo.png' },
    { id: 2, name: 'Media Partner 2', logoUrl: '/mediapartner2-logo.png' },
    { id: 3, name: 'Media Partner 3', logoUrl: '/mediapartner3-logo.png' },
    { id: 4, name: 'Media Partner 4', logoUrl: '/mediapartner4-logo.png' },
  ];

  return (
    <div className="relative z-[20] w-full px-4 md:px-6 lg:px-12 py-6 md:py-8">
      <div className="flex flex-nowrap justify-center gap-2 md:gap-3 lg:gap-4 max-w-full overflow-auto">
        {mediaPartners.map((partner) => (
          <div key={partner.id} className="flex-shrink-0 w-32 h-24 md:w-48 md:h-32 lg:w-64 lg:h-48 flex items-center justify-center bg-white rounded-lg shadow-md overflow-hidden">
            <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MediaPartnerSmall() {
  const mediaPartners = [
    { id: 1, name: 'Media Partner A', logoUrl: '/mediapartnerA-logo.png' },
    { id: 2, name: 'Media Partner B', logoUrl: '/mediapartnerB-logo.png' },
    { id: 3, name: 'Media Partner C', logoUrl: '/mediapartnerC-logo.png' },
    { id: 4, name: 'Media Partner D', logoUrl: '/mediapartnerD-logo.png' },
    { id: 5, name: 'Media Partner E', logoUrl: '/mediapartnerE-logo.png' },
    { id: 6, name: 'Media Partner F', logoUrl: '/mediapartnerF-logo.png' },
  ];

  return (
    <div className="relative z-[20] w-full px-4 md:px-6 lg:px-12 py-6 md:py-8">
      <div className="flex flex-nowrap justify-center gap-2 md:gap-3 lg:gap-4 max-w-full overflow-auto">
        {mediaPartners.map((partner) => (
          <div key={partner.id} className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 flex items-center justify-center bg-white rounded-lg shadow-md">
            <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MediaPartner() {
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
        MEDIA PARTNERS
      </h2>

      {/* Large Media Partners */}
      <MediaPartnerLarge />

      {/* Small Media Partners */}
      <MediaPartnerSmall />
    </div>
  );
}