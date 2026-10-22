import type { Metadata } from 'next';
import RolePage, { type RoleData } from '@/components/RolePage';

export const metadata: Metadata = {
  title: 'Brand Marketing Intern — ai moms™',
  description:
    'For a resourceful, detail-obsessed student who wants hands-on learning across integrated marketing — gaining real exposure to how press, grants, awards, events, partnerships, email, and brand presence work together at a growing brand.',
  alternates: { canonical: '/marketing-intern' },
  openGraph: {
    title: 'Brand Marketing Intern — ai moms™',
    description:
      'For a resourceful, detail-obsessed student who wants hands-on learning across integrated marketing — gaining real exposure to how press, grants, awards, events, partnerships, email, and brand presence work together at a growing brand.',
    type: 'website',
    url: 'https://aimoms.ai/marketing-intern',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Marketing Intern — ai moms™',
    description:
      'For a resourceful, detail-obsessed student who wants hands-on learning across integrated marketing — gaining real exposure to how press, grants, awards, events, partnerships, email, and brand presence work together at a growing brand.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

const role: RoleData = {
  slug: 'marketing-intern',
  heroLabel: 'Internship · For Course Credit',
  heroTitle: 'Brand Marketing Intern',
  pills: ['Unpaid · For Course Credit', 'NY-Based or Remote', 'Part-Time Volunteer Hours'],
  heroDesc:
    'For a resourceful, detail-obsessed student who wants hands-on learning across integrated marketing — gaining real exposure to how press, grants, awards, events, partnerships, email, and brand presence work together at a growing brand.',
  sections: [
    {
      label: 'About the Opportunity',
      title: 'What This Is',
      paragraphs: [
        'ai moms™ is on a mission to retire working mothers from Chief Everything Officer™ — teaching them to use AI to eliminate the invisible load of running a household and a career at the same time. We have a course, a community, and a movement that’s just getting started.',
        'We’re offering a hands-on learning experience for a resourceful, detail-obsessed student who wants real exposure to integrated marketing — observing and supporting work across press, grants, awards, events, partnerships, email/newsletter, and brand presence under the direct mentorship of our founder.',
      ],
      highlight: {
        quote:
          "This internship is designed as a learning experience. You'll observe, support, and contribute to a real marketing strategy — gaining exposure across channels that most students never get to see in one place.",
      },
    },
    {
      title: 'This Experience Is For You If',
      items: [
        'You enjoy research and the kind of organized work most people overlook',
        "You're organized to the point that spreadsheets and project trackers feel calming",
        'You think about brands holistically — not just one channel, but how everything fits together',
        'You can support multiple workstreams without letting any of them slip',
        'You write clearly and professionally, and welcome feedback on your drafts',
        "You've studied marketing, PR, or comms — or are pursuing a related degree and eager to learn",
        "You get what it means to be a working mom trying to do it all — even if you're not one yet",
        'You come with curiosity, energy, and a willingness to learn',
      ],
    },
    {
      label: 'The Experience',
      title: "What You'll Learn",
      items: [
        'How a founder-led brand approaches integrated marketing across multiple channels',
        'PR fundamentals — exposure to press list research, story angles, and how media coverage happens',
        'Grant research and the application workflow from the inside',
        'How award nominations and speaking opportunities are identified and pursued',
        'Event marketing — observing event planning and identifying existing events the brand can participate in, sponsor, or partner with',
        'Email marketing and newsletter strategy — how a brand builds and nurtures an audience over time',
        'Brand presence — how a brand shows up consistently across every touchpoint',
        'How marketing calendars and cross-channel coordination actually work in practice',
      ],
    },
    {
      title: "What You'll Get",
      items: [
        <>
          <strong>Hands-on learning experience</strong> with a real, growing brand
        </>,
        <>
          <strong>A portfolio piece</strong> that actually means something
        </>,
        <>
          <strong>A founder</strong> who will be your loudest reference
        </>,
        <>
          <strong>Academic credit</strong> (we&rsquo;ll work with your school)
        </>,
        <>
          <strong>A front-row seat</strong> to building an AI company from the ground up
        </>,
      ],
    },
    {
      title: 'About ai moms™',
      paragraphs: [
        'Founded by Raquel Cadourcy — a mom of two with 20+ years of marketing leadership, from LVMH to CMO of luxury and lifestyle brands. AI systems architect and organizational neuroscience specialist. Built ai.moms™ because she needed it first.',
      ],
    },
  ],
  apply: {
    lead: 'We keep the process simple. If this feels like yours, show us.',
    intro: (
      <>
        Send us an email at <strong>hello@aimoms.ai</strong> and include the following:
      </>
    ),
    steps: [
      'A brand you admire — and what you’ve observed about how they show up across multiple channels (could be social, email, press, events, brand presence — anywhere)',
      'Your initial thinking on how ai moms™ could approach integrated marketing over the next 30 days — any early ideas across press, events, grants, email, or anywhere else you see opportunity',
      'One existing event, conference, or community gathering you’ve come across that you think ai moms™ should be part of — and why',
      'Why this feels like your internship',
    ],
    mailto: 'mailto:hello@aimoms.ai?subject=Brand Marketing Intern — Application',
  },
  closingLine: 'We move fast here. So should you.',
};

export default function MarketingInternPage() {
  return <RolePage role={role} />;
}
