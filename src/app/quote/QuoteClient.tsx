'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Check, Phone, Clock, Award, TrendingUp } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ContactPageSchema from '@/components/seo/ContactPageSchema';
import QuoteForm from '@/components/ui/QuoteForm';

export default function QuoteClient() {
  const breadcrumbs = [{ name: 'Get a Quote', url: '/quote' }];

  return (
    <>
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <ContactPageSchema />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section with Form */}
      <section
        className="py-5 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D1117 0%, #1a1f2e 100%)',
          minHeight: '700px',
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
            <Col lg={6} className="mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Trust Badge */}
                <div className="badge-pill bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-inline-flex align-items-center mb-3">
                  <Award className="me-2" size={16} />
                  <span className="fw-semibold small">Free Custom Strategy Session</span>
                </div>

                <h1 className="fw-bold mb-3 text-white" style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em'
                }}>
                  Get Started with <span className="text-gradient">Nexolance</span>
                </h1>
                <p className="lead text-white-50 mb-4" style={{ fontSize: '1.2rem' }}>
                  Request a custom quote, schedule a free consultation, or get your SEO audit - choose what works best for you. Receive a customized strategy and transparent pricing within 24 hours.
                </p>

                {/* Key Points */}
                <div className="mb-4">
                  <div className="d-flex align-items-start mb-3">
                    <Check className="text-success me-3 flex-shrink-0" size={24} style={{ marginTop: '2px' }} />
                    <div>
                      <div className="text-white fw-semibold mb-1">No Obligation Consultation</div>
                      <div className="text-white-50 small">Free strategy session with no pressure to commit</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-start mb-3">
                    <Check className="text-success me-3 flex-shrink-0" size={24} style={{ marginTop: '2px' }} />
                    <div>
                      <div className="text-white fw-semibold mb-1">24-Hour Response Time</div>
                      <div className="text-white-50 small">Receive your custom proposal within one business day</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <Check className="text-success me-3 flex-shrink-0" size={24} style={{ marginTop: '2px' }} />
                    <div>
                      <div className="text-white fw-semibold mb-1">Transparent Pricing</div>
                      <div className="text-white-50 small">Clear costs with no hidden fees or surprises</div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="d-flex flex-wrap gap-4 mt-5">
                  <div>
                    <div className="h3 fw-bold text-success mb-0">127+</div>
                    <div className="text-white-50 small">Happy Clients</div>
                  </div>
                  <div>
                    <div className="h3 fw-bold text-success mb-0">250%</div>
                    <div className="text-white-50 small">Avg. Traffic Increase</div>
                  </div>
                  <div>
                    <div className="h3 fw-bold text-success mb-0">24hr</div>
                    <div className="text-white-50 small">Response Time</div>
                  </div>
                </div>
              </motion.div>
            </Col>

            <Col lg={6}>
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

      {/* What Happens Next Section */}
      <section className="py-5 bg-light">
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <h2 className="display-5 fw-bold mb-3">What Happens Next?</h2>
            <p className="lead text-muted">Our proven 4-step process to get you started</p>
          </motion.div>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div
                      className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '64px', height: '64px', fontSize: '24px', fontWeight: 'bold' }}
                    >
                      1
                    </div>
                    <h3 className="h5 mb-3">Submit Your Information</h3>
                    <p className="text-muted mb-0">
                      Fill out the form with your business details and marketing goals. Takes less than 2 minutes.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div
                      className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '64px', height: '64px', fontSize: '24px', fontWeight: 'bold' }}
                    >
                      2
                    </div>
                    <h3 className="h5 mb-3">We Analyze Your Needs</h3>
                    <p className="text-muted mb-0">
                      Our team reviews your market, competition, and opportunities within 24 hours.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div
                      className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '64px', height: '64px', fontSize: '24px', fontWeight: 'bold' }}
                    >
                      3
                    </div>
                    <h3 className="h5 mb-3">Receive Custom Proposal</h3>
                    <p className="text-muted mb-0">
                      Get a detailed strategy and transparent pricing tailored specifically to your business.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div
                      className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '64px', height: '64px', fontSize: '24px', fontWeight: 'bold' }}
                    >
                      4
                    </div>
                    <h3 className="h5 mb-3">Free Consultation Call</h3>
                    <p className="text-muted mb-0">
                      Discuss your proposal, ask questions, and decide if we're the right fit for you.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="display-5 fw-bold mb-4">
                  Why Kansas Businesses <span className="text-gradient">Trust Us</span>
                </h2>
                <p className="lead text-muted mb-4">
                  We've helped over 127 Kansas businesses achieve remarkable growth through data-driven digital marketing strategies.
                </p>

                <div className="mb-3 d-flex align-items-start">
                  <Check className="text-success me-3 flex-shrink-0" size={24} style={{ marginTop: '4px' }} />
                  <div>
                    <div className="fw-semibold mb-1">No Obligation</div>
                    <div className="text-muted">Free quotes with no pressure to commit</div>
                  </div>
                </div>

                <div className="mb-3 d-flex align-items-start">
                  <Check className="text-success me-3 flex-shrink-0" size={24} style={{ marginTop: '4px' }} />
                  <div>
                    <div className="fw-semibold mb-1">Fast Response</div>
                    <div className="text-muted">Custom proposals delivered within 24 hours</div>
                  </div>
                </div>

                <div className="mb-3 d-flex align-items-start">
                  <Check className="text-success me-3 flex-shrink-0" size={24} style={{ marginTop: '4px' }} />
                  <div>
                    <div className="fw-semibold mb-1">Transparent Pricing</div>
                    <div className="text-muted">Clear costs with no hidden fees or surprises</div>
                  </div>
                </div>

                <div className="mb-3 d-flex align-items-start">
                  <Check className="text-success me-3 flex-shrink-0" size={24} style={{ marginTop: '4px' }} />
                  <div>
                    <div className="fw-semibold mb-1">Local Expertise</div>
                    <div className="text-muted">Deep understanding of Kansas markets and competition</div>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <Check className="text-success me-3 flex-shrink-0" size={24} style={{ marginTop: '4px' }} />
                  <div>
                    <div className="fw-semibold mb-1">Proven Results</div>
                    <div className="text-muted">Track record of delivering measurable ROI and growth</div>
                  </div>
                </div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-lg">
                  <Card.Body className="p-5 text-center">
                    <Phone className="text-success mb-3" size={48} />
                    <h3 className="h4 mb-3">Prefer to Talk?</h3>
                    <p className="text-muted mb-4">
                      Call us directly for immediate assistance. Our team is ready to answer your questions.
                    </p>
                    <a
                      href="tel:+18163679231"
                      className="btn btn-success btn-lg px-5 py-3 fw-semibold text-white mb-3"
                    >
                      (816) 367-9231
                    </a>
                    <div className="d-flex align-items-center justify-content-center text-muted small">
                      <Clock size={16} className="me-2" />
                      Monday - Friday: 9:00 AM - 5:00 PM CST
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
