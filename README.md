# Nexolance Local SEO Website

A comprehensive local SEO website built with modern web technologies, featuring 457 static pages covering Kansas cities, services, and industry-specific SEO solutions.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Bootstrap 5 + SCSS
- **Rendering**: Static Site Generation (SSG)
- **Package Manager**: npm

## Project Structure

```
nexolance-website/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx            # Root layout with Bootstrap
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.scss          # Global styles & Bootstrap customization
│   │   ├── about/                # About page
│   │   ├── quote/                # Quote request page
│   │   ├── services/             # Services pages
│   │   │   └── [service]/        # Dynamic service pages
│   │   └── kansas/               # Kansas location pages
│   │       ├── directory/        # Kansas cities directory
│   │       └── [city]/           # Dynamic city pages
│   │           ├── [service]/    # City-specific services
│   │           └── local-seo/
│   │               └── [industry]/ # Industry-specific SEO pages
│   ├── components/
│   │   ├── layout/               # Layout components (Header, Footer, etc.)
│   │   ├── seo/                  # SEO components
│   │   ├── templates/            # Page templates
│   │   └── ui/                   # Reusable UI components
│   ├── data/
│   │   ├── cities.ts             # Kansas cities data
│   │   ├── services.ts           # Services data
│   │   └── industries.ts         # Industries data
│   ├── lib/
│   │   └── seo-config.ts         # SEO configuration
│   └── utils/                    # Utility functions
├── public/                       # Static assets
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies
```

## Page Structure (457 Total Pages)

1. **Core Pages** (3 pages)
   - Homepage
   - About
   - Quote Request

2. **Services Pages** (~20 pages)
   - Services overview
   - Individual service pages (SEO, Web Design, PPC, etc.)

3. **Kansas Location Pages** (434 pages)
   - Kansas directory page
   - City pages (62 cities)
   - City + Service pages (62 × 5 = 310 pages)
   - City + Industry SEO pages (62 × 1 = 62 pages)

## Setup Instructions

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nexolance-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

Generate static site:
```bash
npm run build
```

The static files will be generated in the `out/` directory.

### Preview Production Build

```bash
npm run start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (generates static site)
- `npm run start` - Preview production build
- `npm run lint` - Run ESLint

## Bootstrap Customization

Custom brand colors are defined in [src/app/globals.scss](src/app/globals.scss):
- Primary: `#10B981` (Green)
- Secondary: `#0B1120` (Dark Navy)

## Development Roadmap

- [ ] Create data files (cities, services, industries)
- [ ] Build reusable components
- [ ] Implement page templates
- [ ] Add SEO configuration
- [ ] Generate all 457 static pages
- [ ] Add content management
- [ ] Implement contact forms
- [ ] Add analytics
- [ ] Optimize performance
- [ ] Deploy to hosting

## License

MIT
