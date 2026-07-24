import type { Metadata } from 'next';
import EditorialClient from './EditorialClient';
import FloatingQuizCTA from '@/components/FloatingQuizCTA';
import { currentWeekIndex } from '@/lib/rotation';
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
    images: ['https://aimoms.ai/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Edit — ai moms™',
    description:
      'AI-powered insights, guides, and stories for mothers navigating the invisible load of modern motherhood.',
    images: ['https://aimoms.ai/og-image.png'],
  },
};

// Recompute the weekly rotation seed on every request (the page is dynamic), so The
// Edit rearranges itself the moment the week rolls over — no cron, no rebuild needed.
export const dynamic = 'force-dynamic';

export default function EditorialPage() {
  const weekSeed = currentWeekIndex();
  return (
    <div className="page-editorial">
      <EditorialClient weekSeed={weekSeed} />
      <FloatingQuizCTA />
    </div>
  );
}
