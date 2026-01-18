import { Service } from '@/data/services';
import { COMPANY_INFO } from '@/lib/company-info';

interface ServicePageSchemaProps {
  service: Service;
}

export default function ServicePageSchema({ service }: ServicePageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://nexolance.agency/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.name,

    // Provider Information
    provider: {
      '@type': 'Organization',
      name: 'Nexolance',
      '@id': 'https://nexolance.agency/#organization',
      telephone: COMPANY_INFO.phone.raw,
      email: COMPANY_INFO.email.general,
      url: 'https://nexolance.agency',
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_INFO.address.street + ' ' + COMPANY_INFO.address.suite,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.stateCode,
        addressCountry: 'US',
        postalCode: COMPANY_INFO.address.zip,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: COMPANY_INFO.coordinates.latitude,
        longitude: COMPANY_INFO.coordinates.longitude,
      },
    },

    // Area Served
    areaServed: {
      '@type': 'State',
      name: 'Kansas',
      '@id': 'https://en.wikipedia.org/wiki/Kansas',
    },

    // Offer Details
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: service.pricing.startingPrice.replace(/[^0-9]/g, ''),
        priceCurrency: 'USD',
        description: `${service.pricing.startingPrice} - ${service.pricing.billingModel}`,
      },
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
    },

    // Aggregate Ratings
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY_INFO.aggregateRating.ratingValue,
      reviewCount: COMPANY_INFO.aggregateRating.reviewCount,
      bestRating: COMPANY_INFO.aggregateRating.bestRating,
      worstRating: COMPANY_INFO.aggregateRating.worstRating,
    },

    // Service Features/Benefits
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Features`,
      itemListElement: service.benefits.slice(0, 5).map((benefit, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: benefit,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
