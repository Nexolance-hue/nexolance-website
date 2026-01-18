'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Image from 'next/image';
import { services } from '@/data/services';
import { kansasCities } from '@/data/cities';

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  // Get top 3 cities by population for featured dropdown
  const featuredCities = [...kansasCities]
    .sort((a, b) => b.population - a.population)
    .slice(0, 3);

  const handleNavClick = () => {
    setExpanded(false);
  };

  const navigate = (href: string) => {
    handleNavClick();
    router.push(href);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      expanded={expanded}
      onToggle={setExpanded}
      className="py-3 modern-navbar"
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(13, 17, 23, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate('/')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Image
            src="/images/nexolance-logo.webp"
            alt="Nexolance Logo"
            width={220}
            height={55}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <NavDropdown title="Services" id="services-dropdown">
              {services.map((service) => (
                <NavDropdown.Item
                  key={service.slug}
                  onClick={() => navigate(`/services/${service.slug}`)}
                >
                  {service.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="Locations" id="locations-dropdown">
              <NavDropdown.Item onClick={() => navigate('/kansas/directory')}>
                <strong>View All Kansas Cities</strong>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {featuredCities.map((city) => (
                <NavDropdown.Item
                  key={city.slug}
                  onClick={() => navigate(`/kansas/${city.slug}`)}
                >
                  {city.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>

            <Nav.Link onClick={() => navigate('/quote')} className="d-lg-none">
              Get Quote
            </Nav.Link>

            <button
              onClick={() => navigate('/quote')}
              className="btn btn-gradient ms-lg-3 d-none d-lg-inline-block fw-semibold text-white"
              style={{
                padding: '0.625rem 1.5rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              Get Quote
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
