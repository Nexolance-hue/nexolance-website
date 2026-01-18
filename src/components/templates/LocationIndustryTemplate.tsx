'use client';

import { Container, Row, Col, Card, Badge, Accordion } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Award,
  Target,
  TrendingUp,
  Users,
  Phone,
  AlertCircle,
  Check,
  Briefcase,
  Star,
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import QuoteForm from '@/components/ui/QuoteForm';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { City } from '@/data/cities';
import { Industry } from '@/data/industries';
import { getServiceBySlug } from '@/data/services';

interface LocationIndustryTemplateProps {
  city: City;
  industry: Industry;
}

export default function LocationIndustryTemplate({
  city,
  industry,
}: LocationIndustryTemplateProps) {
  const localSeoService = getServiceBySlug('local-seo')!;

  const breadcrumbs = [
    { name: 'Kansas', url: '/kansas/directory' },
    { name: city.name, url: `/kansas/${city.slug}` },
    { name: 'Local SEO', url: `/kansas/${city.slug}/local-seo` },
    { name: industry.name, url: `/kansas/${city.slug}/local-seo/${industry.slug}` },
  ];

  return (
    <>
      <LocalBusinessSchema city={city} />
      <ServiceSchema service={localSeoService} city={city} industry={industry} />
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
                  <Briefcase className="me-2" size={16} />
                  <span className="fw-semibold small">{industry.category} Specialists</span>
                </div>

                <h1 className="fw-bold mb-3 text-white" style={{
                  fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em'
                }}>
                  Local SEO Services for {industry.name} <br />
                  in <span className="text-gradient">{city.name}, Kansas</span>
                </h1>

                <p className="lead text-white-50 mb-3" style={{ fontSize: '1.1rem' }}>
                  Dominate local search and attract more clients to your{' '}
                  {industry.name.toLowerCase()} practice in {city.name}
                </p>

                {/* Trust Indicators */}
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <div className="d-flex align-items-center text-white-50 small">
                    <Award className="text-warning me-2" size={18} />
                    <span>Local Market Experts</span>
                  </div>
                  <div className="d-flex align-items-center text-white-50 small">
                    <TrendingUp className="text-success me-2" size={18} />
                    <span>Proven ROI</span>
                  </div>
                  <div className="d-flex align-items-center text-white-50 small">
                    <Star className="text-info me-2" size={18} fill="currentColor" />
                    <span>Industry Leaders</span>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3">
                  <Link href="#contact" className="btn btn-gradient px-4 py-2 fw-semibold text-white">
                    Get Free Strategy Session
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
                Dominate Local Search for {industry.name} in {city.name}
              </h2>

              <p className="lead mb-4">{industry.description}</p>

              <p className="mb-4">
                In {city.name}'s competitive market, {industry.name.toLowerCase()}{' '}
                businesses need more than just a website—they need a strategic
                local SEO presence that puts them in front of potential clients
                actively searching for their services. Our specialized approach
                combines industry expertise with deep knowledge of the {city.name}{' '}
                market.
              </p>

              <p className="mb-0">
                We've helped {industry.name.toLowerCase()} businesses throughout{' '}
                {city.county} increase visibility, generate qualified leads, and
                grow their client base through proven local SEO strategies. Let us
                help you capture more of your market share in {city.name}.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">
            Challenges Facing {industry.name} in {city.name}
          </h2>

          <Row className="g-4">
            {industry.challenges.map((challenge, index) => (
              <Col md={6} key={index}>
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
                      <AlertCircle className="text-warning mb-3" size={40} />
                      <p className="mb-0 fw-medium">{challenge}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Our Solutions Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">
            How We Help {industry.name} Businesses Succeed
          </h2>

          <Row className="g-4">
            {industry.solutions.map((solution, index) => (
              <Col md={6} key={index}>
                <motion.div
                  className="h-100"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-100 border-0 shadow-sm border-start border-primary border-4">
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-start">
                        <div className="flex-shrink-0 me-3">
                          <div
                            className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '32px', height: '32px' }}
                          >
                            <Check size={18} />
                          </div>
                        </div>
                        <div>
                          <p className="mb-0 fw-medium">{solution}</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Services Included Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">
            {industry.name} SEO Services in {city.name}
          </h2>

          <Row>
            <Col lg={10} className="mx-auto">
              <Row className="g-4">
                {industry.services.map((service, index) => (
                  <Col md={6} key={index}>
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
                          <div className="d-flex align-items-center mb-3">
                            <Target className="text-primary me-2" size={24} />
                            <h4 className="mb-0">{service}</h4>
                          </div>
                          <p className="mb-0 text-muted">
                            Comprehensive {service.toLowerCase()} tailored
                            specifically for {industry.name.toLowerCase()} businesses
                            in the {city.name} market.
                          </p>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <p className="lead mb-4">
              Want to learn more about our {industry.name.toLowerCase()} SEO
              services?
            </p>
            <Link href="#contact" className="btn btn-primary btn-lg">
              Schedule Your Free Consultation
            </Link>
          </div>
        </Container>
      </section>

      {/* Local Market Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="mb-4">
                The {industry.name} Market in {city.name}
              </h2>

              <p className="mb-4">
                {city.name}, with a population of {city.population.toLocaleString()}{' '}
                residents, represents a significant market opportunity for{' '}
                {industry.name.toLowerCase()} businesses. Located in {city.county}
                , the area's demographics and economic profile create strong demand
                for quality {industry.name.toLowerCase()} services.
              </p>

              <h3 className="h4 mb-3">Understanding Your {city.name} Customers</h3>
              <p className="mb-4">
                The {city.name} market has unique characteristics that influence
                how potential clients search for and choose{' '}
                {industry.name.toLowerCase()} providers. Understanding local search
                behavior, demographic preferences, and competitive dynamics is
                essential for effective marketing.
              </p>

              <h3 className="h4 mb-3">The Competitive Landscape</h3>
              <p className="mb-4">
                {city.name}'s {industry.name.toLowerCase()} market is competitive,
                with multiple providers competing for the same client base. The
                practices that dominate Google's Local Pack and organic search
                results capture the majority of qualified leads. Strategic local
                SEO ensures your business appears prominently when potential
                clients search.
              </p>

              <div className="bg-light p-4 rounded mb-4">
                <h3 className="h5 mb-3">
                  <strong>Key Local Facts About {city.name}:</strong>
                </h3>
                <ul className="mb-0">
                  {city.localFacts.map((fact, index) => (
                    <li key={index} className="mb-2">
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mb-0">
                <strong>Areas We Serve:</strong> {city.name},{' '}
                {city.nearbyCities.join(', ')}, and throughout {city.county}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto">
              <h2 className="text-center mb-5">Frequently Asked Questions</h2>

              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    How much does {industry.name} SEO cost in {city.name}?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-3">
                      Investment in {industry.name.toLowerCase()} SEO typically
                      ranges from $1,500 to $3,500 per month in {city.name},
                      depending on your competitive landscape, current online
                      presence, and growth goals.
                    </p>
                    <p className="mb-0">
                      Most {industry.name.toLowerCase()} practices see positive
                      ROI within 3-6 months as they begin capturing more qualified
                      leads from local search. We offer transparent pricing and
                      can provide a customized quote based on your specific needs.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    How long until I see results from local SEO?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-3">
                      Most {industry.name.toLowerCase()} businesses in {city.name}{' '}
                      begin seeing improved visibility and increased leads within
                      2-3 months. Significant ranking improvements and traffic
                      growth typically occur within 4-6 months.
                    </p>
                    <p className="mb-0">
                      SEO is a long-term strategy that builds momentum over time.
                      While some quick wins are possible, the most substantial
                      results come from consistent, strategic optimization over
                      several months.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    What makes {industry.name} SEO different from general SEO?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-3">
                      {industry.name} SEO requires specialized knowledge of your
                      industry's unique challenges, customer behavior, compliance
                      requirements, and competitive dynamics. We understand the
                      specific search terms potential clients use and how to
                      position your practice effectively.
                    </p>
                    <p className="mb-0">
                      Our strategies address industry-specific factors like
                      reputation management, review generation, local citations in
                      industry directories, and content that speaks to your target
                      audience's concerns and needs.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    Will SEO work for my {industry.name.toLowerCase()} business in{' '}
                    {city.name}?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-3">
                      Yes! Local SEO is particularly effective for{' '}
                      {industry.name.toLowerCase()} businesses because potential
                      clients actively search for your services with local intent.
                      Searches like "{industry.name.toLowerCase()} near me" or "
                      {industry.name.toLowerCase()} in {city.name}" represent
                      high-intent prospects ready to engage.
                    </p>
                    <p className="mb-0">
                      With {city.population.toLocaleString()} residents in{' '}
                      {city.name} and the surrounding {city.county} area, there's
                      significant demand for your services. Strategic local SEO
                      ensures you capture your fair share of this market.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    Do you guarantee first page rankings?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-3">
                      We don't guarantee specific rankings because search
                      algorithms constantly evolve and rankings depend on many
                      factors. However, we do guarantee our commitment to
                      following proven strategies that consistently improve
                      visibility, traffic, and leads.
                    </p>
                    <p className="mb-0">
                      Our focus is on results that matter to your business:
                      increased qualified leads, more client consultations, and
                      growth in revenue. We provide transparent reporting so you
                      can track progress toward these goals.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    What's included in your {industry.name} SEO services?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-3">
                      Our comprehensive {industry.name.toLowerCase()} SEO services
                      include:
                    </p>
                    <ul className="mb-3">
                      <li>Google Business Profile optimization and management</li>
                      <li>Local citation building in industry directories</li>
                      <li>Review generation and reputation management</li>
                      <li>Website optimization and technical SEO</li>
                      <li>
                        Content creation focused on your services and local market
                      </li>
                      <li>Keyword research and strategy</li>
                      <li>Competitor analysis</li>
                      <li>Monthly reporting and strategy adjustments</li>
                    </ul>
                    <p className="mb-0">
                      Everything is customized for your {industry.name.toLowerCase()}{' '}
                      practice and the {city.name} market.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                    How do I get started with {industry.name} SEO in {city.name}?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-3">
                      Getting started is easy! Schedule a free consultation where
                      we'll discuss your practice, goals, current online presence,
                      and competitive landscape in {city.name}.
                    </p>
                    <p className="mb-0">
                      We'll provide a customized strategy recommendation and clear
                      pricing. If we're a good fit, we can typically begin work
                      within a week. Call (816) 367-9231 or request a quote to get
                      started.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
                Ready to Dominate Local Search in {city.name}?
              </h2>
              <p className="lead mb-4">
                Join successful {industry.name.toLowerCase()} practices throughout{' '}
                {city.name} that trust Nexolance for their local SEO. Get a free
                strategy session and discover how we can help you attract more
                qualified clients, grow your practice, and outrank your
                competition.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                <Link href="/quote" className="btn btn-light btn-lg px-5">
                  Get Your Free Strategy Session
                </Link>
                <a href="tel:+18163679231" className="btn btn-outline-light btn-lg px-5">
                  Call (816) 367-9231
                </a>
              </div>

              <p className="mb-0 opacity-75">
                Free consultation • Industry specialists • Proven results
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
