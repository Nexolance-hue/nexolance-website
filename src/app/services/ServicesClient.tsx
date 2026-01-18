'use client';

import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  ShoppingCart,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { services } from '@/data/services';
import { getIndustryCategories } from '@/data/industries';

export default function ServicesClient() {
  const breadcrumbs = [{ name: 'Services', url: '/services' }];
  const industryCategories = getIndustryCategories();

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section
        className="py-5 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D1117 0%, #1a1f2e 100%)',
          minHeight: '400px',
        }}
      >
        {/* Gradient Orbs */}
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
            filter: 'blur(60px)',
          }}
        />

        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row>
            <Col lg={10} className="mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="fw-bold mb-4 text-white" style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  lineHeight: 1.2,
                }}>
                  Our Digital Marketing <span className="text-gradient">Services</span>
                </h1>
                <p className="lead text-white-50 mb-4" style={{ fontSize: '1.2rem' }}>
                  Comprehensive, results-driven digital marketing solutions designed
                  to help Kansas businesses dominate local search, attract more
                  customers, and increase revenue.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {services.map((service, index) => {
              const IconComponent =
                service.icon === 'search' ? Search :
                service.icon === 'file-earmark-text' ? FileText :
                service.icon === 'cart' ? ShoppingCart : MapPin;

              return (
                <Col md={6} key={service.slug}>
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
                        <IconComponent className="text-primary mb-3" size={48} />

                        <h2 className="h3 mb-3">{service.name}</h2>
                        <p className="text-primary fw-medium mb-3">{service.tagline}</p>
                        <p className="mb-4">{service.description}</p>

                        <h3 className="h6 mb-3">Key Benefits:</h3>
                        <ul className="mb-4">
                          {service.benefits.slice(0, 4).map((benefit, idx) => (
                            <li key={idx} className="mb-2">
                              {benefit}
                            </li>
                          ))}
                        </ul>

                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <p className="text-muted small mb-0">Starting at</p>
                            <p className="fs-4 fw-bold text-primary mb-0">
                              {service.pricing.startingPrice}
                              <span className="fs-6 text-muted fw-normal">/month</span>
                            </p>
                          </div>
                          <Link
                            href={`/services/${service.slug}`}
                            className="btn btn-gradient text-white d-flex align-items-center"
                          >
                            Learn More <ArrowRight className="ms-2" size={18} />
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Process Overview */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="text-center mb-5">Our Proven Process</h2>

              <Row className="g-4">
                <Col md={3}>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '64px', height: '64px', fontSize: '24px' }}
                    >
                      1
                    </div>
                    <h3 className="h5 mb-3">Discovery</h3>
                    <p className="mb-0">
                      We analyze your business, market, competition, and goals to
                      understand what success looks like.
                    </p>
                  </motion.div>
                </Col>

                <Col md={3}>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div
                      className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '64px', height: '64px', fontSize: '24px' }}
                    >
                      2
                    </div>
                    <h3 className="h5 mb-3">Strategy</h3>
                    <p className="mb-0">
                      We develop a customized digital marketing strategy tailored
                      to your specific needs and market.
                    </p>
                  </motion.div>
                </Col>

                <Col md={3}>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div
                      className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '64px', height: '64px', fontSize: '24px' }}
                    >
                      3
                    </div>
                    <h3 className="h5 mb-3">Execution</h3>
                    <p className="mb-0">
                      Our team implements your strategy with precision, monitoring
                      progress and making adjustments.
                    </p>
                  </motion.div>
                </Col>

                <Col md={3}>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div
                      className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '64px', height: '64px', fontSize: '24px' }}
                    >
                      4
                    </div>
                    <h3 className="h5 mb-3">Results</h3>
                    <p className="mb-0">
                      Track measurable results with detailed reporting and
                      continuous optimization for growth.
                    </p>
                  </motion.div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Industries Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="text-center mb-4">Industries We Serve</h2>
              <p className="text-center text-muted mb-5">
                Specialized strategies for businesses across all major industries
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-2">
                {industryCategories.map((category) => (
                  <Badge
                    key={category}
                    bg="secondary"
                    className="fs-6 px-3 py-2"
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="text-center mt-4">
                <p className="text-muted">
                  From legal and medical to home services and B2B - we understand
                  your industry's unique challenges and opportunities.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="mb-4">Ready to Grow Your Business?</h2>
              <p className="lead mb-4">
                Get a free consultation and discover which services will deliver
                the best results for your business. No obligation, just honest
                recommendations.
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
