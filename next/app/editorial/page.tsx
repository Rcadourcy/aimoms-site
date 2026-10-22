import type { Metadata } from 'next';
import EditorialClient from './EditorialClient';
import FloatingQuizCTA from '@/components/FloatingQuizCTA';
import '../editorial.css';

export const metadata: Metadata = {
  title: 'The Edit — ai moms™',
  description:
    'The Edit by ai moms™. AI-powered insights, guides, and stories for mothers navigating the invisible load of modern motherhood.',
  alternates: { canonical: '/editorial' },
  openGraph: {
    title: 'The Edit — ai moms™',
    description:
      'AI-powered insights, guides, and stories for mothers navigating the invisible load of modern motherhood.',
    type: 'website',
    url: 'https://aimoms.ai/editorial',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Edit — ai moms™',
    description:
      'AI-powered insights, guides, and stories for mothers navigating the invisible load of modern motherhood.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

export default function EditorialPage() {
  return (
    <div className="page-editorial">
      <EditorialClient />
      <FloatingQuizCTA />
    </div>
  );
}
