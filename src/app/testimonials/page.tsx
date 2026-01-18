import { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials | Nexolance',
  description: 'Read what Kansas businesses say about Nexolance digital marketing services. Real reviews from real clients who achieved remarkable results with our SEO and marketing strategies.',
  openGraph: {
    title: 'Client Reviews & Testimonials | Nexolance',
    description: 'Real reviews from Kansas businesses who achieved success with Nexolance digital marketing services.',
  },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
