'use client';

import { useState } from 'react';
import Link from 'next/link';

const MOBILE_LINKS: { href: string; label: string }[] = [
  { href: '/#quiz', label: 'START HERE' },
  { href: '/foundations', label: 'FOUNDATIONS COURSE' },
  { href: '/build-aime', label: 'BUILD AIME · $97' },
  { href: '/nyc', label: 'IN PERSON' },
  { href: '/membership', label: 'MEMBERSHIP' },
  { href: '/skill-guide', label: 'SKILL GUIDE' },
  { href: '/experiences', label: 'HOST AN EXPERIENCE' },
  { href: '/corporate', label: 'ERG & CORPORATE' },
  { href: '/workshop', label: 'MONTHLY WORKSHOP' },
  { href: '/editorial', label: 'THE EDIT' },
  { href: '/shop', label: 'SHOP' },
];

const TOP_LINKS: { href: string; label: string }[] = [
  { href: '/#quiz', label: 'START HERE' },
  { href: '/foundations', label: 'FOUNDATIONS COURSE' },
  { href: '/nyc', label: 'IN PERSON' },
  { href: '/membership', label: 'MEMBERSHIP' },
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
            <Link href="/foundations" className="nav-subscribe">
              Get My Time Back
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
