import type { Metadata } from 'next';
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { defaultMetadata } from '@/lib/seo-config';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* SEO Audit Software Widget - CSS */}
        <link rel="stylesheet" type="text/css" href="https://api.seoaudit.software/files/widget/v3.1/css/style.min.css" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* SEO Audit Software Widget - JavaScript */}
        <Script
          src="https://api.seoaudit.software/files/widget/v3.1/js/api.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
