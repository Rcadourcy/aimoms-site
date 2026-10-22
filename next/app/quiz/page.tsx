import type { Metadata } from 'next';
import QuizApp from '@/components/QuizApp';
import '../quiz.css';

/*
 * TODO(raquel): decide keep / redesign / remove. Per the migration plan the quiz is
 * ported as-is for now (live course buy buttons + quiz-leads capture preserved). It was
 * previously a standalone app (aimomsquiz.netlify.app); now served at /quiz on the main site.
 */

export const metadata: Metadata = {
  title: "What's Your Invisible Load Score? — ai moms™",
  description:
    'What is your Invisible Load Score? Take the free quiz from ai moms and find out how many hours AI can give you back each week.',
  alternates: { canonical: '/quiz' },
  openGraph: {
    title: "What's Your Invisible Load Score?",
    description:
      "8 quick questions to uncover how much of your family's mental load you're carrying — and what to do about it. Free quiz from ai moms™.",
    type: 'website',
    url: 'https://aimoms.ai/quiz',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's Your Invisible Load Score?",
    description:
      "8 quick questions to uncover how much of your family's mental load you're carrying — and what to do about it.",
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

export default function QuizPage() {
  return (
    <div className="page-quiz">
      <QuizApp />
    </div>
  );
}
