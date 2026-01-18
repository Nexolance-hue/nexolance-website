import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { aboutMetadata } from '@/lib/seo-config';

export const metadata: Metadata = aboutMetadata;

export default function AboutPage() {
  return <AboutClient />;
}
