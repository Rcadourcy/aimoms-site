import type { Metadata } from 'next';
import PromptLibrary, { type Prompt } from '@/components/PromptLibrary';
import prompts from '@/lib/prompt-library.json';
import '../../prompt-library.css';

export const metadata: Metadata = {
  title: 'Your Prompt Library | ai.moms™',
  description: 'Your ai.moms™ Prompt Library.',
  robots: { index: false, follow: false },
};

export default function PromptLibraryPage() {
  return (
    <div className="page-library">
      <section className="lib-hero">
        <div className="lib-inner">
          <div className="lib-eyebrow">Your Library</div>
          <h1>Pick what&rsquo;s on your plate <span className="serif-accent">today.</span></h1>
          <ol className="lib-steps">
            <li>Find the prompt that fits your day and tap <b>Copy</b>.</li>
            <li>Paste it into Claude, Anthropic&rsquo;s AI assistant, or a similar assistant.</li>
            <li>Replace the <span className="ph">[pink parts]</span> with your own details and send.</li>
          </ol>
          <p className="lib-note">
            Every prompt uses RCTF: <b>Role</b> says who the AI should be, <b>Context</b> is your life, <b>Task</b> is the job and <b>Format</b> is how you want it back.
          </p>
          <p className="lib-note">
            Use first initials and ages, and keep full names, exact birthdays and your kids&rsquo; school and schedule out of your prompts. Check every answer. It recommends, you decide.
          </p>
          <a href="/downloads/pdf-282efe55c26329cd.pdf" className="lib-pdf" target="_blank" rel="noopener noreferrer">Download the PDF version &rarr;</a>
        </div>
      </section>
      <PromptLibrary prompts={prompts as Prompt[]} />
    </div>
  );
}
