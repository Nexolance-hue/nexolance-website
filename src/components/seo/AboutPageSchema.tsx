import { COMPANY_INFO } from '@/lib/company-info';

export default function AboutPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://nexolance.agency/about#webpage',
    name: 'About Nexolance - Kansas Digital Marketing Agency',
    description:
      'Learn about Nexolance, a leading digital marketing agency specializing in local SEO services for Kansas businesses. Our mission is to help local businesses dominate search results and grow revenue.',
    url: 'https://nexolance.agency/about',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://nexolance.agency/#organization',
      name: 'Nexolance',
      description:
        'Professional digital marketing and local SEO services helping Kansas businesses dominate local search and grow revenue through data-driven strategies.',
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
      areaServed: {
        '@type': 'State',
        name: 'Kansas',
      },
      sameAs: [
        COMPANY_INFO.social.facebook,
        COMPANY_INFO.social.linkedin,
        COMPANY_INFO.social.twitter,
        COMPANY_INFO.directories.clutch,
        COMPANY_INFO.directories.yelp,
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
