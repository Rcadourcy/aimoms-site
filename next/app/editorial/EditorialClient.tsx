'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { seededShuffle, rotateWindow } from '@/lib/rotation';

const CATS = [
  { key: 'ALL', label: 'ALL' },
  { key: 'AI 101', label: 'AI 101' },
  { key: 'HOME', label: 'HOME' },
  { key: 'WORK', label: 'WORK' },
  { key: 'TOOLS', label: 'TOOLS & AIME' },
  { key: 'NEUROSCIENCE', label: 'NEUROSCIENCE' },
  { key: 'SEASONAL', label: 'SEASONAL' },
  { key: 'MILESTONES', label: 'MILESTONES' },
];

type Badge = { type: 'video' | 'tool' | 'seasonal'; text: string };
type Story = {
  id: string;
  cat: string;
  catLabel: string;
  img: string;
  alt: string;
  title: string;
  desc: string;
  badges?: Badge[];
};

function Badges({ badges }: { badges?: Badge[] }) {
  if (!badges) return null;
  return (
    <>
      {badges.map((b, i) => {
        if (b.type === 'video') return <div key={i} className="video-badge">{b.text}</div>;
        if (b.type === 'tool') return <div key={i} className="tool-badge">{b.text}</div>;
        return <div key={i} className="seasonal-badge">{b.text}</div>;
      })}
    </>
  );
}

function StoryRow({ story, visible }: { story: Story; visible: boolean }) {
  return (
    <Link
      href={`/article?id=${story.id}`}
      className="story-row"
      style={visible ? undefined : { display: 'none' }}
    >
      <div className="story-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={story.img} alt={story.alt} />
      </div>
      <div className="story-body">
        <span className="cat-label">{story.catLabel}</span>
        <h3>{story.title}</h3>
        <p>{story.desc}</p>
        <Badges badges={story.badges} />
        <span className="byline">ai moms&#8482; editorial</span>
      </div>
    </Link>
  );
}

/* ── Story data, in source order, grouped between CTA strips ── */
const AI_101: Story[] = [
  { id: 'start-here', cat: 'AI 101', catLabel: 'AI 101', img: '/img/articles/photo-1508214751196-bcfd4ca60f91-w600.jpg', alt: 'Woman at kitchen table with laptop and coffee, looking calm and focused', title: 'New to AI? Start Here — Seriously, Right Here.', desc: 'No jargon, no overwhelm. The clearest starting point for mothers who are ready to try AI and actually get somewhere.', badges: [{ type: 'video', text: 'Watch: 5-Min Intro' }] },
  { id: 'ai-tools-comparison', cat: 'AI 101', catLabel: 'AI 101', img: '/img-unsplash-22.jpg', alt: 'Woman comparing notes with two open browser tabs', title: "We Tested the Top AI Tools for 6 Months. Here's What Actually Stuck.", desc: 'ChatGPT, Claude, Gemini — a real-world comparison from a mom who used all three. The winner might surprise you.' },
  { id: 'what-is-a-prompt', cat: 'AI 101', catLabel: 'AI 101', img: '/img/articles/photo-1515378791036-0648a3ef77b2-w600.jpg', alt: 'Woman writing in a notebook at a desk with warm lamp light', title: 'What Is a Prompt, Really? The One Skill That Changes Everything.', desc: 'How you talk to AI is everything. This is the single skill that determines whether it saves you an hour — or wastes one.' },
  { id: '25-prompts-spring', cat: 'AI 101', catLabel: 'AI 101', img: '/img/articles/photo-1484480974693-6ca0a78fb36b-w600.jpg', alt: 'Woman smiling at her phone with a notepad nearby', title: '25 AI Prompts Every Mother Needs This Spring', desc: 'Copy, paste, customize. From camp applications to end-of-year teacher gifts — your spring prompt starter kit.', badges: [{ type: 'video', text: 'Watch: Live Demo' }, { type: 'seasonal', text: '🌸 Spring' }] },
  { id: 'ai-habits', cat: 'AI 101', catLabel: 'AI 101', img: '/img/articles/photo-1571844307880-751c6d86f3f3-w600.jpg', alt: 'Woman at window with laptop, morning light coming through', title: 'The AI Habits That Will Define the Next Five Years', desc: "The mothers who use AI well aren't the most tech-savvy — they have the right habits. Here's what to build, starting this week." },
];

