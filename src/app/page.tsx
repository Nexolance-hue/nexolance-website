'use client';

import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Award,
  Check,
  X,
  TrendingUp,
  Target,
  DollarSign,
  ChevronRight,
  MapPin,
  BarChart3,
  Users,
  Shield,
  Zap,
  HeadphonesIcon,
  ChevronLeft,
  Asterisk,
  Laptop,
} from 'lucide-react';
import QuoteForm from '@/components/ui/QuoteForm';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import { services } from '@/data/services';
import { kansasCities } from '@/data/cities';
import { industries } from '@/data/industries';

export default function Home() {
  const featuredCities = [...kansasCities]
    .sort((a, b) => b.population - a.population)
    .slice(0, 6);

  // Industry typing animation for hero headline
  const typingIndustries = [
    'Lawyers & Law Firms',
    'Dentists and Dental Practices',
    'HVAC Companies',
    'Real Estate Agents',
    'Plumbing Companies',
    'Chiropractors',
    'Roofers',
    'Financial Advisors',
    'Your Business',
  ];

  const [currentIndustryIndex, setCurrentIndustryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Testimonials carousel state
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);

  const featuredTestimonials = [
    {
      name: "Sophia Lee",
      title: "Director, Fashion Forward",
      image: "/images/sophia_lee.webp",
      quote: "Working with Nexolance has been a game-changer for our Kansas City boutique. Their local SEO expertise helped us dominate search results and triple our foot traffic."
    },
    {
      name: "Tom Downey",
      title: "Co-Founder, Wichita Tech Solutions",
      image: "/images/tom_downey.webp",
      quote: "The team's AI-powered SEO strategies delivered incredible results. We went from page 3 to #1 rankings for our target keywords in just 4 months."
    },
    {
      name: "Emily Smith",
      title: "Managing Director, Topeka Medical Group",
      image: "/images/emily_smith.webp",
      quote: "Professional, data-driven, and results-focused. Nexolance helped our medical practice capture 300% more qualified leads through strategic local SEO optimization."
    },
    {
      name: "Diane Russell",
      title: "CEO, Overland Park Law Firm",
      image: "/images/diane_russell.webp",
      quote: "Their sophisticated approach to digital marketing perfectly matches our high-end clientele expectations. ROI increased 250% within 6 months."
    }
  ];

  const additionalTestimonials = [
    {
      rating: 5,
      text: "Nexolance helped us rank #1 for 'dentist in Wichita'. Our new patient calls tripled! The ROI has been incredible.",
      name: 'Dr. Sarah Johnson',
      business: 'Johnson Dental',
      city: 'Wichita',
    },
    {
      rating: 5,
      text: 'Their e-commerce SEO strategy increased our online sales by 400%. Best marketing investment we ever made.',
      name: 'Mike Chen',
      business: 'KC Home Goods',
      city: 'Kansas City',
    },
    {
      rating: 5,
      text: 'Professional team that delivers results. Our leads doubled in just 3 months. Highly recommend!',
      name: 'Jennifer Martinez',
      business: 'Martinez Law',
      city: 'Topeka',
    },
  ];

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialPage((prev) => (prev + 1) % 2);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonialPage = () => {
    setCurrentTestimonialPage((prev) => (prev + 1) % 2);
  };

  const prevTestimonialPage = () => {
    setCurrentTestimonialPage((prev) => (prev - 1 + 2) % 2);
  };

  useEffect(() => {
    const currentIndustry = typingIndustries[currentIndustryIndex];
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
            setCurrentIndustryIndex((prev) => (prev + 1) % typingIndustries.length);
          }, pauseBeforeType);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentIndustryIndex]);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <OrganizationSchema />

      {/* Hero Section - Dark with Animated Gradient Orbs */}
      <section className="hero-section position-relative overflow-hidden bg-dark text-white">
        {/* Animated gradient background */}
        <div className="hero-background">
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
        </div>

        <Container className="position-relative" style={{ zIndex: 10 }}>
          <Row className="align-items-center py-5 g-4">
            <Col lg={7} className="pe-lg-5 order-1 order-lg-1">
              <motion.div {...fadeInUp}>
                <div className="badge-pill bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-inline-flex align-items-center mb-3">
                  <Award className="me-2" size={16} />
                  <span className="fw-semibold small">#1 Rated SEO Agency in Kansas</span>
                </div>

                <h1
                  className="fw-bold mb-3"
                  style={{
                    fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Kansas Digital Marketing & <br />
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

                <p className="lead text-white-50 mb-3" style={{ fontSize: '1.1rem' }}>
                  Increase your rankings by 300% and dominate local search. Proven
                  strategies that drive real results for Kansas businesses.
                </p>

                {/* AI Search Badge */}
                <div className="badge-pill bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-inline-flex align-items-center mb-3 ai-search-badge">
                  <Zap className="me-2" size={16} />
                  <span className="fw-semibold small">Dominate AI Search Engines</span>
                </div>

                {/* Trust Indicators Row */}
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

                <div className="d-flex flex-wrap gap-2">
                  <Link
                    href="/quote"
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

            <Col lg={5} className="order-2 order-lg-2">
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
                <Check className="stat-icon text-success mb-2" size={32} />
                <div className="stat-value h3 fw-bold text-success mb-1">500+</div>
                <div className="stat-label text-muted small">Happy Customers</div>
              </motion.div>
            </Col>
            <Col xs={6} md={3}>
              <motion.div
                className="trust-stat"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <TrendingUp className="stat-icon text-info mb-2" size={32} />
                <div className="stat-value h3 fw-bold text-success mb-1">+300%</div>
                <div className="stat-label text-muted small">Average Growth</div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-light">
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <h2 className="display-4 fw-bold mb-3">Our Digital Marketing Services</h2>
            <p className="lead text-muted">
              Comprehensive solutions to grow your Kansas business online
            </p>
          </motion.div>

          <Row className="g-4">
            {services.map((service, index) => {
              const iconMap: Record<string, any> = {
                search: Target,
                'file-earmark-text': BarChart3,
                cart: DollarSign,
                'geo-alt': MapPin,
                laptop: Laptop,
                default: Target,
              };
              const IconComponent = iconMap[service.icon] || iconMap.default;

              return (
                <Col md={6} lg={index < 3 ? 4 : 6} key={service.slug}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-decoration-none"
                    >
                      <Card className="modern-card border-0 h-100 text-center">
                        <Card.Body className="p-4">
                          <div className="feature-icon-wrapper mb-4 mx-auto">
                            <IconComponent size={32} className="text-white" />
                          </div>
                          <h3 className="h5 fw-bold mb-3">{service.name}</h3>
                          <p className="text-muted mb-4">{service.tagline}</p>
                          <div className="text-success fw-semibold">
                            Learn More <ChevronRight className="ms-1" size={16} />
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Results Section - Dark Background */}
      <section
        className="results-section position-relative py-5"
        style={{
          background: 'linear-gradient(180deg, #0B1120 0%, #1e293b 100%)',
          color: 'white',
        }}
      >
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <h2 className="display-4 fw-bold mb-3 text-white">
              Real Results for Kansas Businesses
            </h2>
            <p className="lead text-white-50">
              See what we've achieved for local companies just like yours
            </p>
          </motion.div>

          <Row className="g-4">
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="result-card-glass h-100"
              >
                <TrendingUp className="result-icon mb-3 text-success" size={48} />
                <div className="result-number display-2 fw-bold text-success mb-2">
                  +387%
                </div>
                <div className="result-label h5 mb-3 text-white">Organic Traffic</div>
                <div className="result-client text-white-50 mb-2">
                  Dental Clinic, Wichita
                </div>
                <Badge bg="success">6 months</Badge>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="result-card-glass h-100"
              >
                <Target className="result-icon mb-3 text-info" size={48} />
                <div className="result-number display-2 fw-bold text-success mb-2">
                  +245%
                </div>
                <div className="result-label h5 mb-3 text-white">Lead Generation</div>
                <div className="result-client text-white-50 mb-2">
                  Law Firm, Overland Park
                </div>
                <Badge bg="success">4 months</Badge>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
                className="result-card-glass h-100"
              >
                <DollarSign className="result-icon mb-3 text-warning" size={48} />
                <div className="result-number display-2 fw-bold text-success mb-2">
                  +520%
                </div>
                <div className="result-label h5 mb-3 text-white">Revenue Growth</div>
                <div className="result-client text-white-50 mb-2">
                  HVAC Company, Topeka
                </div>
                <Badge bg="success">8 months</Badge>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Locations Section */}
      <section className="py-5 bg-light">
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <h2 className="display-4 fw-bold mb-3">Kansas Cities We Serve</h2>
            <p className="lead text-muted">
              Professional local SEO and digital marketing across Kansas
            </p>
          </motion.div>

          <Row className="g-4">
            {featuredCities.map((city, index) => (
              <Col md={6} lg={4} key={city.slug}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Link
                    href={`/kansas/${city.slug}`}
                    className="text-decoration-none"
                  >
                    <Card className="modern-card border-0 h-100">
                      <Card.Body className="p-4">
                        <div className="d-flex align-items-start mb-3">
                          <MapPin className="text-success me-2" size={24} />
                          <div className="flex-grow-1">
                            <h3 className="h5 fw-bold mb-1">{city.name}</h3>
                            <p className="text-muted small mb-0">
                              Population: {city.population.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-success fw-semibold">
                          View Services <ChevronRight className="ms-1" size={16} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Link
              href="/kansas/directory"
              className="btn btn-outline-success btn-lg px-5"
            >
              View All 15 Kansas Cities
            </Link>
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-white">
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <h2 className="display-4 fw-bold mb-3">
              Why Kansas Businesses Choose Nexolance
            </h2>
            <p className="lead text-muted">
              The advantages that set us apart from other agencies
            </p>
          </motion.div>

          <Row className="g-4">
            {[
              {
                icon: MapPin,
                title: 'Local Kansas Expertise',
                description:
                  'Deep knowledge of Kansas markets, customer behavior, and competitive landscape.',
                color: 'text-primary',
              },
              {
                icon: TrendingUp,
                title: 'Proven Results & ROI',
                description:
                  'Measurable outcomes with increased rankings, traffic, leads, and revenue.',
                color: 'text-success',
              },
              {
                icon: Shield,
                title: 'Transparent Reporting',
                description:
                  'Clear, detailed analytics and regular updates on campaign performance.',
                color: 'text-info',
              },
              {
                icon: BarChart3,
                title: 'Data-Driven Strategy',
                description:
                  'Every decision backed by research, testing, and performance data.',
                color: 'text-warning',
              },
              {
                icon: HeadphonesIcon,
                title: 'Dedicated Support Team',
                description:
                  'Personal account manager committed to your success and always available.',
                color: 'text-danger',
              },
              {
                icon: Zap,
                title: 'Custom Solutions',
                description:
                  'Tailored strategies designed specifically for your business and industry.',
                color: 'text-purple',
              },
            ].map((feature, index) => (
              <Col md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="modern-card border-0 h-100">
                    <Card.Body className="p-4 text-center">
                      <feature.icon
                        className={`${feature.color} mb-3`}
                        size={48}
                        strokeWidth={1.5}
                      />
                      <h3 className="h5 fw-bold mb-3">{feature.title}</h3>
                      <p className="text-muted mb-0">{feature.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Industries Section */}
      <section className="py-5 bg-light">
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <h2 className="display-4 fw-bold mb-3">Industries We Serve</h2>
            <p className="lead text-muted">
              Specialized digital marketing strategies for businesses across all major
              industries
            </p>
          </motion.div>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/kansas/wichita/local-seo/${industry.slug}`}>
                  <Badge
                    bg="success"
                    className="fs-6 px-4 py-2 fw-normal"
                    style={{ cursor: 'pointer' }}
                  >
                    {industry.name}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section - Dark with Carousel */}
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

        <Container className="py-5 position-relative" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Asterisk className="text-success me-2" size={20} />
              <span className="text-success fw-semibold text-uppercase small">TESTIMONIALS</span>
            </div>
            <h2 className="display-4 fw-bold mb-3 text-white">What Kansas Businesses Say</h2>
            <p className="lead text-white-50">Real reviews from real clients</p>
          </motion.div>

          {/* Carousel Container */}
          <div className="position-relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonialPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Row className="g-4">
                  {currentTestimonialPage === 0 ? (
                    // Featured testimonials with images (page 1)
                    featuredTestimonials.slice(0, 2).map((testimonial, index) => (
                      <Col md={6} key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card
                            className="border-0 h-100"
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            <Card.Body className="p-5">
                              <div className="mb-4">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={20}
                                    className="text-warning me-1"
                                    fill="currentColor"
                                  />
                                ))}
                              </div>
                              <p className="text-white mb-4" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                                "{testimonial.quote}"
                              </p>
                              <div className="d-flex align-items-center">
                                <div
                                  className="rounded-circle overflow-hidden me-3 position-relative"
                                  style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                                  }}
                                >
                                  <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                    }}
                                  />
                                </div>
                                <div>
                                  <div className="fw-bold text-white fs-5">{testimonial.name}</div>
                                  <div className="text-white-50">{testimonial.title}</div>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </motion.div>
                      </Col>
                    ))
                  ) : (
                    // Featured testimonials with images (page 2) + additional testimonials
                    <>
                      {featuredTestimonials.slice(2, 4).map((testimonial, index) => (
                        <Col md={6} key={index}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card
                              className="border-0 h-100"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <Card.Body className="p-5">
                                <div className="mb-4">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={20}
                                      className="text-warning me-1"
                                      fill="currentColor"
                                    />
                                  ))}
                                </div>
                                <p className="text-white mb-4" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                                  "{testimonial.quote}"
                                </p>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="rounded-circle overflow-hidden me-3 position-relative"
                                    style={{
                                      width: '80px',
                                      height: '80px',
                                      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                                    }}
                                  >
                                    <img
                                      src={testimonial.image}
                                      alt={testimonial.name}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <div className="fw-bold text-white fs-5">{testimonial.name}</div>
                                    <div className="text-white-50">{testimonial.title}</div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </motion.div>
                        </Col>
                      ))}
                    </>
                  )}
                </Row>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonialPage}
              className="btn btn-outline-light rounded-circle position-absolute top-50 start-0 translate-middle-y"
              style={{
                width: '50px',
                height: '50px',
                left: '-25px',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button
              onClick={nextTestimonialPage}
              className="btn btn-outline-light rounded-circle position-absolute top-50 end-0 translate-middle-y"
              style={{
                width: '50px',
                height: '50px',
                right: '-25px',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
              aria-label="Next testimonials"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="d-flex justify-content-center gap-2 mt-5">
            {[0, 1].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentTestimonialPage(page)}
                className="rounded-circle border-0"
                style={{
                  width: '12px',
                  height: '12px',
                  background: currentTestimonialPage === page ? '#10B981' : 'rgba(255, 255, 255, 0.3)',
                  transition: 'background 0.3s ease',
                }}
                aria-label={`Go to testimonial page ${page + 1}`}
              />
            ))}
          </div>

          {/* Additional Testimonials Section */}
          <div className="mt-5 pt-5">
            <Row className="g-4">
              {additionalTestimonials.map((testimonial, index) => (
                <Col md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className="border-0 h-100"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Card.Body className="p-4">
                        <div className="mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className="text-warning me-1"
                              fill="currentColor"
                            />
                          ))}
                        </div>
                        <p className="text-white mb-4">"{testimonial.text}"</p>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3"
                            style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}
                          >
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div className="fw-bold text-white">{testimonial.name}</div>
                            <div className="text-white-50 small">
                              {testimonial.business}, {testimonial.city}
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>

          {/* See All Testimonials Button */}
          <div className="text-center mt-5">
            <Link
              href="/testimonials"
              className="btn btn-success btn-lg px-5 py-3 fw-semibold text-white"
            >
              See All Testimonials
            </Link>
          </div>
        </Container>
      </section>

      {/* Before/After Comparison Section */}
      <section className="py-5 bg-light">
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <h2 className="display-4 fw-bold mb-3">Before vs After Nexolance</h2>
            <p className="lead text-muted">
              The transformation our clients experience
            </p>
          </motion.div>

          <Row className="g-4">
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="before-card h-100"
              >
                <h3 className="h4 fw-bold mb-4">
                  <X className="me-2" size={28} />
                  Before
                </h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <X className="text-danger me-2" size={20} />
                    Page 3-4 on Google search results
                  </li>
                  <li className="mb-3">
                    <X className="text-danger me-2" size={20} />
                    Only 50 website visitors per month
                  </li>
                  <li className="mb-3">
                    <X className="text-danger me-2" size={20} />
                    Just 2-3 leads per month
                  </li>
                  <li className="mb-3">
                    <X className="text-danger me-2" size={20} />
                    Wasted ad budget with poor targeting
                  </li>
                  <li>
                    <X className="text-danger me-2" size={20} />
                    No clear marketing strategy
                  </li>
                </ul>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="after-card h-100"
              >
                <h3 className="h4 fw-bold mb-4">
                  <Check className="me-2" size={28} />
                  After 6 Months
                </h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <Check className="text-success me-2" size={20} />
                    Top 3 rankings for target keywords
                  </li>
                  <li className="mb-3">
                    <Check className="text-success me-2" size={20} />
                    2,500+ monthly website visitors
                  </li>
                  <li className="mb-3">
                    <Check className="text-success me-2" size={20} />
                    75-90 qualified leads per month
                  </li>
                  <li className="mb-3">
                    <Check className="text-success me-2" size={20} />
                    3.5x ROI on marketing spend
                  </li>
                  <li>
                    <Check className="text-success me-2" size={20} />
                    Data-driven strategy with clear metrics
                  </li>
                </ul>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section - Dark Background */}
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #0B1120 0%, #1e293b 100%)',
          color: 'white',
        }}
      >
        <Container className="py-5">
          <Row className="g-5 text-center">
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="display-3 fw-bold text-success mb-3">46%</div>
                <p className="fs-5 text-white-80 mb-2">
                  of all searches have local intent
                </p>
                <p className="text-white-50 small">Google Local Search Statistics</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="display-3 fw-bold text-success mb-3">76%</div>
                <p className="fs-5 text-white-80 mb-2">
                  visit a business within 24 hours
                </p>
                <p className="text-white-50 small">Google Local Search Statistics</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="display-3 fw-bold text-success mb-3">28%</div>
                <p className="fs-5 text-white-80 mb-2">
                  make a purchase within 24 hours
                </p>
                <p className="text-white-50 small">Google Local Search Statistics</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA Section - Gradient Background */}
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          color: 'white',
        }}
      >
        <Container className="py-5">
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="display-3 fw-bold mb-4 text-white">
                  Ready to Grow Your Kansas Business?
                </h2>
                <p className="lead mb-5 text-white" style={{ opacity: 0.9 }}>
                  Get a free consultation and discover how we can help your business
                  attract more customers, increase revenue, and dominate your local
                  market.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                  <Link
                    href="/quote"
                    className="btn btn-white btn-lg px-5 py-3 fw-semibold"
                  >
                    Get Your Free Quote
                  </Link>
                  <a
                    href="tel:+18163679231"
                    className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold"
                    style={{ borderWidth: '2px' }}
                  >
                    <HeadphonesIcon className="me-2" size={20} />
                    Call (816) 367-9231
                  </a>
                </div>

                <p className="mb-0 text-white" style={{ opacity: 0.8 }}>
                  Free consultation • No obligation • Fast response
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
