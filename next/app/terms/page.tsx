import type { Metadata } from 'next';
import Link from 'next/link';
import '../terms.css';

export const metadata: Metadata = {
  title: 'Terms — ai.moms™',
  description: 'We are on a mission to retire mothers from Chief Everything Officer.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'ai moms™ — Retire from Chief Everything Officer.™',
    description:
      'The #1 destination for mothers to learn AI, eliminate the invisible load, and build their own AI-powered family management team.',
    type: 'website',
    url: 'https://aimoms.ai',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ai moms™ — Retire from Chief Everything Officer.™',
    description:
      'The #1 destination for mothers to learn AI, eliminate the invisible load, and build their own AI-powered family management team.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

export default function TermsPage() {
  return (
    <div className="page-terms">
      <div className="legal-head">
        <Link href="/" className="back-link">&larr; Back to Home</Link>
        <h1>Terms &amp; Conditions.</h1>
        <p className="head-date">Last updated: March 2026</p>
      </div>

      <section className="legal-section">
        <div className="legal-body">
          <Link href="/" className="btn-navy">&larr; Back to Home</Link>

          <h1>TERMS &amp; CONDITIONS</h1>
          <p className="last-updated">Last Updated: February 25, 2026</p>

          <p>Welcome to ai moms&trade;. By purchasing, enrolling in, or participating in any of our programs, services, or experiences (&ldquo;Services&rdquo;), you agree to these Terms &amp; Conditions. Please read them carefully.</p>

          <h2>1. AGREEMENT TO TERMS</h2>
          <p>By enrolling in any ai moms&trade; program or service, you agree to be bound by these Terms &amp; Conditions and our <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not purchase or participate.</p>
          <p>These Terms apply to all ai moms&trade; offerings, including but not limited to: on-demand learning programs, live bootcamps and cohort-based programs, in-person workshops and experiences, community memberships, and any other services or products we offer now or in the future.</p>

          <h2>2. OUR SERVICES</h2>
          <p>ai moms&trade; offers educational programs and experiences that introduce mothers to AI and teach them how to build AI-powered family management systems. Our Services may be delivered in various formats, including:</p>
          <ul>
            <li><strong>On-Demand Programs:</strong> Pre-recorded video modules, guides, templates, and prompts available for self-paced learning</li>
            <li><strong>Live Programs:</strong> Scheduled live training sessions, bootcamps, or cohort-based experiences (with recordings provided when applicable)</li>
            <li><strong>In-Person Experiences:</strong> Hosted workshops, meetups, or other in-person events</li>
            <li><strong>Community Access:</strong> Private community spaces (e.g., WhatsApp, Slack, or similar platforms)</li>
            <li><strong>Resources:</strong> Templates, prompt libraries, setup guides, and supplementary materials</li>
          </ul>
          <p>The specific deliverables, format, schedule, and access duration for each offering are described on the relevant sales or enrollment page at the time of purchase. Those details are incorporated into these Terms by reference.</p>

          <h2>3. PRICING &amp; PAYMENT</h2>
          <p>Pricing for each program or service is listed on the relevant sales page at the time of purchase. Prices are subject to change, but changes will not affect existing purchases.</p>
          <p>All payments are processed securely through Stripe. By purchasing, you authorize us to charge your payment method.</p>

          <h3>Payment Plans:</h3>
          <p>Where payment plans are offered:</p>
          <ul>
            <li>The first installment is due at registration</li>
            <li>Subsequent installments are due on the schedule described at checkout</li>
            <li>If a payment fails, you will be notified and given 7 days to update your payment information</li>
            <li>Failure to complete a payment plan may result in loss of access to materials and community</li>
          </ul>
          <p><strong>Note:</strong> Program fees do NOT include third-party subscriptions (e.g., ChatGPT Plus, Make.com, or other tools we recommend). You are responsible for any additional costs associated with third-party platforms.</p>

          <h2>4. REFUND POLICY</h2>
          <div className="highlight-box">
            <p><strong>7-Day Money-Back Guarantee</strong></p>
            <p>We offer a full refund if you request one within 7 days of purchase AND before accessing program materials or attending a live session (whichever comes first). After you have accessed content or attended a session, all sales are final.</p>
          </div>

          <h3>To Request a Refund:</h3>
          <ul>
            <li>Email <a href="mailto:hello@aimoms.ai">hello@aimoms.ai</a> within 7 days of purchase</li>
            <li>Refund must be requested before accessing program content or attending any live session</li>
            <li>Refunds are processed within 5&ndash;10 business days</li>
            <li>Payment plan customers: Only payments already made will be refunded; remaining payments will be cancelled</li>
          </ul>
          <p><strong>No refunds after accessing program content or attending a live session.</strong> All sales are final once you have engaged with the material.</p>

          <h3>In-Person Experiences:</h3>
          <p>Refund and cancellation policies for in-person events may vary and will be communicated at the time of registration. In general, refunds for in-person events must be requested at least 14 days before the event date.</p>

          <h2>5. CANCELLATION POLICY</h2>
          <h3>If You Need to Cancel:</h3>
          <ul>
            <li>You may cancel before accessing content or attending a session for a full refund within the 7-day window</li>
            <li>If you cancel after accessing content, you will not receive a refund but will retain access for the duration described at the time of purchase</li>
            <li>To cancel a payment plan: Email <a href="mailto:hello@aimoms.ai">hello@aimoms.ai</a>. Remaining payments will be cancelled but no refund will be issued for completed payments</li>
          </ul>

          <h3>If We Need to Cancel:</h3>
          <p>In the unlikely event that we need to cancel or reschedule a program or event:</p>
          <ul>
            <li>You will be notified as soon as possible via email</li>
            <li>You will receive a full refund OR the option to transfer to a future offering (your choice)</li>
            <li>We are not liable for any additional costs or damages incurred (e.g., travel, childcare, or third-party subscriptions)</li>
          </ul>

          <h2>6. ACCESS &amp; DURATION</h2>
          <p>Access duration for each program is described at the time of purchase. Unless otherwise stated:</p>
          <ul>
            <li><strong>On-Demand Programs:</strong> Access is provided for the duration specified on the sales page</li>
            <li><strong>Live Programs:</strong> Live sessions occur on the scheduled dates; recordings are available for the access period specified</li>
            <li><strong>Community:</strong> Access is provided for the duration specified at enrollment</li>
          </ul>
          <p>We reserve the right to modify access terms for future offerings, but will honor the terms in effect at the time of your purchase.</p>

          <h2>7. TECHNICAL REQUIREMENTS</h2>
          <p>To participate fully, you may need:</p>
          <ul>
            <li><strong>Required:</strong> ChatGPT Plus account ($20/month, billed by OpenAI)</li>
            <li><strong>Recommended:</strong> Stable internet connection</li>
            <li><strong>Optional:</strong> Accounts with third-party automation tools (e.g., Make.com)</li>
          </ul>
          <p>Specific technical requirements for each program will be listed on the enrollment page or in your onboarding materials. You are responsible for ensuring you meet these requirements.</p>

          <h2>8. INTELLECTUAL PROPERTY</h2>
          <h3>What We Own:</h3>
          <ul>
            <li>All program materials, recordings, templates, guides, and prompts are proprietary to ai moms&trade;</li>
            <li>The ai moms&trade; name, logo, and branding are our intellectual property</li>
            <li>Aime, Bianca&trade;, Sara&trade;, Suzie&trade;, and Grace&trade; names and assistant frameworks are our trademarks</li>
          </ul>
          <h3>What You Can Do:</h3>
          <ul>
            <li>Use all materials for your personal, non-commercial use</li>
            <li>Build AI assistants for your own family&apos;s use</li>
            <li>Share general concepts with friends and family</li>
          </ul>
          <h3>What You CANNOT Do:</h3>
          <ul>
            <li>Reproduce, distribute, or sell our materials, recordings, or templates</li>
            <li>Teach a competing program or course using our curriculum</li>
            <li>Share login credentials or recordings with non-participants</li>
            <li>Use our materials for commercial purposes without written permission</li>
          </ul>
          <p>Violation of intellectual property terms may result in immediate termination of access without refund and potential legal action.</p>

          <h2>9. COMMUNITY GUIDELINES</h2>
          <p>Our private communities (WhatsApp, Slack, or any other platform we use) are safe, supportive spaces. By participating, you agree to:</p>
          <ul>
            <li>Be respectful, kind, and supportive of other members</li>
            <li>Keep all shared information confidential (what&apos;s shared in the group stays in the group)</li>
            <li>Refrain from spam, self-promotion, or advertising without permission</li>
            <li>Respect intellectual property (no sharing materials outside the group)</li>
          </ul>
          <p>We reserve the right to remove members who violate community guidelines without refund.</p>

          <h2>10. NO GUARANTEES OR RESULTS</h2>
          <div className="highlight-box">
            <p><strong>Important Disclaimer:</strong></p>
            <p>While we believe our programs can help reduce mental load and improve household management, we make NO GUARANTEES about specific outcomes, time savings, or results. Your experience will depend on your effort, circumstances, and how you apply what you learn.</p>
          </div>
          <p>ai moms&trade; is an educational program. We teach you HOW to build AI systems &mdash; we do not build them FOR you. Success requires your active participation and implementation.</p>

          <h2>11. LIMITATION OF LIABILITY</h2>
          <p>To the fullest extent permitted by law:</p>
          <ul>
            <li>ai moms&trade;, its founders, employees, and contractors are not liable for any direct, indirect, incidental, or consequential damages arising from your use (or inability to use) our Services</li>
            <li>We are not responsible for technical issues, third-party platform failures, or loss of data</li>
            <li>Our total liability is limited to the amount you paid for the specific program or service in question</li>
          </ul>
          <p>We provide our Services &ldquo;as is&rdquo; without warranties of any kind, express or implied.</p>

          <h2>12. THIRD-PARTY PLATFORMS</h2>
          <p>Our programs may involve using third-party AI platforms (ChatGPT, Claude, Gemini, etc.), automation tools (Make.com, etc.), and other services.</p>
          <ul>
            <li>You are responsible for complying with their respective terms of service</li>
            <li>We are not responsible for changes to their platforms, pricing, or availability</li>
            <li>We do not control how these platforms collect, use, or store your data</li>
            <li>ai moms&trade; is not affiliated with, endorsed by, or sponsored by OpenAI, Anthropic, Google, or any other third-party platform</li>
          </ul>

          <h2>13. MODIFICATIONS TO SERVICES</h2>
          <p>We reserve the right to:</p>
          <ul>
            <li>Update curriculum, templates, or materials as needed to reflect changes in AI tools and best practices</li>
            <li>Replace tools or platforms if better alternatives emerge</li>
            <li>Modify program formats, community platforms, or delivery methods</li>
            <li>Adjust scheduling for live programs with reasonable notice</li>
          </ul>
          <p>Any significant changes will be communicated via email. Changes to these Terms will be reflected in the &ldquo;Last Updated&rdquo; date above.</p>

          <h2>14. TERMINATION</h2>
          <p>We reserve the right to terminate your access to any program or community if you:</p>
          <ul>
            <li>Violate these Terms &amp; Conditions</li>
            <li>Breach intellectual property rights</li>
            <li>Engage in abusive or disruptive behavior</li>
            <li>Share materials with non-participants</li>
          </ul>
          <p>Termination will result in loss of access without refund.</p>

          <h2>15. ASSUMPTION OF RISK (IN-PERSON EVENTS)</h2>
          <p>By attending any in-person ai moms&trade; event, you acknowledge and accept that:</p>
          <ul>
            <li>You attend at your own risk</li>
            <li>ai moms&trade; is not liable for any injury, illness, loss, or damage that occurs during or as a result of the event</li>
            <li>You are responsible for your own safety and the safety of any minors you bring</li>
            <li>You consent to being photographed or recorded for promotional purposes unless you notify us in writing beforehand</li>
          </ul>

          <h2>16. DISPUTE RESOLUTION</h2>
          <p>If you have a concern or dispute:</p>
          <ul>
            <li>First, contact us at <a href="mailto:hello@aimoms.ai">hello@aimoms.ai</a> to resolve informally</li>
            <li>If we cannot resolve it, you agree to binding arbitration under the rules of the American Arbitration Association</li>
            <li>You waive the right to participate in class action lawsuits or class arbitrations</li>
          </ul>
          <p>These Terms are governed by the laws of the State of New York.</p>

          <h2>17. CONTACT INFORMATION</h2>
          <p>Questions about these Terms &amp; Conditions?</p>
          <p>Email: <a href="mailto:hello@aimoms.ai">hello@aimoms.ai</a></p>

          <p style={{ marginTop: 30 }}><strong>By purchasing, enrolling in, or participating in any ai moms&trade; program or service, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions.</strong></p>

          <p style={{ marginTop: 40, textAlign: 'center' }}><em>Last Updated: February 25, 2026</em></p>

          <div className="end-cta"><Link href="/" className="btn-navy">Back to Home</Link></div>
        </div>
      </section>
    </div>
  );
}
