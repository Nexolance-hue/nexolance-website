import { Metadata } from 'next';
import { City } from '@/data/cities';
import { Service } from '@/data/services';
import { Industry } from '@/data/industries';
import { industryMetaDescriptions, industryTitleTemplates } from '@/data/industry-meta';

// Universal meta tags configuration
export const universalMetaTags = {
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  googlebot: 'index, follow',
  author: 'Nexolance',
  publisher: 'Nexolance',
  language: 'English',
  themeColor: '#10B981',
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://nexolance.agency'),
  title: {
    default: 'Nexolance | Kansas City Web Design & Local SEO Experts',
    template: '%s | Nexolance',
  },
  description:
    'Boost your online presence with Nexolance—Amazon PPC, web design, local SEO, and link building in Kansas City. Proven, results-driven strategies.',
  keywords: [
    'local SEO',
    'digital marketing',
    'Kansas SEO',
    'landing page optimization',
    'e-commerce SEO',
    'search engine optimization',
    'web design Kansas City',
  ],
  authors: [{ name: 'Nexolance' }],
  creator: 'Nexolance',
  publisher: 'Nexolance',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://nexolance.agency/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Nexolance',
    title: 'Nexolance | Kansas City Web Design & Local SEO Experts',
    description:
      'Boost your online presence with Nexolance—web design, local SEO, and link building in Kansas City. Proven, results-driven strategies.',
    url: 'https://nexolance.agency/',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexolance Digital Marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nexolance',
    creator: '@nexolance',
    title: 'Nexolance | Kansas City Web Design & Local SEO Experts',
    description: 'Proven digital marketing strategies for Kansas City businesses.',
    images: ['/images/twitter-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome', url: '/android-icon-192x192.png', sizes: '192x192' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#10B981',
    'msapplication-TileColor': '#10B981',
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'copyright': `© ${new Date().getFullYear()} Nexolance. All rights reserved.`,
    'language': 'English',
    'geo.region': 'US-KS',
    'geo.placename': 'Kansas City',
    'contact': 'info@nexolance.agency',
    'rating': 'General',
  },
};

interface GenerateLocationMetadataParams {
  city: City;
  service?: Service;
  industry?: Industry;
}

// Helper to get rotated benefit words based on city
function getServiceBenefit(serviceSlug: string, citySlug: string): string {
  const benefits = {
    'seo-services': ['Rank Higher', 'Get Found', 'More Traffic', 'Grow Traffic'],
    'landing-page-optimization': ['Boost Sales', 'More Leads', 'Higher ROI', 'Get Leads'],
    'ecommerce-seo': ['More Sales', 'More Orders', 'Boost Sales', 'Drive Sales'],
    'local-seo': ['Get Customers', 'Dominate Local', 'More Calls', 'Get Clients'],
    'website-design-development': ['Fast Loading', 'SEO-Ready', 'Mobile-First', 'Convert More'],
  };

  const serviceBenefits = benefits[serviceSlug as keyof typeof benefits] || ['Grow Business'];
  // Use city slug hash to deterministically pick benefit (consistent for same city+service)
  const index = (citySlug.length + serviceSlug.length) % serviceBenefits.length;
  return serviceBenefits[index];
}

// Helper to get industry-specific benefits
function getIndustryBenefit(industryCategory: string): string {
  const categoryBenefits = {
    'Legal': 'More Cases',
    'Medical': 'More Patients',
    'Home Services': 'More Calls',
    'Professional': 'More Clients',
    'B2B': 'More Leads',
  };
  return categoryBenefits[industryCategory as keyof typeof categoryBenefits] || 'Grow Business';
}

