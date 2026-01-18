import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LocationServiceTemplate from '@/components/templates/LocationServiceTemplate';
import { getCityBySlug, getAllCitySlugs } from '@/data/cities';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { generateLocationMetadata } from '@/lib/seo-config';

interface CityServicePageProps {
  params: Promise<{
    city: string;
    service: string;
  }>;
}

export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  const paths = [];
  for (const citySlug of citySlugs) {
    for (const serviceSlug of serviceSlugs) {
      paths.push({
        city: citySlug,
        service: serviceSlug,
      });
    }
  }

  return paths;
}

export async function generateMetadata({
  params,
}: CityServicePageProps): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);

  if (!city || !service) {
    return {
      title: 'Page Not Found',
    };
  }

  return generateLocationMetadata({ city, service });
}

export default async function CityServicePage({ params }: CityServicePageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);

  if (!city || !service) {
    notFound();
  }

  return <LocationServiceTemplate city={city} service={service} />;
}
