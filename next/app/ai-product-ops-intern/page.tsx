import type { Metadata } from 'next';
import RolePage, { type RoleData } from '@/components/RolePage';

export const metadata: Metadata = {
  title: 'AI Product & Operations Intern — ai moms™',
  description:
    'For a self-taught builder who wants hands-on learning at the edge of where AI meets product — using Claude and no-code tools to support real micro-tools, internal workflows, and the website that brings it all together.',
  alternates: { canonical: '/ai-product-ops-intern' },
  openGraph: {
    title: 'AI Product & Operations Intern — ai moms™',
    description:
      'For a self-taught builder who wants hands-on learning at the edge of where AI meets product — using Claude and no-code tools to support real micro-tools, internal workflows, and the website that brings it all together.',
    type: 'website',
    url: 'https://aimoms.ai/ai-product-ops-intern',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Product & Operations Intern — ai moms™',
    description:
      'For a self-taught builder who wants hands-on learning at the edge of where AI meets product — using Claude and no-code tools to support real micro-tools, internal workflows, and the website that brings it all together.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

const role: RoleData = {
  slug: 'ai-product-ops-intern',
  heroLabel: 'Internship · For Course Credit',
  heroTitle: 'AI Product & Operations Intern',
  pills: ['Unpaid · For Course Credit', 'NY-Based or Remote', 'Part-Time Volunteer Hours'],
  heroDesc:
    'For a self-taught builder who wants hands-on learning at the edge of where AI meets product — using Claude and no-code tools to support real micro-tools, internal workflows, and the website that brings it all together.',
  sections: [
    {
      label: 'About the Opportunity',
      title: 'What This Is',
      paragraphs: [
        'ai moms™ is on a mission to retire working mothers from Chief Everything Officer™ — teaching them to use AI to eliminate the invisible load of running a household and a career at the same time. We have a course, a community, and a movement that’s just getting started.',
        'We’re offering a hands-on learning experience for a self-taught builder who’s curious about how AI gets applied to real-world problems — supporting the development of micro-tools (think: summer camp finder, meal planner, and more), helping shape internal workflows, and contributing to the website under the direct mentorship of our founder.',
      ],
      highlight: {
        quote:
          "This is for the student who's been quietly using Claude to automate their own life — and wants to learn what it looks like to apply that mindset inside a real, growing brand.",
      },
    },
    {
      title: 'This Experience Is For You If',
      items: [
        "You're a self-taught builder — you figure things out, you don't wait to be shown",
        "You're already using Claude (or excited to use it deeply) for real things in your life",
        "You're comfortable with no-code and low-code tools — Cowork, Claude Code, Make.com, Zapier — or eager to learn them fast",
        'You think in systems and workflows — "what if this could just happen automatically?"',
        "You're product-minded — you care about how something feels to use, not just whether it works",
        'You can navigate a website backend without panicking',
        "You're studying CS, design, business, or product — or pursuing a related degree, or self-taught and eager to apply what you know",
        "You get what it means to be a working mom trying to do it all — even if you're not one yet",
        'You come with curiosity, energy, and a willingness to learn',
      ],
    },
    {
      label: 'The Experience',
      title: "What You'll Learn",
      items: [
        'How a founder-led brand turns ideas into real, working AI-powered tools',
        'Hands-on practice with Claude — prompting, automating, building useful things for real people',
        'Cowork, Claude Code, Make.com, and Zapier — exposure to the tools that turn ideas into workflows',
        'How micro-tools (a meal planner, a summer camp finder) get scoped, built, and launched',
        'How internal operations get streamlined when AI is woven into the day-to-day',
        "How a brand's website supports product, content, and conversion together",
        'How small, fast-moving teams ship — and what that mindset feels like from the inside',
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
      "Something you've built — a tool, a workflow, an automation, a side project. Anything that solved a real problem (your own counts)",
      "A description of how you use AI in your own life right now — what's working, what you wish worked better",
      "One micro-tool idea you'd want to explore for working moms — and a rough sketch of how you'd approach it",
      'Why this feels like your internship',
    ],
    /* mailto preserved verbatim from source: subject contains URL-encoded %26 for the ampersand. */
    mailto: 'mailto:hello@aimoms.ai?subject=AI Product %26 Operations Intern — Application',
  },
  closingLine: 'We move fast here. So should you.',
};

export default function AiProductOpsInternPage() {
  return <RolePage role={role} />;
}
