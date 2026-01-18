import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LocationIndustryTemplate from '@/components/templates/LocationIndustryTemplate';
import { getCityBySlug, getAllCitySlugs } from '@/data/cities';
import { getIndustryBySlug, getAllIndustrySlugs } from '@/data/industries';
import { generateIndustryMetadata } from '@/lib/seo-config';

interface CityIndustryPageProps {
  params: Promise<{
    city: string;
    industry: string;
  }>;
}

export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs();
  const industrySlugs = getAllIndustrySlugs();

  const paths = [];
  for (const citySlug of citySlugs) {
    for (const industrySlug of industrySlugs) {
      paths.push({
        city: citySlug,
        industry: industrySlug,
      });
    }
  }

  return paths;
}

export async function generateMetadata({
  params,
}: CityIndustryPageProps): Promise<Metadata> {
  const { city: citySlug, industry: industrySlug } = await params;
  const city = getCityBySlug(citySlug);
  const industry = getIndustryBySlug(industrySlug);

  if (!city || !industry) {
    return {
      title: 'Page Not Found',
    };
  }

  return generateIndustryMetadata(industry, city);
}

export default async function CityIndustryPage({ params }: CityIndustryPageProps) {
  const { city: citySlug, industry: industrySlug } = await params;
  const city = getCityBySlug(citySlug);
  const industry = getIndustryBySlug(industrySlug);

  if (!city || !industry) {
    notFound();
  }

  return <LocationIndustryTemplate city={city} industry={industry} />;
}
