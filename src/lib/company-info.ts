/**
 * Nexolance Company Information
 * Central source of truth for all company contact details and social links
 */

export const COMPANY_INFO = {
  name: 'Nexolance',
  legalName: 'Nexolance LLC',

  // Primary Business Information
  type: 'Internet marketing service',

  // Contact Information
  phone: {
    raw: '+18163679231',
    display: '(816) 367-9231',
    href: 'tel:+18163679231',
  },

  email: {
    general: 'info@nexolance.agency',
    contact: 'contact@nexolance.agency',
    support: 'support@nexolance.agency',
  },

  // Physical Address
  address: {
    street: '8301 State Line Rd',
    suite: 'Ste 220 2665',
    city: 'Kansas City',
    state: 'Missouri',
    stateCode: 'MO',
    zip: '64114',
    country: 'United States',
    countryCode: 'US',
    full: '8301 State Line Rd Ste 220 2665, Kansas City, MO 64114, United States',
  },

  // Geographic Coordinates (for Kansas City, MO office)
  coordinates: {
    latitude: 39.0167,
    longitude: -94.6055,
  },

  // Business Hours
  hours: {
    weekdays: 'Monday - Friday: 9:00 AM - 5:00 PM CST',
    timezone: 'America/Chicago',
  },

  // Social Media & Online Presence
  social: {
    linkedin: 'https://www.linkedin.com/company/nexolance',
    twitter: 'https://twitter.com/nexolance',
    twitterHandle: '@nexolance',
    facebook: 'https://www.facebook.com/nexolance',
  },

  // Review & Directory Sites
  directories: {
    clutch: 'https://clutch.co/profile/nexolance',
    yelp: 'https://www.yelp.com/biz/nexolance-kansas-city',
    googleBusiness: 'https://g.page/nexolance', // Placeholder - update with actual GBP URL
  },

  // Website URLs
  urls: {
    website: 'https://nexolance.agency',
    logo: 'https://nexolance.agency/images/nexolance-logo.webp',
    defaultImage: 'https://nexolance.agency/images/og-default.jpg',
  },

  // Aggregate Ratings (consistent across all schema)
  aggregateRating: {
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
} as const;

// Helper functions for formatted output
export function getFormattedPhone(): string {
  return COMPANY_INFO.phone.display;
}

export function getPhoneHref(): string {
  return COMPANY_INFO.phone.href;
}

export function getFullAddress(): string {
  return COMPANY_INFO.address.full;
}

export function getShortAddress(): string {
  return `${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.stateCode}`;
}

export function getEmail(type: 'general' | 'contact' | 'support' = 'general'): string {
  return COMPANY_INFO.email[type];
}
