interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  breadcrumbs: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ breadcrumbs }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => {
      const isLastItem = index === breadcrumbs.length - 1;
      const item: any = {
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
      };

      // Only add 'item' property for non-last items
      if (!isLastItem) {
        item.item = breadcrumb.url.startsWith('http')
          ? breadcrumb.url
          : `https://nexolance.agency${breadcrumb.url}`;
      }

      return item;
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
