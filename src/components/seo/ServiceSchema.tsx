import { Service } from '@/data/services';
import { City } from '@/data/cities';
import { Industry } from '@/data/industries';
import { COMPANY_INFO } from '@/lib/company-info';

interface ServiceSchemaProps {
  service: Service;
  city: City;
  industry?: Industry;
}

export default function ServiceSchema({
  service,
  city,
  industry,
}: ServiceSchemaProps) {
  const serviceName = industry
    ? `${industry.name} ${service.name} in ${city.name}`
    : `${service.name} in ${city.name}`;

  const serviceUrl = industry
    ? `https://nexolance.agency/kansas/${city.slug}/local-seo/${industry.slug}`
    : `https://nexolance.agency/kansas/${city.slug}/${service.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: serviceName,
    description: industry
      ? `Specialized ${service.name.toLowerCase()} for ${industry.name.toLowerCase()} businesses in ${city.name}, Kansas. ${industry.description.slice(0, 150)}...`
      : `${service.description}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Nexolance',
      '@id': `https://nexolance.agency/kansas/${city.slug}#business`,
      telephone: COMPANY_INFO.phone.raw,
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
    areaServed: {
      '@type': 'City',
      name: city.name,
      '@id': `https://en.wikipedia.org/wiki/${city.name.replace(/\s+/g, '_')},_Kansas`,
    },
    serviceType: service.name,
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: service.pricing.startingPrice.replace(/[$,]/g, ''),
        priceCurrency: 'USD',
        description: service.pricing.priceRange,
      },
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY_INFO.aggregateRating.ratingValue,
      reviewCount: COMPANY_INFO.aggregateRating.reviewCount,
      bestRating: COMPANY_INFO.aggregateRating.bestRating,
      worstRating: COMPANY_INFO.aggregateRating.worstRating,
    },
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