const HOME: Story[] = [
  { id: 'mothers-day', cat: 'HOME', catLabel: 'HOME', img: '/img-unsplash-23.jpg', alt: 'Mom and daughter laughing together outside, warm and genuine at a table with coffee, looking unhurried', title: "What Every Mom Actually Wants for Mother's Day", desc: "Not another thing to find a place for on a shelf. Not a 3-hour spa trip that ends at dinner prep. She wants her time back — not just on Mother's Day, but for good.", badges: [{ type: 'seasonal', text: "🌸 Mother's Day" }] },
  { id: 'meal-planning', cat: 'HOME', catLabel: 'HOME', img: '/img/articles/photo-1547592180-85f173990554-w600.jpg', alt: 'Woman with tablet in a bright kitchen, fresh ingredients on counter', title: 'Every Way to Use AI for Meal Planning — Ranked', desc: "One-off prompts, our Meal Planner micro-tool, AI family apps, the weekly reset with Aime. We tested them all so you don't have to.", badges: [{ type: 'tool', text: '✦ Try the Meal Planner Tool' }, { type: 'video', text: 'Watch: Kitchen Demo' }] },
  { id: 'family-command-center', cat: 'HOME', catLabel: 'HOME', img: '/img/articles/photo-1506784983877-45594efa4cbe-w600.jpg', alt: 'Organized family calendar on wall, woman reviewing it with coffee', title: 'How to Build a Family Command Center Powered by AI', desc: 'Schedules, meals, logistics, handoffs — one AI-powered system to run it all. We teach this step-by-step in the course.', badges: [{ type: 'video', text: 'Watch: Quick Tour' }] },
  { id: 'voice-memo', cat: 'HOME', catLabel: 'HOME', img: '/img-unsplash-19.jpg', alt: 'Woman walking outside, holding phone up speaking into it', title: 'The Voice Memo Trick That Cleared My Entire Mental Load', desc: 'Talk into your phone during carpool pickup. Let AI organize, prioritize, and respond. This is the invisible load fix nobody talks about.' },
  { id: 'birthday-party', cat: 'HOME', catLabel: 'HOME', img: '/img/articles/photo-1530103862676-de8c9debad1d-w600.jpg', alt: "Beautifully decorated children's birthday party setup with balloons", title: "I Planned a Birthday Party in 4 Minutes With AI. Here's the Prompt.", desc: 'Theme, vendors, invites, timeline, dietary restrictions, thank-you notes. The prompt is right here — take it.' },
  { id: 'sunday-reset', cat: 'HOME', catLabel: 'HOME', img: '/img/articles/photo-1491975474562-1f4e30bc9468-w600.jpg', alt: 'Woman with coffee and planner on a Sunday morning, looking calm', title: 'Your Sunday Reset, Powered by Aime', desc: 'Run your weekly reset through Aime — meals, schedule, tasks, mental prep. Fifteen minutes on Sunday that changes everything about Monday.', badges: [{ type: 'tool', text: '✦ Meet Aime' }, { type: 'video', text: 'Watch: Reset Demo' }] },
  { id: 'kids-dinner', cat: 'HOME', catLabel: 'HOME', img: '/img-unsplash-5.jpg', alt: 'Family at dinner table, mom serving food, children eating happily', title: 'How I Finally Got My Kids to Eat Dinner — With a Little Help From AI', desc: "Picky eaters, dietary restrictions, the same four meals on rotation. AI knows your family's patterns — and knows how to break them." },
  { id: 'delegate-to-ai', cat: 'HOME', catLabel: 'HOME', img: '/img/articles/photo-1554774853-aae0a22c8aa4-w600.jpg', alt: 'Confident woman at desk, pointing at laptop screen with purpose', title: "How to Delegate to AI Like You'd Delegate to an EA", desc: 'Stop asking questions. Start giving instructions. The mindset shift that turns AI from a novelty into a necessity.' },
  { id: '3-ai-setups', cat: 'HOME', catLabel: 'HOME', img: '/img/articles/photo-1563986768494-4dee2763ff3f-w600.jpg', alt: 'Woman setting up a calm organized home workspace with plants', title: 'The 3 AI Setups Every Mom Should Have Running by Monday', desc: 'Three systems. Twenty minutes. A completely different week.' },
];

