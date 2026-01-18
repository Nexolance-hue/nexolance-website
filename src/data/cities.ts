export interface City {
  name: string;
  slug: string;
  county: string;
  state: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  population: number;
  zipCodes: string[];
  description: string;
  nearbyCities: string[];
  localFacts: string[];
  metaDescription: string;
}

export const kansasCities: City[] = [
  {
    name: 'Leawood',
    slug: 'leawood',
    county: 'Johnson County',
    state: 'Kansas',
    coordinates: {
      latitude: 38.9667,
      longitude: -94.6169,
    },
    population: 33902,
    zipCodes: ['66206', '66209', '66211', '66224'],
    description:
      'Leawood is an affluent suburb in the Kansas City metropolitan area, known for its exceptional quality of life, top-rated schools, and thriving business community. Home to Town Center Plaza and numerous corporate headquarters, Leawood offers a perfect blend of upscale residential neighborhoods and professional services. The city attracts high-end retailers, medical practices, financial services, and professional firms seeking an educated, affluent demographic. With tree-lined streets, excellent infrastructure, and a business-friendly environment, Leawood represents the premier location for businesses targeting discerning clientele in the Kansas City region.',
    nearbyCities: ['Overland Park', 'Prairie Village', 'Kansas City'],
    localFacts: [
      'Home to Town Center Plaza, one of the region\'s premier shopping destinations',
      'Median household income exceeds $150,000, among the highest in Kansas',
      'Corporate headquarters for AMC Theatres and multiple Fortune 500 companies',
      'Consistently ranked among America\'s best places to live',
      'Excellent school district with a 95% graduation rate',
    ],
    metaDescription:
      'Digital marketing and local SEO services in Leawood, KS. Help your business reach affluent customers in Johnson County\'s premier business community.',
  },
  {
    name: 'Overland Park',
    slug: 'overland-park',
    county: 'Johnson County',
    state: 'Kansas',
    coordinates: {
      latitude: 38.9822,
      longitude: -94.6708,
    },
    population: 197238,
    zipCodes: ['66085', '66204', '66207', '66210', '66212', '66213', '66214', '66221', '66223', '66224'],
    description:
      'Overland Park is Kansas\'s second-largest city and a major economic hub in the Kansas City metropolitan area. Known for its strong business climate, the city hosts numerous corporate headquarters, technology companies, and professional services firms. The downtown area features modern office spaces, while suburban corridors support thriving retail, healthcare, and service industries. With a highly educated workforce, excellent infrastructure, and strategic location, Overland Park offers businesses access to a diverse market of 197,000 residents plus the broader KC metro. The city\'s commitment to economic development makes it ideal for companies seeking growth opportunities.',
    nearbyCities: ['Leawood', 'Olathe', 'Lenexa', 'Kansas City'],
    localFacts: [
      'Second-largest city in Kansas with over 197,000 residents',
      'Home to Sprint (now T-Mobile) world headquarters and Black & Veatch',
      'Overland Park Convention Center hosts major regional events',
      'Deanna Rose Children\'s Farmstead attracts 400,000+ annual visitors',
      'Named one of Money Magazine\'s "Best Places to Live" multiple times',
    ],
    metaDescription:
      'Professional SEO and digital marketing services in Overland Park, KS. Reach 197,000+ residents and grow your Johnson County business online.',
  },
  {
    name: 'Wichita',
    slug: 'wichita',
    county: 'Sedgwick County',
    state: 'Kansas',
    coordinates: {
      latitude: 37.6872,
      longitude: -97.3301,
    },
    population: 397532,
    zipCodes: ['67202', '67203', '67204', '67205', '67206', '67207', '67208', '67209', '67210', '67211', '67212', '67213', '67214', '67215', '67216', '67217', '67218', '67219', '67220', '67226', '67228'],
    description:
      'Wichita, the largest city in Kansas, serves as a major center for aircraft manufacturing, healthcare, and professional services. Known as the "Air Capital of the World," Wichita\'s diverse economy includes aerospace giants, healthcare systems, educational institutions, and a growing entrepreneurial scene. The city\'s central location and affordable operating costs attract manufacturers, distributors, and service providers. With nearly 400,000 residents and a metropolitan population exceeding 640,000, Wichita offers businesses substantial market reach. The Old Town entertainment district, expanding downtown, and suburban growth corridors provide opportunities across multiple sectors including retail, hospitality, and professional services.',
    nearbyCities: ['Derby', 'Andover', 'Haysville', 'Park City', 'Maize'],
    localFacts: [
      'Largest city in Kansas with nearly 400,000 residents',
      'Known as "Air Capital of the World" - home to Cessna, Beechcraft, Learjet, and Spirit AeroSystems',
      'Via Christi and Wesley Medical Centers are major regional healthcare providers',
      'Wichita State University enrolls over 15,000 students',
      'Keeper of the Plains sculpture is an iconic 44-foot steel landmark',
    ],
    metaDescription:
      'Local SEO and digital marketing services in Wichita, KS. Connect with 400,000+ residents in Kansas\'s largest city and Air Capital of the World.',
  },
  {
    name: 'Kansas City',
    slug: 'kansas-city',
    county: 'Wyandotte County',
    state: 'Kansas',
    coordinates: {
      latitude: 39.1142,
      longitude: -94.6275,
    },
    population: 156607,
    zipCodes: ['66101', '66102', '66103', '66104', '66105', '66106', '66109', '66111', '66112', '66115', '66118'],
    description:
      'Kansas City, Kansas anchors the western side of the Kansas City metropolitan area, offering a unique blend of urban amenities and industrial strength. Home to major manufacturing facilities, logistics operations, and the Kansas Speedway entertainment district, the city provides diverse business opportunities. The Legends Outlets Kansas City, Village West development, and growing downtown area support retail, hospitality, and service industries. With improving infrastructure and strategic interstate access, Kansas City attracts distribution centers and manufacturing operations. The diverse population of 156,000 residents represents significant market potential for businesses ranging from consumer services to B2B enterprises.',
    nearbyCities: ['Kansas City (MO)', 'Bonner Springs', 'Edwardsville', 'Leavenworth'],
    localFacts: [
      'Home to Kansas Speedway and NASCAR racing events',
      'Village West entertainment district includes Legends Outlets and major attractions',
      'Strategic location at I-70 and I-435 interchange for logistics',
      'University of Kansas Medical Center is a major employer and healthcare provider',
      'Schlitterbahn water park was once the world\'s tallest water slide',
    ],
    metaDescription:
      'SEO and digital marketing services in Kansas City, KS. Grow your Wyandotte County business and reach customers in the KC metro area.',
  },
  {
    name: 'Topeka',
    slug: 'topeka',
    county: 'Shawnee County',
    state: 'Kansas',
    coordinates: {
      latitude: 39.0473,
      longitude: -95.6752,
    },
    population: 126587,
    zipCodes: ['66603', '66604', '66605', '66606', '66607', '66608', '66609', '66610', '66611', '66612', '66614', '66615', '66616', '66617', '66618', '66619', '66621'],
    description:
      'Topeka, the capital of Kansas, combines government operations with diverse private sector industries including healthcare, education, manufacturing, and professional services. As the seat of state government, Topeka hosts numerous agencies, law firms, lobbying organizations, and contractors serving the public sector. The city\'s stable economy also includes major healthcare systems, insurance companies, and distribution facilities. With 126,000 residents and strategic location along I-70, Topeka serves as a regional hub for north-central Kansas. The revitalized downtown area, NOTO Arts District, and growing medical corridor offer opportunities for professional services, retail, and hospitality businesses.',
    nearbyCities: ['Lawrence', 'Manhattan', 'Emporia'],
    localFacts: [
      'Capital of Kansas and home to the State Capitol building',
      'Stormont Vail Health is one of Kansas\'s largest healthcare systems',
      'Historic Brown v. Board of Education National Historic Site',
      'Washburn University enrolls over 6,500 students',
      'NOTO Arts District features galleries, breweries, and creative spaces',
    ],
    metaDescription:
      'Digital marketing and SEO services in Topeka, KS. Connect with customers in Kansas\'s capital city and reach the government and professional services market.',
  },
  {
    name: 'Olathe',
    slug: 'olathe',
    county: 'Johnson County',
    state: 'Kansas',
    coordinates: {
      latitude: 38.8814,
      longitude: -94.8191,
    },
    population: 141290,
    zipCodes: ['66061', '66062', '66063'],
    description:
      'Olathe stands as Johnson County\'s largest city and county seat, offering a dynamic business environment with strong population growth. The city attracts corporate headquarters, manufacturing facilities, healthcare providers, and professional services firms seeking access to an educated workforce and growing consumer base. Olathe\'s strategic location provides excellent highway access while maintaining a suburban character with new residential developments and commercial corridors. Major employers include Garmin International, Honeywell, and rapidly expanding logistics operations. With over 141,000 residents and one of Kansas\'s fastest growth rates, Olathe presents excellent opportunities for businesses in retail, healthcare, professional services, and technology sectors.',
    nearbyCities: ['Overland Park', 'Lenexa', 'Gardner', 'Spring Hill'],
    localFacts: [
      'Largest city in Johnson County and county seat',
      'Garmin International world headquarters employs over 2,500 people',
      'One of Kansas\'s fastest-growing cities',
      'Home to MidAmerica Nazarene University',
      'Historic Old Olathe downtown features preserved 19th-century architecture',
    ],
    metaDescription:
      'Local SEO and digital marketing services in Olathe, KS. Grow your business in Johnson County\'s largest and fastest-growing city.',
  },
  {
    name: 'Lenexa',
    slug: 'lenexa',
    county: 'Johnson County',
    state: 'Kansas',
    coordinates: {
      latitude: 38.9536,
      longitude: -94.7336,
    },
    population: 57434,
    zipCodes: ['66215', '66219', '66220', '66227', '66285'],
    description:
      'Lenexa combines suburban charm with significant commercial and industrial development, making it a prime business location in Johnson County. The city hosts numerous corporate headquarters, technology companies, logistics facilities, and professional services firms. Lenexa\'s City Center development features modern office space, retail, and dining options in a walkable urban setting. Major employers include Kiewit Corporation, Digital Ally, and various distribution centers taking advantage of excellent highway access. With 57,000 residents, strong business incentives, and proximity to Kansas City, Lenexa attracts businesses seeking a professional environment with suburban appeal. The city\'s commitment to economic development and quality infrastructure makes it ideal for growing companies.',
    nearbyCities: ['Overland Park', 'Olathe', 'Shawnee', 'Merriam'],
    localFacts: [
      'Home to Lenexa City Center, a vibrant mixed-use development',
      'Annual Spinach Festival celebrates the city\'s agricultural heritage',
      'Kiewit Corporation national headquarters located here',
      'Extensive trail system connects parks and neighborhoods',
      'Named one of America\'s "Best Small Cities" by WalletHub',
    ],
    metaDescription:
      'Professional SEO and digital marketing in Lenexa, KS. Help your Johnson County business reach customers in this thriving corporate community.',
  },
  {
    name: 'Shawnee',
    slug: 'shawnee',
    county: 'Johnson County',
    state: 'Kansas',
    coordinates: {
      latitude: 39.0228,
      longitude: -94.7202,
    },
    population: 67311,
    zipCodes: ['66203', '66216', '66217', '66218', '66226', '66227'],
    description:
      'Shawnee offers a family-friendly environment with strong commercial corridors serving both residents and businesses throughout western Johnson County. The city features established retail areas along Shawnee Mission Parkway, growing healthcare services, and diverse professional service providers. With excellent schools, parks, and community amenities, Shawnee attracts families and businesses seeking a suburban setting with urban conveniences. The city\'s 67,000 residents provide a stable customer base for retail, dining, healthcare, and service businesses. Strategic location between Kansas City and other Johnson County cities offers businesses access to the broader metropolitan market while maintaining a community-focused identity.',
    nearbyCities: ['Lenexa', 'Overland Park', 'Merriam', 'Kansas City'],
    localFacts: [
      'Third-largest city in Johnson County',
      'Shawnee Mission Park offers 1,655 acres of recreation',
      'Strong youth sports programs attract families regionwide',
      'Historic downtown area features local shops and restaurants',
      'Home to Wonderscope Children\'s Museum',
    ],
    metaDescription:
      'Local SEO services in Shawnee, KS. Connect with 67,000+ residents and grow your Johnson County business with targeted digital marketing.',
  },
  {
    name: 'Lawrence',
    slug: 'lawrence',
    county: 'Douglas County',
    state: 'Kansas',
    coordinates: {
      latitude: 38.9717,
      longitude: -95.2353,
    },
    population: 94934,
    zipCodes: ['66044', '66045', '66046', '66047', '66049'],
    description:
      'Lawrence combines a vibrant college town atmosphere with diverse economic sectors including technology, healthcare, manufacturing, and professional services. Home to the University of Kansas with over 28,000 students, the city benefits from an educated workforce, research collaboration opportunities, and consistent consumer demand. Downtown Lawrence\'s historic Massachusetts Street features thriving local businesses, restaurants, and cultural venues. Beyond the university, Lawrence hosts manufacturing facilities, healthcare providers, and growing technology companies. The city\'s 95,000 residents plus student population create a dynamic market for businesses ranging from retail and hospitality to professional services and tech startups. Lawrence\'s progressive culture and entrepreneurial spirit foster business innovation.',
    nearbyCities: ['Topeka', 'Eudora', 'Baldwin City'],
    localFacts: [
      'Home to the University of Kansas with 28,000+ students',
      'Massachusetts Street is one of America\'s "Great Streets"',
      'Historic downtown features over 200 locally-owned businesses',
      'Allen Fieldhouse is one of college basketball\'s most iconic venues',
      'Thriving arts and music scene with numerous venues and festivals',
    ],
    metaDescription:
      'SEO and digital marketing services in Lawrence, KS. Reach 95,000+ residents plus 28,000 KU students in Douglas County\'s vibrant college town.',
  },
  {
    name: 'Manhattan',
    slug: 'manhattan',
    county: 'Riley County',
    state: 'Kansas',
    coordinates: {
      latitude: 39.1836,
      longitude: -96.5717,
    },
    population: 54100,
    zipCodes: ['66502', '66503', '66505', '66506'],
    description:
      'Manhattan, known as "The Little Apple," serves as a regional center for education, agriculture, government, and professional services in northeast Kansas. Home to Kansas State University with over 21,000 students, the city benefits from research activities, an educated workforce, and steady population growth. Fort Riley military installation adds 12,000 active-duty personnel, creating demand for housing, retail, and services. Downtown Manhattan features Aggieville entertainment district and a revitalized historic area with local businesses. The city\'s diverse economy includes university research, government contractors, agricultural technology, healthcare, and professional services. Manhattan\'s stable economy and quality of life attract businesses serving both civilian and military markets.',
    nearbyCities: ['Junction City', 'Wamego', 'Ogden'],
    localFacts: [
      'Home to Kansas State University with 21,000+ students',
      'Fort Riley military base brings 12,000+ active-duty personnel',
      'Aggieville is one of the oldest shopping districts in Kansas',
      'Flint Hills Discovery Center showcases the tallest remaining tallgrass prairie',
      'Biosecurity Research Institute conducts cutting-edge disease research',
    ],
    metaDescription:
      'Digital marketing and local SEO in Manhattan, KS. Grow your business in Riley County and reach university, military, and agricultural markets.',
  },
  {
    name: 'Salina',
    slug: 'salina',
    county: 'Saline County',
    state: 'Kansas',
    coordinates: {
      latitude: 38.8403,
      longitude: -97.6114,
    },
    population: 46889,
    zipCodes: ['67401', '67402'],
    description:
      'Salina functions as a regional hub for central Kansas, offering healthcare, retail, manufacturing, and distribution services to a broad geographic area. The city\'s strategic location at the intersection of I-70 and I-135 makes it ideal for logistics and distribution operations. Major employers include Schwan\'s Food Manufacturing, Tony\'s Pizza, Great Plains Manufacturing, and regional healthcare systems. With 47,000 residents, Salina serves as the commercial center for surrounding rural communities, supporting agricultural suppliers, professional services, and retail businesses. The downtown area features historic architecture and local businesses, while commercial corridors provide modern facilities. Salina\'s affordable operating costs and central location attract manufacturers and distribution companies.',
    nearbyCities: ['Abilene', 'McPherson', 'Hutchinson'],
    localFacts: [
      'Regional hub for healthcare, retail, and services in central Kansas',
      'Major food manufacturing center with Schwan\'s and Tony\'s Pizza',
      'Salina Regional Health Center serves 23-county region',
      'Kansas Wesleyan University located downtown',
      'Rolling Hills Zoo is one of Kansas\'s premier wildlife attractions',
    ],
    metaDescription:
      'Local SEO and digital marketing in Salina, KS. Connect with customers throughout central Kansas and grow your Saline County business.',
  },
  {
    name: 'Hutchinson',
    slug: 'hutchinson',
    county: 'Reno County',
    state: 'Kansas',
    coordinates: {
      latitude: 38.0608,
      longitude: -97.9298,
    },
    population: 40006,
    zipCodes: ['67501', '67502', '67504'],
    description:
      'Hutchinson combines agricultural heritage with diverse manufacturing, healthcare, and tourism sectors in south-central Kansas. The city hosts major salt mining operations, grain processing facilities, and manufacturing plants serving agricultural and industrial markets. The Kansas State Fair brings 350,000 annual visitors, supporting hospitality and retail businesses. Strataca underground salt mine museum and Kansas Cosmosphere space museum attract tourists year-round. With 40,000 residents, Hutchinson serves as a regional center for healthcare, retail, and professional services. The city\'s affordable costs, available workforce, and strong manufacturing base make it attractive for industrial operations while supporting diverse local businesses from restaurants to professional firms.',
    nearbyCities: ['McPherson', 'Newton', 'South Hutchinson'],
    localFacts: [
      'Home to the Kansas Cosmosphere, one of the world\'s premier space museums',
      'Strataca underground salt mine museum located 650 feet below ground',
      'Kansas State Fair held annually, attracting 350,000+ visitors',
      'Major salt mining operations with extensive underground facilities',
      'Hutchinson Community College serves over 5,000 students',
    ],
    metaDescription:
      'SEO and digital marketing services in Hutchinson, KS. Reach 40,000+ residents and grow your Reno County business with local search optimization.',
  },
  {
    name: 'Garden City',
    slug: 'garden-city',
    county: 'Finney County',
    state: 'Kansas',
    coordinates: {
      latitude: 37.9717,
      longitude: -100.8726,
    },
    population: 28151,
    zipCodes: ['67846'],
    description:
      'Garden City serves as the commercial and cultural hub of southwest Kansas, with a diverse economy anchored by agriculture, manufacturing, and energy sectors. The city hosts major beef processing facilities, agricultural services, healthcare providers, and retail businesses serving a broad regional market. Garden City\'s multicultural population reflects its agricultural workforce, creating opportunities for diverse retail, services, and restaurants. The Lee Richardson Zoo, Buffalo Dunes Golf Course, and recreational amenities attract visitors. With 28,000 residents and serving as a regional center, Garden City supports businesses in healthcare, professional services, retail, and agriculture-related industries. The city\'s location and affordable operating environment appeal to companies serving western Kansas.',
    nearbyCities: ['Dodge City', 'Liberal', 'Ulysses'],
    localFacts: [
      'Regional center for southwest Kansas agriculture and cattle industry',
      'Lee Richardson Zoo is western Kansas\'s largest zoological park',
      'Major beef processing and agricultural manufacturing center',
      'Garden City Community College serves students from 33 countries',
      'Buffalo Dunes Golf Course offers championship-level play',
    ],
    metaDescription:
      'Local SEO services in Garden City, KS. Grow your Finney County business and reach customers throughout southwest Kansas.',
  },
  {
    name: 'Dodge City',
    slug: 'dodge-city',
    county: 'Ford County',
    state: 'Kansas',
    coordinates: {
      latitude: 37.7528,
      longitude: -100.0171,
    },
    population: 27788,
    zipCodes: ['67801'],
    description:
      'Dodge City blends Old West heritage with modern agriculture and manufacturing industries in southwest Kansas. Famous for its frontier history, the city now anchors a region dominated by cattle feeding, beef processing, and agricultural support services. Major employers include National Beef Packing Company and numerous feedlots, grain facilities, and agricultural suppliers. With nearly 28,000 residents, Dodge City provides healthcare, retail, and professional services to surrounding rural areas. Boot Hill Museum and historic downtown attract tourists, supporting hospitality businesses. The city\'s agricultural focus creates opportunities for veterinary services, equipment suppliers, financial services, and B2B companies. Dodge City\'s strong work ethic and central location make it viable for agricultural and industrial operations.',
    nearbyCities: ['Garden City', 'Liberal', 'Cimarron'],
    localFacts: [
      'Famous Old West town featured in numerous films and TV shows',
      'Boot Hill Museum preserves frontier history and attracts tourists',
      'Major cattle feeding and beef processing center',
      'National Beef Packing Company is one of the world\'s largest beef producers',
      'Historic Front Street reconstruction features saloons and shops',
    ],
    metaDescription:
      'Digital marketing and SEO in Dodge City, KS. Connect with customers in Ford County and grow your business in southwest Kansas.',
  },
  {
    name: 'Leavenworth',
    slug: 'leavenworth',
    county: 'Leavenworth County',
    state: 'Kansas',
    coordinates: {
      latitude: 39.3111,
      longitude: -94.9225,
    },
    population: 37351,
    zipCodes: ['66048'],
    description:
      'Leavenworth combines historic character with modern economic activity driven by Fort Leavenworth military installation and diverse civilian businesses. As Kansas\'s oldest city, Leavenworth features historic downtown architecture alongside growing commercial corridors. The military installation brings thousands of soldiers, contractors, and civilian employees, creating steady demand for housing, retail, restaurants, and professional services. Beyond military-related business, Leavenworth supports manufacturing, healthcare, and regional retail serving Leavenworth County. The city\'s 37,000 residents plus military population offer substantial market potential. Historic attractions, riverfront development, and proximity to Kansas City metro attract visitors and businesses. Companies serving government contracts, military families, or regional consumers find opportunities in Leavenworth.',
    nearbyCities: ['Lansing', 'Tonganoxie', 'Kansas City'],
    localFacts: [
      'Oldest city in Kansas, founded in 1854',
      'Home to Fort Leavenworth, the Army\'s oldest active installation',
      'U.S. Disciplinary Barracks and federal prison located here',
      'Historic downtown features Victorian architecture and antique shops',
      'Command and General Staff College trains military officers from around the world',
    ],
    metaDescription:
      'SEO and digital marketing in Leavenworth, KS. Grow your business and reach military and civilian customers in Leavenworth County.',
  },
];

// Helper function to get city by slug
export function getCityBySlug(slug: string): City | undefined {
  return kansasCities.find((city) => city.slug === slug);
}

// Helper function to get all city slugs for static generation
export function getAllCitySlugs(): string[] {
  return kansasCities.map((city) => city.slug);
}

// Helper function to get nearby cities data
export function getNearbyCities(citySlug: string): City[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];

  return city.nearbyCities
    .map((nearbyName) => {
      const slug = nearbyName.toLowerCase().replace(/\s+/g, '-');
      return getCityBySlug(slug);
    })
    .filter((c): c is City => c !== undefined);
}
