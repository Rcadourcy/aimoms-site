'use client';

import { useState } from 'react';
import Link from 'next/link';

const MOBILE_LINKS: { href: string; label: string }[] = [
  { href: '/foundations', label: 'FOUNDATIONS COURSE' },
  { href: '/membership', label: 'MEMBERSHIP' },
  { href: '/workshop', label: 'MONTHLY WORKSHOP' },
  { href: '/experiences', label: 'MOM HOSTED EXPERIENCES' },
  { href: '/corporate', label: 'FOR COMPANIES' },
  { href: '/editorial', label: 'THE EDIT' },
  { href: '/shop', label: 'SHOP' },
  { href: '/community', label: 'COMMUNITY' },
  { href: '/science', label: 'THE SCIENCE' },
  { href: '/subscribe', label: 'SUBSCRIBE' },
];

const TOP_LINKS: { href: string; label: string }[] = [
  { href: '/foundations', label: 'FOUNDATIONS COURSE' },
  { href: '/membership', label: 'MEMBERSHIP' },
  { href: '/workshop', label: 'MONTHLY WORKSHOP' },
  { href: '/experiences', label: 'MOM HOSTED EXPERIENCES' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="site-nav">
        <div className="site-nav-inner">
          <Link href="/" className="nav-logo" aria-label="ai.moms home">
            <span className="brandmark">
              <span className="ai">ai.</span>
              <span className="moms">moms</span>
              <span className="tm-mini">&#8482;</span>
            </span>
            <span className="nav-tagline">Retire from Chief Everything Officer&#8482;.</span>
          </Link>

          <div className="nav-links">
            {TOP_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="tnl">
                {l.label}
              </Link>
            ))}
            <Link href="/subscribe" className="nav-subscribe">
              Subscribe
            </Link>
            <button
              type="button"
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
            {MOBILE_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
      <div className="nav-spacer" />
    </>
  );
}
