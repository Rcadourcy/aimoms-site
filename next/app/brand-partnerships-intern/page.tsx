import type { Metadata } from 'next';
import RolePage, { type RoleData } from '@/components/RolePage';

export const metadata: Metadata = {
  title: 'Brand Partnerships Intern — ai moms™',
  description:
    'For a thoughtful, relationship-minded student who wants hands-on learning in how brands actually find, evaluate, and grow meaningful partnerships — by deeply researching the landscape, identifying mutually-beneficial fits, and learning how aligned partnerships are built from the ground up.',
  alternates: { canonical: '/brand-partnerships-intern' },
  openGraph: {
    title: 'Brand Partnerships Intern — ai moms™',
    description:
      'For a thoughtful, relationship-minded student who wants hands-on learning in how brands actually find, evaluate, and grow meaningful partnerships — by deeply researching the landscape, identifying mutually-beneficial fits, and learning how aligned partnerships are built from the ground up.',
    type: 'website',
    url: 'https://aimoms.ai/brand-partnerships-intern',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Partnerships Intern — ai moms™',
    description:
      'For a thoughtful, relationship-minded student who wants hands-on learning in how brands actually find, evaluate, and grow meaningful partnerships — by deeply researching the landscape, identifying mutually-beneficial fits, and learning how aligned partnerships are built from the ground up.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

const role: RoleData = {
  slug: 'brand-partnerships-intern',
  heroLabel: 'Internship · For Course Credit',
  heroTitle: 'Brand Partnerships Intern',
  pills: ['Unpaid · For Course Credit', 'NY-Based or Remote', 'Part-Time Volunteer Hours'],
  heroDesc:
    'For a thoughtful, relationship-minded student who wants hands-on learning in how brands actually find, evaluate, and grow meaningful partnerships — by deeply researching the landscape, identifying mutually-beneficial fits, and learning how aligned partnerships are built from the ground up.',
  sections: [
    {
      label: 'About the Opportunity',
      title: 'What This Is',
      paragraphs: [
        'ai moms™ is on a mission to retire working mothers from Chief Everything Officer™ — teaching them to use AI to eliminate the invisible load of running a household and a career at the same time. We have a course, a community, and a movement that’s just getting started.',
        'We’re offering a hands-on learning experience for a thoughtful, relationship-minded student who wants real exposure to brand partnerships — observing and supporting how a growing brand identifies, evaluates, and approaches partners (corporate, community, affiliate, and beyond) under the direct mentorship of our founder and Head of Brand Partnerships.',
        'Much of the work is research and identification — studying brands and organizations across categories, evaluating fit, and contributing to a growing partnership pipeline alongside our founder and Head of Brand Partnerships.',
      ],
      highlight: {
        quote:
          "This is a research-driven learning experience. You'll spend real time studying brand landscapes, identifying like-minded companies and communities, and learning how partnerships that genuinely benefit both sides actually come together.",
      },
    },
    {
      title: 'This Experience Is For You If',
      items: [
        "You're a natural researcher who can spend hours going down rabbit holes about brands, companies, and the people behind them",
        'You think in terms of mutual benefit — what makes a partnership actually work for both sides',
        "You're observant and pattern-oriented — you notice which brands fit together before others do",
        "You're organized and process-oriented — you don't let things slip through the cracks",
        'You write warmly and professionally, and welcome feedback on your drafts',
        "You're comfortable in spreadsheets and learning new tools (CRMs, research platforms)",
        "You've studied business, marketing, communications — or are pursuing a related degree and eager to learn",
        "You get what it means to be a working mom trying to do it all — even if you're not one yet",
        'You come with curiosity, energy, and a willingness to learn',
      ],
    },
    {
      label: 'The Experience',
      title: "What You'll Learn",
      items: [
        'How a founder-led brand approaches partnerships across multiple categories',
        'Brand research and landscape analysis — the foundational work behind every meaningful partnership',
        'Corporate partnership identification — how companies are evaluated as potential workshop or program partners',
        'Community partnership identification — how aligned mom groups, schools, and adjacent organizations are surfaced',
        'Affiliate and ambassador identification — how brands find aligned voices for authentic referral relationships',
        'How partnership pipelines are organized, tracked, and nurtured over time',
        'How research and identification work flows into real partnership conversations',
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
      'A brand partnership you’ve observed (across any industry) that you thought was particularly smart — and why it worked for both sides',
      'Your initial thinking on what kinds of partners would be a strong fit for ai moms™ over the next 30 days — early ideas across corporate, community, or affiliate',
      'Three specific companies, communities, or organizations you’d want to explore as potential ai moms™ partners — and why each one would be a fit',
      'Why this feels like your internship',
    ],
    mailto: 'mailto:hello@aimoms.ai?subject=Brand Partnerships Intern — Application',
  },
  closingLine: 'We move fast here. So should you.',
};

export default function BrandPartnershipsInternPage() {
  return <RolePage role={role} />;
}
