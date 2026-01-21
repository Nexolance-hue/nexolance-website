'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  Users,
  Lightbulb,
  Rocket,
  MapPin,
  TrendingUp,
  Settings,
  Award,
  Check,
  Phone,
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import AboutPageSchema from '@/components/seo/AboutPageSchema';

export default function AboutClient() {
  const breadcrumbs = [{ name: 'About', url: '/about' }];

  return (
    <>
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <AboutPageSchema />
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
                  Your Kansas Digital Marketing <span className="text-gradient">Partner</span>
                </h1>
                <p className="lead text-white-50 mb-4" style={{ fontSize: '1.2rem' }}>
                  Helping local businesses dominate search results, attract more
                  customers, and grow revenue through strategic digital marketing.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Company Overview */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="mb-4">Who We Are</h2>
              <p className="lead mb-4">
                Nexolance is a Kansas-based digital marketing agency specializing
                in local SEO, landing page optimization, e-commerce SEO, and
                strategic digital marketing for businesses across the state.
              </p>

              <p className="mb-4">
                We understand that every Kansas business faces unique challenges
                and opportunities. Whether you're a small local practice in
                Leawood, a growing company in Wichita, or an established business
                in Topeka, we create customized strategies that deliver measurable
                results.
              </p>

              <p className="mb-4">
                Our team combines deep knowledge of Kansas markets with proven
                digital marketing expertise. We're not just another agency—we're
                your local partner committed to your long-term success.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Our Core Values</h2>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-4">
                    <Target className="text-primary mx-auto mb-3" size={48} />
                    <h4 className="mb-3">Results-Focused</h4>
                    <p className="mb-0">
                      We measure success by your business growth. Every strategy
                      is designed to deliver measurable ROI and real business
                      results.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-4">
                    <Users className="text-primary mx-auto mb-3" size={48} />
                    <h4 className="mb-3">Partnership</h4>
                    <p className="mb-0">
                      We're not vendors—we're partners. Your success is our
                      success, and we're invested in building long-term
                      relationships.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-4">
                    <Lightbulb className="text-primary mx-auto mb-3" size={48} />
                    <h4 className="mb-3">Transparency</h4>
                    <p className="mb-0">
                      No smoke and mirrors. We provide clear communication,
                      detailed reporting, and honest recommendations always.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-4">
                    <Rocket className="text-primary mx-auto mb-3" size={48} />
                    <h4 className="mb-3">Innovation</h4>
                    <p className="mb-0">
                      Digital marketing evolves constantly. We stay ahead of
                      trends and algorithm changes to keep you competitive.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="mb-4 text-center">Why Kansas Businesses Choose Nexolance</h2>

              <Row className="g-4 mt-4">
                <Col md={6}>
                  <motion.div
                    className="d-flex"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex-shrink-0 me-3">
                      <div
                        className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <MapPin size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2">Local Market Expertise</h4>
                      <p className="mb-0">
                        We know Kansas. From Overland Park to Garden City, we
                        understand the unique dynamics of each local market and
                        create strategies that resonate with your community.
                      </p>
                    </div>
                  </motion.div>
                </Col>

                <Col md={6}>
                  <motion.div
                    className="d-flex"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="flex-shrink-0 me-3">
                      <div
                        className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <Award size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2">Proven Track Record</h4>
                      <p className="mb-0">
                        Our clients see real results: increased rankings, more
                        website traffic, higher conversion rates, and most
                        importantly—revenue growth.
                      </p>
                    </div>
                  </motion.div>
                </Col>

                <Col md={6}>
                  <motion.div
                    className="d-flex"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex-shrink-0 me-3">
                      <div
                        className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <Target size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2">Customized Strategies</h4>
                      <p className="mb-0">
                        No cookie-cutter solutions. Every strategy is tailored to
                        your business, industry, competitive landscape, and
                        specific goals.
                      </p>
                    </div>
                  </motion.div>
                </Col>

                <Col md={6}>
                  <motion.div
                    className="d-flex"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="flex-shrink-0 me-3">
                      <div
                        className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <Settings size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2">Full-Service Capabilities</h4>
                      <p className="mb-0">
                        From local SEO to landing page optimization to e-commerce
                        strategies, we offer comprehensive services to meet all
                        your digital marketing needs.
                      </p>
                    </div>
                  </motion.div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="mb-4">Ready to Grow Your Business?</h2>
              <p className="lead mb-4">
                Let's discuss how we can help you achieve your digital marketing
                goals. Schedule a free consultation with our Kansas team today.
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
