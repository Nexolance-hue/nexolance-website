import { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { servicesOverviewMetadata } from '@/lib/seo-config';

export const metadata: Metadata = servicesOverviewMetadata;

export default function ServicesPage() {
  return <ServicesClient />;
}