const SEASONAL: Story[] = [
  { id: 'summer-camp-research', cat: 'SEASONAL', catLabel: 'SEASONAL', img: '/img-unsplash-9.jpg', alt: 'Kids at summer camp, laughing and playing outdoors in sunshine', title: "Summer Camp Research Is a Part-Time Job. Here's How to Do It in an Afternoon.", desc: 'Find the right camps, plot the full summer schedule, fill the gaps, and stop toggling between 15 browser tabs. AI does the research — you make the calls.', badges: [{ type: 'tool', text: '✦ Try the Summer Camp Finder' }, { type: 'seasonal', text: '☀️ Summer' }] },
  { id: 'summer-family-trip', cat: 'SEASONAL', catLabel: 'SEASONAL', img: '/img/articles/photo-1488646953014-85cb44e25828-w600.jpg', alt: 'Mom and daughter at an airport with luggage, looking excited', title: 'How to Plan a Family Summer Trip in One Afternoon With AI', desc: 'Destination research, itinerary, packing lists, kid-friendly restaurants, backup plans. One session with AI, one summer your family will actually remember.', badges: [{ type: 'seasonal', text: '☀️ Summer Travel' }] },
  { id: 'end-of-school', cat: 'SEASONAL', catLabel: 'SEASONAL', img: '/img-unsplash-15.jpg', alt: 'Children in graduation caps laughing with parents at end of school ceremony', title: 'End of School Year? AI Can Handle the Entire Last Month.', desc: 'Teacher gifts, end-of-year parties, summer planning, transition logistics — all of it, handed off to AI so you can actually be present for it.', badges: [{ type: 'seasonal', text: '🌸 Spring' }] },
  { id: 'end-of-school-party', cat: 'SEASONAL', catLabel: 'SEASONAL', img: '/img-unsplash-29.jpg', alt: 'Colorful kids party with table decorations and balloons at the end of school', title: 'The End-of-School Party Prompt That Does All the Planning for You', desc: 'Class party, neighborhood cookout, grade-wide celebration — whatever it is, AI has the theme, the games, the shopping list, and the sign-up sheet draft.', badges: [{ type: 'seasonal', text: '🌸 Spring' }] },
  { id: 'back-to-school', cat: 'SEASONAL', catLabel: 'SEASONAL', img: '/img/articles/photo-1588072432836-e10032774350-w600.jpg', alt: 'Mom and child looking at school backpack and supplies together', title: 'How to Automate the School Year — Before It Starts', desc: 'Forms, deadlines, supply lists, permission slips. Set it up with AI in one Sunday afternoon and run the whole year on autopilot.', badges: [{ type: 'seasonal', text: '🍂 Back to School' }] },
  { id: 'summer-childcare', cat: 'SEASONAL', catLabel: 'SEASONAL', img: '/img-unsplash-26.jpg', alt: 'Mom and babysitter sitting together going over a checklist', title: 'Summer Childcare Planning Is a Part-Time Job. AI Can Do It for You.', desc: 'Camps, babysitters, grandparent weeks, swim lessons — building the summer calendar is the invisible load nobody talks about. Until now.', badges: [{ type: 'seasonal', text: '☀️ Summer' }] },
];

