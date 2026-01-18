import { COMPANY_INFO } from '@/lib/company-info';

export default function ContactPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://nexolance.agency/quote#webpage',
    name: 'Get a Free Quote - Nexolance Digital Marketing',
    description:
      'Get a free custom digital marketing quote for your Kansas business. Transparent pricing, fast response, and no obligation consultation.',
    url: 'https://nexolance.agency/quote',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://nexolance.agency/#organization',
      name: 'Nexolance',
      telephone: COMPANY_INFO.phone.raw,
      email: COMPANY_INFO.email.general,
      url: 'https://nexolance.agency',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: COMPANY_INFO.phone.raw,
        contactType: 'Sales',
        areaServed: 'US-KS',
        availableLanguage: 'English',
        contactOption: 'TollFree',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
      },
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
