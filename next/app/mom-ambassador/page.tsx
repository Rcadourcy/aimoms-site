import type { Metadata } from 'next';
import RolePage, { type RoleData } from '@/components/RolePage';

export const metadata: Metadata = {
  title: 'Founding Mom Ambassador — ai.moms™',
  description:
    'Bring the AI movement for moms to your town. Join our founding cohort of Mom Ambassadors, one per town, to gather your community, introduce moms to AI and earn on your own terms.',
  alternates: { canonical: '/mom-ambassador' },
  openGraph: {
    title: 'Founding Mom Ambassador — ai.moms™',
    description:
      'Bring the AI movement for moms to your town. Join our founding cohort of Mom Ambassadors, one per town, to gather your community, introduce moms to AI and earn on your own terms.',
    type: 'website',
    url: 'https://aimoms.ai/mom-ambassador',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founding Mom Ambassador — ai.moms™',
    description:
      'Bring the AI movement for moms to your town. Join our founding cohort of Mom Ambassadors, one per town, to gather your community, introduce moms to AI and earn on your own terms.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

const role: RoleData = {
  slug: 'mom-ambassador',
  heroLabel: 'Founding cohort · Now accepting applications',
  heroTitle: 'Become an ai.moms™ Founding Mom Ambassador',
  pills: ['One ambassador per town', 'Flexible · On your terms'],
  heroDesc:
    'Bring the AI movement for moms to your town. Gather your community, introduce moms to AI, and earn as you help your circle get their time back.',
  sections: [
    {
      label: 'About the Program',
      title: 'What This Is',
      paragraphs: [
        'AI is the biggest shift of our lifetime, and the women carrying the invisible load of family life are the ones with the least time to learn it. ai.moms™ exists to change that, and Founding Mom Ambassadors are how we reach moms town by town.',
        <>
          This is hyper local on purpose. A mom&rsquo;s real network lives in her town: her schools,
          her friends, her community. So each ambassador brings <strong>ai.moms™</strong> to her own
          town, where her relationships already are. We&rsquo;re starting with a small founding
          cohort of moms, <strong>one ambassador per town</strong>.
        </>,
      ],
      highlight: {
        quote:
          "AI is rewriting how we live and work. At ai.moms™, we're making sure mothers aren't left behind, and the only way to do that at scale is through the moms who are already leading and connecting their communities.",
        attribution: '— Raquel, founder of ai.moms™',
      },
    },
    {
      title: 'This Is For You If',
      items: [
        "You're connected in your community. You know how to bring people together, and moms trust you",
        "You're curious and comfortable with AI. You don't have to be an expert, because we train you on everything you'll teach",
        'Hosting, organizing and connecting give you energy',
        <>
          You want to earn on your own mom terms. It isn&rsquo;t a replacement for a full income, but
          it fits how your life actually runs, whether you&rsquo;re in a season of pause, retired from
          corporate or stacking it on top of other work
        </>,
      ],
    },
    {
      label: 'The Role',
      title: "What You'll Do",
      items: [
        <>
          <strong>Host your first gathering</strong>, an intimate ai.moms™ experience for moms in
          your community. We bring the content and lead it with you. You bring the room
        </>,
        <>
          <strong>Grow from there</strong>, however works best: pull together more gatherings, help
          moms from your first one host their own circle, or bring workshops to local groups like
          your PTA or library
        </>,
        'Share a few photos and videos from each gathering, plus a quick recap, so we can feature your community and keep improving',
      ],
    },
    {
      title: "What You'll Get",
      items: [
        <>
          <strong>Real earnings on every gathering you bring together</strong>, paid quickly after
          each event
        </>,
        <>
          <strong>Full training and support</strong>. We train you on the workshop and demos, lead
          your first one alongside you, and share fresh demos every month
        </>,
        <>
          <strong>A complete event toolkit</strong>. We handle invitations, RSVPs, materials and
          guest follow-up, so your time goes to hosting, not paperwork
        </>,
        <>
          <strong>Your town</strong>. You&rsquo;re the one ai.moms™ ambassador there, so the
          community you build is yours to grow
        </>,
        <>
          <strong>A founding cohort of moms</strong> who train and launch together, so you have
          community from day one
        </>,
      ],
    },
    {
      title: 'The Basics',
      items: [
        'No cost to join. No buy-in, no fees and nothing to purchase. This is not an MLM',
        'An independent role with a simple commitment of a few gatherings a year',
        "You don't need to be an AI expert. Enthusiasm matters more than fluency",
      ],
    },
  ],
  apply: {
    lead: 'If this feels like you, tell us about you and your town.',
    intro: (
      <>
        Send us an email at <strong>hello@aimoms.ai</strong> and include the following:
      </>
    ),
    steps: [
      'A short paragraph about you: who you are, your town, and what your mom life looks like',
      "The communities, group chats, schools, or circles where you're most connected",
      'Your social media handles (we want to see how you naturally show up)',
      'Why this feels like yours',
    ],
    mailto: 'mailto:hello@aimoms.ai?subject=ai.moms Founding Mom Ambassador — Application',
  },
  closingLine: "Your town is waiting. We'd love to hear from you.",
};

export default function MomAmbassadorPage() {
  return <RolePage role={role} />;
}
