import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CityHubTemplate from '@/components/templates/CityHubTemplate';
import { getCityBySlug, getAllCitySlugs } from '@/data/cities';
import { generateLocationMetadata } from '@/lib/seo-config';

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs();
  return citySlugs.map((citySlug) => ({
    city: citySlug,
  }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: 'City Not Found',
    };
  }

  return generateLocationMetadata({ city });
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  return <CityHubTemplate city={city} />;
}
