import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ServiceDetailClient from './ServiceDetailClient';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { generateServiceMetadata } from '@/lib/seo-config';

interface ServiceDetailPageProps {
  params: Promise<{
    service: string;
  }>;
}

export async function generateStaticParams() {
  const serviceSlugs = getAllServiceSlugs();
  return serviceSlugs.map((serviceSlug) => ({
    service: serviceSlug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return generateServiceMetadata(service);
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
