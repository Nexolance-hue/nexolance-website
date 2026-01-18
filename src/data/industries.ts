export interface Industry {
  name: string;
  slug: string;
  category: string;
  description: string;
  challenges: string[];
  solutions: string[];
  services: string[];
  icon: string;
  metaDescription: string;
}

export const industries: Industry[] = [
  // LEGAL INDUSTRIES
  {
    name: 'Personal Injury Law',
    slug: 'personal-injury-law',
    category: 'Legal',
    description:
      'Personal injury attorneys face intense competition for high-value cases involving car accidents, medical malpractice, and workplace injuries. Success requires dominating local search results when potential clients search for legal help during critical moments. Our specialized SEO strategies help injury lawyers capture qualified leads, build trust through online presence, and compete against large marketing budgets from established firms.',
    challenges: [
      'Extremely competitive local search landscape with high-budget competitors',
      'Capturing leads during time-sensitive moments when clients need immediate help',
      'Building trust and credibility online to convert leads into consultations',
      'Competing against national referral services and marketing aggregators',
      'Managing online reputation and reviews in a sensitive practice area',
    ],
    solutions: [
      'Dominate Google Local Pack for "personal injury lawyer near me" searches',
      'Create authoritative content that educates and converts injured victims',
      'Implement strategic review generation to build social proof',
      'Optimize for urgent, high-intent keywords that drive case consultations',
      'Build powerful backlink profile to compete with established firms',
    ],
    services: [
      'Local SEO & Google Business Profile optimization',
      'Legal content marketing and case study development',
      'Landing page optimization for case intake',
      'Review management and reputation monitoring',
      'Competitive keyword research for injury terms',
    ],
    icon: 'briefcase',
    metaDescription:
      'Local SEO for personal injury lawyers. Dominate local search, generate qualified leads, and compete against large firms with strategic digital marketing.',
  },
  {
    name: 'Criminal Defense',
    slug: 'criminal-defense',
    category: 'Legal',
    description:
      'Criminal defense attorneys must reach clients during crisis moments when they urgently need legal representation. With practice areas ranging from DUI to serious felonies, defense lawyers require online visibility that builds immediate trust and demonstrates expertise. Our marketing strategies help defense attorneys appear prominently when potential clients search for help, while positioning them as authoritative advocates.',
    challenges: [
      'Reaching clients during urgent situations who need immediate representation',
      'Differentiating expertise across diverse practice areas from DUI to felonies',
      'Building trust quickly with clients facing serious legal challenges',
      'Competing in saturated markets with aggressive paid advertising',
      'Managing sensitive reputation issues in a scrutinized practice area',
    ],
    solutions: [
      'Optimize for urgent searches like "criminal defense lawyer" and specific charges',
      'Create comprehensive content covering all practice areas and legal rights',
      'Implement 24/7 conversion tracking and lead capture systems',
      'Build authority through legal commentary and case results',
      'Establish strong local presence across all relevant directories',
    ],
    services: [
      'Local SEO for criminal defense attorneys',
      'Practice area landing pages optimized for conversion',
      'Emergency contact optimization and call tracking',
      'Legal blog content and resource development',
      'Reputation management and review generation',
    ],
    icon: 'shield',
    metaDescription:
      'SEO for criminal defense lawyers. Reach clients in crisis moments, build trust, and generate qualified case leads through strategic local search optimization.',
  },
  {
    name: 'Family Law',
    slug: 'family-law',
    category: 'Legal',
    description:
      'Family law attorneys handle sensitive matters including divorce, custody, adoption, and domestic relations where clients make emotional, life-changing decisions. Success requires building trust, demonstrating empathy, and appearing prominently when potential clients search for guidance. Our marketing approach helps family lawyers attract the right clients while positioning their practice as compassionate yet effective advocates.',
    challenges: [
      'Addressing emotional, sensitive topics that require trust and empathy',
      'Standing out in competitive divorce and custody markets',
      'Attracting ideal clients while screening for case fit',
      'Balancing compassionate messaging with strong advocacy positioning',
      'Managing online presence across multiple family law practice areas',
    ],
    solutions: [
      'Create empathetic, educational content that builds immediate trust',
      'Optimize for specific practice areas like "divorce lawyer" and "child custody attorney"',
      'Implement strategic local SEO to dominate family law searches',
      'Develop case qualification landing pages to attract ideal clients',
      'Build review profile that emphasizes results and client care',
    ],
    services: [
      'Local SEO for family law practices',
      'Compassionate website copywriting and messaging',
      'Practice area content for divorce, custody, and adoption',
      'Landing page optimization for consultation requests',
      'Review management and testimonial strategy',
    ],
    icon: 'house-heart',
    metaDescription:
      'Local SEO for family law attorneys. Attract divorce, custody, and family law clients with compassionate marketing and strategic search optimization.',
  },
  {
    name: 'Estate Planning',
    slug: 'estate-planning',
    category: 'Legal',
    description:
      'Estate planning attorneys serve clients making critical decisions about wills, trusts, and legacy protection. Unlike urgent legal matters, estate planning involves considered decisions where clients research extensively before choosing counsel. Our strategies help estate attorneys establish authority, educate potential clients, and nurture relationships that convert browsers into consultations for comprehensive planning services.',
    challenges: [
      'Long consideration periods as clients research before engaging',
      'Educating prospects about complex estate planning needs they may not recognize',
      'Competing against online legal document services and DIY solutions',
      'Demonstrating value for services that seem non-urgent',
      'Reaching affluent clients who need sophisticated planning',
    ],
    solutions: [
      'Develop comprehensive educational content that nurtures prospects',
      'Optimize for informational searches early in the decision journey',
      'Create authority through thought leadership and planning guides',
      'Target affluent demographics with specialized services messaging',
      'Implement lead nurturing strategies for longer sales cycles',
    ],
    services: [
      'Local SEO for estate planning attorneys',
      'Educational content marketing and planning guides',
      'Wealth management audience targeting',
      'Webinar and consultation funnel optimization',
      'Trust and estate planning landing pages',
    ],
    icon: 'file-earmark-medical',
    metaDescription:
      'SEO for estate planning lawyers. Educate prospects, build authority, and attract clients who need wills, trusts, and comprehensive legacy planning.',
  },

  // MEDICAL INDUSTRIES
  {
    name: 'Dental Clinics',
    slug: 'dental-clinics',
    category: 'Medical',
    description:
      'Dental practices must attract both urgent care patients and those seeking routine or cosmetic services in competitive local markets. Success requires strong visibility in local search, positive reviews, and clear communication of services from emergency care to cosmetic dentistry. Our strategies help dental practices fill appointment books with new patients while retaining existing ones through digital engagement.',
    challenges: [
      'Competing against numerous practices in local service areas',
      'Attracting both emergency patients and routine care seekers',
      'Overcoming dental anxiety through trust-building online presence',
      'Managing appointment booking systems and conversion optimization',
      'Differentiating services from general dentistry to specialties',
    ],
    solutions: [
      'Dominate local search for "dentist near me" and specific services',
      'Implement comprehensive Google Business Profile optimization',
      'Generate consistent positive reviews to build trust',
      'Create service-specific landing pages for cosmetic and specialty dentistry',
      'Optimize for emergency dental searches with urgent care messaging',
    ],
    services: [
      'Local SEO for dental practices',
      'Google Business Profile management',
      'Review generation and reputation management',
      'Service-specific landing pages and content',
      'Appointment booking optimization',
    ],
    icon: 'heart-pulse',
    metaDescription:
      'Local SEO for dental clinics. Attract new patients, fill appointment calendars, and dominate local search for general and cosmetic dentistry services.',
  },
  {
    name: 'Cosmetic Surgery',
    slug: 'cosmetic-surgery',
    category: 'Medical',
    description:
      'Cosmetic surgeons compete in high-value markets where patients invest significant time researching procedures, credentials, and results before booking consultations. Success requires showcasing expertise, demonstrating results, and building trust through authoritative online presence. Our strategies help plastic surgeons attract qualified patients for procedures ranging from injectables to major surgical transformations.',
    challenges: [
      'Long consideration periods as patients extensively research procedures',
      'High-competition, high-cost per acquisition marketing environment',
      'Building trust and credibility for elective, expensive procedures',
      'Showcasing results while maintaining patient privacy',
      'Competing against medical spas and non-surgical alternatives',
    ],
    solutions: [
      'Create comprehensive procedure guides with before/after galleries',
      'Optimize for specific procedures like "breast augmentation" or "rhinoplasty"',
      'Build authority through board certification and credential highlighting',
      'Implement virtual consultation funnels to nurture prospects',
      'Develop content addressing common concerns and recovery questions',
    ],
    services: [
      'SEO for cosmetic surgery practices',
      'Procedure-specific landing page development',
      'Before/after gallery optimization',
      'Consultation booking funnel optimization',
      'Content marketing for patient education',
    ],
    icon: 'scissors',
    metaDescription:
      'SEO for cosmetic surgeons. Attract qualified patients, showcase results, and fill consultation calendars for plastic surgery procedures.',
  },
  {
    name: 'Chiropractic Care',
    slug: 'chiropractic-care',
    category: 'Medical',
    description:
      'Chiropractors serve patients seeking relief from pain, injury recovery, and ongoing wellness care in competitive local healthcare markets. Success requires visibility when patients search for immediate pain relief while also positioning as ongoing wellness partners. Our marketing helps chiropractors attract new patients, communicate treatment approaches, and build practices through consistent local visibility and patient education.',
    challenges: [
      'Addressing both acute pain patients and wellness-focused prospects',
      'Overcoming skepticism about chiropractic care effectiveness',
      'Competing with physical therapists and medical doctors',
      'Educating prospects about insurance coverage and costs',
      'Building trust without ability to guarantee results',
    ],
    solutions: [
      'Optimize for pain-specific searches like "back pain relief" and "car accident chiropractor"',
      'Create educational content explaining chiropractic benefits',
      'Implement review strategy to build social proof',
      'Develop condition-specific landing pages for common complaints',
      'Target both immediate pain and wellness maintenance keywords',
    ],
    services: [
      'Local SEO for chiropractic practices',
      'Condition-specific content and landing pages',
      'Review management and patient testimonials',
      'Insurance and payment information optimization',
      'New patient special promotion pages',
    ],
    icon: 'hospital',
    metaDescription:
      'Local SEO for chiropractors. Attract patients seeking pain relief, injury recovery, and wellness care with strategic local search optimization.',
  },
  {
    name: 'Med Spa',
    slug: 'med-spa',
    category: 'Medical',
    description:
      'Medical spas operate at the intersection of medical aesthetics and luxury wellness, offering non-surgical treatments from injectables to laser services. Success requires attracting affluent clientele, showcasing results, and differentiating from both day spas and plastic surgeons. Our strategies help med spas build premium brands online while maintaining steady client flow for treatments and membership programs.',
    challenges: [
      'Differentiating from day spas and competing with plastic surgeons',
      'Attracting affluent clientele willing to invest in aesthetic treatments',
      'Managing multiple service lines from injectables to body contouring',
      'Building trust for medical procedures in spa-like setting',
      'Balancing medical credibility with luxury positioning',
    ],
    solutions: [
      'Create service-specific landing pages for each treatment offering',
      'Optimize for luxury aesthetic keywords and premium service searches',
      'Showcase before/after results and provider credentials',
      'Implement membership program marketing and retention strategies',
      'Target affluent demographics through strategic content and offers',
    ],
    services: [
      'Local SEO for medical spas',
      'Treatment-specific landing pages and galleries',
      'Membership program optimization',
      'Provider credential and expertise highlighting',
      'Special offer and package promotion pages',
    ],
    icon: 'droplet',
    metaDescription:
      'SEO for med spas. Attract affluent clients for injectables, laser treatments, and aesthetic services with premium local search marketing.',
  },
  {
    name: 'Veterinary Services',
    slug: 'veterinary-services',
    category: 'Medical',
    description:
      'Veterinary practices serve pet owners seeking both routine care and emergency services in emotionally-charged situations. Success requires local visibility, trust-building through reviews, and clear communication of services from wellness exams to specialized care. Our strategies help veterinarians attract new pet owners, communicate compassionate care, and build lasting client relationships in competitive markets.',
    challenges: [
      'Serving both routine care and emergency needs with different search behaviors',
      'Building trust with pet owners making emotional care decisions',
      'Competing against corporate vet chains and specialized hospitals',
      'Managing appointment capacity and emergency availability',
      'Differentiating service offerings from wellness to specialized care',
    ],
    solutions: [
      'Optimize for both routine searches and emergency vet keywords',
      'Implement comprehensive review strategy to showcase compassionate care',
      'Create service-specific pages for wellness, dental, surgery, and emergency care',
      'Highlight credentials, technology, and compassionate approach',
      'Develop new client welcome programs and onboarding content',
    ],
    services: [
      'Local SEO for veterinary practices',
      'Service line landing pages and content',
      'Review generation and reputation management',
      'Emergency care and hours visibility optimization',
      'New client acquisition campaigns',
    ],
    icon: 'heart',
    metaDescription:
      'Local SEO for veterinarians. Attract pet owners seeking compassionate care, fill appointment calendars, and grow your veterinary practice.',
  },

  // HOME SERVICES INDUSTRIES
  {
    name: 'HVAC Services',
    slug: 'hvac-services',
    category: 'Home Services',
    description:
      'HVAC contractors serve homeowners and businesses needing both emergency repairs and planned installations in seasonal, competitive markets. Success requires visibility during crisis moments when systems fail, plus consistent presence for maintenance and replacement projects. Our strategies help HVAC companies capture emergency leads, build maintenance contracts, and win installation projects year-round.',
    challenges: [
      'Capturing emergency leads when AC or heating systems fail',
      'Competing in saturated markets with aggressive paid advertising',
      'Balancing seasonal demand fluctuations throughout the year',
      'Building maintenance contracts for recurring revenue',
      'Differentiating service quality and response times',
    ],
    solutions: [
      'Optimize for emergency searches like "AC repair" and "furnace not working"',
      'Implement 24/7 lead capture and call tracking systems',
      'Create seasonal maintenance campaign landing pages',
      'Target installation keywords for replacement system sales',
      'Build review profile emphasizing response time and quality',
    ],
    services: [
      'Local SEO for HVAC contractors',
      'Emergency service optimization and call tracking',
      'Seasonal campaign development',
      'Maintenance contract landing pages',
      'Installation and replacement content',
    ],
    icon: 'fan',
    metaDescription:
      'Local SEO for HVAC companies. Capture emergency repair leads, build maintenance contracts, and win installation projects with strategic search marketing.',
  },
  {
    name: 'Roofing Companies',
    slug: 'roofing-companies',
    category: 'Home Services',
    description:
      'Roofing contractors compete for high-value projects ranging from storm damage repairs to complete roof replacements. Success requires visibility after weather events, trust-building for expensive projects, and consistent lead generation for residential and commercial work. Our strategies help roofers capture storm leads, win replacement projects, and build authority in their service areas.',
    challenges: [
      'Capitalizing on storm damage leads in competitive situations',
      'Building trust for expensive, high-consideration projects',
      'Standing out among numerous contractors in local markets',
      'Managing seasonal demand and weather-dependent work',
      'Demonstrating quality and warranty protection',
    ],
    solutions: [
      'Optimize for storm damage and emergency roofing searches',
      'Create material-specific landing pages (shingle, metal, tile)',
      'Implement comprehensive review strategy showcasing completed projects',
      'Target commercial roofing keywords for larger projects',
      'Develop content addressing insurance claims and warranty concerns',
    ],
    services: [
      'Local SEO for roofing contractors',
      'Storm damage lead generation campaigns',
      'Material and service-specific landing pages',
      'Review management and project showcasing',
      'Commercial roofing content and targeting',
    ],
    icon: 'house',
    metaDescription:
      'SEO for roofing companies. Capture storm damage leads, win replacement projects, and dominate local search for residential and commercial roofing.',
  },
  {
    name: 'Plumbing Services',
    slug: 'plumbing-services',
    category: 'Home Services',
    description:
      'Plumbing contractors serve customers needing both emergency repairs and planned installations for residential and commercial properties. Success requires capturing urgent leads when pipes burst or drains clog, while also winning planned projects like remodels and water heater replacements. Our strategies help plumbers dominate emergency searches while building consistent lead flow year-round.',
    challenges: [
      'Capturing high-intent emergency leads during plumbing crises',
      'Competing against large franchise operations and aggregators',
      'Balancing emergency work with more profitable planned projects',
      'Managing 24/7 lead capture and response expectations',
      'Differentiating expertise across residential and commercial services',
    ],
    solutions: [
      'Optimize for emergency keywords like "burst pipe" and "clogged drain"',
      'Implement after-hours lead capture and emergency dispatch systems',
      'Create service-specific pages for water heaters, repiping, and drain cleaning',
      'Target planned project keywords for bathroom and kitchen remodels',
      'Build review profile emphasizing reliability and response time',
    ],
    services: [
      'Local SEO for plumbing contractors',
      'Emergency service optimization',
      'Service-specific landing page development',
      'Commercial plumbing content and targeting',
      'Review generation and reputation management',
    ],
    icon: 'tools',
    metaDescription:
      'Local SEO for plumbers. Dominate emergency searches, capture planned project leads, and grow your plumbing business with strategic local marketing.',
  },
  {
    name: 'Electrical Contractors',
    slug: 'electrical-contractors',
    category: 'Home Services',
    description:
      'Electrical contractors serve residential and commercial clients with services ranging from emergency repairs to complex installations and panel upgrades. Success requires visibility for safety-critical emergencies, trust-building for home services, and authority for commercial projects. Our strategies help electricians capture diverse lead types while establishing expertise in their service areas.',
    challenges: [
      'Capturing emergency leads for safety-critical electrical issues',
      'Building trust for in-home services and safety concerns',
      'Differentiating between residential and commercial capabilities',
      'Competing in markets with licensed and unlicensed competitors',
      'Educating customers about electrical safety and code requirements',
    ],
    solutions: [
      'Optimize for emergency and safety keywords like "power outage" and "electrical fire"',
      'Create residential vs. commercial service differentiation',
      'Highlight licensing, insurance, and safety credentials prominently',
      'Develop content addressing common electrical issues and upgrades',
      'Target specific services from ceiling fans to EV charger installation',
    ],
    services: [
      'Local SEO for electrical contractors',
      'Emergency electrical service optimization',
      'Residential and commercial landing pages',
      'Safety and licensing credential highlighting',
      'Service-specific content development',
    ],
    icon: 'lightning',
    metaDescription:
      'SEO for electricians. Capture emergency leads, win installation projects, and establish authority for residential and commercial electrical services.',
  },
  {
    name: 'Home Remodeling',
    slug: 'home-remodeling',
    category: 'Home Services',
    description:
      'Home remodeling contractors compete for high-value kitchen, bathroom, and whole-home renovation projects with long sales cycles. Success requires showcasing portfolio work, building trust for expensive projects, and capturing leads early in the planning process. Our strategies help remodelers attract qualified homeowners, nurture prospects, and win projects in competitive markets.',
    challenges: [
      'Long sales cycles as homeowners plan and budget major projects',
      'High competition from general contractors and specialized trades',
      'Building trust for expensive projects requiring significant investment',
      'Showcasing portfolio work effectively to demonstrate capabilities',
      'Managing leads across multiple project types and budgets',
    ],
    solutions: [
      'Create project-specific landing pages for kitchens, bathrooms, and additions',
      'Showcase before/after galleries and detailed project portfolios',
      'Implement lead nurturing for long consideration periods',
      'Optimize for planning-stage keywords and project inspiration searches',
      'Build authority through design trends and remodeling guides',
    ],
    services: [
      'Local SEO for remodeling contractors',
      'Project-specific landing pages with galleries',
      'Portfolio showcasing and optimization',
      'Lead nurturing content development',
      'Design inspiration and planning guides',
    ],
    icon: 'hammer',
    metaDescription:
      'SEO for home remodelers. Attract qualified leads, showcase portfolio work, and win kitchen, bathroom, and whole-home renovation projects.',
  },
  {
    name: 'Landscaping Design',
    slug: 'landscaping-design',
    category: 'Home Services',
    description:
      'Landscaping companies serve both maintenance clients and design/build project customers in seasonal, competitive markets. Success requires visibility for recurring maintenance services while also capturing high-value design and hardscape projects. Our strategies help landscapers build maintenance client bases, win design projects, and maintain consistent revenue through seasonal changes.',
    challenges: [
      'Balancing maintenance services with higher-margin design projects',
      'Managing extreme seasonal demand fluctuations',
      'Competing against unlicensed competitors on price',
      'Showcasing design capabilities and completed project quality',
      'Converting one-time projects into recurring maintenance contracts',
    ],
    solutions: [
      'Optimize for both "lawn maintenance" and "landscape design" keywords',
      'Create service-specific pages for maintenance, design, and hardscaping',
      'Showcase project portfolios with before/after transformations',
      'Implement seasonal campaign strategies for year-round visibility',
      'Target high-value commercial landscaping opportunities',
    ],
    services: [
      'Local SEO for landscaping companies',
      'Maintenance and design service differentiation',
      'Project portfolio showcasing',
      'Seasonal campaign development',
      'Commercial landscaping content',
    ],
    icon: 'tree',
    metaDescription:
      'SEO for landscaping companies. Win design projects, build maintenance contracts, and dominate local search for residential and commercial landscaping.',
  },

  // PROFESSIONAL SERVICES INDUSTRIES
  {
    name: 'Real Estate',
    slug: 'real-estate',
    category: 'Professional',
    description:
      'Real estate agents and brokers compete in local markets where buyers and sellers research extensively before choosing representation. Success requires hyperlocal visibility, neighborhood expertise, and strong personal branding. Our strategies help realtors dominate local search, showcase listings and expertise, and generate both buyer and seller leads consistently.',
    challenges: [
      'Standing out in saturated markets with numerous competing agents',
      'Building trust and credibility in an industry with mixed reputation',
      'Generating both buyer leads and valuable seller listings',
      'Demonstrating neighborhood expertise and local market knowledge',
      'Competing against large brokerages with significant marketing budgets',
    ],
    solutions: [
      'Optimize for hyperlocal searches including neighborhood and zip code keywords',
      'Create neighborhood guides and local market expertise content',
      'Implement IDX integration for property search optimization',
      'Build personal brand through testimonials, sales history, and social proof',
      'Target both buyer keywords and seller listing capture strategies',
    ],
    services: [
      'Local SEO for real estate agents',
      'Neighborhood and community landing pages',
      'Personal branding and reputation management',
      'Buyer and seller lead generation campaigns',
      'Market reports and expertise content',
    ],
    icon: 'key',
    metaDescription:
      'SEO for real estate agents. Generate buyer and seller leads, dominate neighborhood searches, and build your personal brand with local search marketing.',
  },
  {
    name: 'Financial Planning',
    slug: 'financial-planning',
    category: 'Professional',
    description:
      'Financial advisors and wealth managers serve clients making critical decisions about retirement, investments, and financial security. Success requires building trust, demonstrating expertise, and reaching clients during key life moments when they seek financial guidance. Our strategies help advisors attract ideal clients, establish authority, and compete in sophisticated professional services markets.',
    challenges: [
      'Building trust in an industry requiring significant credibility',
      'Reaching clients during key life moments when they need guidance',
      'Differentiating expertise and approach from competing advisors',
      'Navigating compliance and regulatory advertising restrictions',
      'Attracting affluent clients with investable assets',
    ],
    solutions: [
      'Create educational content that demonstrates expertise and builds trust',
      'Optimize for life-event keywords like "retirement planning" and "401k rollover"',
      'Develop specialized landing pages for key services and client types',
      'Build authority through thought leadership and financial education',
      'Implement compliant lead generation and nurturing strategies',
    ],
    services: [
      'SEO for financial advisors',
      'Compliant content marketing and education',
      'Service-specific landing pages',
      'Wealth management audience targeting',
      'Authority building and thought leadership',
    ],
    icon: 'graph-up',
    metaDescription:
      'SEO for financial advisors. Attract ideal clients, build trust, and generate leads for retirement planning, wealth management, and financial services.',
  },
  {
    name: 'Insurance Agencies',
    slug: 'insurance-agencies',
    category: 'Professional',
    description:
      'Insurance agencies compete for clients seeking auto, home, life, and business coverage in price-sensitive markets. Success requires visibility during shopping periods, trust-building for complex products, and differentiation beyond price. Our strategies help independent agencies attract qualified prospects, communicate value, and compete against direct writers and large carriers.',
    challenges: [
      'Competing against direct-to-consumer carriers with massive advertising budgets',
      'Differentiating value beyond price in commoditized markets',
      'Capturing leads during annual shopping and renewal periods',
      'Managing multiple product lines from personal to commercial insurance',
      'Building trust for complex products and claims service',
    ],
    solutions: [
      'Optimize for insurance type and comparison keywords',
      'Create product-specific landing pages for auto, home, life, and business insurance',
      'Develop content explaining independent agency advantages',
      'Target commercial insurance opportunities for higher margins',
      'Implement seasonal campaigns around renewal and shopping periods',
    ],
    services: [
      'Local SEO for insurance agencies',
      'Product-specific landing page development',
      'Commercial insurance content and targeting',
      'Quote comparison optimization',
      'Educational content and buyer guides',
    ],
    icon: 'shield-check',
    metaDescription:
      'SEO for insurance agencies. Generate qualified leads for auto, home, life, and business insurance with strategic local search marketing.',
  },
  {
    name: 'Accounting CPA',
    slug: 'accounting-cpa',
    category: 'Professional',
    description:
      'CPA firms and accounting practices serve individuals and businesses needing tax preparation, bookkeeping, and advisory services. Success requires visibility during tax season, trust-building for financial services, and differentiation of specialized expertise. Our strategies help accounting firms attract ideal clients, showcase specializations, and maintain consistent lead generation beyond seasonal peaks.',
    challenges: [
      'Managing extreme seasonal demand concentrated around tax deadlines',
      'Differentiating expertise and service approach from competitors',
      'Attracting business clients for higher-value advisory services',
      'Building year-round visibility beyond tax season',
      'Competing against online tax software and discount services',
    ],
    solutions: [
      'Optimize for both individual and business tax keywords',
      'Create service-specific pages for tax, bookkeeping, CFO, and advisory services',
      'Develop industry-specific content for target business sectors',
      'Implement year-round content strategy beyond seasonal tax topics',
      'Target high-value business services and strategic advisory keywords',
    ],
    services: [
      'Local SEO for CPA firms',
      'Tax season campaign optimization',
      'Service and industry-specific landing pages',
      'Business advisory content development',
      'Year-round content strategy',
    ],
    icon: 'calculator',
    metaDescription:
      'SEO for CPAs and accounting firms. Generate tax, bookkeeping, and advisory leads while building authority in your specialization areas.',
  },

  // B2B INDUSTRIES
  {
    name: 'Manufacturing Marketing',
    slug: 'manufacturing-marketing',
    category: 'B2B',
    description:
      'Manufacturing companies require specialized marketing to reach procurement professionals, engineers, and decision-makers searching for suppliers, components, and production capabilities. Success demands technical content, industry-specific SEO, and long-term relationship building. Our strategies help manufacturers generate qualified leads, shorten sales cycles, and establish authority in their specializations.',
    challenges: [
      'Reaching technical audiences with complex, specification-driven needs',
      'Long B2B sales cycles requiring sustained engagement',
      'Demonstrating capabilities and quality to procurement professionals',
      'Competing in global markets with domestic and international suppliers',
      'Creating technical content that ranks and converts',
    ],
    solutions: [
      'Optimize for industry-specific technical keywords and product categories',
      'Create detailed capability pages with specifications and certifications',
      'Develop technical content including white papers and case studies',
      'Implement lead nurturing for long B2B buying cycles',
      'Target procurement and engineering search behaviors',
    ],
    services: [
      'B2B SEO for manufacturers',
      'Technical content development',
      'Capability and certification showcasing',
      'Lead generation and nurturing',
      'Industry-specific keyword research',
    ],
    icon: 'gear',
    metaDescription:
      'B2B SEO for manufacturers. Generate qualified leads, reach procurement professionals, and showcase capabilities with technical search marketing.',
  },
  {
    name: 'Animal Health Marketing',
    slug: 'animal-health-marketing',
    category: 'B2B',
    description:
      'Animal health companies serving veterinarians, producers, and pet businesses require specialized B2B marketing reaching professional audiences. Whether selling pharmaceuticals, equipment, or services to vet practices and agricultural operations, success demands industry expertise and relationship-focused strategies. Our approach helps animal health businesses generate qualified leads and establish authority in veterinary and agricultural markets.',
    challenges: [
      'Reaching professional audiences including veterinarians and producers',
      'Navigating regulatory requirements for pharmaceutical and medical products',
      'Demonstrating scientific credibility and research backing',
      'Building relationships in relationship-driven industry',
      'Competing with established brands and large corporations',
    ],
    solutions: [
      'Optimize for veterinary and agricultural professional searches',
      'Create science-backed content demonstrating research and efficacy',
      'Develop educational resources for veterinary and producer audiences',
      'Target practice management and production efficiency keywords',
      'Build authority through industry participation and thought leadership',
    ],
    services: [
      'B2B SEO for animal health companies',
      'Veterinary and agricultural content development',
      'Scientific and technical writing',
      'Educational resource creation',
      'Industry authority building',
    ],
    icon: 'heart-pulse-fill',
    metaDescription:
      'B2B marketing for animal health companies. Reach veterinarians and producers, generate leads, and establish authority in veterinary markets.',
  },
  {
    name: 'Construction Marketing',
    slug: 'construction-marketing',
    category: 'B2B',
    description:
      'General contractors, subcontractors, and construction companies require marketing that reaches project owners, architects, and general contractors for commercial, industrial, and large residential projects. Success demands showcasing completed work, demonstrating capabilities, and building relationships that lead to bid opportunities and contract awards.',
    challenges: [
      'Reaching decision-makers for large commercial and industrial projects',
      'Demonstrating bonding capacity and project experience',
      'Competing for projects in relationship-driven industry',
      'Showcasing diverse capabilities across project types and specializations',
      'Generating prequalification and bid opportunities',
    ],
    solutions: [
      'Create comprehensive portfolio showcasing completed project types',
      'Optimize for commercial construction and project type keywords',
      'Develop capability statements highlighting certifications and bonding',
      'Target architect, developer, and owner search behaviors',
      'Build authority through industry credentials and project success',
    ],
    services: [
      'B2B SEO for construction companies',
      'Project portfolio development and showcasing',
      'Capability and bonding information optimization',
      'Commercial project type landing pages',
      'Prequalification lead generation',
    ],
    icon: 'building',
    metaDescription:
      'B2B marketing for construction companies. Generate commercial project leads, showcase capabilities, and win contracts with strategic marketing.',
  },
];

// Helper function to get industry by slug
export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

// Helper function to get all industry slugs for static generation
export function getAllIndustrySlugs(): string[] {
  return industries.map((industry) => industry.slug);
}

// Helper function to get industries by category
export function getIndustriesByCategory(category: string): Industry[] {
  return industries.filter((industry) => industry.category === category);
}

// Helper function to get all unique categories
export function getIndustryCategories(): string[] {
  return Array.from(new Set(industries.map((industry) => industry.category)));
}

// Helper function to get industry names only
export function getIndustryNames(): string[] {
  return industries.map((industry) => industry.name);
}
