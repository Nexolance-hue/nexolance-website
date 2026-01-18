'use client';

import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  ShoppingCart,
  MapPin,
  Check,
  Phone,
  Award,
  ArrowRight,
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ServicePageSchema from '@/components/seo/ServicePageSchema';
import QuoteForm from '@/components/ui/QuoteForm';
import { Service } from '@/data/services';
import { kansasCities } from '@/data/cities';

interface ServiceDetailClientProps {
  service: Service;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const breadcrumbs = [
    { name: 'Services', url: '/services' },
    { name: service.name, url: `/services/${service.slug}` },
  ];

  // Get top 6 cities by population
  const featuredCities = [...kansasCities]
    .sort((a, b) => b.population - a.population)
    .slice(0, 6);

  return (
    <>
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <ServicePageSchema service={service} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section
        className="py-5 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D1117 0%, #1a1f2e 100%)',
          minHeight: '600px',
        }}
      >
        {/* Gradient Orbs */}
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            top: '-10%',
            right: '-5%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
            filter: 'blur(60px)',
          }}
        />

        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={7} className="mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Trust Badge */}
                <div className="badge-pill bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-inline-flex align-items-center mb-3">
                  <Award className="me-2" size={16} />
                  <span className="fw-semibold small">Kansas Digital Marketing Leaders</span>
                </div>

                {/* Service Icon */}
                <div className="mb-3">
                  {service.icon === 'search' ? <Search className="text-success" size={40} /> :
                   service.icon === 'file-earmark-text' ? <FileText className="text-success" size={40} /> :
                   service.icon === 'cart' ? <ShoppingCart className="text-success" size={40} /> :
                   <MapPin className="text-success" size={40} />}
                </div>

                <h1 className="fw-bold mb-3 text-white" style={{
                  fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em'
                }}>
                  {service.heroHeadline || service.name}
                </h1>
                <p className="lead text-white-50 mb-4" style={{ fontSize: '1.1rem' }}>
                  {service.heroSubheadline || service.tagline}
                </p>

                {/* Key Points */}
                {service.heroKeyPoints && service.heroKeyPoints.length > 0 && (
                  <div className="mb-4">
                    {service.heroKeyPoints.map((point, index) => (
                      <div key={index} className="d-flex align-items-start mb-2">
                        <Check className="text-success me-2 flex-shrink-0" size={20} style={{ marginTop: '2px' }} />
                        <span className="text-white-50">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Trust Indicator */}
                {service.trustIndicator && (
                  <div className="mb-4">
                    <div className="badge-pill bg-white bg-opacity-10 text-white px-3 py-2 rounded-pill d-inline-flex align-items-center">
                      <Award className="me-2" size={16} />
                      <span className="small fw-semibold">{service.trustIndicator}</span>
                    </div>
                  </div>
                )}

                <div className="d-flex flex-wrap gap-3 mb-4">
                  <Link href="/quote" className="btn btn-success px-4 py-2 fw-semibold text-white">
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+18163679231"
                    className="btn btn-outline-light px-4 py-2 fw-semibold d-flex align-items-center text-white"
                  >
                    <Phone className="me-2" size={18} />
                    Call (816) 367-9231
                  </a>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  <div className="badge bg-white bg-opacity-10 text-white fs-6 px-3 py-2">
                    Starting at {service.pricing.startingPrice}
                  </div>
                  <div className="badge bg-white bg-opacity-10 text-white fs-6 px-3 py-2">
                    {service.pricing.billingModel}
                  </div>
                </div>
              </motion.div>
            </Col>

            <Col lg={5}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <QuoteForm />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Service Description */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="mb-4">What is {service.name}?</h2>
              <p className="lead mb-4">{service.description}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Benefits of {service.name}</h2>

          <Row>
            <Col lg={10} className="mx-auto">
              <Row className="g-4">
                {service.benefits.map((benefit, index) => (
                  <Col md={6} key={index}>
                    <motion.div
                      className="d-flex align-items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="flex-shrink-0 me-3">
                        <div
                          className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px' }}
                        >
                          <Check size={18} />
                        </div>
                      </div>
                      <p className="mb-0">{benefit}</p>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Our {service.name} Process</h2>

          <Row className="g-4">
            {service.process.map((step, index) => (
              <Col md={4} key={index}>
                <motion.div
                  className="h-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <div
                        className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mb-3"
                        style={{ width: '48px', height: '48px', fontSize: '20px' }}
                      >
                        {index + 1}
                      </div>
                      <h3 className="h5 mb-2">{step.title}</h3>
                      <p className="text-muted small mb-3">{step.timeline}</p>
                      <p className="mb-0">{step.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <h2 className="text-center mb-4">{service.name} Pricing</h2>

              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5 text-center">
                  <div className="mb-4">
                    <p className="text-muted mb-2">Starting at</p>
                    <p className="display-4 fw-bold text-primary mb-0">
                      {service.pricing.startingPrice}
                    </p>
                    <p className="text-muted">{service.pricing.billingModel}</p>
                  </div>

                  <p className="mb-4">{service.pricing.details}</p>

                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <Link href="/quote" className="btn btn-primary btn-lg">
                      Get Custom Quote
                    </Link>
                    <a
                      href="tel:+18163679231"
                      className="btn btn-outline-primary btn-lg"
                    >
                      Discuss Pricing
                    </a>
                  </div>
                </Card.Body>
              </Card>

              <p className="text-center text-muted mt-4 mb-0">
                <strong>Pricing Range:</strong> {service.pricing.priceRange}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Cities Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">
            Get {service.name} in Your Kansas City
          </h2>
          <p className="text-center text-muted mb-5">
            Select your city to see localized pricing and availability
          </p>

          <Row className="g-4">
            {featuredCities.map((city, index) => (
              <Col md={6} lg={4} key={city.slug}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="h-100"
                >
                  <Link
                    href={`/kansas/${city.slug}/${service.slug}`}
                    className="text-decoration-none"
                  >
                    <Card className="h-100 border-0 shadow-sm hover-card">
                      <Card.Body className="p-4 text-center">
                        <h3 className="h5 mb-2">{city.name}</h3>
                        <p className="text-muted small mb-3">
                          Population: {city.population.toLocaleString()}
                        </p>
                        <p className="text-primary fw-medium mb-0 d-flex align-items-center justify-content-center">
                          View {service.name} in {city.name} <ArrowRight className="ms-2" size={18} />
                        </p>
                      </Card.Body>
                    </Card>
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Link href="/kansas/directory" className="btn btn-outline-primary">
              View All Kansas Cities
            </Link>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="mb-4">Ready to Get Started with {service.name}?</h2>
              <p className="lead mb-4">
                Get a free consultation and customized strategy for your business.
                No obligation, just honest recommendations.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link href="/quote" className="btn btn-light btn-lg px-5">
                  Get Your Free Quote
                </Link>
                <a
                  href="tel:+18163679231"
                  className="btn btn-outline-light btn-lg px-5 d-flex align-items-center justify-content-center"
                >
                  <Phone className="me-2" size={18} />
                  Call (816) 367-9231
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
