export interface Service {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  benefits: string[];
  process: ProcessStep[];
  pricing: PricingInfo;
  icon: string;
  metaDescription: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroKeyPoints?: string[];
  trustIndicator?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  timeline: string;
}

export interface PricingInfo {
  startingPrice: string;
  priceRange: string;
  billingModel: string;
  details: string;
}

export const services: Service[] = [
  {
    name: 'SEO Services',
    slug: 'seo-services',
    tagline: 'Increase organic visibility and drive qualified traffic',
    heroHeadline: 'Dominate Google Rankings & Drive Qualified Organic Traffic',
    heroSubheadline: 'Comprehensive SEO strategies that deliver measurable results. Our clients see average 250% increase in organic traffic within 6 months.',
    heroKeyPoints: [
      'Technical SEO audits & implementation',
      'Content strategy & keyword optimization',
      'Link building & authority development',
      'Monthly reporting with actionable insights',
    ],
    trustIndicator: 'Ranked #1 SEO agency for competitive Kansas markets',
    description:
      'Comprehensive search engine optimization designed to improve rankings and drive organic traffic for growing businesses. Our data-driven approach combines technical expertise, content strategy, and proven link-building tactics to help you dominate local and national search results. We focus on sustainable, white-hat techniques that deliver measurable ROI and long-term growth.',
    benefits: [
      'Increase organic traffic by 40-150% within 6-12 months',
      'Improve search rankings for high-value keywords',
      'Reduce customer acquisition costs compared to paid advertising',
      'Build sustainable, long-term traffic that compounds over time',
      'Enhance brand credibility and trust through better visibility',
      'Gain competitive advantage in your local or national market',
      'Receive detailed monthly reports with actionable insights',
    ],
    process: [
      {
        title: 'Comprehensive SEO Audit',
        description:
          'Analyze your website\'s technical health, content quality, backlink profile, and current rankings. Identify opportunities and create a prioritized action plan.',
        timeline: 'Week 1-2',
      },
      {
        title: 'Competitor Research',
        description:
          'Evaluate your top competitors\' SEO strategies, identify gaps in their approach, and discover opportunities to outrank them in search results.',
        timeline: 'Week 2',
      },
      {
        title: 'Keyword Strategy',
        description:
          'Research and select high-value keywords based on search volume, competition, and commercial intent. Create a targeted keyword map for your website.',
        timeline: 'Week 2-3',
      },
      {
        title: 'Technical Optimization',
        description:
          'Fix technical issues including site speed, mobile responsiveness, crawlability, indexation, structured data, and Core Web Vitals.',
        timeline: 'Week 3-6',
      },
      {
        title: 'On-Page Optimization',
        description:
          'Optimize title tags, meta descriptions, headers, content, internal linking, and URL structure for target keywords.',
        timeline: 'Week 4-8',
      },
      {
        title: 'Content Development',
        description:
          'Create high-quality, optimized content including service pages, blog posts, and landing pages that attract and convert visitors.',
        timeline: 'Ongoing',
      },
      {
        title: 'Link Building',
        description:
          'Acquire high-quality backlinks through outreach, content marketing, local citations, and strategic partnerships to improve domain authority.',
        timeline: 'Ongoing',
      },
      {
        title: 'Monitoring & Reporting',
        description:
          'Track rankings, traffic, conversions, and ROI. Provide detailed monthly reports and adjust strategy based on performance data.',
        timeline: 'Monthly',
      },
    ],
    pricing: {
      startingPrice: '$1,500',
      priceRange: '$1,500 - $5,000/month',
      billingModel: 'Monthly retainer',
      details:
        'Pricing varies based on industry competitiveness, website size, current state, and scope. Most small to medium businesses invest $1,500-$3,000/month. Includes strategy, implementation, content, and reporting.',
    },
    icon: 'search',
    metaDescription:
      'Professional SEO services that increase organic traffic, improve search rankings, and drive qualified leads. Data-driven strategies with measurable ROI.',
  },
  {
    name: 'Landing Page Optimization',
    slug: 'landing-page-optimization',
    tagline: 'Turn more visitors into customers',
    heroHeadline: 'Transform Visitors Into Customers With High-Converting Pages',
    heroSubheadline: 'Increase your conversion rates by up to 400% with our proven optimization framework. Data-driven testing delivers measurable results.',
    heroKeyPoints: [
      'A/B testing with statistical significance',
      'Psychology-based conversion optimization',
      'Mobile-first responsive design',
      'Persuasive copywriting & messaging',
    ],
    trustIndicator: 'Optimized 200+ landing pages for Kansas businesses',
    description:
      'Strategic landing page design and optimization focused on conversion rate improvement. We combine persuasive copywriting, user experience design, and A/B testing to create landing pages that convert visitors into leads and customers. Our approach is grounded in consumer psychology, tested design patterns, and continuous optimization.',
    benefits: [
      'Increase conversion rates by 25-200% through testing and optimization',
      'Lower cost per acquisition for paid advertising campaigns',
      'Improve quality scores and reduce PPC costs',
      'Create compelling, persuasive messaging that resonates with your audience',
      'Implement mobile-optimized designs that convert on all devices',
      'Reduce bounce rates and increase engagement time',
    ],
    process: [
      {
        title: 'Conversion Audit',
        description:
          'Analyze your current landing pages, identify conversion barriers, evaluate user experience, and benchmark performance against industry standards.',
        timeline: 'Week 1',
      },
      {
        title: 'Audience Research',
        description:
          'Research your target audience\'s pain points, motivations, objections, and decision-making process. Review customer feedback and competitor messaging.',
        timeline: 'Week 1-2',
      },
      {
        title: 'Strategy Development',
        description:
          'Create a conversion-focused strategy including value proposition, messaging framework, offer structure, and conversion funnel design.',
        timeline: 'Week 2',
      },
      {
        title: 'Wireframe & Design',
        description:
          'Design high-converting landing page layouts based on proven patterns. Create wireframes, mockups, and ensure brand alignment.',
        timeline: 'Week 2-3',
      },
      {
        title: 'Copywriting',
        description:
          'Write persuasive, benefit-focused copy including headlines, body content, calls-to-action, and form optimization for maximum conversions.',
        timeline: 'Week 3',
      },
      {
        title: 'Development & Implementation',
        description:
          'Build responsive, fast-loading landing pages optimized for mobile and desktop. Implement tracking, analytics, and conversion pixels.',
        timeline: 'Week 3-4',
      },
      {
        title: 'A/B Testing',
        description:
          'Run systematic tests on headlines, images, copy, layout, and calls-to-action to continuously improve conversion rates.',
        timeline: 'Ongoing',
      },
      {
        title: 'Optimization & Reporting',
        description:
          'Analyze performance data, identify opportunities, implement winners, and provide detailed reports on conversion improvements and ROI.',
        timeline: 'Monthly',
      },
    ],
    pricing: {
      startingPrice: '$2,500',
      priceRange: '$2,500 - $8,000 per page',
      billingModel: 'One-time project',
      details:
        'Investment includes strategy, design, copywriting, development, and initial testing. Ongoing optimization available at $750-$1,500/month. Price varies by complexity and number of pages.',
    },
    icon: 'file-earmark-text',
    metaDescription:
      'Landing page optimization services that increase conversions, lower acquisition costs, and maximize ROI from paid traffic and marketing campaigns.',
  },
  {
    name: 'E-commerce SEO',
    slug: 'ecommerce-seo',
    tagline: 'Drive more sales through organic search',
    heroHeadline: 'Double Your E-commerce Revenue Through AI-Powered SEO',
    heroSubheadline: 'Drive qualified traffic and maximize conversions with our data-driven SEO strategies. Average client sees 150% revenue growth within 6 months.',
    heroKeyPoints: [
      'Dominate product search rankings on Google',
      'Optimize for high-intent buyer keywords',
      'Track ROI with advanced analytics dashboard',
      'Product page & category optimization',
    ],
    trustIndicator: 'Trusted by 50+ Kansas e-commerce brands',
    description:
      'Specialized SEO services for online stores designed to increase product visibility, drive qualified traffic, and boost revenue. We optimize product pages, category structures, technical elements, and content to help e-commerce businesses compete in competitive markets. Our strategies focus on attracting high-intent shoppers ready to purchase.',
    benefits: [
      'Increase organic revenue by 50-300% through improved product visibility',
      'Rank product and category pages for high-intent purchase keywords',
      'Reduce dependence on expensive paid advertising channels',
      'Improve product page conversion rates through optimization',
      'Build sustainable traffic that generates sales 24/7',
      'Capture customers throughout the entire purchase journey',
      'Gain competitive edge over other online retailers',
    ],
    process: [
      {
        title: 'E-commerce SEO Audit',
        description:
          'Comprehensive analysis of your store\'s technical SEO, site architecture, product optimization, category structure, and content strategy.',
        timeline: 'Week 1-2',
      },
      {
        title: 'Product & Keyword Research',
        description:
          'Identify high-value product keywords, analyze search intent, evaluate competition, and create keyword mapping for products and categories.',
        timeline: 'Week 2',
      },
      {
        title: 'Site Architecture Optimization',
        description:
          'Restructure category hierarchy, improve internal linking, optimize faceted navigation, and create SEO-friendly URL structures.',
        timeline: 'Week 3-4',
      },
      {
        title: 'Technical E-commerce SEO',
        description:
          'Fix duplicate content issues, optimize site speed, implement structured data for products, improve mobile experience, and resolve crawl issues.',
        timeline: 'Week 4-6',
      },
      {
        title: 'Product Page Optimization',
        description:
          'Optimize product titles, descriptions, images, reviews, and meta data. Create unique, persuasive content that converts and ranks.',
        timeline: 'Week 5-10',
      },
      {
        title: 'Content Marketing',
        description:
          'Develop buyer guides, comparison pages, blog content, and educational resources that attract shoppers early in the purchase journey.',
        timeline: 'Ongoing',
      },
      {
        title: 'Link Building & Authority',
        description:
          'Acquire high-quality backlinks through product outreach, influencer partnerships, industry publications, and strategic content promotion.',
        timeline: 'Ongoing',
      },
      {
        title: 'Performance Tracking',
        description:
          'Monitor product rankings, organic traffic, revenue, conversion rates, and ROI. Provide detailed reports with actionable recommendations.',
        timeline: 'Monthly',
      },
    ],
    pricing: {
      startingPrice: '$2,500',
      priceRange: '$2,500 - $10,000/month',
      billingModel: 'Monthly retainer',
      details:
        'Investment varies based on product catalog size, competition level, and current site state. Most e-commerce stores invest $3,000-$6,000/month. Includes technical optimization, product optimization, content, and link building.',
    },
    icon: 'cart',
    metaDescription:
      'E-commerce SEO services that increase product visibility, drive qualified traffic, and boost online sales through organic search optimization.',
  },
  {
    name: 'Local SEO',
    slug: 'local-seo',
    tagline: 'Dominate local search results',
    heroHeadline: 'Dominate Local Search & Capture More Qualified Leads',
    heroSubheadline: 'Secure top 3 Google rankings for your target service areas. Our clients average 300% more qualified leads within 90 days.',
    heroKeyPoints: [
      'Google Business Profile optimization & management',
      'Local citation building across 100+ directories',
      'Review generation & reputation management',
      'Location-specific content & landing pages',
    ],
    trustIndicator: 'Helping Kansas businesses outrank competitors since 2020',
    description:
      'Targeted local SEO services designed to help businesses attract nearby customers actively searching for their services. We optimize Google Business Profile, build local citations, earn reviews, and create location-specific content to improve visibility in Google Maps and local search results. Perfect for businesses serving specific geographic areas.',
    benefits: [
      'Appear in Google\'s "Local Pack" for high-intent search queries',
      'Increase visibility in Google Maps when customers search nearby',
      'Drive more phone calls, directions requests, and store visits',
      'Build credibility through positive reviews and ratings',
      'Outrank competitors in your local service area',
      'Attract customers with high purchase intent',
      'Track results with location-specific analytics and reporting',
    ],
    process: [
      {
        title: 'Local SEO Audit',
        description:
          'Analyze your Google Business Profile, local citations, reviews, local rankings, and competitive landscape. Identify quick wins and opportunities.',
        timeline: 'Week 1',
      },
      {
        title: 'Google Business Profile Optimization',
        description:
          'Optimize your GBP listing with accurate information, compelling descriptions, categories, photos, services, and attributes to maximize visibility.',
        timeline: 'Week 1-2',
      },
      {
        title: 'Local Citation Building',
        description:
          'Create and optimize citations on key directories including Yelp, Yellow Pages, industry-specific sites, and local business directories.',
        timeline: 'Week 2-4',
      },
      {
        title: 'Review Generation Strategy',
        description:
          'Implement systems to generate positive reviews on Google, Yelp, and industry platforms. Create response templates and monitoring processes.',
        timeline: 'Week 3-4',
      },
      {
        title: 'On-Page Local Optimization',
        description:
          'Optimize website content with local keywords, add location pages, implement local structured data, and create geo-targeted landing pages.',
        timeline: 'Week 4-6',
      },
      {
        title: 'Local Content Creation',
        description:
          'Develop location-specific content, local landing pages, neighborhood guides, and community-focused blog posts to build local relevance.',
        timeline: 'Ongoing',
      },
      {
        title: 'Local Link Building',
        description:
          'Acquire local backlinks from community organizations, local news sites, chambers of commerce, sponsorships, and local partnerships.',
        timeline: 'Ongoing',
      },
      {
        title: 'Tracking & Reporting',
        description:
          'Monitor local rankings, Google Business insights, review ratings, website traffic from local searches, and phone call tracking with monthly reports.',
        timeline: 'Monthly',
      },
    ],
    pricing: {
      startingPrice: '$1,000',
      priceRange: '$1,000 - $3,000/month',
      billingModel: 'Monthly retainer',
      details:
        'Pricing depends on number of locations, market competition, and current online presence. Single-location businesses typically invest $1,000-$1,500/month. Multi-location businesses $2,000-$5,000/month. Includes GBP management, citations, reviews, and reporting.',
    },
    icon: 'geo-alt',
    metaDescription:
      'Local SEO services that help businesses dominate Google Maps and local search results. Attract nearby customers ready to buy.',
  },
  {
    name: 'Website Design & Development',
    slug: 'website-design-development',
    tagline: 'SEO-optimized websites that convert',
    heroHeadline: 'Professional Website Design & Development Services for Kansas Businesses',
    heroSubheadline: 'SEO-optimized, mobile-responsive websites built to convert visitors into customers. Fast loading speeds and integrated with our digital marketing services.',
    heroKeyPoints: [
      'SEO-optimized from day one for better rankings',
      'Mobile-responsive design for all devices',
      'Fast loading speeds that improve search rankings',
      'Professional design that converts visitors',
    ],
    trustIndicator: 'Built 200+ high-performing websites for Kansas businesses',
    description:
      'Professional website design and development services that combine stunning design with technical SEO optimization. We create fast, mobile-responsive websites that not only look great but also rank well in search engines and convert visitors into customers. Every website is built with SEO best practices, fast loading speeds, and conversion optimization from day one.',
    benefits: [
      'SEO-optimized website structure for better search rankings',
      'Mobile-responsive design that works on all devices',
      'Fast loading speeds (under 3 seconds) for better user experience',
      'Conversion-focused design that turns visitors into leads',
      'Integration with Google Analytics and tracking tools',
      'Content management system for easy updates',
      'Security features and SSL certificates included',
      'Ongoing support and maintenance available',
    ],
    process: [
      {
        title: 'Discovery & Planning',
        description:
          'Understand your business goals, target audience, competitors, and brand guidelines. Define site structure, features, and create a detailed project plan.',
        timeline: 'Week 1',
      },
      {
        title: 'Wireframing & Strategy',
        description:
          'Create wireframes showing site layout, user flow, and conversion paths. Plan content structure, navigation, and call-to-action placement.',
        timeline: 'Week 1-2',
      },
      {
        title: 'Design Mockups',
        description:
          'Design custom, branded website mockups for desktop and mobile. Create visual design system including colors, typography, and UI elements.',
        timeline: 'Week 2-3',
      },
      {
        title: 'Content Development',
        description:
          'Write SEO-optimized content including headlines, service descriptions, about pages, and calls-to-action. Optimize for target keywords and conversions.',
        timeline: 'Week 3-4',
      },
      {
        title: 'Development & Coding',
        description:
          'Build responsive website using modern frameworks. Implement SEO best practices, optimize site speed, and ensure mobile compatibility.',
        timeline: 'Week 4-6',
      },
      {
        title: 'SEO Implementation',
        description:
          'Implement technical SEO including meta tags, schema markup, XML sitemap, robots.txt, and search engine indexing.',
        timeline: 'Week 6',
      },
      {
        title: 'Testing & Quality Assurance',
        description:
          'Test across devices and browsers, verify all functionality, check loading speeds, validate code, and ensure ADA compliance.',
        timeline: 'Week 6-7',
      },
      {
        title: 'Launch & Training',
        description:
          'Deploy website to production, set up analytics and tracking, provide training on content management, and monitor for issues.',
        timeline: 'Week 7-8',
      },
    ],
    pricing: {
      startingPrice: '$2,500',
      priceRange: '$2,500 - $15,000 per project',
      billingModel: 'One-time project or monthly payments',
      details:
        'Investment varies based on website complexity, features, number of pages, and custom functionality. Small business websites typically $2,500-$5,000. E-commerce and custom solutions $8,000-$15,000+. Ongoing maintenance $100-$300/month optional.',
    },
    icon: 'laptop',
    metaDescription:
      'Professional website design and development services. SEO-optimized, mobile-responsive websites that convert visitors into customers.',
  },
];

// Helper function to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

// Helper function to get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

// Helper function to get service names only
export function getServiceNames(): string[] {
  return services.map((service) => service.name);
}
