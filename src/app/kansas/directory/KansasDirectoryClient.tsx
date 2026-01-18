'use client';

import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Target,
  TrendingUp,
  Phone,
  ArrowRight,
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { kansasCities } from '@/data/cities';

export default function KansasDirectoryClient() {
  const breadcrumbs = [
    { name: 'Kansas', url: '/kansas/directory' },
    { name: 'Directory', url: '/kansas/directory' },
  ];

  // Sort cities by population for display
  const sortedCities = [...kansasCities].sort(
    (a, b) => b.population - a.population
  );

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
                  Kansas Cities <span className="text-gradient">We Serve</span>
                </h1>
                <p className="lead text-white-50 mb-4" style={{ fontSize: '1.2rem' }}>
                  Professional digital marketing and local SEO services across 15
                  Kansas communities. Find your city and discover how we can help
                  your business dominate local search.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Badge bg="success" bg-opacity-10 className="text-success fs-6 px-3 py-2">
                    15 Kansas Cities
                  </Badge>
                  <Badge bg="success" bg-opacity-10 className="text-success fs-6 px-3 py-2">
                    100+ Happy Clients
                  </Badge>
                  <Badge bg="success" bg-opacity-10 className="text-success fs-6 px-3 py-2">
                    Local Market Experts
                  </Badge>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Cities Grid */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {sortedCities.map((city, index) => (
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
                    href={`/kansas/${city.slug}`}
                    className="text-decoration-none"
                  >
                    <Card className="h-100 border-0 shadow-sm hover-card">
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h3 className="h4 mb-0 text-primary">{city.name}</h3>
                          <Badge bg="secondary">{city.county}</Badge>
                        </div>

                        <p className="text-muted mb-3">
                          <strong>Population:</strong>{' '}
                          {city.population.toLocaleString()}
                        </p>

                        <p className="mb-3">
                          {city.description.slice(0, 150)}...
                        </p>

                        <div className="mb-3">
                          <p className="small fw-bold text-secondary mb-2">
                            Key Facts:
                          </p>
                          <ul className="small mb-0">
                            {city.localFacts.slice(0, 2).map((fact, idx) => (
                              <li key={idx} className="mb-1">
                                {fact.slice(0, 80)}
                                {fact.length > 80 ? '...' : ''}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="d-flex flex-wrap gap-1 mb-3">
                          {city.zipCodes.slice(0, 4).map((zip) => (
                            <Badge key={zip} bg="light" text="dark" className="small">
                              {zip}
                            </Badge>
                          ))}
                          {city.zipCodes.length > 4 && (
                            <Badge bg="light" text="dark" className="small">
                              +{city.zipCodes.length - 4} more
                            </Badge>
                          )}
                        </div>

                        <div className="text-primary fw-medium d-flex align-items-center">
                          View {city.name} Services <ArrowRight className="ms-2" size={18} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Local Matters Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="text-center mb-5">Why Local Expertise Matters</h2>

              <Row className="g-4">
                <Col md={4}>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <MapPin className="text-primary mx-auto mb-3" size={64} />
                    <h3 className="h5 mb-3">Market Knowledge</h3>
                    <p className="mb-0">
                      Every Kansas city has unique demographics, customer
                      behavior, and competitive dynamics. We understand these
                      local nuances.
                    </p>
                  </motion.div>
                </Col>

                <Col md={4}>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Target className="text-primary mx-auto mb-3" size={64} />
                    <h3 className="h5 mb-3">Targeted Strategies</h3>
                    <p className="mb-0">
                      Generic approaches don't work. Our strategies are tailored
                      to your specific city's market conditions and opportunities.
                    </p>
                  </motion.div>
                </Col>

                <Col md={4}>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <TrendingUp className="text-primary mx-auto mb-3" size={64} />
                    <h3 className="h5 mb-3">Better Results</h3>
                    <p className="mb-0">
                      Local expertise means better keyword targeting, more
                      relevant content, and strategies that resonate with your
                      community.
                    </p>
                  </motion.div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="mb-4">Don't See Your City?</h2>
              <p className="lead mb-4">
                While these are our primary service areas, we work with businesses
                throughout Kansas. Contact us to discuss how we can help your
                business grow, regardless of location.
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
