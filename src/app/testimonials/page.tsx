import { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials | Nexolance',
  description: 'Read what Kansas businesses say about Nexolance digital marketing services. Real reviews from real clients who achieved remarkable results with our SEO and marketing strategies.',
  openGraph: {
    title: 'Client Reviews & Testimonials | Nexolance',
    description: 'Real reviews from Kansas businesses who achieved success with Nexolance digital marketing services.',
    images: [{ url: '/images/featured/testimonials.webp', width: 1200, height: 630, alt: 'Client Reviews & Testimonials' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Reviews & Testimonials | Nexolance',
    description: 'Real reviews from Kansas businesses who achieved success with Nexolance.',
    images: ['/images/featured/testimonials.webp'],
  },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
