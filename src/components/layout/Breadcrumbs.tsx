'use client';

import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, Container } from 'react-bootstrap';

interface BreadcrumbItemData {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemData[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <section className="breadcrumbs-section py-3" style={{
      background: 'linear-gradient(135deg, #0D1117 0%, #1a1f2e 100%)',
    }}>
      <Container>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/" className="text-decoration-none text-white-50">
              Home
            </Link>
          </BreadcrumbItem>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return isLast ? (
              <BreadcrumbItem key={item.url} active className="text-success">
                {item.name}
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem key={item.url}>
                <Link href={item.url} className="text-decoration-none text-white-50">
                  {item.name}
                </Link>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </Container>
    </section>
  );
}
