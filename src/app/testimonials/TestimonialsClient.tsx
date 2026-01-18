'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Phone, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ReviewsSchema from '@/components/seo/ReviewsSchema';

export default function TestimonialsClient() {
  const breadcrumbs = [
    { name: 'Testimonials', url: '/testimonials' },
  ];

  const allTestimonials = [
    // Featured testimonials with images
    {
      name: "Sophia Lee",
      title: "Director, Fashion Forward",
      image: "/images/sophia_lee.webp",
      quote: "Working with Nexolance has been a game-changer for our Kansas City boutique. Their local SEO expertise helped us dominate search results and triple our foot traffic.",
      rating: 5,
      hasImage: true,
    },
    {
      name: "Tom Downey",
      title: "Co-Founder, Wichita Tech Solutions",
      image: "/images/tom_downey.webp",
      quote: "The team's AI-powered SEO strategies delivered incredible results. We went from page 3 to #1 rankings for our target keywords in just 4 months.",
      rating: 5,
      hasImage: true,
    },
    {
      name: "Emily Smith",
      title: "Managing Director, Topeka Medical Group",
      image: "/images/emily_smith.webp",
      quote: "Professional, data-driven, and results-focused. Nexolance helped our medical practice capture 300% more qualified leads through strategic local SEO optimization.",
      rating: 5,
      hasImage: true,
    },
    {
      name: "Diane Russell",
      title: "CEO, Overland Park Law Firm",
      image: "/images/diane_russell.webp",
      quote: "Their sophisticated approach to digital marketing perfectly matches our high-end clientele expectations. ROI increased 250% within 6 months.",
      rating: 5,
      hasImage: true,
    },
    // Additional testimonials
    {
      rating: 5,
      quote: "Nexolance helped us rank #1 for 'dentist in Wichita'. Our new patient calls tripled! The ROI has been incredible.",
      name: 'Dr. Sarah Johnson',
      business: 'Johnson Dental',
      city: 'Wichita',
      hasImage: false,
    },
    {
      rating: 5,
      quote: 'Their e-commerce SEO strategy increased our online sales by 400%. Best marketing investment we ever made.',
      name: 'Mike Chen',
      business: 'KC Home Goods',
      city: 'Kansas City',
      hasImage: false,
    },
    {
      rating: 5,
      quote: 'Professional team that delivers results. Our leads doubled in just 3 months. Highly recommend!',
      name: 'Jennifer Martinez',
      business: 'Martinez Law',
      city: 'Topeka',
      hasImage: false,
    },
    {
      rating: 5,
      quote: 'The local SEO campaign transformed our business. We now appear in the top 3 for all our target keywords. Phone is ringing off the hook!',
      name: 'Robert Williams',
      business: 'Williams HVAC',
      city: 'Olathe',
      hasImage: false,
    },
    {
      rating: 5,
      quote: 'Outstanding service and remarkable results. Our website traffic increased by 500% and we are getting quality leads every day.',
      name: 'Lisa Anderson',
      business: 'Anderson Real Estate Group',
      city: 'Lawrence',
      hasImage: false,
    },
    {
      rating: 5,
      quote: 'Best digital marketing agency in Kansas. They understand the local market and know exactly how to get results. Highly professional team.',
      name: 'James Thompson',
      business: 'Thompson Roofing',
      city: 'Manhattan',
      hasImage: false,
    },
    {
      rating: 5,
      quote: 'We tried other agencies before but Nexolance is on another level. They increased our conversions by 300% in just 2 months.',
      name: 'Maria Garcia',
      business: 'Garcia Law Firm',
      city: 'Lenexa',
      hasImage: false,
    },
    {
      rating: 5,
      quote: 'Their landing page optimization service is incredible. Our cost per lead dropped by 60% while conversions doubled. Amazing work!',
      name: 'David Brown',
      business: 'Brown Financial Advisors',
      city: 'Shawnee',
      hasImage: false,
    },
    {
      rating: 5,
      quote: 'Finally found an agency that delivers on their promises. Our Google Business Profile now has 5-star reviews and we are ranking #1 locally.',
      name: 'Patricia Miller',
      business: 'Miller Chiropractic',
      city: 'Salina',
      hasImage: false,
    },
  ];

  return (
    <>
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <ReviewsSchema testimonials={allTestimonials} />
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
                  Client <span className="text-gradient">Reviews</span>
                </h1>
                <p className="lead text-white-50 mb-4" style={{ fontSize: '1.2rem' }}>
                  Real reviews from Kansas businesses who trust Nexolance with their digital marketing success.
                </p>
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={32}
                      className="text-warning"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-white-50">
                  <strong className="text-white">4.9/5</strong> average rating from <strong className="text-white">127+</strong> verified clients
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Testimonials with Images */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Featured Client Success Stories</h2>
          <Row className="g-4 mb-5">
            {allTestimonials.filter(t => t.hasImage).map((testimonial, index) => (
              <Col md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="p-5">
                      <div className="mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className="text-warning me-1"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
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
                          <div className="fw-bold fs-5">{testimonial.name}</div>
                          <div className="text-muted">{testimonial.title}</div>
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

      {/* All Reviews Grid */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">All Client Reviews</h2>
          <Row className="g-4">
            {allTestimonials.filter(t => !t.hasImage).map((testimonial, index) => (
              <Col md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="p-4">
                      <div className="mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="text-warning me-1"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <p className="mb-4">"{testimonial.quote}"</p>
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3"
                          style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold">{testimonial.name}</div>
                          <div className="text-muted small">
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
        </Container>
      </section>

      {/* CTA Section */}
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
                <h2 className="display-4 fw-bold mb-4 text-white">
                  Ready to Join Our Successful Clients?
                </h2>
                <p className="lead mb-5 text-white" style={{ opacity: 0.9 }}>
                  Get a free consultation and discover how we can help your Kansas business achieve remarkable results like our other clients.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link href="/quote" className="btn btn-white btn-lg px-5 py-3 fw-semibold">
                    Get Your Free Quote
                  </Link>
                  <a
                    href="tel:+18163679231"
                    className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center"
                    style={{ borderWidth: '2px' }}
                  >
                    <Phone className="me-2" size={20} />
                    Call (816) 367-9231
                  </a>
                </div>

                <p className="mb-0 mt-4 text-white" style={{ opacity: 0.8 }}>
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
