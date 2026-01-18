import { MetadataRoute } from 'next';
import { getAllCitySlugs } from '@/data/cities';
import { getAllServiceSlugs } from '@/data/services';
import { industries } from '@/data/industries';

// Force static generation for static export
export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexolance.agency';
  const currentDate = new Date();

  // Static pages - high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kansas/directory`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Main service pages - high priority
  const serviceSlugs = getAllServiceSlugs();
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // City hub pages - high priority for local SEO
  const citySlugs = getAllCitySlugs();
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${baseUrl}/kansas/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // City + Service pages (e.g., /kansas/wichita/seo-services)
  const cityServicePages: MetadataRoute.Sitemap = [];
  citySlugs.forEach((citySlug) => {
    serviceSlugs.forEach((serviceSlug) => {
      cityServicePages.push({
        url: `${baseUrl}/kansas/${citySlug}/${serviceSlug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // City + Local SEO + Industry pages (e.g., /kansas/wichita/local-seo/lawyers)
  const cityIndustryPages: MetadataRoute.Sitemap = [];
  citySlugs.forEach((citySlug) => {
    industries.forEach((industry) => {
      cityIndustryPages.push({
        url: `${baseUrl}/kansas/${citySlug}/local-seo/${industry.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  // Combine all pages
  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...cityServicePages,
    ...cityIndustryPages,
  ];
}
