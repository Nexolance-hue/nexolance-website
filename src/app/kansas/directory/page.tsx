import { Metadata } from 'next';
import KansasDirectoryClient from './KansasDirectoryClient';
import { kansasDirectoryMetadata } from '@/lib/seo-config';

export const metadata: Metadata = kansasDirectoryMetadata;

export default function KansasDirectoryPage() {
  return <KansasDirectoryClient />;
}
