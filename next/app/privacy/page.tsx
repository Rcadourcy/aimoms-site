import type { Metadata } from 'next';
import Link from 'next/link';
import '../privacy.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — ai.moms™',
  description: 'We are on a mission to retire mothers from Chief Everything Officer.',
  alternates: { canonical: '/privacy' },
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

export default function PrivacyPage() {
  return (
    <div className="page-privacy">
      <div className="legal-head">
        <Link href="/" className="back-link">&larr; Back to Home</Link>
        <h1>Privacy policy.</h1>
        <p className="head-date">Last updated: March 2026</p>
      </div>

      <section className="legal-section">
        <div className="legal-body">
          <Link href="/" className="btn-navy">&larr; Back to Home</Link>

          <h1>Privacy policy.</h1>
          <p className="last-updated">Last Updated: February 25, 2026</p>

          <p>ai moms&trade; (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you participate in any of our programs, services, experiences, or community (&ldquo;Services&rdquo;).</p>

          <h2>1. INFORMATION WE COLLECT</h2>

          <h3>Personal Information You Provide:</h3>
          <ul>
            <li><strong>Contact Information:</strong> Name, email address, phone number (if provided)</li>
            <li><strong>Payment Information:</strong> Billing details processed through Stripe (we do not store credit card information)</li>
            <li><strong>Family Information:</strong> Number of children, ages, household structure, family preferences, schedules, and other details you share to customize your AI assistant experience</li>
            <li><strong>Survey Responses:</strong> AI experience level, pain points, concerns, and feedback</li>
            <li><strong>Communication Data:</strong> Messages sent through email, community platforms (e.g., WhatsApp, Slack), or other channels</li>
          </ul>

          <h3>Automatically Collected Information:</h3>
          <ul>
            <li><strong>Usage Data:</strong> How you interact with our materials, recordings, and community spaces</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information (collected through standard web technologies)</li>
          </ul>

          <h3>In-Person Event Information:</h3>
          <ul>
            <li><strong>Event Data:</strong> RSVP information, dietary restrictions, accessibility needs</li>
            <li><strong>Photos &amp; Recordings:</strong> Images or video taken at in-person events (see Section 8 below)</li>
          </ul>

          <h2>2. HOW WE USE YOUR INFORMATION</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Deliver our programs, on-demand content, live sessions, in-person experiences, community, and related services</li>
            <li>Customize your experience based on your family structure and needs</li>
            <li>Communicate with you about program details, updates, and support</li>
            <li>Process payments and manage your account</li>
            <li>Improve our curriculum, prompts, and offerings</li>
            <li>Send you relevant content, tips, and updates (you can opt out anytime)</li>
            <li>Create anonymized case studies and testimonials (with your permission)</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. HOW WE SHARE YOUR INFORMATION</h2>
          <p><strong>We do NOT sell your personal information to third parties.</strong></p>

          <p>We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Stripe (payment processing), email service providers, community platforms (e.g., WhatsApp, Slack), video hosting platforms (e.g., Loom), Google (forms, drive, docs), and other tools necessary to deliver our Services</li>
            <li><strong>Legal Requirements:</strong> If required by law, court order, or government request</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets (you will be notified)</li>
          </ul>

          <p>We will never share your family details, personal stories, or survey responses publicly without your explicit permission.</p>

          <h2>4. DATA SECURITY</h2>
          <p>We implement reasonable security measures to protect your information, including:</p>
          <ul>
            <li>Secure payment processing through Stripe (PCI-DSS compliant)</li>
            <li>Encrypted data transmission (HTTPS)</li>
            <li>Limited access to personal information (only founders and necessary staff)</li>
            <li>Regular review of security practices</li>
          </ul>

          <p>However, no method of transmission or storage is 100% secure. We cannot guarantee absolute security.</p>

          <h2>5. YOUR RIGHTS &amp; CHOICES</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correct:</strong> Update or correct inaccurate information</li>
            <li><strong>Delete:</strong> Request deletion of your personal information (subject to legal obligations)</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time (program-related communications will continue as needed)</li>
            <li><strong>Restrict:</strong> Request we limit how we use your information</li>
          </ul>

          <p>To exercise these rights, email us at <a href="mailto:hello@aimoms.ai">hello@aimoms.ai</a></p>

          <h2>6. DATA RETENTION</h2>
          <p>We retain your information for as long as:</p>
          <ul>
            <li>You are an active participant in our programs or community</li>
            <li>Necessary to provide you with services and support</li>
            <li>Required by law or for legitimate business purposes</li>
          </ul>

          <p>After you request deletion or your access period ends, we will delete or anonymize your information within 90 days (unless legally required to retain it).</p>

          <h2>7. THIRD-PARTY SERVICES</h2>
          <p>Our programs involve using third-party AI platforms, automation tools, and other services. When you use these platforms:</p>
          <ul>
            <li>You are subject to their respective privacy policies and terms of service</li>
            <li>We do not control how they collect, use, or store your data</li>
            <li>We recommend reviewing their privacy policies before use</li>
          </ul>

          <p><strong>ai moms&trade; is not responsible for the privacy practices of third-party platforms.</strong> This includes but is not limited to: OpenAI (ChatGPT), Anthropic (Claude), Google (Gemini, Gmail, Calendar), Make.com, and any other tools recommended in our programs.</p>

          <h2>8. PHOTOS &amp; RECORDINGS AT EVENTS</h2>
          <p>At in-person ai moms&trade; events:</p>
          <ul>
            <li>We may photograph or record portions of the event for promotional and educational purposes</li>
            <li>By attending, you consent to being included in such photos or recordings unless you notify us in writing beforehand</li>
            <li>We will never use photos or recordings in a way that identifies your children by name without your explicit written consent</li>
          </ul>

          <h2>9. CHILDREN&apos;S PRIVACY</h2>
          <p>Our services are intended for adults (18+). We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child, please contact us immediately and we will delete it.</p>

          <h2>10. INTERNATIONAL USERS</h2>
          <p>ai moms&trade; operates in the United States. If you are accessing our services from outside the U.S., your information may be transferred to, stored, and processed in the U.S. where data protection laws may differ from your country.</p>

          <h2>11. COOKIES &amp; TRACKING</h2>
          <p>We may use cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences</li>
            <li>Analyze how our website and materials are used</li>
            <li>Improve user experience</li>
            <li>Serve relevant marketing (e.g., Meta Pixel for Facebook/Instagram advertising)</li>
          </ul>

          <p>You can control cookies through your browser settings. Disabling cookies may affect functionality.</p>

          <h2>12. CHANGES TO THIS PRIVACY POLICY</h2>
          <p>We may update this Privacy Policy periodically to reflect changes in our practices, services, or legal requirements.</p>

          <p>When we make significant changes:</p>
          <ul>
            <li>We will update the &ldquo;Last Updated&rdquo; date</li>
            <li>We will notify you via email for material changes</li>
            <li>Continued use of our services after changes constitutes acceptance</li>
          </ul>

          <h2>13. CONTACT US</h2>
          <p>Questions, concerns, or requests regarding this Privacy Policy?</p>
          <p>Email: <a href="mailto:hello@aimoms.ai">hello@aimoms.ai</a></p>

          <p style={{ marginTop: 40, textAlign: 'center' }}><em>Last Updated: February 25, 2026</em></p>

          <div className="end-cta"><Link href="/" className="btn-navy">Back to Home</Link></div>
        </div>
      </section>
    </div>
  );
}