export function generateLocationMetadata({
  city,
  service,
  industry,
}: GenerateLocationMetadataParams): Metadata {
  let title: string;
  let description: string;
  let url: string;

  if (industry) {
    // City + Industry (Local SEO for specific industry) - 330 pages total
    // Custom titles and descriptions per industry type
    url = `/kansas/${city.slug}/local-seo/${industry.slug}`;

    // Industry-specific titles and descriptions
    const industryDescriptions: { [key: string]: { [key: string]: string } } = {
      // LEGAL SERVICES (60 pages = 15 cities × 4 industries)
      'personal-injury-law': {
        'wichita': 'Personal injury attorney SEO in Wichita, Kansas. Generate quality case leads and dominate local search. Free consultation.',
        'overland-park': 'Personal injury SEO in Overland Park. Get high-value cases and dominate KC metro. Proven legal marketing. Free audit.',
        'kansas-city': 'Personal injury lawyer SEO in Kansas City. Attract quality clients and dominate local search. Legal marketing expert. Free quote.',
        'topeka': 'Personal injury attorney SEO in Topeka, Kansas. Generate case leads and dominate capital city search. Free consultation.',
        'olathe': 'Personal injury SEO in Olathe. Get high-value cases in Johnson County. Proven legal marketing strategies. Free audit.',
        'lawrence': 'Personal injury lawyer SEO in Lawrence, Kansas. Attract quality clients and dominate local search. Free consultation.',
        'shawnee': 'Personal injury attorney SEO in Shawnee. Generate case leads in KC metro. Legal marketing specialist. Free audit.',
        'manhattan': 'Personal injury SEO in Manhattan, Kansas. Dominate local search near K-State. Legal marketing expert. Free quote.',
        'lenexa': 'Personal injury lawyer SEO in Lenexa. Get high-value cases in KC metro. Proven legal strategies. Free consultation.',
        'salina': 'Personal injury attorney SEO in Salina, Kansas. Generate quality leads in central KS. Legal marketing expert. Free audit.',
        'hutchinson': 'Personal injury SEO in Hutchinson. Attract quality clients and dominate local search. Legal marketing specialist. Free quote.',
        'leawood': 'Personal injury lawyer SEO in Leawood. Get high-value cases in premium KC market. Legal marketing expert. Free audit.',
        'dodge-city': 'Personal injury attorney SEO in Dodge City, Kansas. Dominate western KS search. Legal marketing specialist. Free quote.',
        'garden-city': 'Personal injury SEO in Garden City. Generate quality leads in southwest Kansas. Legal marketing expert. Free consultation.',
        'leavenworth': 'Personal injury lawyer SEO in Leavenworth, Kansas. Attract quality clients and dominate local search. Free audit.',
      },
      'criminal-defense': {
        'wichita': 'Criminal defense SEO in Wichita, Kansas. Attract quality clients and dominate local search. Legal marketing expert. Free quote.',
        'overland-park': 'Criminal defense lawyer SEO in Overland Park. Get quality cases in KC metro. Proven legal marketing. Free consultation.',
        'kansas-city': 'Criminal defense attorney SEO in Kansas City. Dominate local search and attract clients. Legal marketing specialist. Free audit.',
        'topeka': 'Criminal defense SEO in Topeka, Kansas. Get quality cases in capital city. Legal marketing expert. Free consultation.',
        'olathe': 'Criminal defense lawyer SEO in Olathe. Attract clients in Johnson County. Proven legal strategies. Free audit.',
        'lawrence': 'Criminal defense attorney SEO in Lawrence, Kansas. Dominate local search and attract quality clients. Free quote.',
        'shawnee': 'Criminal defense SEO in Shawnee. Get quality cases in KC metro. Legal marketing specialist. Free consultation.',
        'manhattan': 'Criminal defense lawyer SEO in Manhattan, Kansas. Attract clients near K-State. Legal marketing expert. Free audit.',
        'lenexa': 'Criminal defense attorney SEO in Lenexa. Dominate KC metro search and get quality cases. Free consultation.',
        'salina': 'Criminal defense SEO in Salina, Kansas. Attract quality clients in central KS. Legal marketing specialist. Free audit.',
        'hutchinson': 'Criminal defense lawyer SEO in Hutchinson. Get quality cases and dominate local search. Free quote.',
        'leawood': 'Criminal defense attorney SEO in Leawood. Attract premium clients in KC metro. Legal marketing expert. Free audit.',
        'dodge-city': 'Criminal defense SEO in Dodge City, Kansas. Dominate western KS search and attract clients. Free consultation.',
        'garden-city': 'Criminal defense lawyer SEO in Garden City. Get quality cases in southwest Kansas. Free audit.',
        'leavenworth': 'Criminal defense attorney SEO in Leavenworth, Kansas. Attract quality clients and dominate local search. Free quote.',
      },
      'family-law': {
        'wichita': 'Family law SEO in Wichita, Kansas. Generate divorce and custody case leads. Proven legal strategies. Free consultation.',
        'overland-park': 'Family law attorney SEO in Overland Park. Get quality cases in KC metro. Legal marketing specialist. Free audit.',
        'kansas-city': 'Family law SEO in Kansas City. Attract divorce and custody clients. Dominate local search. Free consultation.',
        'topeka': 'Family law attorney SEO in Topeka, Kansas. Generate quality leads in capital city. Legal marketing expert. Free quote.',
        'olathe': 'Family law SEO in Olathe. Get divorce and custody cases in Johnson County. Proven legal marketing. Free audit.',
        'lawrence': 'Family law attorney SEO in Lawrence, Kansas. Attract quality clients and dominate local search. Free consultation.',
        'shawnee': 'Family law SEO in Shawnee. Generate divorce and custody leads in KC metro. Legal marketing specialist. Free audit.',
        'manhattan': 'Family law attorney SEO in Manhattan, Kansas. Attract quality clients near K-State. Legal marketing expert. Free quote.',
        'lenexa': 'Family law SEO in Lenexa. Get quality cases in KC metro. Proven legal marketing strategies. Free consultation.',
        'salina': 'Family law attorney SEO in Salina, Kansas. Generate leads in central KS. Legal marketing specialist. Free audit.',
        'hutchinson': 'Family law SEO in Hutchinson. Attract divorce and custody clients. Dominate local search. Free quote.',
        'leawood': 'Family law attorney SEO in Leawood. Get premium cases in KC metro. Legal marketing expert. Free consultation.',
        'dodge-city': 'Family law SEO in Dodge City, Kansas. Generate quality leads in western KS. Legal marketing specialist. Free audit.',
        'garden-city': 'Family law attorney SEO in Garden City. Attract quality clients in southwest Kansas. Free quote.',
        'leavenworth': 'Family law SEO in Leavenworth, Kansas. Generate divorce and custody leads. Dominate local search. Free audit.',
      },
      'estate-planning': {
        'wichita': 'Estate planning SEO in Wichita, Kansas. Attract high-value clients and dominate local search. Legal expert. Free audit.',
        'overland-park': 'Estate planning attorney SEO in Overland Park. Get quality clients in KC metro. Legal marketing specialist. Free quote.',
        'kansas-city': 'Estate planning SEO in Kansas City. Attract high-value clients and dominate local search. Legal marketing expert. Free audit.',
        'topeka': 'Estate planning attorney SEO in Topeka, Kansas. Generate quality leads in capital city. Legal marketing specialist. Free quote.',
        'olathe': 'Estate planning SEO in Olathe. Attract high-value clients in Johnson County. Proven legal marketing. Free audit.',
        'lawrence': 'Estate planning attorney SEO in Lawrence, Kansas. Get quality clients and dominate local search. Free consultation.',
        'shawnee': 'Estate planning SEO in Shawnee. Attract high-value clients in KC metro. Legal marketing specialist. Free audit.',
        'manhattan': 'Estate planning attorney SEO in Manhattan, Kansas. Generate quality leads near K-State. Legal marketing expert. Free quote.',
        'lenexa': 'Estate planning SEO in Lenexa. Attract high-value clients in KC metro. Proven legal marketing strategies. Free audit.',
        'salina': 'Estate planning attorney SEO in Salina, Kansas. Get quality clients in central KS. Legal marketing specialist. Free quote.',
        'hutchinson': 'Estate planning SEO in Hutchinson. Attract high-value clients and dominate local search. Free consultation.',
        'leawood': 'Estate planning attorney SEO in Leawood. Get premium clients in KC metro. Legal marketing expert. Free audit.',
        'dodge-city': 'Estate planning SEO in Dodge City, Kansas. Attract quality clients in western KS. Legal marketing specialist. Free quote.',
        'garden-city': 'Estate planning attorney SEO in Garden City. Generate quality leads in southwest Kansas. Free consultation.',
        'leavenworth': 'Estate planning SEO in Leavenworth, Kansas. Attract high-value clients and dominate local search. Free audit.',
      },

      // MEDICAL SERVICES (75 pages = 15 cities × 5 industries)
      'dental-clinics': {
        'wichita': 'Dental SEO in Wichita, Kansas. Fill your schedule and attract new patients. Dentist marketing specialist. Free consultation.',
        'overland-park': 'Dental practice SEO in Overland Park. Get more patients in KC metro. Proven dental marketing. Free audit.',
        'kansas-city': 'Dentist SEO in Kansas City. Fill your schedule and dominate local search. Dental marketing expert. Free consultation.',
        'topeka': 'Dental practice SEO in Topeka, Kansas. Attract new patients in capital city. Dental marketing specialist. Free quote.',
        'olathe': 'Dentist SEO in Olathe. Fill your schedule in Johnson County. Proven dental marketing strategies. Free audit.',
        'lawrence': 'Dental practice SEO in Lawrence, Kansas. Get more patients and dominate local search. Free consultation.',
        'shawnee': 'Dentist SEO in Shawnee. Attract new patients in KC metro. Dental marketing specialist. Free audit.',
        'manhattan': 'Dental practice SEO in Manhattan, Kansas. Fill schedule near K-State. Dental marketing expert. Free quote.',
        'lenexa': 'Dentist SEO in Lenexa. Get more patients in KC metro. Proven dental marketing strategies. Free consultation.',
        'salina': 'Dental practice SEO in Salina, Kansas. Attract new patients in central KS. Dental marketing specialist. Free audit.',
        'hutchinson': 'Dentist SEO in Hutchinson. Fill your schedule and dominate local search. Dental marketing expert. Free quote.',
        'leawood': 'Dental practice SEO in Leawood. Attract quality patients in premium KC market. Dental marketing expert. Free audit.',
        'dodge-city': 'Dentist SEO in Dodge City, Kansas. Get more patients in western KS. Dental marketing specialist. Free quote.',
        'garden-city': 'Dental practice SEO in Garden City. Fill your schedule in southwest Kansas. Dental marketing expert. Free consultation.',
        'leavenworth': 'Dentist SEO in Leavenworth, Kansas. Attract new patients and dominate local search. Free audit.',
      },
      'cosmetic-surgery': {
        'wichita': 'Cosmetic surgery SEO in Wichita, Kansas. Attract quality patients and grow your practice. Medical marketing expert. Free audit.',
        'overland-park': 'Cosmetic surgeon SEO in Overland Park. Get quality patients in KC metro. Medical marketing specialist. Free quote.',
        'kansas-city': 'Cosmetic surgery SEO in Kansas City. Attract high-value patients and dominate local search. Free consultation.',
        'topeka': 'Cosmetic surgeon SEO in Topeka, Kansas. Grow your practice in capital city. Medical marketing expert. Free audit.',
        'olathe': 'Cosmetic surgery SEO in Olathe. Attract quality patients in Johnson County. Proven medical marketing. Free quote.',
        'lawrence': 'Cosmetic surgeon SEO in Lawrence, Kansas. Get quality patients and dominate local search. Free consultation.',
        'shawnee': 'Cosmetic surgery SEO in Shawnee. Attract high-value patients in KC metro. Medical marketing specialist. Free audit.',
        'manhattan': 'Cosmetic surgeon SEO in Manhattan, Kansas. Grow practice near K-State. Medical marketing expert. Free quote.',
        'lenexa': 'Cosmetic surgery SEO in Lenexa. Get quality patients in KC metro. Proven medical marketing strategies. Free audit.',
        'salina': 'Cosmetic surgeon SEO in Salina, Kansas. Attract quality patients in central KS. Medical marketing specialist. Free quote.',
        'hutchinson': 'Cosmetic surgery SEO in Hutchinson. Grow your practice and dominate local search. Free consultation.',
        'leawood': 'Cosmetic surgeon SEO in Leawood. Attract premium patients in KC metro. Medical marketing expert. Free audit.',
        'dodge-city': 'Cosmetic surgery SEO in Dodge City, Kansas. Get quality patients in western KS. Medical marketing specialist. Free quote.',
        'garden-city': 'Cosmetic surgeon SEO in Garden City. Attract quality patients in southwest Kansas. Free consultation.',
        'leavenworth': 'Cosmetic surgery SEO in Leavenworth, Kansas. Grow your practice and dominate local search. Free audit.',
      },
      'chiropractic-care': {
        'wichita': 'Chiropractic SEO in Wichita, Kansas. Attract new patients and dominate local search. Healthcare marketing expert. Free quote.',
        'overland-park': 'Chiropractor SEO in Overland Park. Fill your schedule in KC metro. Healthcare marketing specialist. Free audit.',
        'kansas-city': 'Chiropractic SEO in Kansas City. Attract new patients and dominate local search. Healthcare marketing expert. Free quote.',
        'topeka': 'Chiropractor SEO in Topeka, Kansas. Fill schedule in capital city. Healthcare marketing specialist. Free consultation.',
        'olathe': 'Chiropractic SEO in Olathe. Get more patients in Johnson County. Proven healthcare marketing. Free audit.',
        'lawrence': 'Chiropractor SEO in Lawrence, Kansas. Attract new patients and dominate local search. Free quote.',
        'shawnee': 'Chiropractic SEO in Shawnee. Fill your schedule in KC metro. Healthcare marketing specialist. Free audit.',
        'manhattan': 'Chiropractor SEO in Manhattan, Kansas. Get more patients near K-State. Healthcare marketing expert. Free quote.',
        'lenexa': 'Chiropractic SEO in Lenexa. Attract new patients in KC metro. Proven healthcare marketing. Free consultation.',
        'salina': 'Chiropractor SEO in Salina, Kansas. Fill your schedule in central KS. Healthcare marketing specialist. Free audit.',
        'hutchinson': 'Chiropractic SEO in Hutchinson. Attract new patients and dominate local search. Free quote.',
        'leawood': 'Chiropractor SEO in Leawood. Get quality patients in premium KC market. Healthcare marketing expert. Free audit.',
        'dodge-city': 'Chiropractic SEO in Dodge City, Kansas. Fill schedule in western KS. Healthcare marketing specialist. Free quote.',
        'garden-city': 'Chiropractor SEO in Garden City. Attract new patients in southwest Kansas. Free consultation.',
        'leavenworth': 'Chiropractic SEO in Leavenworth, Kansas. Fill your schedule and dominate local search. Free audit.',
      },
      'med-spa': {
        'wichita': 'Med spa SEO in Wichita, Kansas. Attract quality clients and fill your schedule. Medical aesthetics expert. Free consultation.',
        'overland-park': 'Med spa marketing in Overland Park. Book appointments in KC metro. Medical aesthetics specialist. Free audit.',
        'kansas-city': 'Med spa SEO in Kansas City. Attract quality clients and dominate local search. Medical aesthetics expert. Free quote.',
        'topeka': 'Med spa marketing in Topeka, Kansas. Fill schedule in capital city. Medical aesthetics specialist. Free consultation.',
        'olathe': 'Med spa SEO in Olathe. Book appointments in Johnson County. Proven medical aesthetics marketing. Free audit.',
        'lawrence': 'Med spa marketing in Lawrence, Kansas. Attract quality clients and dominate local search. Free quote.',
        'shawnee': 'Med spa SEO in Shawnee. Fill your schedule in KC metro. Medical aesthetics specialist. Free consultation.',
        'manhattan': 'Med spa marketing in Manhattan, Kansas. Book appointments near K-State. Medical aesthetics expert. Free audit.',
        'lenexa': 'Med spa SEO in Lenexa. Attract quality clients in KC metro. Proven medical aesthetics marketing. Free quote.',
        'salina': 'Med spa marketing in Salina, Kansas. Fill schedule in central KS. Medical aesthetics specialist. Free consultation.',
        'hutchinson': 'Med spa SEO in Hutchinson. Attract quality clients and dominate local search. Free audit.',
        'leawood': 'Med spa marketing in Leawood. Book premium appointments in KC metro. Medical aesthetics expert. Free quote.',
        'dodge-city': 'Med spa SEO in Dodge City, Kansas. Fill schedule in western KS. Medical aesthetics specialist. Free consultation.',
        'garden-city': 'Med spa marketing in Garden City. Attract quality clients in southwest Kansas. Free audit.',
        'leavenworth': 'Med spa SEO in Leavenworth, Kansas. Fill your schedule and dominate local search. Free quote.',
      },
      'veterinary-services': {
        'wichita': 'Veterinary SEO in Wichita, Kansas. Attract pet owners and grow your practice. Animal hospital marketing expert. Free audit.',
        'overland-park': 'Veterinarian SEO in Overland Park. Get more patients in KC metro. Animal hospital marketing specialist. Free quote.',
        'kansas-city': 'Veterinary SEO in Kansas City. Attract pet owners and dominate local search. Animal hospital marketing expert. Free audit.',
        'topeka': 'Veterinarian SEO in Topeka, Kansas. Grow practice in capital city. Animal hospital marketing specialist. Free quote.',
        'olathe': 'Veterinary SEO in Olathe. Get more patients in Johnson County. Proven animal hospital marketing. Free audit.',
        'lawrence': 'Veterinarian SEO in Lawrence, Kansas. Attract pet owners and dominate local search. Free consultation.',
        'shawnee': 'Veterinary SEO in Shawnee. Grow your practice in KC metro. Animal hospital marketing specialist. Free audit.',
        'manhattan': 'Veterinarian SEO in Manhattan, Kansas. Get more patients near K-State. Animal hospital marketing expert. Free quote.',
        'lenexa': 'Veterinary SEO in Lenexa. Attract pet owners in KC metro. Proven animal hospital marketing. Free consultation.',
        'salina': 'Veterinarian SEO in Salina, Kansas. Grow practice in central KS. Animal hospital marketing specialist. Free audit.',
        'hutchinson': 'Veterinary SEO in Hutchinson. Attract pet owners and dominate local search. Free quote.',
        'leawood': 'Veterinarian SEO in Leawood. Get quality patients in premium KC market. Animal hospital marketing expert. Free audit.',
        'dodge-city': 'Veterinary SEO in Dodge City, Kansas. Grow practice in western KS. Animal hospital marketing specialist. Free quote.',
        'garden-city': 'Veterinarian SEO in Garden City. Attract pet owners in southwest Kansas. Free consultation.',
        'leavenworth': 'Veterinary SEO in Leavenworth, Kansas. Grow your practice and dominate local search. Free audit.',
      },

      // HOME SERVICES (90 pages = 15 cities × 6 industries)
      'hvac-services': {
        'wichita': 'HVAC SEO in Wichita, Kansas. Get more service calls and dominate local search. Home services marketing expert. Free quote.',
        'overland-park': 'HVAC company SEO in Overland Park. More calls in KC metro. Home services marketing specialist. Free audit.',
        'kansas-city': 'HVAC SEO in Kansas City. Get more service calls and dominate local search. Home services marketing expert. Free quote.',
        'topeka': 'HVAC company SEO in Topeka, Kansas. More calls in capital city. Home services marketing specialist. Free audit.',
        'olathe': 'HVAC SEO in Olathe. Get service calls in Johnson County. Proven home services marketing. Free quote.',
        'lawrence': 'HVAC company SEO in Lawrence, Kansas. More calls and dominate local search. Free consultation.',
        'shawnee': 'HVAC SEO in Shawnee. Get more service calls in KC metro. Home services marketing specialist. Free audit.',
        'manhattan': 'HVAC company SEO in Manhattan, Kansas. More calls near K-State. Home services marketing expert. Free quote.',
        'lenexa': 'HVAC SEO in Lenexa. Get service calls in KC metro. Proven home services marketing. Free consultation.',
        'salina': 'HVAC company SEO in Salina, Kansas. More calls in central KS. Home services marketing specialist. Free audit.',
        'hutchinson': 'HVAC SEO in Hutchinson. Get more service calls and dominate local search. Free quote.',
        'leawood': 'HVAC company SEO in Leawood. Premium calls in KC metro. Home services marketing expert. Free audit.',
        'dodge-city': 'HVAC SEO in Dodge City, Kansas. Get service calls in western KS. Home services marketing specialist. Free quote.',
        'garden-city': 'HVAC company SEO in Garden City. More calls in southwest Kansas. Free consultation.',
        'leavenworth': 'HVAC SEO in Leavenworth, Kansas. Get more service calls and dominate local search. Free audit.',
      },
      'roofing-companies': {
        'wichita': 'Roofing SEO in Wichita, Kansas. Get more leads and dominate local search. Contractor marketing specialist. Free consultation.',
        'overland-park': 'Roofing company SEO in Overland Park. Book jobs in KC metro. Contractor marketing expert. Free audit.',
        'kansas-city': 'Roofing SEO in Kansas City. Get more leads and dominate local search. Contractor marketing specialist. Free quote.',
        'topeka': 'Roofing company SEO in Topeka, Kansas. Book jobs in capital city. Contractor marketing expert. Free consultation.',
        'olathe': 'Roofing SEO in Olathe. Get quality leads in Johnson County. Proven contractor marketing. Free audit.',
        'lawrence': 'Roofing company SEO in Lawrence, Kansas. Book jobs and dominate local search. Free quote.',
        'shawnee': 'Roofing SEO in Shawnee. Get more leads in KC metro. Contractor marketing specialist. Free consultation.',
        'manhattan': 'Roofing company SEO in Manhattan, Kansas. Book jobs near K-State. Contractor marketing expert. Free audit.',
        'lenexa': 'Roofing SEO in Lenexa. Get quality leads in KC metro. Proven contractor marketing. Free quote.',
        'salina': 'Roofing company SEO in Salina, Kansas. Book jobs in central KS. Contractor marketing specialist. Free consultation.',
        'hutchinson': 'Roofing SEO in Hutchinson. Get more leads and dominate local search. Free audit.',
        'leawood': 'Roofing company SEO in Leawood. Premium jobs in KC metro. Contractor marketing expert. Free quote.',
        'dodge-city': 'Roofing SEO in Dodge City, Kansas. Book jobs in western KS. Contractor marketing specialist. Free consultation.',
        'garden-city': 'Roofing company SEO in Garden City. Get quality leads in southwest Kansas. Free audit.',
        'leavenworth': 'Roofing SEO in Leavenworth, Kansas. Book more jobs and dominate local search. Free quote.',
      },
      'plumbing-services': {
        'wichita': 'Plumbing SEO in Wichita, Kansas. Get emergency and service calls. Dominate local search. Home services expert. Free audit.',
        'overland-park': 'Plumber SEO in Overland Park. More calls in KC metro. Home services marketing specialist. Free quote.',
        'kansas-city': 'Plumbing SEO in Kansas City. Get emergency and service calls. Dominate local search. Home services expert. Free audit.',
        'topeka': 'Plumber SEO in Topeka, Kansas. More calls in capital city. Home services marketing specialist. Free consultation.',
        'olathe': 'Plumbing SEO in Olathe. Get service calls in Johnson County. Proven home services marketing. Free audit.',
        'lawrence': 'Plumber SEO in Lawrence, Kansas. More calls and dominate local search. Free quote.',
        'shawnee': 'Plumbing SEO in Shawnee. Get emergency and service calls in KC metro. Home services marketing specialist. Free audit.',
        'manhattan': 'Plumber SEO in Manhattan, Kansas. More calls near K-State. Home services marketing expert. Free quote.',
        'lenexa': 'Plumbing SEO in Lenexa. Get service calls in KC metro. Proven home services marketing. Free consultation.',
        'salina': 'Plumber SEO in Salina, Kansas. More calls in central KS. Home services marketing specialist. Free audit.',
        'hutchinson': 'Plumbing SEO in Hutchinson. Get emergency and service calls. Dominate local search. Free quote.',
        'leawood': 'Plumber SEO in Leawood. Premium calls in KC metro. Home services marketing expert. Free audit.',
        'dodge-city': 'Plumbing SEO in Dodge City, Kansas. Get service calls in western KS. Home services marketing specialist. Free quote.',
        'garden-city': 'Plumber SEO in Garden City. More calls in southwest Kansas. Free consultation.',
        'leavenworth': 'Plumbing SEO in Leavenworth, Kansas. Get emergency and service calls. Dominate local search. Free audit.',
      },
      'electrical-contractors': {
        'wichita': 'Electrician SEO in Wichita, Kansas. Get more calls and dominate local search. Contractor marketing expert. Free quote.',
        'overland-park': 'Electrical contractor SEO in Overland Park. Book jobs in KC metro. Contractor marketing specialist. Free audit.',
        'kansas-city': 'Electrician SEO in Kansas City. Get more calls and dominate local search. Contractor marketing expert. Free quote.',
        'topeka': 'Electrical contractor SEO in Topeka, Kansas. Book jobs in capital city. Contractor marketing specialist. Free audit.',
        'olathe': 'Electrician SEO in Olathe. Get more calls in Johnson County. Proven contractor marketing. Free quote.',
        'lawrence': 'Electrical contractor SEO in Lawrence, Kansas. Book jobs and dominate local search. Free consultation.',
        'shawnee': 'Electrician SEO in Shawnee. Get more calls in KC metro. Contractor marketing expert. Free audit.',
        'manhattan': 'Electrical contractor SEO in Manhattan, Kansas. Book jobs near K-State. Contractor marketing specialist. Free quote.',
        'lenexa': 'Electrician SEO in Lenexa. Get more calls in KC metro. Proven contractor marketing. Free consultation.',
        'salina': 'Electrical contractor SEO in Salina, Kansas. Book jobs in central KS. Contractor marketing expert. Free audit.',
        'hutchinson': 'Electrician SEO in Hutchinson. Get more calls and dominate local search. Free quote.',
        'leawood': 'Electrical contractor SEO in Leawood. Premium jobs in KC metro. Contractor marketing specialist. Free audit.',
        'dodge-city': 'Electrician SEO in Dodge City, Kansas. Book jobs in western KS. Contractor marketing expert. Free quote.',
        'garden-city': 'Electrical contractor SEO in Garden City. Get more calls in southwest Kansas. Free consultation.',
        'leavenworth': 'Electrician SEO in Leavenworth, Kansas. Book more jobs and dominate local search. Free audit.',
      },
      'home-remodeling': {
        'wichita': 'Remodeling contractor SEO in Wichita, Kansas. Get quality leads and dominate local search. Home improvement expert. Free audit.',
        'overland-park': 'Home remodeling SEO in Overland Park. More projects in KC metro. Home improvement marketing specialist. Free quote.',
        'kansas-city': 'Remodeling contractor SEO in Kansas City. Get quality leads and dominate local search. Home improvement expert. Free audit.',
        'topeka': 'Home remodeling SEO in Topeka, Kansas. More projects in capital city. Home improvement marketing specialist. Free quote.',
        'olathe': 'Remodeling contractor SEO in Olathe. Quality leads in Johnson County. Proven home improvement marketing. Free audit.',
        'lawrence': 'Home remodeling SEO in Lawrence, Kansas. More projects and dominate local search. Free consultation.',
        'shawnee': 'Remodeling contractor SEO in Shawnee. Get quality leads in KC metro. Home improvement marketing specialist. Free audit.',
        'manhattan': 'Home remodeling SEO in Manhattan, Kansas. More projects near K-State. Home improvement marketing expert. Free quote.',
        'lenexa': 'Remodeling contractor SEO in Lenexa. Quality leads in KC metro. Proven home improvement marketing. Free consultation.',
        'salina': 'Home remodeling SEO in Salina, Kansas. More projects in central KS. Home improvement marketing specialist. Free audit.',
        'hutchinson': 'Remodeling contractor SEO in Hutchinson. Get quality leads and dominate local search. Free quote.',
        'leawood': 'Home remodeling SEO in Leawood. Premium projects in KC metro. Home improvement marketing expert. Free audit.',
        'dodge-city': 'Remodeling contractor SEO in Dodge City, Kansas. More projects in western KS. Home improvement marketing specialist. Free quote.',
        'garden-city': 'Home remodeling SEO in Garden City. Get quality leads in southwest Kansas. Free consultation.',
        'leavenworth': 'Remodeling contractor SEO in Leavenworth, Kansas. More projects and dominate local search. Free audit.',
      },
      'landscaping-design': {
        'wichita': 'Landscaping SEO in Wichita, Kansas. Get seasonal work and dominate local search. Green industry expert. Free quote.',
        'overland-park': 'Landscaping company SEO in Overland Park. Book jobs in KC metro. Green industry marketing specialist. Free audit.',
        'kansas-city': 'Landscaping SEO in Kansas City. Get seasonal work and dominate local search. Green industry expert. Free quote.',
        'topeka': 'Landscaping company SEO in Topeka, Kansas. Book jobs in capital city. Green industry marketing specialist. Free audit.',
        'olathe': 'Landscaping SEO in Olathe. Get seasonal work in Johnson County. Proven green industry marketing. Free quote.',
        'lawrence': 'Landscaping company SEO in Lawrence, Kansas. Book jobs and dominate local search. Free consultation.',
        'shawnee': 'Landscaping SEO in Shawnee. Get seasonal work in KC metro. Green industry marketing specialist. Free audit.',
        'manhattan': 'Landscaping company SEO in Manhattan, Kansas. Book jobs near K-State. Green industry marketing expert. Free quote.',
        'lenexa': 'Landscaping SEO in Lenexa. Get seasonal work in KC metro. Proven green industry marketing. Free consultation.',
        'salina': 'Landscaping company SEO in Salina, Kansas. Book jobs in central KS. Green industry marketing specialist. Free audit.',
        'hutchinson': 'Landscaping SEO in Hutchinson. Get seasonal work and dominate local search. Free quote.',
        'leawood': 'Landscaping company SEO in Leawood. Premium jobs in KC metro. Green industry marketing expert. Free audit.',
        'dodge-city': 'Landscaping SEO in Dodge City, Kansas. Book jobs in western KS. Green industry marketing specialist. Free quote.',
        'garden-city': 'Landscaping company SEO in Garden City. Get seasonal work in southwest Kansas. Free consultation.',
        'leavenworth': 'Landscaping SEO in Leavenworth, Kansas. Book more jobs and dominate local search. Free audit.',
      },

      // PROFESSIONAL SERVICES (60 pages = 15 cities × 4 industries)
      'real-estate': {
        'wichita': 'Realtor SEO in Wichita, Kansas. Get more listings and buyer leads. Dominate local search. Real estate marketing expert. Free audit.',
        'overland-park': 'Real estate agent SEO in Overland Park. More listings in KC metro. Real estate marketing specialist. Free quote.',
        'kansas-city': 'Realtor SEO in Kansas City. Get more listings and buyer leads. Dominate local search. Real estate marketing expert. Free audit.',
        'topeka': 'Real estate agent SEO in Topeka, Kansas. More listings in capital city. Real estate marketing specialist. Free quote.',
        'olathe': 'Realtor SEO in Olathe. Get listings and buyers in Johnson County. Proven real estate marketing. Free audit.',
        'lawrence': 'Real estate agent SEO in Lawrence, Kansas. More listings and dominate local search. Free consultation.',
        'shawnee': 'Realtor SEO in Shawnee. Get more listings in KC metro. Real estate marketing specialist. Free audit.',
        'manhattan': 'Real estate agent SEO in Manhattan, Kansas. More listings near K-State. Real estate marketing expert. Free quote.',
        'lenexa': 'Realtor SEO in Lenexa. Get listings and buyers in KC metro. Proven real estate marketing. Free consultation.',
        'salina': 'Real estate agent SEO in Salina, Kansas. More listings in central KS. Real estate marketing specialist. Free audit.',
        'hutchinson': 'Realtor SEO in Hutchinson. Get more listings and dominate local search. Free quote.',
        'leawood': 'Real estate agent SEO in Leawood. Premium listings in KC metro. Real estate marketing expert. Free audit.',
        'dodge-city': 'Realtor SEO in Dodge City, Kansas. Get listings in western KS. Real estate marketing specialist. Free quote.',
        'garden-city': 'Real estate agent SEO in Garden City. More listings in southwest Kansas. Free consultation.',
        'leavenworth': 'Realtor SEO in Leavenworth, Kansas. Get more listings and dominate local search. Free audit.',
      },
      'financial-planning': {
        'wichita': 'Financial planner SEO in Wichita, Kansas. Attract high-value clients and dominate local search. Wealth management expert. Free quote.',
        'overland-park': 'Financial advisor SEO in Overland Park. Quality leads in KC metro. Wealth management marketing specialist. Free audit.',
        'kansas-city': 'Financial planner SEO in Kansas City. Attract high-value clients and dominate local search. Wealth management expert. Free quote.',
        'topeka': 'Financial advisor SEO in Topeka, Kansas. Quality leads in capital city. Wealth management marketing specialist. Free audit.',
        'olathe': 'Financial planner SEO in Olathe. Attract high-value clients in Johnson County. Proven wealth management marketing. Free quote.',
        'lawrence': 'Financial advisor SEO in Lawrence, Kansas. Quality leads and dominate local search. Free consultation.',
        'shawnee': 'Financial planner SEO in Shawnee. Attract high-value clients in KC metro. Wealth management marketing specialist. Free audit.',
        'manhattan': 'Financial advisor SEO in Manhattan, Kansas. Quality leads near K-State. Wealth management marketing expert. Free quote.',
        'lenexa': 'Financial planner SEO in Lenexa. Attract high-value clients in KC metro. Proven wealth management marketing. Free consultation.',
        'salina': 'Financial advisor SEO in Salina, Kansas. Quality leads in central KS. Wealth management marketing specialist. Free audit.',
        'hutchinson': 'Financial planner SEO in Hutchinson. Attract high-value clients and dominate local search. Free quote.',
        'leawood': 'Financial advisor SEO in Leawood. Premium clients in KC metro. Wealth management marketing expert. Free audit.',
        'dodge-city': 'Financial planner SEO in Dodge City, Kansas. Quality leads in western KS. Wealth management marketing specialist. Free quote.',
        'garden-city': 'Financial advisor SEO in Garden City. Attract high-value clients in southwest Kansas. Free consultation.',
        'leavenworth': 'Financial planner SEO in Leavenworth, Kansas. Quality leads and dominate local search. Free audit.',
      },
      'insurance-agencies': {
        'wichita': 'Insurance agent SEO in Wichita, Kansas. Get quality leads and dominate local search. Insurance marketing expert. Free consultation.',
        'overland-park': 'Insurance agency SEO in Overland Park. More clients in KC metro. Insurance marketing specialist. Free audit.',
        'kansas-city': 'Insurance agent SEO in Kansas City. Get quality leads and dominate local search. Insurance marketing expert. Free quote.',
        'topeka': 'Insurance agency SEO in Topeka, Kansas. More clients in capital city. Insurance marketing specialist. Free consultation.',
        'olathe': 'Insurance agent SEO in Olathe. Quality leads in Johnson County. Proven insurance marketing. Free audit.',
        'lawrence': 'Insurance agency SEO in Lawrence, Kansas. More clients and dominate local search. Free quote.',
        'shawnee': 'Insurance agent SEO in Shawnee. Get quality leads in KC metro. Insurance marketing specialist. Free consultation.',
        'manhattan': 'Insurance agency SEO in Manhattan, Kansas. More clients near K-State. Insurance marketing expert. Free audit.',
        'lenexa': 'Insurance agent SEO in Lenexa. Quality leads in KC metro. Proven insurance marketing. Free quote.',
        'salina': 'Insurance agency SEO in Salina, Kansas. More clients in central KS. Insurance marketing specialist. Free consultation.',
        'hutchinson': 'Insurance agent SEO in Hutchinson. Get quality leads and dominate local search. Free audit.',
        'leawood': 'Insurance agency SEO in Leawood. Premium clients in KC metro. Insurance marketing expert. Free quote.',
        'dodge-city': 'Insurance agent SEO in Dodge City, Kansas. More clients in western KS. Insurance marketing specialist. Free consultation.',
        'garden-city': 'Insurance agency SEO in Garden City. Get quality leads in southwest Kansas. Free audit.',
        'leavenworth': 'Insurance agent SEO in Leavenworth, Kansas. More clients and dominate local search. Free quote.',
      },
      'accounting-cpa': {
        'wichita': 'CPA firm SEO in Wichita, Kansas. Attract quality clients and dominate local search. CPA marketing specialist. Free audit.',
        'overland-park': 'Accounting firm SEO in Overland Park. Quality clients in KC metro. CPA marketing expert. Free quote.',
        'kansas-city': 'CPA firm SEO in Kansas City. Attract quality clients and dominate local search. CPA marketing specialist. Free audit.',
        'topeka': 'Accounting firm SEO in Topeka, Kansas. Quality clients in capital city. CPA marketing expert. Free consultation.',
        'olathe': 'CPA firm SEO in Olathe. Attract quality clients in Johnson County. Proven CPA marketing. Free audit.',
        'lawrence': 'Accounting firm SEO in Lawrence, Kansas. Quality clients and dominate local search. Free quote.',
        'shawnee': 'CPA firm SEO in Shawnee. Attract quality clients in KC metro. CPA marketing specialist. Free audit.',
        'manhattan': 'Accounting firm SEO in Manhattan, Kansas. Quality clients near K-State. CPA marketing expert. Free quote.',
        'lenexa': 'CPA firm SEO in Lenexa. Attract quality clients in KC metro. Proven CPA marketing. Free consultation.',
        'salina': 'Accounting firm SEO in Salina, Kansas. Quality clients in central KS. CPA marketing specialist. Free audit.',
        'hutchinson': 'CPA firm SEO in Hutchinson. Attract quality clients and dominate local search. Free quote.',
        'leawood': 'Accounting firm SEO in Leawood. Premium clients in KC metro. CPA marketing expert. Free audit.',
        'dodge-city': 'CPA firm SEO in Dodge City, Kansas. Quality clients in western KS. CPA marketing specialist. Free quote.',
        'garden-city': 'Accounting firm SEO in Garden City. Attract quality clients in southwest Kansas. Free consultation.',
        'leavenworth': 'CPA firm SEO in Leavenworth, Kansas. Quality clients and dominate local search. Free audit.',
      },

      // B2B SERVICES (45 pages = 15 cities × 3 industries)
      'manufacturing-marketing': {
        'wichita': 'Manufacturing SEO in Wichita, Kansas. Generate B2B leads and dominate industry search. Industrial marketing expert. Free quote.',
        'overland-park': 'Manufacturing marketing in Overland Park. B2B leads in KC metro. Industrial marketing specialist. Free audit.',
        'kansas-city': 'Manufacturing SEO in Kansas City. Generate B2B leads and dominate industry search. Industrial marketing expert. Free quote.',
        'topeka': 'Manufacturing marketing in Topeka, Kansas. B2B leads in capital city. Industrial marketing specialist. Free audit.',
        'olathe': 'Manufacturing SEO in Olathe. Generate B2B leads in Johnson County. Proven industrial marketing. Free quote.',
        'lawrence': 'Manufacturing marketing in Lawrence, Kansas. B2B leads and dominate industry search. Free consultation.',
        'shawnee': 'Manufacturing SEO in Shawnee. Generate B2B leads in KC metro. Industrial marketing specialist. Free audit.',
        'manhattan': 'Manufacturing marketing in Manhattan, Kansas. B2B leads near K-State. Industrial marketing expert. Free quote.',
        'lenexa': 'Manufacturing SEO in Lenexa. Generate B2B leads in KC metro. Proven industrial marketing. Free consultation.',
        'salina': 'Manufacturing marketing in Salina, Kansas. B2B leads in central KS. Industrial marketing specialist. Free audit.',
        'hutchinson': 'Manufacturing SEO in Hutchinson. Generate B2B leads and dominate industry search. Free quote.',
        'leawood': 'Manufacturing marketing in Leawood. Premium B2B leads in KC metro. Industrial marketing expert. Free audit.',
        'dodge-city': 'Manufacturing SEO in Dodge City, Kansas. B2B leads in western KS. Industrial marketing specialist. Free quote.',
        'garden-city': 'Manufacturing marketing in Garden City. Generate B2B leads in southwest Kansas. Free consultation.',
        'leavenworth': 'Manufacturing SEO in Leavenworth, Kansas. B2B leads and dominate industry search. Free audit.',
      },
      'animal-health-marketing': {
        'wichita': 'Animal health SEO in Wichita, Kansas. Generate veterinary B2B leads. Dominate industry search. Agribusiness expert. Free audit.',
        'overland-park': 'Animal health marketing in Overland Park. Veterinary B2B leads in KC metro. Agribusiness specialist. Free quote.',
        'kansas-city': 'Animal health SEO in Kansas City. Generate veterinary B2B leads. Dominate industry search. Agribusiness expert. Free audit.',
        'topeka': 'Animal health marketing in Topeka, Kansas. Veterinary B2B leads in capital city. Agribusiness specialist. Free quote.',
        'olathe': 'Animal health SEO in Olathe. Generate veterinary B2B leads in Johnson County. Proven agribusiness marketing. Free audit.',
        'lawrence': 'Animal health marketing in Lawrence, Kansas. Veterinary B2B leads and dominate industry search. Free consultation.',
        'shawnee': 'Animal health SEO in Shawnee. Generate veterinary B2B leads in KC metro. Agribusiness specialist. Free audit.',
        'manhattan': 'Animal health marketing in Manhattan, Kansas. Veterinary B2B leads near K-State. Agribusiness expert. Free quote.',
        'lenexa': 'Animal health SEO in Lenexa. Generate veterinary B2B leads in KC metro. Proven agribusiness marketing. Free consultation.',
        'salina': 'Animal health marketing in Salina, Kansas. Veterinary B2B leads in central KS. Agribusiness specialist. Free audit.',
        'hutchinson': 'Animal health SEO in Hutchinson. Generate veterinary B2B leads. Dominate industry search. Free quote.',
        'leawood': 'Animal health marketing in Leawood. Premium veterinary B2B leads in KC metro. Agribusiness expert. Free audit.',
        'dodge-city': 'Animal health SEO in Dodge City, Kansas. Veterinary B2B leads in western KS. Agribusiness specialist. Free quote.',
        'garden-city': 'Animal health marketing in Garden City. Generate veterinary B2B leads in southwest Kansas. Free consultation.',
        'leavenworth': 'Animal health SEO in Leavenworth, Kansas. Veterinary B2B leads and dominate industry search. Free audit.',
      },
      'construction-marketing': {
        'wichita': 'Construction SEO in Wichita, Kansas. Win commercial contracts and dominate local search. B2B contractor expert. Free quote.',
        'overland-park': 'Construction marketing in Overland Park. Win contracts in KC metro. B2B contractor specialist. Free audit.',
        'kansas-city': 'Construction SEO in Kansas City. Win commercial contracts and dominate local search. B2B contractor expert. Free quote.',
        'topeka': 'Construction marketing in Topeka, Kansas. Win contracts in capital city. B2B contractor specialist. Free audit.',
        'olathe': 'Construction SEO in Olathe. Win commercial contracts in Johnson County. Proven B2B contractor marketing. Free quote.',
        'lawrence': 'Construction marketing in Lawrence, Kansas. Win contracts and dominate local search. Free consultation.',
        'shawnee': 'Construction SEO in Shawnee. Win commercial contracts in KC metro. B2B contractor specialist. Free audit.',
        'manhattan': 'Construction marketing in Manhattan, Kansas. Win contracts near K-State. B2B contractor expert. Free quote.',
        'lenexa': 'Construction SEO in Lenexa. Win commercial contracts in KC metro. Proven B2B contractor marketing. Free consultation.',
        'salina': 'Construction marketing in Salina, Kansas. Win contracts in central KS. B2B contractor specialist. Free audit.',
        'hutchinson': 'Construction SEO in Hutchinson. Win commercial contracts and dominate local search. Free quote.',
        'leawood': 'Construction marketing in Leawood. Win premium contracts in KC metro. B2B contractor expert. Free audit.',
        'dodge-city': 'Construction SEO in Dodge City, Kansas. Win contracts in western KS. B2B contractor specialist. Free quote.',
        'garden-city': 'Construction marketing in Garden City. Win commercial contracts in southwest Kansas. Free consultation.',
        'leavenworth': 'Construction SEO in Leavenworth, Kansas. Win contracts and dominate local search. Free audit.',
      },
    };

    // Get custom description or use generic fallback
    const industrySlug = industry.slug;
    const citySlug = city.slug;
    description = industryDescriptions[industrySlug]?.[citySlug] ||
                  `${industry.name} SEO in ${city.name}, Kansas. Dominate local search and grow your business. Free consultation.`;

    // Industry title templates - lookup object for all 22 industries
    const industryTitles: { [key: string]: string } = {
      // Legal Services (4)
      'personal-injury-law': `Personal Injury Lawyer SEO ${city.name}, KS | Nexolance`,
      'criminal-defense': `Criminal Defense Lawyer SEO ${city.name}, KS | Nexolance`,
      'family-law': `Family Law Attorney SEO ${city.name}, KS | Nexolance`,
      'estate-planning': `Estate Planning Attorney SEO ${city.name}, KS | Nexolance`,

      // Medical Services (5)
      'dental-clinics': `Dental Practice SEO ${city.name}, KS | Nexolance | More Patients`,
      'cosmetic-surgery': `Cosmetic Surgery SEO ${city.name}, KS | Nexolance | More Patients`,
      'chiropractic-care': `Chiropractor SEO ${city.name}, KS | Nexolance | Fill Schedule`,
      'med-spa': `Med Spa SEO ${city.name}, KS | Nexolance | Book Appointments`,
      'veterinary-services': `Veterinarian SEO ${city.name}, KS | Nexolance | More Patients`,

      // Home Services (6)
      'hvac-services': `HVAC Company SEO ${city.name}, KS | Nexolance | More Service Calls`,
      'roofing-companies': `Roofing Company SEO ${city.name}, KS | Nexolance | Book Jobs`,
      'plumbing-services': `Plumber SEO ${city.name}, KS | Nexolance | More Service Calls`,
      'electrical-contractors': `Electrician SEO ${city.name}, KS | Nexolance | Book More Jobs`,
      'home-remodeling': `Home Remodeling SEO ${city.name}, KS | Nexolance | More Projects`,
      'landscaping-design': `Landscaping SEO ${city.name}, KS | Nexolance | Book More Jobs`,

      // Professional Services (4)
      'real-estate': `Real Estate Agent SEO ${city.name}, KS | Nexolance | More Listings`,
      'financial-planning': `Financial Advisor SEO ${city.name}, KS | Nexolance | Quality Leads`,
      'insurance-agencies': `Insurance Agent SEO ${city.name}, KS | Nexolance | More Clients`,
      'accounting-cpa': `CPA Firm SEO ${city.name}, KS | Nexolance | Quality Clients`,

      // B2B Services (3)
      'manufacturing-marketing': `Manufacturing Marketing ${city.name}, KS | Nexolance | More Leads`,
      'animal-health-marketing': `Animal Health Marketing ${city.name}, KS | Nexolance | B2B Leads`,
      'construction-marketing': `Construction Marketing ${city.name}, KS | Nexolance | Win Contracts`,
    };

    // Get custom title or use generic fallback
    title = industryTitles[industrySlug] || `${industry.name} SEO ${city.name}, KS | Nexolance`;

  } else if (service) {
    // City + Service pages
    const benefit = getServiceBenefit(service.slug, city.slug);
    const stateAbbr = city.slug === 'kansas-city' || city.slug === 'overland-park' || city.slug === 'olathe' ||
                       city.slug === 'shawnee' || city.slug === 'lenexa' || city.slug === 'leawood' ||
                       city.slug === 'manhattan' || city.slug === 'salina' || city.slug === 'hutchinson' ||
                       city.slug === 'dodge-city' || city.slug === 'garden-city' || city.slug === 'leavenworth'
                       ? 'KS' : 'Kansas';

    if (service.slug === 'seo-services') {
      // SEO Services pages
      title = `SEO Services in ${city.name}, ${stateAbbr} | Nexolance | ${benefit}`;

      // Custom descriptions per city
      const seoDescriptions: { [key: string]: string } = {
        'wichita': 'Expert SEO in Wichita, KS. Increase rankings and traffic. Serving Wichita businesses with proven strategies. Free audit.',
        'overland-park': 'Professional SEO in Overland Park. Boost search rankings and drive traffic. Kansas City metro expert. Free consultation.',
        'kansas-city': 'Expert SEO in Kansas City. Dominate local search and attract customers. Proven results. Free audit available today.',
        'topeka': 'Professional SEO in Topeka, KS. Increase visibility and generate leads. Serving capital city businesses. Free quote.',
        'olathe': 'Expert SEO in Olathe, KS. Drive traffic and grow your business. Proven local strategies. Free consultation today.',
        'lawrence': 'Professional SEO in Lawrence, KS. Rank higher and attract customers. University town expert. Free audit available.',
        'shawnee': 'Expert SEO in Shawnee, KS. Increase rankings and generate leads. Serving Johnson County businesses. Free quote.',
        'manhattan': 'Professional SEO in Manhattan, Kansas. Boost visibility near K-State. Proven strategies for growth. Free consultation.',
        'lenexa': 'Expert SEO in Lenexa, KS. Drive traffic and grow revenue. KC metro specialist. Free audit available today.',
        'salina': 'Professional SEO in Salina, KS. Dominate central Kansas search. Proven local strategies. Free consultation available.',
        'hutchinson': 'Expert SEO in Hutchinson, Kansas. Increase visibility and attract customers. Results-driven approach. Free quote.',
        'leawood': 'Premium SEO in Leawood, KS. Drive qualified traffic and generate leads. KC metro expert. Free audit available.',
        'dodge-city': 'Professional SEO in Dodge City, Kansas. Dominate western Kansas search. Proven strategies. Free consultation.',
        'garden-city': 'Expert SEO in Garden City, Kansas. Boost rankings in southwest KS. Results-driven approach. Free quote today.',
        'leavenworth': 'Professional SEO in Leavenworth, Kansas. Drive traffic and generate leads. Local expert. Free audit available.',
      };
      description = seoDescriptions[city.slug] || `Expert SEO in ${city.name}, KS. Increase rankings and traffic. Serving ${city.name} businesses with proven strategies. Free audit.`;

    } else if (service.slug === 'landing-page-optimization') {
      // Landing Page Optimization pages
      title = `Landing Page Optimization in ${city.name}, ${stateAbbr} | Nexolance | ${benefit}`;

      const lpDescriptions: { [key: string]: string } = {
        'wichita': 'Expert landing page optimization in Wichita. Increase conversions up to 300%. Data-driven design. Free consultation.',
        'overland-park': 'Professional landing page design in Overland Park. Maximize ROI with proven strategies. KC metro expert. Free audit.',
        'kansas-city': 'Expert landing pages in Kansas City. Boost conversions and generate leads. Results-driven design. Free consultation.',
        'topeka': 'Professional landing page optimization in Topeka, KS. Increase conversions and revenue. Free audit available.',
        'olathe': 'Expert landing pages in Olathe, Kansas. Maximize ROI with data-driven design. Johnson County specialist. Free quote.',
        'lawrence': 'Professional landing page optimization in Lawrence, KS. Boost conversions for local businesses. Free consultation.',
        'shawnee': 'Expert landing pages in Shawnee, Kansas. Increase conversions and generate leads. KC metro expert. Free audit.',
        'manhattan': 'Professional landing page design in Manhattan, Kansas. Maximize ROI near K-State. Results-driven. Free quote.',
        'lenexa': 'Expert landing pages in Lenexa, KS. Boost conversions with proven strategies. KC metro specialist. Free audit.',
        'salina': 'Professional landing page optimization in Salina, KS. Increase conversions in central Kansas. Free consultation.',
        'hutchinson': 'Expert landing pages in Hutchinson, Kansas. Maximize ROI with data-driven design. Results-driven. Free quote.',
        'leawood': 'Premium landing page optimization in Leawood, KS. Boost conversions for quality businesses. Free audit available.',
        'dodge-city': 'Professional landing pages in Dodge City, Kansas. Increase conversions in western KS. Results-driven. Free quote.',
        'garden-city': 'Expert landing page optimization in Garden City, Kansas. Maximize ROI in southwest KS. Free consultation.',
        'leavenworth': 'Professional landing pages in Leavenworth, Kansas. Boost conversions and generate leads. Free audit available.',
      };
      description = lpDescriptions[city.slug] || `Expert landing page optimization in ${city.name}. Increase conversions up to 300%. Data-driven design. Free consultation.`;

    } else if (service.slug === 'ecommerce-seo') {
      // E-commerce SEO pages
      title = `E-commerce SEO in ${city.name}, ${stateAbbr} | Nexolance | ${benefit}`;

      const ecomDescriptions: { [key: string]: string } = {
        'wichita': 'Expert e-commerce SEO in Wichita, Kansas. Boost product visibility and revenue. Shopify & WooCommerce specialist. Free audit.',
        'overland-park': 'Professional e-commerce SEO in Overland Park. Drive online sales for KC metro stores. Proven strategies. Free quote.',
        'kansas-city': 'Expert e-commerce SEO in Kansas City. Increase product rankings and sales. Online store specialist. Free consultation.',
        'topeka': 'Professional e-commerce SEO in Topeka, KS. Grow your online store revenue. Proven strategies. Free audit available.',
        'olathe': 'Expert e-commerce SEO in Olathe, Kansas. Boost product visibility and drive sales. Results-driven. Free quote today.',
        'lawrence': 'Professional e-commerce SEO in Lawrence, KS. Increase online sales for local stores. Proven approach. Free consultation.',
        'shawnee': 'Expert e-commerce SEO in Shawnee, Kansas. Drive product sales and revenue. KC metro specialist. Free audit available.',
        'manhattan': 'Professional e-commerce SEO in Manhattan, Kansas. Grow online sales near K-State. Results-driven. Free quote today.',
        'lenexa': 'Expert e-commerce SEO in Lenexa, KS. Increase product rankings and sales. KC metro expert. Free consultation available.',
        'salina': 'Professional e-commerce SEO in Salina, Kansas. Boost online revenue in central KS. Proven strategies. Free audit.',
        'hutchinson': 'Expert e-commerce SEO in Hutchinson, Kansas. Drive product sales and grow revenue. Results-driven. Free quote today.',
        'leawood': 'Premium e-commerce SEO in Leawood, Kansas. Increase online sales for quality stores. KC metro expert. Free audit.',
        'dodge-city': 'Professional e-commerce SEO in Dodge City, Kansas. Grow online revenue in western KS. Proven approach. Free quote.',
        'garden-city': 'Expert e-commerce SEO in Garden City, Kansas. Boost product sales in southwest KS. Results-driven. Free consultation.',
        'leavenworth': 'Professional e-commerce SEO in Leavenworth, Kansas. Increase online sales and revenue. Proven strategies. Free audit.',
      };
      description = ecomDescriptions[city.slug] || `Expert e-commerce SEO in ${city.name}, Kansas. Boost product visibility and revenue. Shopify & WooCommerce specialist. Free audit.`;

    } else if (service.slug === 'local-seo') {
      // Local SEO pages
      title = `Local SEO in ${city.name}, ${stateAbbr} | Nexolance | ${benefit}`;

      const localDescriptions: { [key: string]: string } = {
        'wichita': 'Expert local SEO in Wichita, KS. Dominate Google maps and local search. More calls and foot traffic. Free audit today.',
        'overland-park': 'Professional local SEO in Overland Park. Rank #1 in KC metro searches. Google Business expert. Free consultation.',
        'kansas-city': 'Expert local SEO in Kansas City. Dominate local search and attract customers. Proven strategies. Free audit available.',
        'topeka': 'Professional local SEO in Topeka, KS. Dominate capital city searches. More calls and foot traffic. Free quote today.',
        'olathe': 'Expert local SEO in Olathe, Kansas. Rank #1 in Johnson County searches. Google Business specialist. Free consultation.',
        'lawrence': 'Professional local SEO in Lawrence, KS. Dominate university town searches. Proven local strategies. Free audit available.',
        'shawnee': 'Expert local SEO in Shawnee, Kansas. Dominate KC metro searches. More calls and foot traffic. Free quote today.',
        'manhattan': 'Professional local SEO in Manhattan, Kansas. Rank #1 near K-State. Google Business expert. Free consultation available.',
        'lenexa': 'Expert local SEO in Lenexa, KS. Dominate KC metro local search. Proven strategies. Free audit available today.',
        'salina': 'Professional local SEO in Salina, Kansas. Dominate central KS searches. More calls and foot traffic. Free quote.',
        'hutchinson': 'Expert local SEO in Hutchinson, Kansas. Rank #1 in local searches. Google Business specialist. Free consultation.',
        'leawood': 'Premium local SEO in Leawood, KS. Dominate upscale KC searches. Proven local strategies. Free audit available.',
        'dodge-city': 'Professional local SEO in Dodge City, Kansas. Dominate western KS searches. More calls and foot traffic. Free quote.',
        'garden-city': 'Expert local SEO in Garden City, Kansas. Rank #1 in southwest KS. Google Business expert. Free consultation available.',
        'leavenworth': 'Professional local SEO in Leavenworth, Kansas. Dominate local searches. Proven strategies. Free audit available.',
      };
      description = localDescriptions[city.slug] || `Expert local SEO in ${city.name}, KS. Dominate Google maps and local search. More calls and foot traffic. Free audit today.`;

    } else if (service.slug === 'website-design-development') {
      // Website Design & Development pages
      title = `Website Design & Development in ${city.name}, ${stateAbbr} | Nexolance`;

      const webDesignDescriptions: { [key: string]: string } = {
        'wichita': 'Professional website design in Wichita, Kansas. SEO-optimized, mobile-responsive sites. Fast loading & conversion-focused. Free quote.',
        'overland-park': 'Expert web design in Overland Park. Custom websites for KC metro businesses. SEO-ready & mobile-first. Free consultation.',
        'kansas-city': 'Professional website development in Kansas City. SEO-optimized, fast-loading sites that convert. Free strategy session.',
        'topeka': 'Expert web design in Topeka, KS. SEO-ready websites for capital city businesses. Mobile-responsive & fast. Free quote.',
        'olathe': 'Professional website design in Olathe, Kansas. Conversion-focused sites for Johnson County businesses. SEO-optimized. Free audit.',
        'lawrence': 'Expert web development in Lawrence, KS. Custom websites with SEO optimization. Mobile-first design. Free consultation.',
        'shawnee': 'Professional website design in Shawnee, Kansas. SEO-ready sites for KC metro businesses. Fast loading speeds. Free quote.',
        'manhattan': 'Expert web design in Manhattan, Kansas. SEO-optimized websites near K-State. Conversion-focused design. Free consultation.',
        'lenexa': 'Professional website development in Lenexa, KS. Mobile-responsive sites for KC metro. SEO-ready & fast. Free audit.',
        'salina': 'Expert web design in Salina, Kansas. SEO-optimized websites for central KS businesses. Mobile-first approach. Free quote.',
        'hutchinson': 'Professional website design in Hutchinson, Kansas. Fast-loading, SEO-ready sites that convert. Free consultation.',
        'leawood': 'Premium web design in Leawood, KS. SEO-optimized sites for upscale KC businesses. Conversion-focused. Free audit.',
        'dodge-city': 'Professional website development in Dodge City, Kansas. SEO-ready sites for western KS. Mobile-responsive. Free quote.',
        'garden-city': 'Expert web design in Garden City, Kansas. SEO-optimized websites for southwest KS businesses. Fast loading. Free consultation.',
        'leavenworth': 'Professional website design in Leavenworth, Kansas. SEO-ready, mobile-responsive sites. Conversion-focused. Free audit.',
      };
      description = webDesignDescriptions[city.slug] || `Professional website design in ${city.name}, Kansas. SEO-optimized, mobile-responsive sites. Fast loading & conversion-focused. Free quote.`;

    } else {
      // Fallback for any other services
      title = `${service.name} in ${city.name}, KS | Nexolance`;
      description = `Professional ${service.name.toLowerCase()} in ${city.name}, Kansas. Results-driven strategies. Free consultation.`;
    }

    url = `/kansas/${city.slug}/${service.slug}`;
  } else {
    // City hub page - custom titles per city
    const cityTitles: { [key: string]: string } = {
      'wichita': 'Wichita, Kansas Digital Marketing | Web Design & SEO',
      'overland-park': 'Overland Park, KS Digital Marketing | SEO & Web Design',
      'kansas-city': 'Kansas City, KS Digital Marketing | Local SEO Experts',
      'topeka': 'Topeka, Kansas Digital Marketing | SEO & Web Design',
      'olathe': 'Olathe, Kansas Digital Marketing | Local SEO Services',
      'lawrence': 'Lawrence, Kansas Digital Marketing | SEO & Web Design',
      'shawnee': 'Shawnee, Kansas Digital Marketing | Local SEO Experts',
      'manhattan': 'Manhattan, KS Digital Marketing | SEO & Web Design',
      'lenexa': 'Lenexa, Kansas Digital Marketing | Local SEO Services',
      'salina': 'Salina, Kansas Digital Marketing | SEO & Web Design',
      'hutchinson': 'Hutchinson, KS Digital Marketing | Local SEO Experts',
      'leawood': 'Leawood, Kansas Digital Marketing | SEO & Web Design',
      'dodge-city': 'Dodge City, KS Digital Marketing | Local SEO Services',
      'garden-city': 'Garden City, KS Digital Marketing | SEO & Web Design',
      'leavenworth': 'Leavenworth, KS Digital Marketing | Local SEO Experts',
    };

    const cityDescriptions: { [key: string]: string } = {
      'wichita': 'Wichita digital marketing: SEO, web design, PPC. Serving Wichita businesses with proven strategies. Free consultation available.',
      'overland-park': 'Overland Park digital marketing: SEO, web design, PPC. Expert services for Kansas City metro businesses. Free quote today.',
      'kansas-city': 'Kansas City digital marketing services: SEO, web design, PPC. Dominate local search with proven strategies. Call today.',
      'topeka': 'Topeka digital marketing: SEO, web design, PPC. Serving Kansas capital businesses with results-driven strategies. Free audit.',
      'olathe': 'Olathe digital marketing: SEO, web design, PPC. Grow your business with expert local strategies. Free consultation available.',
      'lawrence': 'Lawrence digital marketing: SEO, web design, PPC. Expert services for Lawrence businesses. Proven results. Free quote today.',
      'shawnee': 'Shawnee digital marketing: SEO, web design, PPC. Dominate local search in Shawnee, Kansas. Free consultation available.',
      'manhattan': 'Manhattan digital marketing: SEO, web design, PPC. Serving Manhattan and K-State area businesses. Free strategy session.',
      'lenexa': 'Lenexa digital marketing: SEO, web design, PPC. Expert services for Lenexa businesses. Proven results. Free consultation.',
      'salina': 'Salina digital marketing: SEO, web design, PPC. Grow your central Kansas business with proven strategies. Free quote today.',
      'hutchinson': 'Hutchinson digital marketing: SEO, web design, PPC. Expert services for Hutchinson businesses. Free consultation available.',
      'leawood': 'Leawood digital marketing: SEO, web design, PPC. Premium services for Leawood businesses. Results-driven strategies. Free audit.',
      'dodge-city': 'Dodge City digital marketing: SEO, web design, PPC. Serving western Kansas businesses with proven strategies. Free consultation.',
      'garden-city': 'Garden City digital marketing: SEO, web design, PPC. Expert services for southwest Kansas businesses. Free quote today.',
      'leavenworth': 'Leavenworth digital marketing: SEO, web design, PPC. Serving Leavenworth businesses with results-driven strategies. Call today.',
    };

    title = cityTitles[city.slug] || `${city.name}, Kansas Digital Marketing | Web Design & SEO`;
    description = cityDescriptions[city.slug] || `${city.name} digital marketing services: SEO, web design, PPC. Serving ${city.name} businesses with proven strategies. Free consultation.`;
    url = `/kansas/${city.slug}`;
  }

  // Generate keywords
  const keywords = [
    service ? service.name.toLowerCase() : 'digital marketing',
    `${city.name} SEO`,
    `local SEO ${city.name}`,
    city.name,
    city.county,
    'Kansas',
  ];

  if (industry) {
    keywords.push(
      industry.name.toLowerCase(),
      `${industry.name} marketing`,
      `${industry.name} SEO`
    );
  }

  // Generate full URL for canonical and OG
  const fullUrl = `https://nexolance.agency${url}`;

  // Prepare Open Graph title and description based on page type
  let ogTitle: string;
  let ogDescription: string;
  let twitterTitle: string;
  let twitterDescription: string;

  if (!service && !industry) {
    // City hub page
    ogTitle = `${city.name}, Kansas Digital Marketing Services | Nexolance`;
    ogDescription = `Professional digital marketing in ${city.name}, Kansas. Local SEO, web design, and PPC management.`;
    twitterTitle = `${city.name}, Kansas Digital Marketing | Nexolance`;
    twitterDescription = `SEO, web design, and PPC services in ${city.name}, Kansas`;
  } else {
    // Service or industry page
    ogTitle = `${title.split('|')[0].trim()} | Nexolance`;
    ogDescription = description;
    twitterTitle = `${service?.name || industry?.name || 'Digital Marketing'} ${city.name}, Kansas | Nexolance`;
    twitterDescription = `SEO, web design, and PPC services in ${city.name}, Kansas`;
  }

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: fullUrl,
      siteName: 'Nexolance',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `https://nexolance.agency/images/og-${city.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${service?.name || industry?.name || 'Digital Marketing'} in ${city.name}, Kansas`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      site: '@nexolance',
      creator: '@nexolance',
      images: [`https://nexolance.agency/images/twitter-${city.slug}.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'geo.region': 'US-KS',
      'geo.placename': city.name,
      'geo.position': `${city.coordinates.latitude};${city.coordinates.longitude}`,
      'ICBM': `${city.coordinates.latitude}, ${city.coordinates.longitude}`,
    },
  };
}

// Generate metadata for service pages
export function generateServiceMetadata(service: Service): Metadata {
  let title: string;
  let description: string;

  // Custom titles and descriptions based on service type
  if (service.slug === 'seo-services') {
    title = 'SEO Services Kansas City | Organic Growth | Nexolance';
    description = 'Professional SEO services in Kansas City. Increase rankings, drive traffic, and generate leads with proven strategies. Free audit available.';
  } else if (service.slug === 'landing-page-optimization') {
    title = 'Landing Page Optimization | Boost Conversions | Nexolance';
    description = 'Expert landing page optimization services. Increase conversion rates up to 300% with data-driven design and A/B testing. Free consultation.';
  } else if (service.slug === 'ecommerce-seo') {
    title = 'E-commerce SEO Services | Increase Sales | Nexolance';
    description = 'Specialized e-commerce SEO for online stores. Boost product visibility, increase sales, and maximize ROI. Shopify & WooCommerce experts.';
  } else if (service.slug === 'local-seo') {
    title = 'Local SEO Services Kansas | Dominate Local Search | Nexolance';
    description = 'Local SEO services to dominate Kansas searches. Google Business optimization, citations, reviews. More local customers guaranteed.';
  } else if (service.slug === 'website-design-development') {
    title = 'Website Design & Development Kansas | Nexolance';
    description = 'Professional website design & development services for Kansas businesses. SEO-optimized, mobile-responsive websites that convert visitors into customers.';
  } else {
    // Fallback
    title = `${service.name} - ${service.tagline}`;
    description = service.metaDescription;
  }

  const fullUrl = `https://nexolance.agency/services/${service.slug}`;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      service.name.toLowerCase(),
      service.slug,
      'digital marketing',
      'Kansas',
      ...service.benefits.slice(0, 3).map((b) => b.toLowerCase()),
    ],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Nexolance',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `https://nexolance.agency/images/og-${service.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@nexolance',
      creator: '@nexolance',
      images: [`https://nexolance.agency/images/twitter-${service.slug}.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Generate metadata for industry pages
export function generateIndustryMetadata(
  industry: Industry,
  city: City
): Metadata {
  const industrySlug = industry.slug;
  const citySlug = city.slug;
  const fullUrl = `https://nexolance.agency/kansas/${city.slug}/local-seo/${industry.slug}`;

  // Get custom description from imported data file (330 total combinations)
  const description = industryMetaDescriptions[industrySlug]?.[citySlug] ||
                     `${industry.name} SEO in ${city.name}, Kansas. Dominate local search and grow your business. Free consultation.`;

  // Get custom title from imported templates (22 industries)
  const titleTemplate = industryTitleTemplates[industrySlug];
  const title = titleTemplate ? titleTemplate(city.name) : `${industry.name} SEO ${city.name}, KS | Nexolance`;

  return {
    title: {
      absolute: title,  // Use absolute to prevent template duplication
    },
    description,
    keywords: [
      industry.name.toLowerCase(),
      `${industry.name} SEO`,
      `${industry.name} marketing`,
      city.name,
      'Kansas',
    ],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${industry.name} SEO ${city.name}, Kansas | Nexolance`,
      description,
      url: fullUrl,
      siteName: 'Nexolance',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `https://nexolance.agency/images/og-${city.slug}-${industry.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${industry.name} SEO in ${city.name}, Kansas`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.name} SEO ${city.name}, KS | Nexolance`,
      description: `${industry.name} SEO services in ${city.name}, Kansas`,
      site: '@nexolance',
      creator: '@nexolance',
      images: [`https://nexolance.agency/images/twitter-${city.slug}-${industry.slug}.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'geo.region': 'US-KS',
      'geo.placename': city.name,
      'geo.position': `${city.coordinates.latitude};${city.coordinates.longitude}`,
      'ICBM': `${city.coordinates.latitude}, ${city.coordinates.longitude}`,
    },
  };
}

// Generate metadata for About page
export const aboutMetadata: Metadata = {
  title: {
    absolute: 'About Nexolance | Kansas City Digital Marketing Agency',
  },
  description: 'Learn about Nexolance, Kansas City\'s trusted digital marketing partner. Expert team specializing in web design, SEO, and PPC management.',
  keywords: ['about nexolance', 'digital marketing agency', 'Kansas City marketing', 'SEO experts'],
  alternates: {
    canonical: 'https://nexolance.agency/about',
  },
  openGraph: {
    title: 'About Nexolance | Kansas City Digital Marketing Agency',
    description: 'Learn about Nexolance, Kansas City\'s trusted digital marketing partner.',
    url: 'https://nexolance.agency/about',
    siteName: 'Nexolance',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nexolance.agency/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About Nexolance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Nexolance | Kansas City Digital Marketing',
    description: 'Expert team specializing in web design, SEO, and PPC management.',
    site: '@nexolance',
    creator: '@nexolance',
    images: ['https://nexolance.agency/images/twitter-about.jpg'],
  },
};

// Generate metadata for Quote page
export const quoteMetadata: Metadata = {
  title: {
    absolute: 'Get a Free Quote | Nexolance Digital Marketing Services',
  },
  description: 'Request a free consultation for web design, SEO, or PPC services. Custom solutions for Kansas businesses. No obligation quote today.',
  keywords: ['free quote', 'consultation', 'digital marketing quote', 'SEO quote'],
  alternates: {
    canonical: 'https://nexolance.agency/quote',
  },
  openGraph: {
    title: 'Get a Free Quote | Nexolance Digital Marketing Services',
    description: 'Request a free consultation for web design, SEO, or PPC services.',
    url: 'https://nexolance.agency/quote',
    siteName: 'Nexolance',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nexolance.agency/images/og-quote.jpg',
        width: 1200,
        height: 630,
        alt: 'Get a Free Quote',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Free Quote | Nexolance',
    description: 'Custom digital marketing solutions for Kansas businesses.',
    site: '@nexolance',
    creator: '@nexolance',
    images: ['https://nexolance.agency/images/twitter-quote.jpg'],
  },
};

// Generate metadata for Services overview page
export const servicesOverviewMetadata: Metadata = {
  title: {
    absolute: 'Digital Marketing Services | Web Design & SEO | Nexolance',
  },
  description: 'Comprehensive digital marketing services: web design, local SEO, PPC management, and link building. Serving Kansas City businesses.',
  keywords: ['digital marketing services', 'SEO services', 'web design', 'PPC management', 'Kansas'],
  alternates: {
    canonical: 'https://nexolance.agency/services',
  },
  openGraph: {
    title: 'Digital Marketing Services | Web Design & SEO | Nexolance',
    description: 'Comprehensive digital marketing services for Kansas City businesses.',
    url: 'https://nexolance.agency/services',
    siteName: 'Nexolance',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nexolance.agency/images/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Marketing Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Services | Nexolance',
    description: 'Web design, local SEO, PPC management, and link building.',
    site: '@nexolance',
    creator: '@nexolance',
    images: ['https://nexolance.agency/images/twitter-services.jpg'],
  },
};

// Generate metadata for Kansas Directory page
export const kansasDirectoryMetadata: Metadata = {
  title: {
    absolute: 'Kansas Cities We Serve | Local SEO Services | Nexolance',
  },
  description: 'Professional digital marketing services across 15 Kansas cities. Find local SEO, web design, and PPC management in your area.',
  keywords: ['Kansas cities', 'Kansas SEO', 'local digital marketing', 'Kansas directory'],
  alternates: {
    canonical: 'https://nexolance.agency/kansas/directory',
  },
  openGraph: {
    title: 'Kansas Cities We Serve | Local SEO Services | Nexolance',
    description: 'Professional digital marketing services across 15 Kansas cities.',
    url: 'https://nexolance.agency/kansas/directory',
    siteName: 'Nexolance',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nexolance.agency/images/og-kansas-directory.jpg',
        width: 1200,
        height: 630,
        alt: 'Kansas Cities Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kansas Cities We Serve | Nexolance',
    description: 'Find local SEO and digital marketing in your Kansas city.',
    site: '@nexolance',
    creator: '@nexolance',
    images: ['https://nexolance.agency/images/twitter-kansas-directory.jpg'],
  },
  other: {
    'geo.region': 'US-KS',
  },
};
