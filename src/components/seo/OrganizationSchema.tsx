import { COMPANY_INFO } from '@/lib/company-info';

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://nexolance.agency/#organization',
    name: 'Nexolance',
    legalName: 'Nexolance LLC',
    url: 'https://nexolance.agency',
    logo: 'https://nexolance.agency/images/nexolance-logo.webp',
    description:
      'Professional digital marketing and local SEO services helping Kansas businesses dominate local search and grow revenue through data-driven strategies.',

    // Contact Information
    telephone: COMPANY_INFO.phone.raw,
    email: COMPANY_INFO.email.general,

    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.street + ' ' + COMPANY_INFO.address.suite,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.stateCode,
      addressCountry: 'US',
      postalCode: COMPANY_INFO.address.zip,
    },

    // Geographic Coordinates
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_INFO.coordinates.latitude,
      longitude: COMPANY_INFO.coordinates.longitude,
    },

    // Area Served
    areaServed: {
      '@type': 'State',
      name: 'Kansas',
      '@id': 'https://en.wikipedia.org/wiki/Kansas',
    },

    // Services Offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Services',
            description: 'Comprehensive search engine optimization to improve rankings and drive organic traffic.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local SEO',
            description: 'Targeted local SEO services to help businesses dominate local search results.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Landing Page Optimization',
            description: 'Strategic landing page design and optimization focused on conversion rate improvement.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce SEO',
            description: 'Specialized SEO services for online stores to increase product visibility and boost revenue.',
          },
        },
      ],
    },

    // Operating Hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],

    // Aggregate Ratings
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY_INFO.aggregateRating.ratingValue,
      reviewCount: COMPANY_INFO.aggregateRating.reviewCount,
      bestRating: COMPANY_INFO.aggregateRating.bestRating,
      worstRating: COMPANY_INFO.aggregateRating.worstRating,
    },

    // Social Media & Directory Profiles
    sameAs: [
      COMPANY_INFO.social.facebook,
      COMPANY_INFO.social.linkedin,
      COMPANY_INFO.social.twitter,
      COMPANY_INFO.directories.clutch,
      COMPANY_INFO.directories.yelp,
    ],

    // Founder/Owner (optional - can be added if needed)
    founder: {
      '@type': 'Person',
      name: 'Nexolance Team',
    },

    // Founded year (optional - adjust as needed)
    foundingDate: '2020',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
