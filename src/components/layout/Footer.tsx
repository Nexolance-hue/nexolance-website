import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { services } from '@/data/services';
import { kansasCities } from '@/data/cities';
import { COMPANY_INFO } from '@/lib/company-info';

export default function Footer() {
  // Get featured cities by population
  const featuredCities = [...kansasCities]
    .sort((a, b) => b.population - a.population)
    .slice(0, 6);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row className="py-5">
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <div className="mb-3">
              <Image
                src="/images/nexolance-logo.webp"
                alt="Nexolance Logo"
                width={200}
                height={50}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="text-light opacity-75">
              Professional digital marketing and local SEO services helping
              Kansas businesses dominate local search and grow revenue.
            </p>
            <div className="mt-3">
              <p className="text-light mb-1">
                <strong>Phone:</strong>{' '}
                <a href={COMPANY_INFO.phone.href} className="text-light text-decoration-none">
                  {COMPANY_INFO.phone.display}
                </a>
              </p>
              <p className="text-light mb-1">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${COMPANY_INFO.email.general}`} className="text-light text-decoration-none">
                  {COMPANY_INFO.email.general}
                </a>
              </p>
              <p className="text-light mb-0 small">
                {COMPANY_INFO.address.street} {COMPANY_INFO.address.suite}<br />
                {COMPANY_INFO.address.city}, {COMPANY_INFO.address.stateCode} {COMPANY_INFO.address.zip}
              </p>
            </div>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-3">Services</h5>
            <ul className="list-unstyled">
              {services.map((service) => (
                <li key={service.slug} className="mb-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-light opacity-75 text-decoration-none hover-link"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-3">Featured Locations</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="/kansas/directory"
                  className="text-light opacity-75 text-decoration-none hover-link"
                >
                  <strong>All Kansas Cities</strong>
                </Link>
              </li>
              {featuredCities.map((city) => (
                <li key={city.slug} className="mb-2">
                  <Link
                    href={`/kansas/${city.slug}`}
                    className="text-light opacity-75 text-decoration-none hover-link"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="text-white mb-3">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="/about-us"
                  className="text-light opacity-75 text-decoration-none hover-link"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/quote"
                  className="text-light opacity-75 text-decoration-none hover-link"
                >
                  Get a Quote
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/terms"
                  className="text-light opacity-75 text-decoration-none hover-link"
                >
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/privacy"
                  className="text-light opacity-75 text-decoration-none hover-link"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <h5 className="text-white mb-3 mt-4">Free Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="/tools/seo-audit"
                  className="text-light opacity-75 text-decoration-none hover-link"
                >
                  <span className="badge bg-success me-2" style={{ fontSize: '0.65rem' }}>FREE</span>
                  SEO Audit Tool
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="py-4 border-top border-secondary">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-light opacity-75 mb-0">
              &copy; {currentYear} Nexolance. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="social-links">
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light opacity-75 text-decoration-none me-3 hover-link"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light opacity-75 text-decoration-none me-3 hover-link"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href={COMPANY_INFO.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light opacity-75 text-decoration-none me-3 hover-link"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a
                href={COMPANY_INFO.directories.clutch}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light opacity-75 text-decoration-none me-3 hover-link"
                aria-label="Clutch"
              >
                Clutch
              </a>
              <a
                href={COMPANY_INFO.directories.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light opacity-75 text-decoration-none hover-link"
                aria-label="Yelp"
              >
                Yelp
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
