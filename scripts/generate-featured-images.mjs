/**
 * Nexolance Featured & OG Image Generator
 * Generates branded 1200x630 WebP images for all website pages.
 *
 * Usage: node scripts/generate-featured-images.mjs
 */

import { createCanvas } from 'canvas';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'featured');

// ─── Brand Constants ─────────────────────────────────────────────
const WIDTH = 1200;
const HEIGHT = 630;
const BG_COLOR_START = '#0D1117';
const BG_COLOR_END = '#1a1f2e';
const ACCENT_GREEN = '#10B981';
const ACCENT_BLUE = '#3B82F6';
const TEXT_WHITE = '#FFFFFF';
const TEXT_MUTED = 'rgba(255, 255, 255, 0.5)';
const BRANDING_TEXT = 'N E X O L A N C E . A G E N C Y';

// ─── Data ─────────────────────────────────────────────────────────
const cities = [
  { name: 'Leawood', slug: 'leawood' },
  { name: 'Overland Park', slug: 'overland-park' },
  { name: 'Wichita', slug: 'wichita' },
  { name: 'Kansas City', slug: 'kansas-city' },
  { name: 'Topeka', slug: 'topeka' },
  { name: 'Olathe', slug: 'olathe' },
  { name: 'Lenexa', slug: 'lenexa' },
  { name: 'Shawnee', slug: 'shawnee' },
  { name: 'Lawrence', slug: 'lawrence' },
  { name: 'Manhattan', slug: 'manhattan' },
  { name: 'Salina', slug: 'salina' },
  { name: 'Hutchinson', slug: 'hutchinson' },
  { name: 'Garden City', slug: 'garden-city' },
  { name: 'Dodge City', slug: 'dodge-city' },
  { name: 'Leavenworth', slug: 'leavenworth' },
];

const services = [
  { name: 'SEO Services', slug: 'seo-services' },
  { name: 'Landing Page Optimization', slug: 'landing-page-optimization' },
  { name: 'E-commerce SEO', slug: 'ecommerce-seo' },
  { name: 'Local SEO', slug: 'local-seo' },
  { name: 'Website Design & Development', slug: 'website-design-development' },
];

const industries = [
  { name: 'Personal Injury Law', slug: 'personal-injury-law', category: 'Legal' },
  { name: 'Criminal Defense', slug: 'criminal-defense', category: 'Legal' },
  { name: 'Family Law', slug: 'family-law', category: 'Legal' },
  { name: 'Estate Planning', slug: 'estate-planning', category: 'Legal' },
  { name: 'Dental Clinics', slug: 'dental-clinics', category: 'Medical' },
  { name: 'Cosmetic Surgery', slug: 'cosmetic-surgery', category: 'Medical' },
  { name: 'Chiropractic Care', slug: 'chiropractic-care', category: 'Medical' },
  { name: 'Med Spa', slug: 'med-spa', category: 'Medical' },
  { name: 'Veterinary Services', slug: 'veterinary-services', category: 'Medical' },
  { name: 'HVAC Services', slug: 'hvac-services', category: 'Home Services' },
  { name: 'Roofing Companies', slug: 'roofing-companies', category: 'Home Services' },
  { name: 'Plumbing Services', slug: 'plumbing-services', category: 'Home Services' },
  { name: 'Electrical Contractors', slug: 'electrical-contractors', category: 'Home Services' },
  { name: 'Home Remodeling', slug: 'home-remodeling', category: 'Home Services' },
  { name: 'Landscaping & Design', slug: 'landscaping-design', category: 'Home Services' },
  { name: 'Real Estate', slug: 'real-estate', category: 'Professional' },
  { name: 'Financial Planning', slug: 'financial-planning', category: 'Professional' },
  { name: 'Insurance Agencies', slug: 'insurance-agencies', category: 'Professional' },
  { name: 'Accounting & CPA', slug: 'accounting-cpa', category: 'Professional' },
  { name: 'Manufacturing Marketing', slug: 'manufacturing-marketing', category: 'B2B' },
  { name: 'Animal Health Marketing', slug: 'animal-health-marketing', category: 'B2B' },
  { name: 'Construction Marketing', slug: 'construction-marketing', category: 'B2B' },
];

// ─── Drawing Helpers ──────────────────────────────────────────────

function drawBackground(ctx) {
  // Main gradient
  const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  grad.addColorStop(0, BG_COLOR_START);
  grad.addColorStop(1, BG_COLOR_END);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Green accent orb (top-right)
  const orbGrad = ctx.createRadialGradient(WIDTH * 0.85, HEIGHT * 0.1, 0, WIDTH * 0.85, HEIGHT * 0.1, 300);
  orbGrad.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
  orbGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = orbGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Blue accent orb (bottom-left)
  const blueOrb = ctx.createRadialGradient(WIDTH * 0.15, HEIGHT * 0.9, 0, WIDTH * 0.15, HEIGHT * 0.9, 250);
  blueOrb.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
  blueOrb.addColorStop(1, 'transparent');
  ctx.fillStyle = blueOrb;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle geometric grid pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < WIDTH; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y < HEIGHT; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }

  // Accent line at top
  const lineGrad = ctx.createLinearGradient(0, 0, WIDTH, 0);
  lineGrad.addColorStop(0, 'transparent');
  lineGrad.addColorStop(0.3, ACCENT_GREEN);
  lineGrad.addColorStop(0.7, ACCENT_BLUE);
  lineGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, 0, WIDTH, 3);
}

