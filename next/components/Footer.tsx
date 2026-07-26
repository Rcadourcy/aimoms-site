import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brandmark">
              <span className="ai">ai.</span>
              <span className="moms">moms</span>
              <span className="tm-mini">&#8482;</span>
            </div>
            <p className="footer-tagline">
              Retire from
              <br />
              Chief Everything Officer&#8482;.
            </p>
          </div>

          <div>
            <div className="footer-heading">Learning Experiences</div>
            <Link href="/foundations" className="footer-link">Foundations Course</Link>
            <Link href="/membership" className="footer-link">The Membership</Link>
            <Link href="/workshop" className="footer-link">Monthly Workshop</Link>
            <Link href="/experiences" className="footer-link">Mom-Hosted Experiences</Link>
            <Link href="/corporate" className="footer-link">Corporate Programs</Link>
            <Link href="/out-of-office-waitlist" className="footer-link">Out of Office Weekends&#8482;</Link>
            <a href="mailto:hello@aimoms.ai?subject=Private%201%3A1%20Coaching%20Inquiry" className="footer-link">Private 1:1 Coaching</a>
            <Link href="/editorial" className="footer-link">The Edit</Link>
            <Link href="/toolkit" className="footer-link">The AI Toolkit</Link>
          </div>

          <div>
            <div className="footer-heading">Company</div>
            <Link href="/community" className="footer-link">Community</Link>
            <Link href="/science" className="footer-link">The Science</Link>
            <Link href="/careers" className="footer-link">Careers</Link>
          </div>

          <div>
            <div className="footer-heading">Shop</div>
            <Link href="/shop" className="footer-link">Prompt Packs</Link>
            <Link href="/shop#merch" className="footer-link">Merch &amp; Gifts</Link>
          </div>

          <div>
            <div className="footer-heading">Connect</div>
            <a href="mailto:hello@aimoms.ai" className="footer-link">hello@aimoms.ai</a>
            <Link href="/press" className="footer-link">Partnerships, Press &amp; Media</Link>
            <a href="https://www.instagram.com/aimoms.ai/" className="footer-link" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/company/ai-moms/" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">&copy; 2026 ai.moms&#8482; All rights reserved.</span>
          <div className="footer-legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            ai.moms&#8482; is an educational platform. All content is for informational and
            educational purposes only and does not constitute professional, legal, financial,
            medical, or therapeutic advice. Individual results vary. AI tools referenced are
            third-party products not owned or operated by ai.moms&#8482;. Use of third-party AI
            tools is at your own risk.{' '}
            <strong>
              Please review our full{' '}
              <Link href="/terms">Terms &amp; Conditions</Link> and{' '}
              <Link href="/privacy">Privacy Policy</Link> before using this site or enrolling in
              any program.
            </strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
