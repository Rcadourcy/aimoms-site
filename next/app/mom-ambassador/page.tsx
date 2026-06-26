import type { Metadata } from 'next';
import RolePage, { type RoleData } from '@/components/RolePage';

export const metadata: Metadata = {
  title: 'ai.moms™ Mom Ambassador — ai moms™',
  description:
    'For the mom who is the community connector in her city — and is deeply aligned with giving moms their time back while advocating for AI education for women.',
  alternates: { canonical: '/mom-ambassador' },
  openGraph: {
    title: 'ai.moms™ Mom Ambassador — ai moms™',
    description:
      'For the mom who is the community connector in her city — and is deeply aligned with giving moms their time back while advocating for AI education for women.',
    type: 'website',
    url: 'https://aimoms.ai/mom-ambassador',
    images: ['https://aimoms.ai/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ai.moms™ Mom Ambassador — ai moms™',
    description:
      'For the mom who is the community connector in her city — and is deeply aligned with giving moms their time back while advocating for AI education for women.',
    images: ['https://aimoms.ai/og-image.png'],
  },
};

const role: RoleData = {
  slug: 'mom-ambassador',
  heroLabel: 'Now Open · For Moms',
  heroTitle: 'ai.moms™ Mom Ambassador',
  pills: ['Flexible · Your City', 'For Moms'],
  heroDesc:
    'For the mom who is the community connector in her city — and is deeply aligned with giving moms their time back while advocating for AI education for women.',
  sections: [
    {
      label: 'About the Role',
      title: 'What This Is',
      paragraphs: [
        'ai moms™ is on a mission to retire mothers from Chief Everything Officer™ — teaching them to use AI to eliminate the invisible load of running a household, a career, and everything in between. We have a course, a community, and a growing series of mom-hosted experiences coming to cities around the world.',
        <>
          To bring this to scale, we&rsquo;re activating a network of{' '}
          <strong>ai.moms™ Mom Ambassadors</strong> — moms who are community connectors in their
          cities, deeply aligned with our mission, and ready to introduce ai.moms™ to the women in
          their world.
        </>,
      ],
      highlight: {
        quote:
          "AI is rewriting how we live and work. At ai.moms™, we're making sure mothers aren't left behind — and the only way to do that at scale is through the moms who are already leading and connecting their communities.",
        attribution: '— Raquel, founder of ai.moms™',
      },
    },
    {
      title: 'This Role Is For You If',
      items: [
        "You're a community leader and connector in your local city — moms come to you for recommendations, introductions, and the inside track on what matters",
        "You don't need to be an AI super user — you just need to be AI-curious, ready to dive in and learn, and ready to be a cheerleader for AI education in your community",
        "You believe deeply in giving moms their time back, and in making sure women aren't left behind as AI reshapes everything",
        "You're comfortable sharing what you love on social media, in your group chats, in your school communities, and at the dinner table",
        'You have the energy to gather women — host a small workshop, attend our experiences, or pull a group of friends together for a conversation',
        'You want to be part of building something bigger than yourself, alongside other extraordinary moms',
      ],
    },
    {
      label: "Where We're Activating",
      title: 'Key Markets',
      paragraphs: [
        'We’re looking for ambassadors in cities where moms gather, lead, and shape the cultural conversation. Initial markets include:',
      ],
      items: [
        'New York City',
        'Los Angeles',
        'Chicago',
        'Miami',
        'San Francisco / Bay Area',
        'Boston',
        'Washington, D.C.',
        'Atlanta',
        'Dallas',
        'Houston',
        'Austin',
        'Seattle',
        'Denver',
        'Detroit Metro',
        'Nashville',
        'Philadelphia',
        'London',
        'Paris',
        'Zurich',
      ],
      note: "If you're a connector mom in your city and you don't see it on this list, we still want to hear from you. We're building this everywhere extraordinary moms already are.",
    },
    {
      label: 'The Role',
      title: "What You'll Do",
      items: [
        'Share ai.moms™ authentically with your network — through social posts, group chats, school communities, and conversations',
        'Help us bring our mom-hosted experiences to your city — by gathering a group, hosting at your home, or co-promoting a local event',
        'Attend our workshops as our guest, so you can speak about ai.moms™ from real experience',
        'Stay in the loop with our private ambassador community for fresh content, prompts, and updates',
      ],
    },
    {
      title: "What You'll Get",
      items: [
        <>
          <strong>A meaningful earning opportunity</strong> — whether you&rsquo;re a career mom or a
          stay-at-home mom, this is a way to earn through the work you&rsquo;re already doing in your
          community, while helping build the platform that ensures moms aren&rsquo;t left behind in
          AI
        </>,
        <>
          <strong>Standing as the AI-literate mom in your city</strong> — you&rsquo;ll be the one
          other moms turn to when they want to learn, ask, or get started
        </>,
        <>
          <strong>A real personal AI fluency</strong> — you&rsquo;ll learn to use AI in ways that
          genuinely change how you run your own life, before you teach anyone else
        </>,
        <>
          <strong>A network of other extraordinary moms</strong> — connectors, builders, and
          community leaders across cities you&rsquo;ll meet, learn from, and grow with
        </>,
        <>
          <strong>A real seat at the table</strong> — your feedback shapes what we build, where we
          go, and how we get there
        </>,
      ],
    },
    {
      title: 'About ai.moms™',
      paragraphs: [
        'ai.moms™ exists to retire moms around the globe from Chief Everything Officer™.',
        <>
          We serve three moms with the same load: the <strong>Mom at Home</strong> drowning in the
          invisible work no one sees, the <strong>Mom at Work</strong> who doesn&rsquo;t have hours
          to play with new tools while her colleagues without kids do, and the{' '}
          <strong>Mompreneur</strong> building something real with AI as her leverage.
        </>,
        <>
          The way we get there is through three pillars: real AI <strong>education</strong> that goes
          beyond tips and tricks, the <strong>solution</strong> of Aime — the AI Chief Everything
          Officer™ — plus the tools and skills that turn her into a true partner, and the{' '}
          <strong>community</strong> that ensures no mom carries this alone.
        </>,
        'Founded by Raquel Cadourcy — a mom of two with 20+ years of marketing leadership, from LVMH to CMO of luxury and lifestyle brands. AI systems architect and organizational neuroscience specialist. Built ai.moms™ because she needed it first.',
      ],
    },
  ],
  apply: {
    lead: 'If this feels like yours, tell us your story.',
    intro: (
      <>
        Send us an email at <strong>hello@aimoms.ai</strong> and include the following:
      </>
    ),
    steps: [
      'A short paragraph about you — who you are, where you live, what your mom life looks like',
      "The communities, group chats, schools, or circles where you're most connected",
      'Your social media handles (we want to see how you naturally show up)',
      'Why this feels like yours',
    ],
    mailto: 'mailto:hello@aimoms.ai?subject=ai.moms Mom Ambassador — Application',
  },
  closingLine: "The most connected moms are out there. We'd love to find you.",
};

export default function MomAmbassadorPage() {
  return <RolePage role={role} />;
}