function wrapText(ctx, text, maxWidth, fontSize) {
  ctx.font = `bold ${fontSize}px "Helvetica Neue", Arial, sans-serif`;
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines;
}

function drawTitle(ctx, title, subtitle) {
  const maxWidth = WIDTH - 160; // 80px padding each side
  let fontSize = 52;
  let lines;

  // Auto-reduce font size if text doesn't fit in 3 lines
  while (fontSize >= 28) {
    lines = wrapText(ctx, title, maxWidth, fontSize);
    if (lines.length <= 3) break;
    fontSize -= 2;
  }

  const lineHeight = fontSize * 1.3;
  const totalTextHeight = lines.length * lineHeight + (subtitle ? 40 : 0);
  let startY = (HEIGHT - totalTextHeight) / 2;

  // Draw title lines
  ctx.fillStyle = TEXT_WHITE;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = `bold ${fontSize}px "Helvetica Neue", Arial, sans-serif`;

  // Text shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;

  for (const line of lines) {
    ctx.fillText(line, WIDTH / 2, startY);
    startY += lineHeight;
  }

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Draw subtitle
  if (subtitle) {
    ctx.font = `500 ${Math.max(18, fontSize * 0.4)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle = ACCENT_GREEN;
    startY += 10;
    ctx.fillText(subtitle, WIDTH / 2, startY);
  }
}

function drawBranding(ctx) {
  // Bottom branding
  ctx.font = `600 13px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = TEXT_MUTED;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(BRANDING_TEXT, WIDTH / 2, HEIGHT - 28);

  // Bottom accent line
  const lineGrad = ctx.createLinearGradient(WIDTH * 0.3, 0, WIDTH * 0.7, 0);
  lineGrad.addColorStop(0, 'transparent');
  lineGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.3)');
  lineGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = lineGrad;
  ctx.fillRect(WIDTH * 0.3, HEIGHT - 20, WIDTH * 0.4, 1);
}

async function generateImage(title, subtitle, slug) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  drawBackground(ctx);
  drawTitle(ctx, title, subtitle);
  drawBranding(ctx);

  const outputPath = path.join(OUTPUT_DIR, `${slug}.webp`);
  const pngBuffer = canvas.toBuffer('image/png');
  const webpBuffer = await sharp(pngBuffer).webp({ quality: 85 }).toBuffer();
  fs.writeFileSync(outputPath, webpBuffer);

  return outputPath;
}

// ─── Page Definitions ─────────────────────────────────────────────

function buildPageList() {
  const pages = [];

  // Static pages
  pages.push({
    title: 'Kansas City Web Design & Local SEO Experts',
    subtitle: 'Nexolance Digital Marketing',
    slug: 'home',
  });

  pages.push({
    title: 'About Nexolance',
    subtitle: 'Kansas City Digital Marketing Agency',
    slug: 'about-us',
  });

  pages.push({
    title: 'Get a Free Quote',
    subtitle: 'Nexolance Digital Marketing Services',
    slug: 'quote',
  });

  pages.push({
    title: 'Digital Marketing Services',
    subtitle: 'Web Design & SEO',
    slug: 'services',
  });

  pages.push({
    title: 'Kansas Cities We Serve',
    subtitle: 'Local SEO Services',
    slug: 'kansas-directory',
  });

  pages.push({
    title: 'Client Reviews & Testimonials',
    subtitle: 'Nexolance',
    slug: 'testimonials',
  });

  pages.push({
    title: 'Free SEO Audit Tool',
    subtitle: 'Instant Analysis for Kansas Businesses',
    slug: 'tools-seo-audit',
  });

  // Individual service pages
  for (const service of services) {
    pages.push({
      title: service.name,
      subtitle: 'Nexolance Kansas City',
      slug: `services-${service.slug}`,
    });
  }

  // City hub pages
  for (const city of cities) {
    pages.push({
      title: `${city.name}, Kansas`,
      subtitle: 'Digital Marketing & SEO Services',
      slug: `kansas-${city.slug}`,
    });
  }

  // City + Service pages (75 total)
  for (const city of cities) {
    for (const service of services) {
      pages.push({
        title: `${service.name} in ${city.name}, Kansas`,
        subtitle: 'Nexolance',
        slug: `kansas-${city.slug}-${service.slug}`,
      });
    }
  }

  // City + Industry pages (330 total)
  for (const city of cities) {
    for (const industry of industries) {
      pages.push({
        title: `${industry.name} SEO in ${city.name}, KS`,
        subtitle: `${industry.category} Marketing`,
        slug: `kansas-${city.slug}-local-seo-${industry.slug}`,
      });
    }
  }

  return pages;
}

// ─── Main ─────────────────────────────────────────────────────────

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const pages = buildPageList();
  console.log(`Generating ${pages.length} featured images...\n`);

  let generated = 0;
  const startTime = Date.now();

  for (const page of pages) {
    await generateImage(page.title, page.subtitle, page.slug);
    generated++;

    // Progress indicator every 50 images
    if (generated % 50 === 0) {
      console.log(`  [${generated}/${pages.length}] Generated...`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nDone! Generated ${generated} images in ${elapsed}s`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

main();
