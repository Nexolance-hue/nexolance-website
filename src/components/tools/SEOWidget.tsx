'use client';

import { Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';

interface SEOWidgetProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SEOWidget({ url, setUrl, onSubmit }: SEOWidgetProps) {
  return (
    <div className="bg-white rounded-4 p-4 shadow-lg" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <Form onSubmit={onSubmit}>
        <InputGroup size="lg">
          <InputGroup.Text className="bg-white border-end-0 ps-3">
            <Search size={20} className="text-success" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Enter your website URL (e.g., example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border-start-0 border-end-0"
            required
            style={{
              fontSize: '1rem',
              padding: '0.75rem 1rem',
            }}
          />
          <Button
            type="submit"
            variant="success"
            size="lg"
            className="px-4 fw-semibold"
            style={{
              minWidth: '180px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
            }}
          >
            Analyze My Website
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
