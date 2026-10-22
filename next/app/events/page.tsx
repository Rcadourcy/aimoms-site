import type { Metadata } from 'next';
import EventsClient from './EventsClient';
import '../events.css';

export const metadata: Metadata = {
  title: 'Events — ai.moms™',
  description:
    'The ai.moms™ event schedule — upcoming in-person events across the country, plus our monthly virtual workshop, membership get-togethers, and mom-hosted experiences. See what is coming up and RSVP.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events — ai.moms™',
    description: 'See the full ai.moms™ event schedule and RSVP to whatever you want to join.',
    type: 'website',
    url: 'https://aimoms.ai/events',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events — ai.moms™',
    description: 'See the full ai.moms™ event schedule and RSVP to whatever you want to join.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

export default function EventsPage() {
  return (
    <div className="page-events">
      <EventsClient />
    </div>
  );
}
