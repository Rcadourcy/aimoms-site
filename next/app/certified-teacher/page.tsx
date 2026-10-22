import type { Metadata } from 'next';
import RolePage, { type RoleData } from '@/components/RolePage';

export const metadata: Metadata = {
  title: 'Certified ai.moms™ Teacher — ai moms™',
  description:
    "For the mom who's been quietly using AI to reclaim her own life — and is ready to teach other moms how to do the same.",
  alternates: { canonical: '/certified-teacher' },
  openGraph: {
    title: 'Certified ai.moms™ Teacher — ai moms™',
    description:
      "For the mom who's been quietly using AI to reclaim her own life — and is ready to teach other moms how to do the same.",
    type: 'website',
    url: 'https://aimoms.ai/certified-teacher',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certified ai.moms™ Teacher — ai moms™',
    description:
      "For the mom who's been quietly using AI to reclaim her own life — and is ready to teach other moms how to do the same.",
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

const role: RoleData = {
  slug: 'certified-teacher',
  heroLabel: 'Now Open · Paid Role',
  heroTitle: 'Certified ai.moms™ Teacher',
  pills: ['Paid · Per Workshop', 'Flexible · Remote or In-Person', 'For Moms'],
  heroDesc:
    "For the mom who's been quietly using AI to reclaim her own life — and is ready to teach other moms how to do the same.",
  sections: [
    {
      label: 'About the Role',
      title: 'What This Is',
      paragraphs: [
        'ai moms™ is on a mission to retire working mothers from Chief Everything Officer™ — teaching them to use AI to eliminate the invisible load of running a household and a career at the same time. We have a course, a community, and a movement that’s growing fast.',
        <>
          We&rsquo;re building a network of <strong>Certified ai.moms™ Teachers</strong> — moms
          who are ready to lead workshops and ai.moms™-hosted experiences. We source the
          opportunities. You show up trained, certified, and ready to teach.
        </>,
        "You won't be teaching alone. You'll be trained, certified, and supported with a full curriculum, materials, and ongoing mentorship. You'll lead live sessions — at moms' homes, schools, corporate gatherings, retreats, and community spaces — and get paid for every workshop you teach.",
      ],
      highlight: {
        quote:
          "I can't be everywhere — and the moms who've already done the work, lived the transformation, and have the warmth to teach are the ones I want carrying this forward. If that's you, I want to meet you.",
        attribution: '— Raquel, founder of ai.moms™',
      },
    },
    {
      title: 'This Role Is For You If',
      items: [
        "You're a mom who's either already used AI to genuinely change how you run your life — or you're energized and fully committed to completing our training and becoming a super user",
        'You light up when you teach. People naturally come to you for advice, and you love breaking complex things into simple steps',
        'You have warmth, presence, and the kind of energy that makes a room feel safe',
        "You're comfortable in front of groups — at a kitchen table or a corporate boardroom",
        "You believe deeply in what we're building and want to be part of expanding it",
        'You can commit to being trained, certified, and showing up at the standard ai.moms™ holds',
        'You have flexibility in your schedule to lead workshops (weekends, evenings, occasional weekdays)',
      ],
    },
    {
      label: 'The Role',
      title: "What You'll Do",
      items: [
        'Lead virtual and in-person workshops using the ai.moms™ curriculum and frameworks',
        'Facilitate ai.moms™-hosted experiences we plug you into — virtually and in cities where you live',
        'Bring the ai.moms™ point of view to corporate workshops and partnership events',
        'Represent the brand with warmth, expertise, and consistency',
        'Participate in ongoing teacher training, refreshers, and community gatherings',
        'Collect feedback and stories from attendees that help us keep improving the experience',
      ],
    },
    {
      title: "What You'll Get",
      items: [
        <>
          <strong>Paid per workshop</strong> — competitive rates that reflect your time,
          expertise, and travel
        </>,
        <>
          <strong>Full certification training</strong> — taught directly by Raquel, our founder
        </>,
        <>
          <strong>A complete teaching toolkit</strong> — curriculum, slides, frameworks, prompts,
          handouts
        </>,
        <>
          <strong>Ongoing mentorship</strong> — regular check-ins, group coaching, a community of
          fellow teachers
        </>,
        <>
          <strong>Marketing support</strong> — the brand behind you for every workshop you lead
        </>,
        <>
          <strong>A real seat at the table</strong> — your feedback shapes the curriculum, the
          experience, and where ai.moms™ goes next
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
    lead: 'If this feels like yours, tell us your story.',
    intro: (
      <>
        Send us an email at <strong>hello@aimoms.ai</strong> and include the following:
      </>
    ),
    steps: [
      'A short paragraph about you — who you are, what you do, what your mom life looks like right now',
      "How you're personally using AI to manage your life",
      'How you prefer to teach — in-person, virtual, or both',
      'Why this feels like yours',
    ],
    mailto: 'mailto:hello@aimoms.ai?subject=Certified ai.moms Teacher — Application',
  },
  closingLine: "The right ones are out there. We'd love to find you.",
};

export default function CertifiedTeacherPage() {
  return <RolePage role={role} />;
}
