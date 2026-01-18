'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Award,
  Star,
  Check,
  TrendingUp,
  Target,
  DollarSign,
  MapPin,
  Users,
  Mail,
  HeadphonesIcon,
  X,
  ChevronRight,
  Zap,
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import QuoteForm from '@/components/ui/QuoteForm';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { City } from '@/data/cities';
import { services } from '@/data/services';
import { industries, getIndustryCategories } from '@/data/industries';

interface CityHubTemplateProps {
  city: City;
}

export default function CityHubTemplate({ city }: CityHubTemplateProps) {
  const breadcrumbs = [
    { name: 'Kansas', url: '/kansas/directory' },
    { name: city.name, url: `/kansas/${city.slug}` },
  ];

  const industryCategories = getIndustryCategories();

  // Industry typing animation for hero headline
  const industryList = [
    'Lawyers',
    'Dentists',
    'HVAC Companies',
    'Real Estate Agents',
    'Plumbers',
    'Chiropractors',
    'Roofers',
    'Financial Advisors',
    'Your Business',
  ];

  const [currentIndustryIndex, setCurrentIndustryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentIndustry = industryList[currentIndustryIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentIndustry.length) {
          setDisplayedText(currentIndustry.slice(0, displayedText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentIndustry.slice(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to next industry
          setIsDeleting(false);
          setTimeout(() => {
            setCurrentIndustryIndex((prev) => (prev + 1) % industryList.length);
          }, pauseBeforeType);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentIndustryIndex, industryList]);

  return (
    <>
      <LocalBusinessSchema city={city} />
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />

      <Breadcrumbs items={breadcrumbs} />

      {/* Sophisticated Dark Hero Section */}
      <section className="hero-section position-relative overflow-hidden bg-dark text-white">
        {/* Animated gradient background */}
        <div className="hero-background">
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
        </div>

        <Container className="position-relative" style={{ zIndex: 10 }}>
          <Row className="align-items-center min-vh-90 py-5">
            <Col lg={7} className="pe-lg-5 order-lg-1 order-1 mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Trust badge */}
                <div className="badge-pill bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-inline-flex align-items-center mb-3">
                  <Award className="me-2" size={16} />
                  <span className="fw-semibold small">#1 Rated SEO Agency in Kansas</span>
                </div>

                {/* Main headline */}
                <h1 className="fw-bold mb-3" style={{
                  fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em'
                }}>
                  {city.name} Digital Marketing & <br />
                  Local SEO Services for{' '}
                  <span className="text-gradient">
                    {displayedText}
                    <span
                      className="typing-cursor"
                      style={{
                        borderRight: '3px solid #10B981',
                        paddingRight: '2px',
                        animation: 'blink 1s step-end infinite',
                      }}
                    />
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="lead text-white-50 mb-3" style={{ fontSize: '1.1rem' }}>
                  Increase your rankings by 300% and dominate local search. Proven strategies that deliver real results for {city.name} businesses.
                </p>

                {/* AI Search Badge */}
                <div className="badge-pill bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-inline-flex align-items-center mb-3 ai-search-badge">
                  <Zap className="me-2" size={16} />
                  <span className="fw-semibold small">Dominate AI Search Engines</span>
                </div>

                {/* Trust indicators row */}
                <div className="d-flex flex-wrap gap-3 mb-3">
                  <div className="d-flex align-items-center text-white-80 small">
                    <Star className="text-warning me-1" size={16} fill="currentColor" />
                    <span>4.9/5 (127 reviews)</span>
                  </div>
                  <div className="d-flex align-items-center text-white-80 small">
                    <Check className="text-success me-1" size={16} />
                    <span>Google Partner</span>
                  </div>
                  <div className="d-flex align-items-center text-white-80 small">
                    <Target className="text-info me-1" size={16} />
                    <span>500+ Clients</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="d-flex flex-wrap gap-2">
                  <Link
                    href="#contact"
                    className="btn btn-gradient px-4 py-2 fw-semibold text-white"
                  >
                    Get Free SEO Audit
                  </Link>

                  <a
                    href="tel:+18163679231"
                    className="btn btn-outline-light btn-outline-modern px-4 py-2 fw-semibold"
                  >
                    <HeadphonesIcon className="me-2" size={18} />
                    Call (816) 367-9231
                  </a>
                </div>
              </motion.div>
            </Col>

            {/* Quote form card - Modern glassmorphism design */}
            <Col lg={5} className="order-lg-2 order-2 mb-4 mb-lg-0">
              <div className="quote-form-modern">
                <h3 className="h4 fw-bold mb-3 text-white">Request a Free Quote</h3>
                <p className="text-white-50 mb-4 small">Get a custom strategy for your {city.name} business</p>
                <QuoteForm />
              </div>
            </Col>
          </Row>
        </Container>

        {/* Scroll indicator */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x pb-4 d-none d-lg-block">
          <div className="scroll-indicator">
            <span className="text-white-50 small">Scroll to explore</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar py-4 bg-white border-bottom">
        <Container>
          <Row className="g-4 text-center">
            <Col xs={6} md={3}>
              <motion.div
                className="trust-stat"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Star className="stat-icon text-warning mb-2" size={32} />
                <div className="stat-value h3 fw-bold text-success mb-1">4.9/5</div>
                <div className="stat-label text-muted small">127 Reviews</div>
              </motion.div>
            </Col>

            <Col xs={6} md={3}>
              <motion.div
                className="trust-stat"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Award className="stat-icon text-primary mb-2" size={32} />
                <div className="stat-value h3 fw-bold text-success mb-1">Google</div>
                <div className="stat-label text-muted small">Partner Certified</div>
              </motion.div>
            </Col>

            <Col xs={6} md={3}>
              <motion.div
                className="trust-stat"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Users className="stat-icon text-info mb-2" size={32} />
                <div className="stat-value h3 fw-bold text-success mb-1">500+</div>
                <div className="stat-label text-muted small">Happy Clients</div>
              </motion.div>
            </Col>

            <Col xs={6} md={3}>
              <motion.div
                className="trust-stat"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <TrendingUp className="stat-icon text-success mb-2" size={32} />
                <div className="stat-value h3 fw-bold text-success mb-1">+300%</div>
                <div className="stat-label text-muted small">Avg Growth</div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Results Section - Dark with Glassmorphism */}
      <section className="results-section position-relative py-5" style={{
        background: 'linear-gradient(180deg, #0B1120 0%, #1e293b 100%)',
        color: 'white'
      }}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Real Results for {city.name} Businesses</h2>
            <p className="lead text-white-50">See what we've achieved for local companies</p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <motion.div
                className="result-card-glass"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="result-icon mb-3 text-success" size={48} />
                <div className="result-number display-2 fw-bold text-success mb-2">+387%</div>
                <div className="result-label h5 mb-3 text-white">Organic Traffic</div>
                <div className="result-client text-white-50 mb-2">Dental Clinic, {city.name}</div>
                <div className="result-badge">
                  <Badge bg="success">6 months</Badge>
                </div>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                className="result-card-glass"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Target className="result-icon mb-3 text-success" size={48} />
                <div className="result-number display-2 fw-bold text-success mb-2">+245%</div>
                <div className="result-label h5 mb-3 text-white">Lead Generation</div>
                <div className="result-client text-white-50 mb-2">Law Firm, {city.name}</div>
                <div className="result-badge">
                  <Badge bg="success">4 months</Badge>
                </div>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                className="result-card-glass"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <DollarSign className="result-icon mb-3 text-success" size={48} />
                <div className="result-number display-2 fw-bold text-success mb-2">+520%</div>
                <div className="result-label h5 mb-3 text-white">Revenue Growth</div>
                <div className="result-client text-white-50 mb-2">HVAC Company, {city.name}</div>
                <div className="result-badge">
                  <Badge bg="success">8 months</Badge>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About City Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="mb-4">Digital Marketing Experts in {city.name}</h2>
              <p className="lead mb-4">{city.description}</p>

              <div className="bg-light p-4 rounded mb-4">
                <Row className="g-3">
                  <Col md={4}>
                    <div className="text-center">
                      <div className="fs-3 mb-2">📍</div>
                      <div className="fw-bold">Location</div>
                      <div className="small text-muted">{city.name}, {city.county}</div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <div className="fs-3 mb-2">👥</div>
                      <div className="fw-bold">Population</div>
                      <div className="small text-muted">{city.population.toLocaleString()}</div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <div className="fs-3 mb-2">📮</div>
                      <div className="fw-bold">ZIP Codes</div>
                      <div className="small text-muted">{city.zipCodes.slice(0, 3).join(', ')}+</div>
                    </div>
                  </Col>
                </Row>
              </div>

              <h3 className="h4 mb-4 text-center">Interesting Facts About {city.name}</h3>
              <Row className="g-3">
                {city.localFacts.map((fact, index) => (
                  <Col md={6} key={index}>
                    <Card className="border-0 shadow-sm h-100">
                      <Card.Body>
                        <div className="d-flex">
                          <span className="fs-4 me-3">✓</span>
                          <p className="mb-0">{fact}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section - Modern Cards */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Services in {city.name}</h2>
            <p className="lead text-muted">Comprehensive digital marketing solutions to grow your business</p>
          </div>

          <Row className="g-4">
            {services.map((service) => (
              <Col md={6} key={service.slug}>
                <Card className="modern-card border-0 h-100">
                  <Card.Body className="p-4">
                    {/* Icon with colored background */}
                    <div className="feature-icon-wrapper mb-4">
                      {service.icon === 'search' ? '🔍' : service.icon === 'file-earmark-text' ? '📄' : service.icon === 'cart' ? '🛒' : '📍'}
                    </div>

                    <Card.Title className="h4 fw-bold mb-3">{service.name}</Card.Title>
                    <p className="text-success fw-semibold mb-3">{service.tagline}</p>
                    <Card.Text className="text-muted mb-4">
                      {service.description.slice(0, 150)}...
                    </Card.Text>

                    <ul className="mb-4 list-unstyled">
                      {service.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="mb-2 d-flex align-items-start">
                          <span className="text-success me-2 fw-bold">✓</span>
                          <span className="small">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/kansas/${city.slug}/${service.slug}`}
                      className="btn btn-link p-0 fw-semibold text-success text-decoration-none"
                    >
                      Learn more →
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Industries Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Industries We Serve in {city.name}</h2>
          <p className="text-center text-muted mb-5">
            Specialized local SEO strategies for businesses across all major
            industries in {city.name}
          </p>

          {industryCategories.map((category) => {
            const categoryIndustries = industries.filter(
              (ind) => ind.category === category
            );

            return (
              <div key={category} className="mb-5">
                <h3 className="h5 mb-3">
                  <Badge bg="secondary" className="me-2">
                    {category}
                  </Badge>
                </h3>
                <Row className="g-3">
                  {categoryIndustries.map((industry) => (
                    <Col md={6} lg={4} key={industry.slug}>
                      <Link
                        href={`/kansas/${city.slug}/local-seo/${industry.slug}`}
                        className="text-decoration-none"
                      >
                        <Card className="h-100 border-0 shadow-sm hover-card">
                          <Card.Body className="p-3">
                            <div className="d-flex align-items-center">
                              <span className="fs-4 me-3">
                                {industry.icon === 'briefcase' ? '💼' :
                                 industry.icon === 'shield' ? '🛡️' :
                                 industry.icon === 'house-heart' ? '🏡' :
                                 industry.icon === 'file-earmark-medical' ? '📋' :
                                 industry.icon === 'heart-pulse' ? '💗' :
                                 industry.icon === 'scissors' ? '✂️' :
                                 industry.icon === 'hospital' ? '🏥' :
                                 industry.icon === 'droplet' ? '💧' :
                                 industry.icon === 'heart' ? '❤️' :
                                 industry.icon === 'fan' ? '🌀' :
                                 industry.icon === 'house' ? '🏠' :
                                 industry.icon === 'tools' ? '🔧' :
                                 industry.icon === 'lightning' ? '⚡' :
                                 industry.icon === 'hammer' ? '🔨' :
                                 industry.icon === 'tree' ? '🌳' :
                                 industry.icon === 'key' ? '🔑' :
                                 industry.icon === 'graph-up' ? '📊' :
                                 industry.icon === 'shield-check' ? '🛡️' :
                                 industry.icon === 'calculator' ? '🧮' :
                                 industry.icon === 'gear' ? '⚙️' :
                                 industry.icon === 'heart-pulse-fill' ? '💓' :
                                 industry.icon === 'building' ? '🏢' : '📌'}
                              </span>
                              <div>
                                <p className="mb-0 fw-medium text-dark">
                                  {industry.name}
                                </p>
                                <p className="mb-0 small text-muted">
                                  Local SEO Services for {industry.name.toLowerCase()}
                                </p>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Why Local SEO Matters Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="mb-4">
                Why Local SEO Matters for {city.name} Businesses
              </h2>

              <p className="lead mb-4">
                In today's digital landscape, local search dominance is essential
                for business growth in {city.name}. When potential customers search
                for products or services, appearing prominently in local search
                results directly impacts your bottom line.
              </p>

              <Row className="g-4 mb-4">
                <Col md={4}>
                  <Card className="h-100 border-0 shadow-sm text-center">
                    <Card.Body className="p-4">
                      <div className="display-4 text-primary mb-3">46%</div>
                      <p className="mb-0">
                        of all Google searches have local intent
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 border-0 shadow-sm text-center">
                    <Card.Body className="p-4">
                      <div className="display-4 text-primary mb-3">76%</div>
                      <p className="mb-0">
                        of people who search on mobile visit a business within 24
                        hours
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 border-0 shadow-sm text-center">
                    <Card.Body className="p-4">
                      <div className="display-4 text-primary mb-3">28%</div>
                      <p className="mb-0">
                        of local searches result in a purchase within 24 hours
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <h3 className="h4 mb-3">
                The {city.name} Advantage: Local Market Expertise
              </h3>
              <p className="mb-4">
                Success in {city.name}'s market requires more than generic SEO
                tactics. It demands understanding of local customer behavior,
                competitive dynamics in {city.county}, and the unique factors that
                influence purchase decisions in your community. Our local expertise
                ensures your marketing resonates with {city.name} customers.
              </p>

              <h3 className="h4 mb-3">Dominate Local Search Results</h3>
              <p className="mb-4">
                When potential customers in {city.name} search for businesses like
                yours, they typically choose from the first page of results—often
                from Google's "Local Pack" that appears prominently at the top. Our
                proven local SEO strategies help {city.name} businesses capture
                these valuable top positions.
              </p>

              <h3 className="h4 mb-3">Measurable Results for Your Business</h3>
              <p className="mb-0">
                Unlike traditional advertising, local SEO provides transparent,
                measurable results. Track increased visibility, website traffic,
                phone calls, and customer inquiries. See exactly how your
                investment translates into business growth in the {city.name}{' '}
                market.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">What {city.name} Businesses Say</h2>
            <p className="lead text-muted">Don't just take our word for it - hear from local business owners</p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="testimonial-card border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-warning" size={20} fill="currentColor" />
                      ))}
                    </div>
                    <p className="testimonial-text mb-4">
                      "Nexolance helped us rank #1 for our main keywords in {city.name}. Our new patient calls have tripled in just 6 months!"
                    </p>
                    <div>
                      <strong>Dr. Michael Chen</strong>
                      <div className="text-muted small">Chen Family Dentistry, {city.name}</div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="testimonial-card border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-warning" size={20} fill="currentColor" />
                      ))}
                    </div>
                    <p className="testimonial-text mb-4">
                      "Outstanding results! Our leads increased by 245% and we're dominating local search results for personal injury law in {city.name}."
                    </p>
                    <div>
                      <strong>Sarah Martinez, Esq.</strong>
                      <div className="text-muted small">Martinez Law Group, {city.name}</div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="testimonial-card border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-warning" size={20} fill="currentColor" />
                      ))}
                    </div>
                    <p className="testimonial-text mb-4">
                      "The ROI has been incredible. We're getting 3-4 qualified service calls daily now compared to maybe 1 per week before Nexolance."
                    </p>
                    <div>
                      <strong>James Wilson</strong>
                      <div className="text-muted small">Wilson HVAC, {city.name}</div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Before/After Comparison Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Before & After Nexolance</h2>
            <p className="lead text-muted">See the transformation in your digital presence</p>
          </div>

          <Row className="g-4">
            <Col md={6}>
              <motion.div
                className="before-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="h4 mb-4 d-flex align-items-center">
                  <X className="me-2" size={28} />
                  Before
                </h3>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex align-items-start">
                    <X className="text-danger me-2 flex-shrink-0" size={20} />
                    <span>Invisible in local search results</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <X className="text-danger me-2 flex-shrink-0" size={20} />
                    <span>Competitors dominating page 1</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <X className="text-danger me-2 flex-shrink-0" size={20} />
                    <span>Minimal website traffic</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <X className="text-danger me-2 flex-shrink-0" size={20} />
                    <span>Few phone calls or leads</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <X className="text-danger me-2 flex-shrink-0" size={20} />
                    <span>Outdated marketing strategies</span>
                  </li>
                </ul>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className="after-card"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="h4 mb-4 d-flex align-items-center">
                  <Check className="me-2" size={28} />
                  After
                </h3>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex align-items-start">
                    <Check className="text-success me-2 flex-shrink-0" size={20} />
                    <span>Ranking in top 3 for target keywords</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <Check className="text-success me-2 flex-shrink-0" size={20} />
                    <span>Dominating Google Maps results</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <Check className="text-success me-2 flex-shrink-0" size={20} />
                    <span>300%+ increase in organic traffic</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <Check className="text-success me-2 flex-shrink-0" size={20} />
                    <span>Consistent qualified leads daily</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <Check className="text-success me-2 flex-shrink-0" size={20} />
                    <span>Proven data-driven strategies</span>
                  </li>
                </ul>
              </motion.div>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <Link href="#contact" className="btn btn-gradient btn-lg px-5 py-3 fw-semibold">
              Get Your Free Audit <ChevronRight className="ms-2" size={20} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Areas Served Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="mb-4">
                Serving {city.name} and Surrounding Areas
              </h2>

              <p className="mb-4">
                While our primary focus is {city.name}, we proudly serve businesses
                throughout {city.county} and surrounding Kansas communities. Our
                deep knowledge of the broader regional market helps us create
                strategies that work across multiple locations.
              </p>

              <h3 className="h5 mb-3">Nearby Communities We Serve:</h3>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {city.nearbyCities.map((nearbyCity, index) => (
                  <Badge key={index} bg="secondary" className="fs-6 px-3 py-2">
                    {nearbyCity}
                  </Badge>
                ))}
              </div>

              <h3 className="h5 mb-3">ZIP Codes Served in {city.name}:</h3>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {city.zipCodes.map((zip, index) => (
                  <Badge key={index} bg="light" text="dark" className="fs-6 px-3 py-2">
                    {zip}
                  </Badge>
                ))}
              </div>

              <div className="bg-light p-4 rounded">
                <h3 className="h6 mb-3">
                  <strong>Contact Our {city.name} Team:</strong>
                </h3>
                <p className="mb-2">
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+18163679231" className="text-primary">
                    (816) 367-9231
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@nexolance.agency" className="text-primary">
                    info@nexolance.agency
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Service Area:</strong> {city.name}, {city.county}, and
                  surrounding Kansas communities
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-5 bg-primary text-white" id="contact">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="mb-4">
                Ready to Grow Your {city.name} Business?
              </h2>
              <p className="lead mb-4">
                Join the growing number of {city.name} businesses that trust
                Nexolance for their digital marketing needs. Get a free
                consultation and discover how we can help you dominate local
                search, attract more customers, and increase revenue.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                <Link href="/quote" className="btn btn-light btn-lg px-5">
                  Get Your Free Consultation
                </Link>
                <a href="tel:+18163679231" className="btn btn-outline-light btn-lg px-5">
                  Call (816) 367-9231
                </a>
              </div>

              <p className="mb-0 opacity-75">
                Free consultation • No obligation • Local {city.name} experts
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
