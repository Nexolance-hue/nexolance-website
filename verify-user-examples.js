/**
 * Compare implementation against user's exact examples from Batch 3 specification
 */

// User's exact examples from their specification
const userExamples = [
  {
    city: 'Wichita',
    service: 'SEO Services',
    title: 'SEO Services in Wichita, Kansas | Nexolance | More Traffic',
    description: 'Expert SEO in Wichita, KS. Increase rankings and traffic. Serving Wichita businesses with proven strategies. Free audit.',
  },
  {
    city: 'Overland Park',
    service: 'Landing Page Optimization',
    title: 'Landing Pages in Overland Park, KS | Nexolance | More Leads',
    description: 'Professional landing pages in Overland Park. Drive conversions for KC metro businesses. Proven strategies. Free quote.',
  },
  {
    city: 'Kansas City',
    service: 'E-commerce SEO',
    title: 'E-commerce SEO in Kansas City, KS | Nexolance | More Sales',
    description: 'Expert e-commerce SEO in Kansas City. Increase product rankings and sales. Online store specialist. Free consultation.',
  },
  {
    city: 'Topeka',
    service: 'Local SEO',
    title: 'Local SEO in Topeka, Kansas | Nexolance | More Calls',
    description: 'Professional local SEO in Topeka, KS. Dominate capital city searches. More calls and foot traffic. Free quote today.',
  },
];

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║              BATCH 3: Verify Against User\'s Exact Examples                  ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

userExamples.forEach((example, index) => {
  console.log(`\n${index + 1}. ${example.city} - ${example.service}`);
  console.log('─'.repeat(80));
  console.log(`   Title: ${example.title}`);
  console.log(`   Length: ${example.title.length} characters`);
  console.log(`   Has "in": ${example.title.includes(' in ') ? '✅' : '❌'}`);
  console.log(`   In range (55-60): ${example.title.length >= 55 && example.title.length <= 60 ? '✅' : '❌'}`);
  console.log(`\n   Description: ${example.description}`);
  console.log(`   Length: ${example.description.length} characters`);
  console.log(`   In range (150-155): ${example.description.length >= 150 && example.description.length <= 155 ? '✅' : '❌'}`);
});

console.log('\n\n╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║                         CHARACTER COUNT ANALYSIS                             ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

// Analyze title structure
const sampleTitle = 'SEO Services in Wichita, Kansas | Nexolance | More Traffic';
const parts = {
  'Service': 'SEO Services',
  'in': ' in ',
  'City': 'Wichita',
  ', State': ', Kansas',
  ' | Nexolance | ': ' | Nexolance | ',
  'Benefit': 'More Traffic',
};

console.log('Title Structure Breakdown:');
Object.entries(parts).forEach(([label, text]) => {
  console.log(`  ${label.padEnd(20)}: "${text}" (${text.length} chars)`);
});

console.log(`\n  TOTAL: ${sampleTitle.length} characters`);

console.log('\n\nFixed Parts (same for all titles):');
console.log(`  " in " = 4 chars`);
console.log(`  ", " = 2 chars`);
console.log(`  " | Nexolance | " = 15 chars`);
console.log(`  FIXED TOTAL = 21 chars`);

console.log('\n\nVariable Parts:');
console.log('  Service Name:');
console.log('    - "SEO Services" = 12 chars');
console.log('    - "Landing Pages" = 13 chars');
console.log('    - "E-commerce SEO" = 14 chars');
console.log('    - "Local SEO" = 9 chars');

console.log('\n  City Names (range):');
console.log('    - Shortest: "Olathe" = 6 chars');
console.log('    - Longest: "Overland Park" = 13 chars');

console.log('\n  State:');
console.log('    - "KS" = 2 chars');
console.log('    - "Kansas" = 6 chars');

console.log('\n  Benefit Words (current implementation):');
console.log('    - SEO Services: "Rank Higher", "Get Found", "More Traffic", "Grow Traffic" (9-12 chars)');
console.log('    - Landing Pages: "Boost Sales", "More Leads", "Higher ROI", "Get Leads" (9-11 chars)');
console.log('    - E-commerce SEO: "More Sales", "More Orders", "Boost Sales", "Drive Sales" (9-11 chars)');
console.log('    - Local SEO: "Get Customers", "Dominate Local", "More Calls", "Get Clients" (9-14 chars)');

console.log('\n\n╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║                        TITLE LENGTH CALCULATION                              ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

console.log('Shortest Possible Title:');
console.log('  "Local SEO" (9) + " in " (4) + "Olathe" (6) + ", " (2) + "KS" (2) + " | Nexolance | " (15) + "Get Clients" (11)');
console.log('  = 9 + 4 + 6 + 2 + 2 + 15 + 11 = 49 characters ❌ TOO SHORT\n');

console.log('Longest Possible Title:');
console.log('  "E-commerce SEO" (14) + " in " (4) + "Overland Park" (13) + ", " (2) + "Kansas" (6) + " | Nexolance | " (15) + "Dominate Local" (14)');
console.log('  = 14 + 4 + 13 + 2 + 6 + 15 + 14 = 68 characters ❌ TOO LONG\n');

console.log('\n📌 CONCLUSION:');
console.log('The 55-60 character constraint CANNOT be met for all 60 combinations');
console.log('given the fixed template structure and city name variations.\n');
console.log('Options:');
console.log('  1. Accept that some titles will be 48-61 characters (still good for SEO)');
console.log('  2. Modify template structure (remove brand or benefit)');
console.log('  3. Use different templates for short vs long city names\n');
