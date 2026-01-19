import { ErrorDisplay } from '@/components/errors/ErrorDisplay';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Nexolance',
  description: 'The page you are looking for could not be found.'
};

export default function NotFound() {
  return (
    <ErrorDisplay
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved."
      statusCode={404}
      showHomeButton={true}
      showRefreshButton={false}
      showContactButton={false}
    >
      <div className="rounded-3 p-4 mb-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
        <h3 className="text-white fw-semibold mb-3 h5">
          Looking for something specific?
        </h3>
        <ul className="list-unstyled mb-0" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          <li className="mb-2">
            <Link href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              → Go to Homepage
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/services" className="text-decoration-none" style={{ color: 'inherit' }}>
              → View Our Services
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/tools/seo-audit" className="text-decoration-none" style={{ color: 'inherit' }}>
              → Free SEO Audit Tool
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-decoration-none" style={{ color: 'inherit' }}>
              → Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </ErrorDisplay>
  );
}
