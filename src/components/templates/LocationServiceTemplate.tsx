'use client';

import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  TrendingUp,
  BarChart3,
  Target,
  Users,
  Settings,
  Check,
  Phone,
  Award,
  Star,
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import QuoteForm from '@/components/ui/QuoteForm';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { City } from '@/data/cities';
import { Service } from '@/data/services';

interface LocationServiceTemplateProps {
  city: City;
  service: Service;
}

export default function LocationServiceTemplate({
  city,
  service,
}: LocationServiceTemplateProps) {
  const breadcrumbs = [
    { name: 'Kansas', url: '/kansas/directory' },
    { name: city.name, url: `/kansas/${city.slug}` },
    { name: service.name, url: `/kansas/${city.slug}/${service.slug}` },
  ];

  return (
    <>
      <LocalBusinessSchema city={city} />
      <ServiceSchema service={service} city={city} />
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />

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

                <h1 className="fw-bold mb-3 text-white" style={{
                  fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em'
                }}>
                  {service.name} in <br />
                  <span className="text-gradient">{city.name}, Kansas</span>
                </h1>

                <p className="lead text-white-50 mb-3" style={{ fontSize: '1.1rem' }}>
                  {service.tagline}
                </p>

                {/* Trust Indicators */}
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <div className="d-flex align-items-center text-white-50 small">
                    <Star className="text-warning me-2" size={18} fill="currentColor" />
                    <span>40-150% Traffic Increase</span>
                  </div>
                  <div className="d-flex align-items-center text-white-50 small">
                    <Check className="text-success me-2" size={18} />
                    <span>100+ Happy Clients</span>
                  </div>
                  <div className="d-flex align-items-center text-white-50 small">
                    <Target className="text-info me-2" size={18} />
                    <span>10+ Years Experience</span>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3">
                  <Link href="#contact" className="btn btn-gradient px-4 py-2 fw-semibold text-white">
                    Get Free Consultation
                  </Link>
                  <a href="tel:+18163679231" className="btn btn-outline-light px-4 py-2 fw-semibold d-flex align-items-center">
                    <Phone className="me-2" size={18} />
                    Call (816) 367-9231
                  </a>
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

      {/* Introduction Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="mb-4">
                Professional {service.name} for {city.name} Businesses
              </h2>

              <p className="lead mb-4">{service.description}</p>

              <p className="mb-4">
                Serving businesses throughout {city.name}, {city.county}, we
                understand the unique challenges and opportunities in your local
                market. Our {service.name.toLowerCase()} strategies are tailored
                to help {city.name} businesses attract more customers, increase
                revenue, and dominate their competition in search results.
              </p>

              <p className="mb-0">
                Whether you're a small local business or an established company
                looking to expand your {city.name} market presence, our proven
                strategies deliver measurable results. We combine local market
                expertise with cutting-edge digital marketing techniques to help
                you achieve your business goals.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">
            Why {city.name} Businesses Choose Nexolance
          </h2>

          <Row className="g-4">
            <Col md={6}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <MapPin className="text-primary mb-3" size={40} />
                    <h4 className="mb-3">Local {city.name} Expertise</h4>
                    <p className="mb-0">
                      We understand the {city.name} market inside and out. Our
                      team knows your local competitors, customer demographics, and
                      what it takes to succeed in {city.county}. This local
                      knowledge gives your business a competitive advantage.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <TrendingUp className="text-primary mb-3" size={40} />
                    <h4 className="mb-3">Proven Results</h4>
                    <p className="mb-0">
                      Our {service.name.toLowerCase()} delivers real, measurable
                      results. We've helped businesses across Kansas increase
                      organic traffic, generate qualified leads, and grow revenue.
                      Your success is our success, and we're committed to
                      delivering ROI.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <BarChart3 className="text-primary mb-3" size={40} />
                    <h4 className="mb-3">Transparent Reporting</h4>
                    <p className="mb-0">
                      No smoke and mirrors. You'll receive detailed monthly reports
                      showing exactly what we're doing and the results we're
                      achieving. Track rankings, traffic, conversions, and ROI with
                      full transparency into your campaign performance.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <Target className="text-primary mb-3" size={40} />
                    <h4 className="mb-3">Data-Driven Strategy</h4>
                    <p className="mb-0">
                      Every decision we make is backed by data and research. From
                      keyword selection to content optimization, we use analytics
                      and testing to ensure your {service.name.toLowerCase()}{' '}
                      investment delivers maximum return.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <Users className="text-primary mb-3" size={40} />
                    <h4 className="mb-3">Dedicated Support</h4>
                    <p className="mb-0">
                      You'll work with a dedicated account manager who understands
                      your business and goals. We're always available to answer
                      questions, provide updates, and adjust strategy based on your
                      evolving needs and market conditions.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className="h-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <Settings className="text-primary mb-3" size={40} />
                    <h4 className="mb-3">Custom Solutions</h4>
                    <p className="mb-0">
                      No cookie-cutter approaches here. We develop customized{' '}
                      {service.name.toLowerCase()} strategies tailored to your
                      specific business, industry, target audience, and competitive
                      landscape in {city.name}. Your strategy is unique to your
                      needs.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* What's Included Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">
            What's Included in Our {service.name}?
          </h2>

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
                      <div>
                        <p className="mb-0 fw-medium">{benefit}</p>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-5 bg-light">
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
                      <h4 className="mb-2">{step.title}</h4>
                      <p className="text-muted small mb-3">{step.timeline}</p>
                      <p className="mb-0">{step.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <p className="lead mb-4">
              Ready to get started with our proven {service.name.toLowerCase()}{' '}
              process?
            </p>
            <Link href="#contact" className="btn btn-primary btn-lg">
              Schedule Your Free Consultation
            </Link>
          </div>
        </Container>
      </section>

      {/* Local Area Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="mb-4">
                Serving {city.name} and Surrounding Kansas Communities
              </h2>

              <p className="lead mb-4">{city.description}</p>

              <h3 className="h4 mb-3">Why Local Expertise Matters</h3>
              <p className="mb-4">
                Successful {service.name.toLowerCase()} requires understanding
                your local market. We know {city.name}'s demographics,
                competitive landscape, and what motivates customers in{' '}
                {city.county}. This local insight helps us create strategies that
                resonate with your target audience and outperform competitors who
                use generic, one-size-fits-all approaches.
              </p>

              <h3 className="h4 mb-3">Areas We Serve</h3>
              <p className="mb-3">
                In addition to {city.name}, we proudly serve businesses
                throughout {city.county} and surrounding communities:
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {city.nearbyCities.map((nearbyCity, index) => (
                  <Badge key={index} bg="secondary" className="fs-6 px-3 py-2">
                    {nearbyCity}
                  </Badge>
                ))}
              </div>

              <p className="mb-0">
                <strong>ZIP Codes Served:</strong> {city.zipCodes.join(', ')}
              </p>
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
                Nexolance for their {service.name.toLowerCase()}. Get a free
                consultation and discover how we can help you dominate local
                search, attract more customers, and increase revenue.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                <Link href="/quote" className="btn btn-light btn-lg px-5">
                  Get Your Free Quote
                </Link>
                <a href="tel:+18163679231" className="btn btn-outline-light btn-lg px-5">
                  Call (816) 367-9231
                </a>
              </div>

              <p className="mb-0 opacity-75">
                Free consultation • No obligation • Fast response
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
