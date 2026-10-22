import type { Metadata } from 'next';
import RolePage, { type RoleData } from '@/components/RolePage';

export const metadata: Metadata = {
  title: 'Social Media Intern — ai moms™',
  description:
    'For a sharp, ambitious student who wants to learn what it actually takes to build social for a brand with a real mission — by being immersed in it.',
  alternates: { canonical: '/social-intern' },
  openGraph: {
    title: 'Social Media Intern — ai moms™',
    description:
      'For a sharp, ambitious student who wants to learn what it actually takes to build social for a brand with a real mission — by being immersed in it.',
    type: 'website',
    url: 'https://aimoms.ai/social-intern',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Intern — ai moms™',
    description:
      'For a sharp, ambitious student who wants to learn what it actually takes to build social for a brand with a real mission — by being immersed in it.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

const role: RoleData = {
  slug: 'social-intern',
  heroLabel: 'Internship · For Course Credit',
  heroTitle: 'Social Media Intern',
  pills: ['Unpaid · For Course Credit', 'NY-Based or Remote', 'Part-Time Volunteer Hours'],
  heroDesc:
    'For a sharp, ambitious student who wants to learn what it actually takes to build social for a brand with a real mission — by being immersed in it.',
  sections: [
    {
      label: 'About the Opportunity',
      title: 'What This Is',
      paragraphs: [
        'ai moms™ is on a mission to retire working mothers from Chief Everything Officer™ — teaching them to use AI to eliminate the invisible load of running a household and a career at the same time. We have a course, a community, and a movement that’s just getting started.',
        'We’re looking for a sharp, ambitious student who wants to learn what it actually takes to build social for a brand with a real mission — by being immersed in it.',
      ],
      highlight: {
        quote:
          "This isn't about managing a content calendar. It's about learning how a brand earns trust, builds community, and shows up with a real point of view — in public, every day.",
      },
    },
    {
      title: 'This Experience Is For You If',
      items: [
        "You live on Instagram, TikTok, and LinkedIn like it's your second home",
        "You've studied or explored social strategy for a brand before (show us)",
        'You already have video editing skills and love creating short-form content fast — like, embarrassingly fast',
        "You can look at a brand's content and immediately have ideas",
        'You understand how community gets built online — not just content, but connection',
        "You get what it means to be a working mom trying to do it all — even if you're not one yet",
        'You come with curiosity, energy, and ideas to share',
      ],
    },
    {
      label: 'The Experience',
      title: "What You'll Learn",
      items: [
        'How a founder-led brand develops and executes a real social strategy',
        'Content planning, storytelling, and platform-specific creative thinking',
        'How online communities are built through authentic engagement',
        'Brand voice, audience development, and growth strategy from the inside',
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
      "One account you've worked on or grown — even your own",
      'Your social media approach for our brand over the next 30 days',
      'Why this feels like your internship',
    ],
    mailto: 'mailto:hello@aimoms.ai?subject=Social Media Intern — Application',
  },
  closingLine: 'We move fast here. So should you.',
};

export default function SocialInternPage() {
  return <RolePage role={role} />;
}
