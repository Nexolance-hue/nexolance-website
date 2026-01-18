import { City } from '@/data/cities';
import { COMPANY_INFO } from '@/lib/company-info';

interface LocalBusinessSchemaProps {
  city: City;
}

export default function LocalBusinessSchema({ city }: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${COMPANY_INFO.urls.website}/kansas/${city.slug}#business`,
    name: `${COMPANY_INFO.name} - ${city.name} Service Area`,
    description: `Professional digital marketing and local SEO services in ${city.name}, ${city.state}.`,
    url: `${COMPANY_INFO.urls.website}/kansas/${city.slug}`,
    telephone: COMPANY_INFO.phone.raw,
    email: COMPANY_INFO.email.contact,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${COMPANY_INFO.address.street} ${COMPANY_INFO.address.suite}`,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.stateCode,
      addressCountry: COMPANY_INFO.address.countryCode,
      postalCode: COMPANY_INFO.address.zip,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_INFO.coordinates.latitude,
      longitude: COMPANY_INFO.coordinates.longitude,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      '@id': `https://en.wikipedia.org/wiki/${city.name.replace(/\s+/g, '_')},_Kansas`,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY_INFO.aggregateRating.ratingValue,
      reviewCount: COMPANY_INFO.aggregateRating.reviewCount,
      bestRating: COMPANY_INFO.aggregateRating.bestRating,
      worstRating: COMPANY_INFO.aggregateRating.worstRating,
    },
    priceRange: '$$',
    image: `${COMPANY_INFO.urls.website}/images/nexolance-office.jpg`,
    logo: COMPANY_INFO.urls.logo,
    sameAs: [
      COMPANY_INFO.social.facebook,
      COMPANY_INFO.social.linkedin,
      COMPANY_INFO.social.twitter,
      COMPANY_INFO.directories.clutch,
      COMPANY_INFO.directories.yelp,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local SEO Services',
            description: 'Local search engine optimization for businesses',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Landing Page Optimization',
            description: 'Conversion-focused landing page design and testing',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
