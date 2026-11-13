// The AIM event tracking for GA4. One file, loaded by every /editorial page.
// Consent: nothing is sent unless the visitor chose Accept All (localStorage aimoms_cookies = 'all').
// This file also loads /ga.js after Accept All, since the static AIM pages don't render the Next Analytics component.
// Everything is read from the page markup (or data-track-* attributes), so new articles are tracked automatically.
// No personal data: no emails, names or typed form text are ever sent. Custom names only (not GA's own scroll/click).
(function () {
  if (window._aimTrack) return;
  window._aimTrack = true;
  var d = document, w = window, q = [], sent = {};

  function consented() { try { return localStorage.getItem('aimoms_cookies') === 'all'; } catch (e) { return false; } }
  function loadGA() {
    if (!consented() || w._gaLoaded || w._aimGaReq) return;
    w._aimGaReq = true;
    var s = d.createElement('script'); s.async = true; s.src = '/ga.js'; d.head.appendChild(s);
  }
  function flush() {
    if (!(w.gtag && consented())) return;
    while (q.length) { var e = q.shift(); w.gtag && w.gtag('event', e[0], e[1]); }
  }
  // Queue until gtag exists (ga.js loads async after consent), then send. Without consent, events are dropped.
  function send(name, params) {
    if (!consented()) return;
    var p = {}, k;
    for (k in base) p[k] = base[k];
    for (k in params || {}) if (params[k] !== undefined && params[k] !== '') p[k] = params[k];
    q.push([name, p]);
    if (w.gtag) flush(); else if (!send.t) send.t = setInterval(function () { if (w.gtag) { clearInterval(send.t); send.t = 0; flush(); } }, 300);
    if (w._aimDebug) console.log('[aim-track]', name, p);
  }
  function once(key, name, params) { if (sent[key]) return; sent[key] = 1; send(name, params); }
  // textContent, not innerText, so CSS uppercase labels come through as written
  function txt(el) { return (el && el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100); }
  function attr(el, n) { return el && el.closest('[data-track-' + n + ']') && el.closest('[data-track-' + n + ']').getAttribute('data-track-' + n); }

  // ---- Page context: shared params on every event ----
  var path = location.pathname.replace(/\/+$/, '').replace(/\.html$/, '');
  var slug = (path.match(/\/editorial\/([a-z0-9-]+)$/) || [])[1] || (/\/editorial$/.test(path) ? 'index' : '');
  var art = null;
  d.querySelectorAll('script[type="application/ld+json"]').forEach(function (s) {
    try { var j = JSON.parse(s.textContent); if (j['@type'] === 'Article') art = j; } catch (e) {}
  });
  var body = d.body.dataset || {};
  var section = body.trackSection || (art && (art.articleSection || '').split(' · ')[0]) || '';
  var isArticle = !!art && !!d.querySelector('main.ed article');
  var base = {};
  if (isArticle) {
    var kick = txt(d.querySelector('.art-head .kicker')).toLowerCase();
    base = {
      article_slug: body.trackSlug || slug,
      article_section: section,
      article_author: body.trackAuthor || (art.author && art.author.name) || '',
      article_type: body.trackType || (/mockup/.test(slug) ? 'mockup' : (/ai news/i.test(section) || /^ai-news/.test(slug) || /ai news/.test(kick)) ? 'news' : 'article'),
      publish_date: body.trackDate || art.datePublished || ''
    };
  } else {
    base = { page_type: slug === 'index' ? 'aim_home' : 'aim_section', article_section: slug === 'index' ? '' : txt(d.querySelector('main.ed h1')) };
  }

  // ---- Where a click happened ----
  function where(el) {
    if (attr(el, 'location')) return attr(el, 'location');
    if (el.closest('nav.s-nav, .mmenu')) return 'nav';
    if (el.closest('footer')) return 'footer';
    if (el.closest('section.related')) return 'related';
    if (el.closest('.intoc, nav.jump')) return 'toc';
    if (el.closest('section.closing')) return 'closing';
    if (el.closest('section.aime')) return 'aime';
    if (el.closest('.art-head, .hero-img, section.top')) return 'hero';
    if (el.closest('aside.news')) return 'trending';
    if (el.closest('section.nl')) return 'newsletter';
    return 'inline';
  }
  var CTA = { '/build-aime': 'build_aime', '/top3': 'top3', '/foundations': 'foundations', '/prompt-library': 'prompt_library', '/membership': 'membership', '/experiences': 'experiences', '/nyc': 'nyc', '/skill-guide': 'skill_guide', '/community': 'community' };

  // ---- Clicks (one delegated listener) ----
  d.addEventListener('click', function (e) {
    var el = e.target.closest('a, button, summary');
    if (!el) return;
    var loc = where(el);

    if (el.matches('.prompt .copy')) {
      var box = el.closest('.prompt');
      return send('prompt_copy', { prompt_name: attr(el, 'prompt') || txt(box.querySelector('.lbl')) || 'prompt', prompt_location: loc });
    }
    if (el.matches('section.aime .acopy')) return send('prompt_copy', { prompt_name: 'aime_skill_prompt', prompt_location: 'aime' });
    if (el.matches('section.aime .ago')) return send('cta_click', { cta_name: 'hand_it_to_aime', cta_location: 'aime' });
    if (el.matches('section.aime .chip')) return send('aime_answer', { question: txt(el.closest('fieldset') && el.closest('fieldset').querySelector('legend')), answer: txt(el) });
    if (el.matches('section.aime .anext')) return send('aime_step', { step: [].indexOf.call(el.closest('section.aime').querySelectorAll('.anext'), el) + 2 });

    var demo = el.closest('section.demo');
    if (demo && el.matches('.dtabs button, .dprev, .dnext, .dplay')) {
      var ctl = el.matches('.dprev') ? 'prev' : el.matches('.dnext') ? 'next' : el.matches('.dplay') ? txt(el).toLowerCase() : 'tab';
      return send('demo_control', { demo_name: demoName(demo), control: ctl, step: ctl === 'tab' ? Number(el.dataset.go) + 1 : undefined });
    }

    if (el.matches('summary') && el.closest('section.faq')) {
      var det = el.parentNode;
      if (det && !det.open) send('faq_open', { question: txt(el) });
      return;
    }

    if (el.tagName !== 'A' || !el.getAttribute('href')) return;
    var url;
    try { url = new URL(el.getAttribute('href'), location.href); } catch (err) { return; }
    var p = url.pathname.replace(/\/+$/, '').replace(/\.html$/, '') || '/';

    if (url.hash && url.pathname === location.pathname && el.closest('.intoc, nav.jump')) return send('toc_click', { toc_target: url.hash.slice(1), toc_label: txt(el) });

    if (url.host !== location.host && /^https?:$/.test(url.protocol) && !/(^|\.)aimoms\.ai$/.test(url.hostname)) {
      return send('outbound_click', { link_domain: url.hostname, link_url: (url.origin + url.pathname).slice(0, 100), link_location: loc });
    }
    if (url.hostname === 'aimoms.ai' || url.host === location.host) {
      if (el.matches('.navcta')) return send('cta_click', { cta_name: 'get_my_time_back', cta_location: loc, link_path: p });
      if (CTA[p]) return send('cta_click', { cta_name: attr(el, 'cta') || CTA[p], cta_location: loc, link_path: p });
      var m = p.match(/^\/editorial\/([a-z0-9-]+)$/);
      if (p === '/editorial' || m) {
        var target = m ? m[1] : 'index';
        if (el.closest('aside.news')) return send('trending_click', { target_slug: target, link_text: txt(el) });
        if (el.closest('nav.pnav')) return send('section_nav_click', { target_section: txt(el), target_slug: target });
        if (el.matches('section.top a.lead')) return send('hero_carousel_click', { slide: 1, target_slug: target });
        if (el.matches('a.tile')) {
          var grid = el.closest('.grid'), sec = el.closest('section');
          var tile = { target_slug: target, tile_section: sec && sec.id || (el.closest('section.related') ? 'related' : ''), position: grid ? [].indexOf.call(grid.querySelectorAll('a.tile'), el) + 1 : undefined };
          if (isArticle) send('internal_article_click', { from_slug: base.article_slug, target_slug: target, link_location: loc, position: tile.position });
          else send('tile_click', tile);
          return;
        }
        if (isArticle && target !== base.article_slug) return send('internal_article_click', { from_slug: base.article_slug, target_slug: target, link_location: loc });
        if (!isArticle && el.closest('.sec-head')) return send('section_nav_click', { target_section: txt(el), target_slug: target });
      }
    }
  }, true);

  // ---- Copy link / share (if a page adds them) ----
  d.addEventListener('copy', function () {
    var s = String(w.getSelection && w.getSelection() || '');
    if (s.indexOf(location.host + location.pathname) > -1) send('copy_link', {});
  });
  d.querySelectorAll('[data-track-share]').forEach(function (b) {
    b.addEventListener('click', function () { send('share', { method: b.getAttribute('data-track-share'), content_type: 'article', item_id: base.article_slug }); });
  });

  // ---- Forms: newsletter and the Aime countdown form (no email is ever sent to GA) ----
  d.addEventListener('submit', function (e) {
    var f = e.target, em = f.querySelector('[type=email], [name=email]');
    if (!em || !em.value || em.value.indexOf('@') < 1) return;
    send('generate_lead', { form_name: f.matches('.nl-form') ? 'aim_newsletter' : f.matches('.aform') ? 'aime_countdown' : (f.getAttribute('name') || 'form'), form_location: where(f) });
  }, true);

  // ---- Search (homepage) ----
  var sIn = d.getElementById('search'), sT;
  if (sIn) sIn.addEventListener('input', function () {
    clearTimeout(sT);
    sT = setTimeout(function () {
      var t = sIn.value.trim().toLowerCase();
      if (t.length < 3) return;
      var empty = d.getElementById('results-empty'), grid = d.getElementById('results-grid');
      var n = grid ? grid.querySelectorAll('a').length : undefined;
      send('search', { search_term: t.slice(0, 60), results: n });
      if ((empty && !empty.hidden) || n === 0) send('search_no_results', { search_term: t.slice(0, 60) });
    }, 1200);
  });

  // ---- Visibility: takeaways, hero, demos, hero slide ----
  function seen(el, fn, th) {
    if (!el || !('IntersectionObserver' in w)) return;
    new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { o.disconnect(); fn(); } }, { threshold: th || 0.5 }).observe(el);
  }
  seen(d.querySelector('section.takeaways:not(.intoc)'), function () { send('takeaways_view', {}); });
  seen(d.querySelector('.hero-img img, .hero-img'), function () { send('hero_view', {}); }, 0.3);
  seen(d.querySelector('section.top a.lead'), function () {
    var a = d.querySelector('section.top a.lead'), m = (a.getAttribute('href') || '').match(/\/editorial\/([a-z0-9-]+)/);
    send('hero_carousel_view', { slide: 1, target_slug: m ? m[1] : '' });
  });
  seen(d.querySelector('aside.news'), function () { send('trending_view', {}); });
  d.querySelectorAll('figure.fig img').forEach(function (img, i) { seen(img, function () { send('image_view', { image_position: i + 1, image_alt: (img.alt || '').slice(0, 100) }); }, 0.5); });

  // ---- Watch it demos: start, each step, complete ----
  function demoName(dm) { return attr(dm, 'demo') || txt(dm.querySelector('.dhead .lbl')) || 'demo'; }
  d.querySelectorAll('section.demo').forEach(function (dm, di) {
    var tabs = [].slice.call(dm.querySelectorAll('.dtabs button')), name = demoName(dm), last = -1;
    function check() {
      var i = tabs.findIndex(function (t) { return t.hasAttribute('aria-current'); });
      if (i < 0 || i === last) return;
      last = i;
      once('ds' + di, 'demo_start', { demo_name: name, demo_steps: tabs.length });
      send('demo_step', { demo_name: name, step: i + 1, demo_steps: tabs.length });
      if (i === tabs.length - 1) once('dc' + di, 'demo_complete', { demo_name: name, demo_steps: tabs.length });
    }
    if (tabs.length && 'MutationObserver' in w) new MutationObserver(check).observe(dm.querySelector('.dtabs'), { attributes: true, subtree: true, attributeFilter: ['aria-current'] });
  });

  // ---- Video ----
  d.querySelectorAll('video').forEach(function (v, i) {
    var name = attr(v, 'video') || v.getAttribute('aria-label') || v.getAttribute('title') || ('video_' + (i + 1));
    v.addEventListener('play', function () { send('video_play', { video_name: name, video_current_time: Math.round(v.currentTime) }); });
    v.addEventListener('ended', function () { send('video_finish', { video_name: name }); });
  });

  // ---- Article: view, read progress, read complete, engaged time ----
  if (isArticle) {
    if (consented()) once('av', 'article_view', {});
    var prose = d.querySelector('main.ed article') , marks = [25, 50, 75, 100];
    var end = d.querySelector('section.closing') || prose;
    function progress() {
      var r = prose.getBoundingClientRect(), h = r.height - w.innerHeight * 0.5;
      var pct = h > 0 ? Math.min(100, Math.max(0, (w.innerHeight * 0.5 - r.top) / h * 100)) : 100;
      maxPct = Math.max(maxPct, Math.round(pct));
      marks.forEach(function (m) { if (pct >= m) once('rp' + m, 'read_progress', { percent: m }); });
      var er = end.getBoundingClientRect();
      if (er.bottom <= w.innerHeight + 40) once('rc', 'read_complete', { engaged_seconds: Math.round(vis / 1000) });
    }
    var tick = 0;
    w.addEventListener('scroll', function () { if (!tick) { tick = 1; requestAnimationFrame(function () { tick = 0; progress(); }); } }, { passive: true });
    setTimeout(progress, 1500);

    var vis = 0, lastT = Date.now(), active = !d.hidden, buckets = [30, 60, 120, 300], maxPct = 0;
    // Time on page, sent when the reader hides the tab or leaves (beacon, so it survives the page closing).
    // Phones fire "hidden" on every app switch, so a reader who comes back sends a follow-up part with only
    // the new visible seconds: the sum of seconds_visible per page view is the true total, and nothing double-counts.
    var topSent = 0, topPart = 0;
    function leave() {
      if (active) { vis += Date.now() - lastT; lastT = Date.now(); }
      var s = Math.round((vis - topSent) / 1000);
      if (topPart && s < 1) return;
      topSent = vis; topPart++;
      send('time_on_page', { seconds_visible: s, max_read_percent: maxPct, part: topPart, transport_type: 'beacon' });
    }
    d.addEventListener('visibilitychange', function () { if (active) vis += Date.now() - lastT; active = !d.hidden; lastT = Date.now(); if (d.hidden) leave(); });
    w.addEventListener('pagehide', leave);
    setInterval(function () {
      if (active) { vis += Date.now() - lastT; lastT = Date.now(); }
      buckets.forEach(function (b) { if (vis >= b * 1000) once('et' + b, 'engaged_time', { seconds: b }); });
    }, 5000);
  }

  // ---- Consent: load GA now if already accepted, or as soon as they click Accept All ----
  loadGA();
  var acc = w.acceptCookies;
  // Accepting partway through the page still counts the article view (once).
  function accepted() { loadGA(); if (isArticle) once('av', 'article_view', {}); flush(); }
  if (typeof acc === 'function') w.acceptCookies = function () { var r = acc.apply(this, arguments); accepted(); return r; };
  else d.addEventListener('click', function (e) { if (e.target.closest('#cookie-banner')) setTimeout(accepted, 50); });
})();
