import { COMPANY_INFO } from '@/lib/company-info';

interface Testimonial {
  name: string;
  title?: string;
  business?: string;
  city?: string;
  quote: string;
  rating: number;
  hasImage: boolean;
  image?: string;
}

interface ReviewsSchemaProps {
  testimonials: Testimonial[];
}

export default function ReviewsSchema({ testimonials }: ReviewsSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://nexolance.agency/#organization',
    name: 'Nexolance',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY_INFO.aggregateRating.ratingValue,
      reviewCount: COMPANY_INFO.aggregateRating.reviewCount,
      bestRating: COMPANY_INFO.aggregateRating.bestRating,
      worstRating: COMPANY_INFO.aggregateRating.worstRating,
    },
    review: testimonials.map((testimonial, index) => ({
      '@type': 'Review',
      '@id': `https://nexolance.agency/testimonials#review-${index + 1}`,
      author: {
        '@type': 'Person',
        name: testimonial.name,
        jobTitle: testimonial.title || undefined,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: testimonial.quote,
      datePublished: new Date().toISOString().split('T')[0],
      publisher: {
        '@type': 'Organization',
        name: 'Nexolance',
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