const MILESTONES: Story[] = [
  { id: 'new-mom', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img/articles/photo-1555252333-9f8e92e65df9-w600.jpg', alt: 'New mom holding a newborn baby, looking tender and slightly overwhelmed', title: "The New Mom's AI Starter Kit (For the 4th Trimester)", desc: "You just had a baby. Your brain is running on empty. Here's the AI setup that handles feeding schedules, thank-you notes, pediatrician questions, and all the decisions you shouldn't have to be making right now." },
  { id: 'toddler-years', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img/articles/photo-1476703993599-0035a21b17a9-w600.jpg', alt: 'Mom sitting on floor playing with a toddler, both laughing', title: 'The Toddler Years Are Chaos. AI Is Your Secret Weapon.', desc: "Sleep regression research at 2am. Activity ideas when you've run out. Pediatrician prep. The questions you're embarrassed to Google. AI handles all of it, without judgment." },
  { id: 'elementary-school', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img/articles/photo-1503919545889-aef636e10ad4-w600.jpg', alt: 'Mom walking an elementary-age child to school, holding hands on a sunny morning', title: "Elementary School Mom: You're Now the Family Logistics Director", desc: 'Playdates, carpools, homework, reading logs, class parties, teacher emails. The volume just went up — here’s how AI absorbs the operational load.' },
  { id: 'middle-school', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img/articles/photo-1531983412531-1f49a365ffed-w600.jpg', alt: 'Mom and teen daughter talking at the kitchen table, warm and honest moment', title: 'Middle School: When the Emotional Load Gets as Heavy as the Logistics', desc: 'Friend drama, academic pressure, phone boundaries, the sudden need to be everywhere and nowhere at once. How AI helps you manage it all — and actually be present.' },
  { id: 'high-school', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img-unsplash-33.jpg', alt: 'Mom helping teenage child with college application paperwork at desk', title: 'High School Moms: The AI Guide to the Four Most Overwhelming Years', desc: 'College prep, test schedules, college lists, visit logistics, application essays, financial aid research — let AI carry the cognitive weight of the process so you can actually enjoy the moment.' },
  { id: 'empty-nest', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img/articles/photo-1525921429624-479b6a26d84d-w600.jpg', alt: 'Mom hugging college-age child at a campus with an emotional smile', title: 'College Drop-Off Is a Grief Nobody Prepares You For', desc: "She's gone. Now what? How mothers in the empty nest chapter are using AI not just to organize — but to rediscover who they are when the job description changes." },
  { id: 'perimenopause', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img/articles/photo-1551836022-d5d88e9218df-w600.jpg', alt: 'Woman working at desk at home with natural light, focused and calm', title: 'Perimenopause + the Mental Load: The Double Burden Nobody Is Talking About', desc: 'Brain fog, hormonal shifts, still running the household, possibly at peak career demands. How AI becomes essential — not optional — at this life stage.' },
  { id: 'menopause', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img-mom-1.png', alt: 'Woman in her 50s looking confident outdoors, smiling freely', title: 'Menopause Is the Beginning of Reclaiming Your Time. AI Helps.', desc: 'Research shows post-menopausal women report clarity, ambition, and purpose. AI is the infrastructure that actually supports that chapter — finally.' },
  { id: 'solo-mom', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img/articles/photo-1494790108377-be9c29b29330-w600.jpg', alt: 'Single mom on couch with laptop open and child nearby, managing it all', title: "Solo Mom, AI Co-Pilot: You Shouldn't Have to Do This Alone", desc: "Single mothers carry 100% of the invisible load. AI doesn't replace support — but it does handle a significant portion of the cognitive labor that's been entirely on you." },
  { id: 'return-to-work', cat: 'MILESTONES', catLabel: 'MILESTONES', img: '/img-unsplash-32.jpg', alt: 'Woman in a professional setting looking sharp and confident, walking purposefully', title: 'AI for the Return-to-Work Mom: Your 30-Day Ramp Plan', desc: 'How to close the gap, rebuild confidence, and show up sharper than you left — with AI running behind the scenes.' },
];

const WORK: Story[] = [
  { id: 'ai-at-work', cat: 'WORK', catLabel: 'WORK', img: '/img-unsplash-12.jpg', alt: 'Woman in a bright office with laptop, looking sharp and in control', title: 'How to Use AI at Work Before Anyone Else Figures It Out', desc: 'The quiet edge. Prep faster, write better, think clearer — and let the results speak for themselves.', badges: [{ type: 'video', text: 'Watch: Work Workflow' }] },
  { id: 'email-prompt', cat: 'WORK', catLabel: 'WORK', img: '/img-unsplash-14.jpg', alt: 'Woman focused on laptop screen, coffee to her side, clearly in flow state', title: 'The Email Prompt That Saved Me 6 Hours a Week', desc: 'Draft, refine, send — in your own voice, in a fraction of the time. The full prompt is inside.' },
  { id: 'meeting-prep', cat: 'WORK', catLabel: 'WORK', img: '/img-unsplash-8.jpg', alt: 'Woman reviewing notes before a meeting, looking prepared and composed', title: 'How to Prep for Any Meeting in 3 Minutes With AI', desc: 'Research, talking points, smart questions, and a follow-up email template — all before you walk through the door.' },
  { id: 'working-mom-playbook', cat: 'WORK', catLabel: 'WORK', img: '/img/articles/photo-1573496799652-408c2ac9fe98-w600.jpg', alt: 'Woman walking into a modern office building, confident stride, bag over shoulder', title: "The Working Mom's AI Playbook", desc: 'Six workflows that let you perform at your peak — even on the days when everything else is also happening at once.', badges: [{ type: 'video', text: 'Watch: Playbook Walkthrough' }] },
];

const TOOLS: Story[] = [
  { id: 'meet-aime', cat: 'TOOLS', catLabel: 'TOOLS & AIME', img: '/img/articles/photo-1649972904349-6e44c42644a7-w600.jpg', alt: 'Woman relaxed on sofa with laptop open, looking peaceful and unbothered', title: 'Meet Aime: Your AI Chief Everything Officer™', desc: 'She runs your household. Manages your week. Never sleeps, never judges, and never needs to be thanked. Meet the assistant you actually deserve.', badges: [{ type: 'tool', text: '✦ Try Aime Free' }, { type: 'video', text: 'Watch: Aime in Action' }] },
  { id: 'micro-tools', cat: 'TOOLS', catLabel: 'TOOLS & AIME', img: '/img/articles/photo-1581291518633-83b4ebd1d83e-w600.jpg', alt: 'Woman scrolling through apps on her phone at a kitchen table', title: "The ai.moms™ Micro-Tools You Didn't Know You Needed", desc: 'Meal planning, camp finding, babysitter vetting — purpose-built tools that do one thing exceptionally well.', badges: [{ type: 'tool', text: '✦ Browse All Tools' }] },
  { id: 'safesitter', cat: 'TOOLS', catLabel: 'TOOLS & AIME', img: '/img-unsplash-16.jpg', alt: 'Mom and babysitter sitting together going over a checklist', title: 'How to Vet a Babysitter Using AI and SafeSitter™', desc: "Interview questions, red flags, reference checks, and emergency protocol docs — all generated in minutes so you can trust who's in your home.", badges: [{ type: 'tool', text: '✦ Try SafeSitter™' }] },
  { id: 'ai-toolkit', cat: 'TOOLS', catLabel: 'TOOLS & AIME', img: '/img/articles/photo-1522202176988-66273c2fd55f-w600.jpg', alt: 'Group of women around a table with laptops, collaborating and laughing', title: 'The AI Toolkit for Moms: What to Use — and When', desc: 'The definitive guide to which tool does what — so you stop opening five apps and start getting things done.' },
];

const NEUROSCIENCE: Story[] = [
  { id: 'invisible-load', cat: 'NEUROSCIENCE', catLabel: 'NEUROSCIENCE', img: '/img/articles/photo-1474552226712-ac0f0961a954-w600.jpg', alt: 'Woman standing at a window, hands lightly on her head, thoughtful expression', title: 'The Invisible Load Has Finally Met Its Match', desc: 'How AI is giving mothers the one thing we never had — a second brain that actually works. The science, the research, and what it means for you.' },
  { id: 'neuroscience-mental-load', cat: 'NEUROSCIENCE', catLabel: 'NEUROSCIENCE', img: '/img/articles/photo-1559757175-0eb30cd8c063-w600.jpg', alt: 'Close-up portrait of a woman thinking, serene and focused expression', title: 'The Neuroscience of the Mental Load — And Why AI Fixes It', desc: "Your brain wasn't built for 300 decisions a day. Here's what's actually happening — and why offloading to AI isn't laziness, it's biology." },
  { id: 'mothers-brains', cat: 'NEUROSCIENCE', catLabel: 'NEUROSCIENCE', img: '/img-mom-2.png', alt: 'Mom reading with a young child in warm afternoon light, a tender quiet moment', title: "Why Mothers' Brains Are Wired Differently — And What That Means for AI", desc: 'The science behind why delegation feels so hard, why guilt shows up when you try to rest — and why AI changes that equation.' },
  { id: 'decision-fatigue', cat: 'NEUROSCIENCE', catLabel: 'NEUROSCIENCE', img: '/img/articles/photo-1490623970972-ae8bb3da443e-w600.jpg', alt: 'Tired woman at a desk, head in hands, stacks of papers around her', title: "Decision Fatigue Is Real. Here's the Research — And the Fix.", desc: 'What happens to your brain after decision 200 — and how mothers can use AI to protect the cognitive bandwidth that matters most.' },
  { id: 'delegation-science', cat: 'NEUROSCIENCE', catLabel: 'NEUROSCIENCE', img: '/img/articles/photo-1552664730-d307ca884978-w600.jpg', alt: 'Woman presenting confidently at a whiteboard to a small attentive group', title: 'The Science Behind Why Delegation Feels So Hard — And How AI Rewires It', desc: 'Perfectionism, over-responsibility, the hypervigilance loop. The neuroscience of why letting go is hard — and how AI gives you a guilt-free exit.' },
];

/* Every story, in a fixed canonical order. The weekly hero window slides across
   this whole list, so over time every article gets its turn in the spotlight. */
const ALL_STORIES: Story[] = [
  ...AI_101, ...HOME, ...SEASONAL, ...MILESTONES, ...WORK, ...TOOLS, ...NEUROSCIENCE,
];

/* The category lists, in the order they appear down the page. Each is reshuffled
   weekly with its own seed offset so no two categories rearrange in lockstep. */
const CATEGORY_SECTIONS: Story[][] = [AI_101, HOME, SEASONAL, MILESTONES, WORK, TOOLS, NEUROSCIENCE];

type Slide = { img: string; eyebrow: string; title: string; desc: string; id: string };

function toSlide(s: Story): Slide {
  return { img: s.img, eyebrow: s.catLabel, title: s.title, desc: s.desc, id: s.id };
}

function CtaStrip({ visible, children }: { visible: boolean; children: ReactNode }) {
  return (
    <div className="cta-strip" style={visible ? undefined : { display: 'none' }}>
      {children}
    </div>
  );
}

export default function EditorialClient({ weekSeed }: { weekSeed: number }) {
  const [current, setCurrent] = useState(0);
  const [cat, setCat] = useState('ALL');

  // ── Weekly rotation ──────────────────────────────────────────────
  // The hero features 3 stories that slide across the whole library each week,
  // and every category is reshuffled with its own seed — so the entire page
  // rearranges when the week rolls over. All computed from `weekSeed` (passed
  // from the server) so server and client render identically.
  const SLIDES = rotateWindow(ALL_STORIES, 3, weekSeed).map(toSlide);
  const sections = CATEGORY_SECTIONS.map((list, i) => seededShuffle(list, weekSeed + i * 101 + 7));
  const [aiRows, homeRows, seasonalRows, milestonesRows, workRows, toolsRows, neuroRows] = sections;

  // Auto-advance carousel every 7s.
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SLIDES.length]);

  const show = (storyCat: string) => cat === 'ALL' || storyCat === cat;
  const ctaVisible = cat === 'ALL';

  const renderRows = (list: Story[]) =>
    list.map((s) => <StoryRow key={s.id + s.cat} story={s} visible={show(s.cat)} />);

  return (
    <>
      {/* HERO CAROUSEL */}
      <section className="carousel-section">
        <div className="carousel">
          {SLIDES.map((s, i) => (
            <div key={s.id} className={`slide${i === current ? ' active' : ''}`}>
              <div className="slide-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" />
                <div className="slide-overlay" />
                <div className="slide-body">
                  <span className="slide-eyebrow">{s.eyebrow}</span>
                  <h2>{s.title}</h2>
                  <p>{s.desc}</p>
                  <div>
                    <Link href={`/article?id=${s.id}`} className="slide-cta">
                      Read Story
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="carousel-nav">
            <button type="button" aria-label="Previous slide" onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)}>
              &larr;
            </button>
            <button type="button" aria-label="Next slide" onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)}>
              &rarr;
            </button>
          </div>
          <div className="carousel-dots">
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className={`dot${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <div className="cat-wrap">
        <div className="cat-bar">
          {CATS.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`cat-btn${cat === c.key ? ' active' : ''}`}
              onClick={() => setCat(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLES */}
      <section className="stories">
        {/* AI 101 */}
        {renderRows(aiRows)}

        <CtaStrip visible={ctaVisible}>
          <div>
            <h4>Ready to go from curious to actually doing it?</h4>
            <p>The ai.moms&#8482; On-Demand course is 6 modules — go at your own pace, start seeing results immediately.</p>
          </div>
          <Link href="/" className="btn-pink">Explore the Course &rarr;</Link>
        </CtaStrip>

        {/* HOME */}
        {renderRows(homeRows)}

        {/* SEASONAL */}
        {renderRows(seasonalRows)}

        <CtaStrip visible={ctaVisible}>
          <div>
            <h4>Want the full system — not just the tips?</h4>
            <p>The ai.moms&#8482; course teaches you to build and run it all, module by module.</p>
          </div>
          <Link href="/" className="btn-ghost">See What&rsquo;s Inside</Link>
        </CtaStrip>

        {/* MILESTONES */}
        {renderRows(milestonesRows)}

        <CtaStrip visible={ctaVisible}>
          <div>
            <h4>Aime is your AI Chief Everything Officer™.</h4>
            <p>Built for mothers, at every stage. Ready when you are.</p>
          </div>
          <Link href="/" className="btn-pink">Meet Aime &rarr;</Link>
        </CtaStrip>

        {/* WORK */}
        {renderRows(workRows)}

        {/* TOOLS & AIME */}
        {renderRows(toolsRows)}

        {/* NEUROSCIENCE */}
        {renderRows(neuroRows)}

        {/* FINAL CTA */}
        <CtaStrip visible={ctaVisible}>
          <div>
            <h4>The science is why we built this. The course is how you use it.</h4>
            <p>Start the on-demand course and build your AI-powered family system today.</p>
          </div>
          <Link href="/" className="btn-pink">Start the Course &rarr;</Link>
        </CtaStrip>
      </section>
    </>
  );
}
