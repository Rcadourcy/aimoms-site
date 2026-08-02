'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';

type Filter = 'all' | 'inperson' | 'virtual';
type CardType = 'inperson' | 'virtual';

/** A program or event card that links somewhere — internal (clean slug) or external (rsvp/new tab). */
function CardLink({
  href,
  className,
  type,
  hidden,
  style,
  children,
}: {
  href: string;
  className: string;
  type: CardType;
  hidden: boolean;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const display = hidden ? { display: 'none' } : undefined;
  const isExternal = href.startsWith('http');
  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        data-type={type}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...style, ...display }}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} data-type={type} style={{ ...style, ...display }}>
      {children}
    </Link>
  );
}

export default function EventsClient() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = (type: CardType) => !(filter !== 'all' && type !== filter);

  // Whether each section has any visible cards (for the empty-note).
  const programsHasVisible = ['virtual', 'virtual', 'inperson'].some((t) => visible(t as CardType));
  const eventsTypes: CardType[] = [
    'virtual',
    'virtual',
    'virtual',
    'inperson',
    'inperson',
    'inperson',
    'inperson',
    'inperson',
    'inperson',
    'inperson',
    'inperson',
  ];
  const eventsHasVisible = eventsTypes.some((t) => visible(t));

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="eyebrow">
            <span className="dot" /> Events &amp; Gatherings
          </div>
          <h1>
            Where we&rsquo;re gathering.
            <span className="italic-accent">Come find your people.</span>
          </h1>
          <p className="hero-sub">
            Virtual, in person, and everywhere in between. Pick a room &mdash; RSVP to an event, save
            your spot at the monthly workshop, or join the membership. There&rsquo;s always something
            happening at ai.moms&#8482;.
          </p>
          <div className="filters">
            <button
              type="button"
              className={`pill${filter === 'all' ? ' active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`pill${filter === 'inperson' ? ' active' : ''}`}
              onClick={() => setFilter('inperson')}
            >
              In Person
            </button>
            <button
              type="button"
              className={`pill${filter === 'virtual' ? ' active' : ''}`}
              onClick={() => setFilter('virtual')}
            >
              Virtual
            </button>
          </div>
        </div>
      </section>

      {/* ONGOING PROGRAMS */}
      <div className="programs-wrap">
        <section>
          <div className="container">
            <div className="section-eyebrow">Always On</div>
            <h2 className="section-title">Ongoing ways to gather</h2>
            <p className="section-sub">The rooms that are open every month, all year long.</p>
            <div className="prog-grid">
              <CardLink href="/workshop" className="prog-card feature" type="virtual" hidden={!visible('virtual')}>
                <span className="prog-badge">Most popular</span>
                <span className="prog-tag">Virtual &middot; Monthly</span>
                <h3>Monthly Virtual Workshop</h3>
                <p>
                  Our signature live session &mdash; and the easiest way in. Every month on Zoom, we walk
                  you step-by-step into AI and build alongside you.
                </p>
                <span className="prog-cta">Save my spot &rarr;</span>
              </CardLink>
              <CardLink href="/membership" className="prog-card" type="virtual" hidden={!visible('virtual')}>
                <span className="prog-tag">Virtual &middot; Members</span>
                <h3>Mom Member Get-Togethers</h3>
                <p>
                  Mom-member get-togethers, office hours, and a community of moms figuring it out
                  together &mdash; all month long.
                </p>
                <span className="prog-cta">Join the membership &rarr;</span>
              </CardLink>
              <CardLink href="/experiences" className="prog-card" type="inperson" hidden={!visible('inperson')}>
                <span className="prog-tag">In Person &middot; You host</span>
                <h3>Mom-Hosted Experiences</h3>
                <p>
                  You bring the living room, the snacks, and your mom besties. We bring the teaching. The
                  best kind of girls&rsquo; night in.
                </p>
                <span className="prog-cta">Learn to host &rarr;</span>
              </CardLink>
            </div>
            {!programsHasVisible && (
              <p className="empty-note">Nothing here for this filter &mdash; try another.</p>
            )}
          </div>
        </section>
      </div>

      {/* UPCOMING EVENTS */}
      <div className="events-wrap">
        <section>
          <div className="container">
            <div className="section-eyebrow">On the Calendar</div>
            <h2 className="section-title">Upcoming events</h2>
            <p className="section-sub">
              Tap any city to RSVP. New dates are added all the time &mdash; some are still firming up.
            </p>
            <div className="event-list">
              <CardLink href="/membership" className="event-row" type="virtual" hidden={!visible('virtual')}>
                <span className="date-chip">
                  <span className="m">AUG</span>
                  <span className="d">4</span>
                </span>
                <span className="event-main">
                  <span className="dow">Tue</span>
                  <span className="event-city">Mom Member Get-Togethers</span>
                  <span className="event-sub">12:00pm ET &middot; live on Zoom</span>
                  <span className="event-loc">&#9679; Live on Zoom</span>
                  <span className="tagrow">
                    <span className="tag virtual">Virtual</span>
                    <span className="tag">Members</span>
                  </span>
                </span>
                <span className="event-cta">Join membership &rarr;</span>
              </CardLink>

              <CardLink href="/workshop" className="event-row" type="virtual" hidden={!visible('virtual')}>
                <span className="date-chip">
                  <span className="m">AUG</span>
                  <span className="d">5</span>
                </span>
                <span className="event-main">
                  <span className="dow">Wed</span>
                  <span className="event-city">Monthly Virtual Workshop</span>
                  <span className="event-sub">11:00am ET &middot; 60 minutes live on Zoom &middot; $68</span>
                  <span className="event-loc">&#9679; Live on Zoom</span>
                  <span className="tagrow">
                    <span className="tag virtual">Virtual</span>
                    <span className="tag">Workshop</span>
                  </span>
                </span>
                <span className="event-cta">Reserve your seat &rarr;</span>
              </CardLink>

              <CardLink href="/workshop" className="event-row" type="virtual" hidden={!visible('virtual')}>
                <span className="date-chip">
                  <span className="m">SEP</span>
                  <span className="d">22</span>
                </span>
                <span className="event-main">
                  <span className="dow">Tue</span>
                  <span className="event-city">Monthly Virtual Workshop</span>
                  <span className="event-sub">11:00am ET &middot; 60 minutes live on Zoom &middot; $68</span>
                  <span className="event-loc">&#9679; Live on Zoom</span>
                  <span className="tagrow">
                    <span className="tag virtual">Virtual</span>
                    <span className="tag">Workshop</span>
                  </span>
                </span>
                <span className="event-cta">Reserve your seat &rarr;</span>
              </CardLink>

              <CardLink href="https://rsvp.aimoms.ai/nj/" className="event-row" type="inperson" hidden={!visible('inperson')}>
                <span className="date-chip">
                  <span className="m">JUL</span>
                  <span className="d tbc">TBC</span>
                </span>
                <span className="event-main">
                  <span className="event-city">New Jersey</span>
                  <span className="event-sub">$150 per seat &middot; week of July 13</span>
                  <span className="event-loc">&#9679; New Jersey</span>
                  <span className="tagrow">
                    <span className="tag">In Person</span>
                    <span className="tag tbc">Date TBC</span>
                  </span>
                </span>
                <span className="event-cta">Join the waitlist &rarr;</span>
              </CardLink>

              <CardLink href="https://rsvp.aimoms.ai/portwashington/" className="event-row" type="inperson" hidden={!visible('inperson')}>
                <span className="date-chip">
                  <span className="d tbc">TBD</span>
                </span>
                <span className="event-main">
                  <span className="event-city">Port Washington</span>
                  <span className="event-sub">New date coming soon</span>
                  <span className="event-loc">&#9679; Port Washington, NY</span>
                  <span className="tagrow">
                    <span className="tag">In Person</span>
                    <span className="tag tbc">Date TBC</span>
                  </span>
                </span>
                <span className="event-cta">Join the waitlist &rarr;</span>
              </CardLink>

              <CardLink href="https://rsvp.aimoms.ai/miami/" className="event-row" type="inperson" hidden={!visible('inperson')}>
                <span className="date-chip">
                  <span className="m">AUG</span>
                  <span className="d tbc">TBC</span>
                </span>
                <span className="event-main">
                  <span className="event-city">Miami</span>
                  <span className="event-sub">$150 per seat &middot; join the waitlist</span>
                  <span className="event-loc">&#9679; Miami, FL</span>
                  <span className="tagrow">
                    <span className="tag">In Person</span>
                    <span className="tag tbc">Date TBC</span>
                  </span>
                </span>
                <span className="event-cta">Join the waitlist &rarr;</span>
              </CardLink>

              <CardLink href="/out-of-office-waitlist" className="event-row" type="inperson" hidden={!visible('inperson')}>
                <span className="date-chip">
                  <span className="m">AUG</span>
                  <span className="d tbc">TBC</span>
                </span>
                <span className="event-main">
                  <span className="event-city">The Hamptons</span>
                  <span className="event-sub">Out of Office Day Retreat &middot; week of Aug 25</span>
                  <span className="event-loc">&#9679; The Hamptons, NY</span>
                  <span className="tagrow">
                    <span className="tag retreat">Day Retreat</span>
                    <span className="tag tbc">Date TBC</span>
                  </span>
                </span>
                <span className="event-cta">Join the waitlist &rarr;</span>
              </CardLink>

              <CardLink href="https://rsvp.aimoms.ai/coconutgrove/" className="event-row" type="inperson" hidden={!visible('inperson')}>
                <span className="date-chip">
                  <span className="m">SEP</span>
                  <span className="d tbc">TBC</span>
                </span>
                <span className="event-main">
                  <span className="event-city">Coconut Grove</span>
                  <span className="event-sub">$150 per seat &middot; join the waitlist</span>
                  <span className="event-loc">&#9679; Coconut Grove, FL</span>
                  <span className="tagrow">
                    <span className="tag">In Person</span>
                    <span className="tag tbc">Date TBC</span>
                  </span>
                </span>
                <span className="event-cta">Join the waitlist &rarr;</span>
              </CardLink>

              <CardLink href="https://rsvp.aimoms.ai/detroit/" className="event-row" type="inperson" hidden={!visible('inperson')}>
                <span className="date-chip">
                  <span className="m">SEP</span>
                  <span className="d tbc">TBC</span>
                </span>
                <span className="event-main">
                  <span className="event-city">Bloomfield Hills</span>
                  <span className="event-sub">$150 per seat &middot; join the waitlist</span>
                  <span className="event-loc">&#9679; Bloomfield Hills, MI</span>
                  <span className="tagrow">
                    <span className="tag">In Person</span>
                    <span className="tag tbc">Date TBC</span>
                  </span>
                </span>
                <span className="event-cta">Join the waitlist &rarr;</span>
              </CardLink>

              <CardLink href="https://rsvp.aimoms.ai/chicago/" className="event-row" type="inperson" hidden={!visible('inperson')}>
                <span className="date-chip">
                  <span className="m">OCT</span>
                  <span className="d tbc">TBC</span>
                </span>
                <span className="event-main">
                  <span className="event-city">Chicago</span>
                  <span className="event-sub">$150 per seat &middot; join the waitlist</span>
                  <span className="event-loc">&#9679; Chicago, IL</span>
                  <span className="tagrow">
                    <span className="tag">In Person</span>
                    <span className="tag tbc">Date TBC</span>
                  </span>
                </span>
                <span className="event-cta">Join the waitlist &rarr;</span>
              </CardLink>

              <CardLink href="https://rsvp.aimoms.ai/dallas/" className="event-row" type="inperson" hidden={!visible('inperson')}>
                <span className="date-chip">
                  <span className="d tbc">TBD</span>
                </span>
                <span className="event-main">
                  <span className="event-city">Dallas</span>
                  <span className="event-sub">$150 per seat &middot; join the waitlist</span>
                  <span className="event-loc">&#9679; Dallas, TX</span>
                  <span className="tagrow">
                    <span className="tag">In Person</span>
                    <span className="tag tbc">Date TBC</span>
                  </span>
                </span>
                <span className="event-cta">Join the waitlist &rarr;</span>
              </CardLink>
            </div>
            {!eventsHasVisible && (
              <p className="empty-note">Nothing here for this filter &mdash; try another.</p>
            )}
          </div>
        </section>
      </div>

      {/* CLOSING CTA */}
      <section className="closing">
        <div className="container">
          <h2>
            Don&rsquo;t see your city?
            <br />
            <span className="italic-accent">Bring us to your living room.</span>
          </h2>
          <p>Host a mom-hosted experience for your crew, or tell us where we should pop up next.</p>
          <Link href="/host-application" className="cta-pink">
            Host an experience &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
