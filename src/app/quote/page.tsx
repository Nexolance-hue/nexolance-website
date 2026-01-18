import { Metadata } from 'next';
import QuoteClient from './QuoteClient';
import { quoteMetadata } from '@/lib/seo-config';

export const metadata: Metadata = quoteMetadata;

export default function QuotePage() {
  return <QuoteClient />;
}
