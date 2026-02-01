import { Metadata } from 'next';
import SEOAuditTool from '@/components/tools/SEOAuditTool';

export const metadata: Metadata = {
  title: 'Free SEO Audit Tool - Instant Analysis for Kansas Businesses | Nexolance',
  description: 'Get a free comprehensive SEO audit in 60 seconds. Analyze 40+ factors, get actionable recommendations, and improve your Kansas business rankings. No credit card required.',
  keywords: 'free seo audit, website seo checker, seo analysis tool, kansas seo, wichita seo, overland park seo, law firm seo, medical practice seo, local seo audit, website audit tool, seo audit report',
  openGraph: {
    title: 'Free SEO Audit Tool | Nexolance',
    description: 'Analyze your website\'s SEO in 60 seconds. Free, instant results.',
    url: 'https://nexolance.agency/tools/seo-audit',
    type: 'website',
  },
};

export default function SEOAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Free SEO Audit Tool',
            description: 'Free comprehensive SEO audit tool that analyzes your website performance, SEO, accessibility, and best practices in 60 seconds. No credit card required.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            provider: {
              '@type': 'Organization',
              name: 'Nexolance',
              url: 'https://nexolance.agency',
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Kansas',
                addressCountry: 'US'
              }
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '127',
              bestRating: '5',
              worstRating: '1'
            }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How long does the audit take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Instant! Your basic audit results appear in 60 seconds. The detailed PDF report is sent within 1 hour.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is it really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, completely free with no credit card required. We believe in providing value upfront. If you need help implementing fixes, we offer paid services, but there\'s zero obligation.'
                }
              },
              {
                '@type': 'Question',
                name: 'What makes this different from other free tools?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most free tools just show you a score. We provide specific actionable recommendations, Kansas-focused competitive analysis, industry-specific insights, option for expert consultation, and a detailed PDF report you can share with your team.'
                }
              },
              {
                '@type': 'Question',
                name: 'Will this work for my industry?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! We\'ve helped law firms in Wichita, Topeka, Kansas City; medical practices across Kansas; local service businesses; e-commerce stores; and professional services firms.'
                }
              },
              {
                '@type': 'Question',
                name: 'How accurate is the audit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We use the same Google PageSpeed Insights API that Google uses internally, plus additional checks for SEO factors. It\'s the same data professional SEO agencies use.'
                }
              }
            ]
          }),
        }}
      />
      <SEOAuditTool />
    </>
  );
}
