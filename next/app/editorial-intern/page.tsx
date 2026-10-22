import type { Metadata } from 'next';
import RolePage, { type RoleData } from '@/components/RolePage';

export const metadata: Metadata = {
  title: 'Editorial Intern — ai moms™',
  description:
    'For a sharp, curious student writer who wants hands-on learning at the intersection of editorial, AI, and brand voice — practicing how thoughtful, story-driven content actually gets made.',
  alternates: { canonical: '/editorial-intern' },
  openGraph: {
    title: 'Editorial Intern — ai moms™',
    description:
      'For a sharp, curious student writer who wants hands-on learning at the intersection of editorial, AI, and brand voice — practicing how thoughtful, story-driven content actually gets made.',
    type: 'website',
    url: 'https://aimoms.ai/editorial-intern',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editorial Intern — ai moms™',
    description:
      'For a sharp, curious student writer who wants hands-on learning at the intersection of editorial, AI, and brand voice — practicing how thoughtful, story-driven content actually gets made.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

const role: RoleData = {
  slug: 'editorial-intern',
  heroLabel: 'Internship · For Course Credit',
  heroTitle: 'Editorial Intern',
  pills: ['Unpaid · For Course Credit', 'NY-Based or Remote', 'Part-Time Volunteer Hours'],
  heroDesc:
    'For a sharp, curious student writer who wants hands-on learning at the intersection of editorial, AI, and brand voice — practicing how thoughtful, story-driven content actually gets made.',
  sections: [
    {
      label: 'About the Opportunity',
      title: 'What This Is',
      paragraphs: [
        'ai moms™ is on a mission to retire working mothers from Chief Everything Officer™ — teaching them to use AI to eliminate the invisible load of running a household and a career at the same time. We have a course, a community, and a movement that’s just getting started.',
        'We’re offering a hands-on learning experience for a sharp, curious student writer who wants real exposure to editorial work — contributing to a weekly publishing rhythm, learning how to use AI as a co-writer (not a replacement), and supporting the curation of our AI Toolkit page under the direct mentorship of our founder.',
      ],
      highlight: {
        quote:
          "This is a craft-driven learning experience. You'll practice writing for a real audience, learn how to use AI tools to elevate your work, and see how editorial voice gets built one piece at a time.",
      },
    },
    {
      title: 'This Experience Is For You If',
      items: [
        "You love to write and have been told you're good at it",
        "You're a curious reader who notices voice, structure, and what makes a piece land",
        "You're already using AI tools (Claude, ChatGPT) — or excited to learn how to use them well for writing",
        "You're organized — you can hold a publishing schedule and meet deadlines",
        'You write clearly and welcome feedback that makes your work stronger',
        "You've studied journalism, English, communications, marketing — or are pursuing a related degree and eager to learn",
        "You get what it means to be a working mom trying to do it all — even if you're not one yet",
        'You come with curiosity, energy, and a willingness to learn',
      ],
    },
    {
      label: 'The Experience',
      title: "What You'll Learn",
      items: [
        'How a founder-led brand approaches editorial — voice, point of view, and consistency',
        'How to use AI tools (especially Claude) as a writing partner — research, drafting, editing, polishing',
        'The full editorial workflow — from idea to outline to draft to publish',
        'How to write for a real audience and learn from how content performs',
        'Content curation — supporting updates to our AI Toolkit page with new tools, prompts, and resources',
        'SEO fundamentals and how editorial work supports broader brand growth',
        'How editorial voice shapes how a brand is understood, remembered, and trusted',
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
      'A writing sample you’re proud of — a school essay, a personal blog post, a Substack of your own, anything you’ve written that you’d want us to read',
      'A brand or publication whose editorial voice you admire — and what makes it work',
      'Three article ideas you’d want to explore for ai moms™ — could be tactical (an AI use case for working moms), narrative (a working mom story), or cultural (a take on motherhood and AI right now)',
      'Why this feels like your internship',
    ],
    mailto: 'mailto:hello@aimoms.ai?subject=Editorial Intern — Application',
  },
  closingLine: 'We move fast here. So should you.',
};

export default function EditorialInternPage() {
  return <RolePage role={role} />;
}
