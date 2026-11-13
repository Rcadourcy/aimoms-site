// "Hand it to Aime" block: instead of reading the how-to, a mom answers a few questions and Aime plans it,
// then edits it in place or emails it to herself (Raquel, Nov 13: keep it simple).
// Article JSON: { "type": "aime", "what": "Thanksgiving", "skill": "/aimoms-celebration", "questions": [{ "q": "...", "options": ["..."], "multi": true }],
//   "lands": [{ "when": "Sun, Nov 8", "what": "...", "byAnswer": { "q": 1, "when": ["...", ...], "what": ["...", ...] } }], "skillPrompt": "...", "email": "..." (default "the <what> countdown"),
//   byAnswer (optional): the step's day and text follow the option picked in question q (the turkey thaw follows the headcount).
//   "date": "2026-11-26" (optional: the event day; steps are squeezed so none fall before today), "year": 2026 (optional, for parsing "Sun, Nov 8") }
// Dated steps never show a day before the viewer's today (Raquel, Nov 13). With "date", steps still ahead keep their planned day (the turkey thaw stays put)
// and steps already past are spread from today up to the next planned step; without it, the whole plan shifts so its first step is today at the earliest.
// Undated steps ("Party day") stay as written.
import { esc } from './demo-kit.mjs';

const MON = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const DAY = 864e5;
// "Thu, Nov 5" -> UTC noon timestamp, or null for undated steps.
function parseWhen(when, year) {
  const m = /^(?:[A-Z][a-z]{2}, )?([A-Z][a-z]{2}) (\d{1,2})$/.exec(when.trim());
  return m && m[1] in MON ? Date.UTC(year, MON[m[1]], +m[2], 12) : null;
}

export function aimeBlock(b) {
  const year = b.year || 2026;
  const ev = b.date ? Date.parse(b.date + 'T12:00:00Z') : null;
  const qs = b.questions.map((q, i) => `<fieldset class="aq"><legend>${esc(q.q)}</legend><div class="chips">${q.options.map((o, j) => `<button type="button" class="chip${(q.on || [0]).includes(j) ? ' on' : ''}" data-multi="${q.multi ? 1 : 0}" aria-pressed="${(q.on || [0]).includes(j)}">${esc(o)}</button>`).join('')}</div></fieldset>`).join('');
  // data-d: days before the event (with "date"); data-t: the planned day (without it). byAnswer adds one per option.
  const at = (when) => { const t = parseWhen(when, year); return t == null ? null : ev != null ? Math.round((ev - t) / DAY) : t; };
  const key = ev != null ? 'd' : 't';
  const lands = b.lands.map((l) => {
    const v = at(l.when);
    let attrs = v == null ? '' : ` data-${key}="${v}"`;
    if (l.byAnswer) attrs += ` data-q="${l.byAnswer.q}" data-${key}opts="${l.byAnswer.when.map(at).join(',')}" data-whatopts="${esc(JSON.stringify(l.byAnswer.what))}"`;
    return `<li hidden${attrs}><span class="when">${esc(l.when)}</span><span class="what">${esc(l.what)}</span><button type="button" class="arm" aria-label="Remove this step">×</button></li>`;
  }).join('');
  return `<section class="aime" aria-label="Hand ${esc(b.what)} to Aime"${b.date ? ` data-date="${esc(b.date)}"` : ''} data-what="${esc(b.what)}">
  <div class="a0">
    <div><span class="kicker">Or skip the reading</span><h2 class="ah">Hand ${esc(b.what)} to <span class="accent">Aime.</span></h2>
    <p>Answer ${b.questions.length} quick questions. Aime, your AI Chief Everything Officer™, plans it with you and puts every step in the calendar and inbox you already use.</p></div>
    <button type="button" class="ago">Hand it to Aime →</button>
  </div>
  <div class="apanel" hidden>
    <ol class="asteps"><li class="on">The basics</li><li>Your plan</li></ol>
    <div class="ap" data-p="0">${qs}<button type="button" class="anext" data-to="1">Plan it</button></div>
    <div class="ap" data-p="1" hidden><p class="alead">Here's your plan, starting from today. Tap “Change something” to edit any date or step right here, or email it to yourself.</p><ul class="lands">${lands}</ul>
      <button type="button" class="aadd">+ Add a step</button>
      <div class="arow"><button type="button" class="aedit">Change something</button><button type="button" class="aemail">Email me my plan</button></div>
      <div class="opt"><b>Have Aime and the ai.moms™ Plugin installed?</b><p>Open Claude and paste this. Aime asks the rest, then adds it all to your calendar.</p><div class="cmd"><code>${esc(b.skillPrompt)}</code><button type="button" class="acopy">Copy</button></div></div>
      <div class="opt"><b>Don't have Aime yet?</b><p>Build Aime in about an hour. She learns your family once, then runs ${esc(b.what)}, birthdays, dinners and the school emails.</p><a class="abuy" href="/build-aime">Build Aime · $97 →</a></div>
    </div>
  </div>
</section>`;
}

export const AIME_CSS = `
.ed .aime{background:var(--navy);color:#fff;margin:6px 0 30px;padding:26px 28px}
.ed .aime .kicker{color:var(--pink)}
.ed .aime .a0{display:flex;gap:22px;align-items:center;justify-content:space-between}
.ed .aime .ah{margin:8px 0 8px;font:800 30px/1.1 'Outfit',sans-serif;color:#fff}
.ed .aime p{margin:0;color:rgba(255,255,255,.85);font-size:16px;line-height:1.55}
.ed .aime button{font-family:'Be Vietnam Pro',sans-serif;cursor:pointer}
.ed .aime .ago,.ed .aime .anext{flex:0 0 auto;background:var(--pink);color:var(--navy);border:0;border-radius:100px;padding:13px 22px;font-weight:800;font-size:15px}
.ed .aime .aback{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5);border-radius:100px;padding:12px 20px;font-weight:700;font-size:14px}
.ed .aime .arow,.ed .aime .abtns{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.ed .aime .arow{margin-bottom:18px}
.ed .aime .aemail{background:var(--pink);color:var(--navy);border:0;border-radius:100px;padding:13px 22px;font-weight:800;font-size:15px}
.ed .aime .abtns{margin-top:10px}
.ed .aime.open .a0 .ago{display:none}
.ed .aime .apanel{margin-top:22px;border-top:1px solid rgba(255,255,255,.2);padding-top:18px}
.ed .aime .asteps{display:flex;gap:18px;list-style:none;margin:0 0 18px;padding:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);counter-reset:s}
.ed .aime .asteps li{counter-increment:s}.ed .aime .asteps li:before{content:counter(s) ". "}.ed .aime .asteps li.on{color:#fff;font-weight:700}
.ed .aime .aq{border:0;margin:0 0 16px;padding:0}.ed .aime legend{font-weight:700;margin-bottom:8px;font-size:15px}
.ed .aime .chips{display:flex;flex-wrap:wrap;gap:8px}
.ed .aime .chip{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.45);border-radius:100px;padding:8px 14px;font-size:14px}
.ed .aime .chip.on{background:#fff;color:var(--navy);border-color:#fff;font-weight:700}
.ed .aime .alead{margin-bottom:12px}
.ed .aime .lands{list-style:none;margin:0 0 18px;padding:0}
.ed .aime .lands li{display:grid;grid-template-columns:140px 1fr auto;gap:14px;align-items:center;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.15);font-size:15px;animation:apop .35s ease-out}
@keyframes apop{from{opacity:0;transform:translateY(6px)}}
.ed .aime .when{font-weight:700;color:var(--pink)}
.ed .aime .arm,.ed .aime .aadd{display:none}
.ed .aime.editing .arm{display:block;background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);border-radius:50%;width:28px;height:28px;font-size:16px;line-height:1}
.ed .aime.editing .aadd{display:inline-block;background:transparent;color:#fff;border:1px dashed rgba(255,255,255,.5);border-radius:100px;padding:8px 16px;font-weight:700;font-size:14px;margin:0 0 16px}
.ed .aime.editing .lands .what{outline:1px dashed rgba(255,255,255,.35);padding:4px 6px;border-radius:4px}
.ed .aime .lands input[type=date]{font:inherit;font-size:14px;background:#fff;color:var(--navy);border:0;border-radius:6px;padding:4px 6px;max-width:150px}
.ed .aime .aedit{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5);border-radius:100px;padding:12px 20px;font-weight:700;font-size:14px}
.ed .aime .acal{margin:0 0 16px}
.ed .aime .opt{border:1px solid rgba(255,255,255,.25);padding:16px 18px;margin-bottom:12px}
.ed .aime .opt b{display:block;font-size:16px;margin-bottom:4px}.ed .aime .opt p{font-size:15px}
.ed .aime .cmd{display:flex;gap:10px;align-items:center;margin-top:10px;background:rgba(255,255,255,.08);padding:10px 12px}
.ed .aime .cmd code{flex:1;background:none;color:#fff;white-space:normal;padding:0;font-size:13px}
.ed .aime .acopy{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5);border-radius:100px;padding:6px 14px;font-weight:700;font-size:12px}
.ed .aime .abuy{display:inline-block;margin-top:10px;background:#fff;color:var(--navy)!important;font-weight:800;padding:10px 18px;border-radius:100px;text-decoration:none!important}
.ed .aime .aform{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.ed .aime .aform input{flex:1 1 200px;min-height:42px;padding:0 14px;border:0;border-radius:100px;font:inherit}
.ed .aime .aform button{background:var(--pink);color:var(--navy);border:0;border-radius:100px;padding:0 18px;font-weight:800;opacity:.6}
.ed .aime .amock{font-size:12px;color:rgba(255,255,255,.55);margin:6px 0 12px}
@media (max-width:700px){.ed .aime{padding:22px 18px;margin-left:-4px;margin-right:-4px}.ed .aime .a0{flex-direction:column;align-items:flex-start}.ed .aime .lands li{grid-template-columns:1fr auto;gap:4px 10px}.ed .aime .when{grid-column:1/-1}}
`;

export const AIME_JS = `document.querySelectorAll('.aime').forEach(function(s){
var pan=s.querySelector('.apanel'),ps=[].slice.call(s.querySelectorAll('.ap')),st=[].slice.call(s.querySelectorAll('.asteps li')),what=s.dataset.what||'plan',ul=ps[1].querySelector('.lands');var orig=ul.innerHTML;
var DAY=864e5,WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function today(){var n=new Date();return Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),12)}
function fmt(t){var d=new Date(t);return WD[d.getUTCDay()]+', '+MO[d.getUTCMonth()]+' '+d.getUTCDate()}
function ymd(t){var d=new Date(t);return d.getUTCFullYear()+String(d.getUTCMonth()+1).padStart(2,'0')+String(d.getUTCDate()).padStart(2,'0')}
function iso(t){var y=ymd(t);return y.slice(0,4)+'-'+y.slice(4,6)+'-'+y.slice(6)}
function rows(){return [].slice.call(ul.querySelectorAll('li'))}
function pick(q){var f=s.querySelectorAll('.aq')[q];if(!f)return 0;var c=[].slice.call(f.querySelectorAll('.chip'));var k=c.findIndex(function(x){return x.classList.contains('on')});return k<0?0:k}
// Steps that follow an answer (the turkey thaw follows the headcount) take that option's day and text.
function answers(){rows().forEach(function(l){if(l.dataset.q==null)return;var k=pick(+l.dataset.q),w=JSON.parse(l.dataset.whatopts||'[]');
 ['d','t'].forEach(function(x){var o=l.dataset[x+'opts'];if(o){var v=o.split(',')[k];if(v!=null&&v!=='')l.dataset[x]=v}});if(w[k])l.querySelector('.what').textContent=w[k]})}
// Dates start from today: steps ahead keep their day; steps already past are spread from today to the next step.
function dates(){var T=today(),li=rows();
 if(s.dataset.date){var E=Date.parse(s.dataset.date+'T12:00:00Z'),dl=li.filter(function(l){return l.dataset.d!=null});
  dl.forEach(function(l){l.dataset.at=E-(+l.dataset.d)*DAY});
  var dated=dl.slice().sort(function(a,b){return a.dataset.at-b.dataset.at}),past=dated.filter(function(l){return +l.dataset.at<T}),fut=dated.filter(function(l){return +l.dataset.at>=T});
  var F=fut.length?+fut[0].dataset.at:E,lim=Math.max(T,F-DAY),gap=past.length>1?(lim-T)/(past.length-1):0;
  past.forEach(function(l,k){var t=new Date(Math.round(T+k*gap));l.dataset.at=Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),12)});
  // Keep dated steps in date order, in the slots dated steps already hold.
  var slots=dl.map(function(l){return l.nextSibling});var sorted=dl.slice().sort(function(a,b){return a.dataset.at-b.dataset.at});
  var marks=dl.map(function(l){var m=document.createComment('');ul.insertBefore(m,l);return m});dl.forEach(function(l){l.remove()});marks.forEach(function(m,k){ul.insertBefore(sorted[k],m);m.remove()});
  dl.forEach(function(l){l.querySelector('.when').textContent=fmt(+l.dataset.at)})}
 else{var first=null;li.forEach(function(l){if(l.dataset.t!=null&&(first==null||+l.dataset.t<first))first=+l.dataset.t});var sh=first!=null&&first<T?T-first:0;
  li.forEach(function(l){if(l.dataset.t==null)return;var t=+l.dataset.t+sh;l.dataset.at=t;l.querySelector('.when').textContent=fmt(t)})}}
// Edit in place: dates become date pickers, step text becomes editable, each row gets a remove button.
function editing(on){s.classList.toggle('editing',on);var eb=s.querySelector('.aedit');if(eb)eb.textContent=on?'Done editing':'Change something';
 rows().forEach(function(l){var w=l.querySelector('.when'),tx=l.querySelector('.what');tx.contentEditable=on?'true':'false';
  if(on){if(l.dataset.at){var i=document.createElement('input');i.type='date';i.value=iso(+l.dataset.at);i.min=iso(today());i.setAttribute('aria-label','Date for this step');i.addEventListener('change',function(){var p=i.value.split('-');if(p.length===3)l.dataset.at=Date.UTC(+p[0],+p[1]-1,+p[2],12)});w.textContent='';w.appendChild(i)}}
  else if(l.dataset.at){w.textContent=fmt(+l.dataset.at)}})}
function go(i,fresh){if(s.classList.contains('editing'))editing(false);ps.forEach(function(p,j){p.hidden=j!==i});st.forEach(function(l,j){l.classList.toggle('on',j===i)});
if(i===1&&fresh){ul.innerHTML=orig;answers();dates();var li=rows();li.forEach(function(l){l.hidden=true});li.forEach(function(l,k){setTimeout(function(){l.hidden=false},250+k*300)})}}
function mail(){var lines=rows().map(function(l){return (l.dataset.at?fmt(+l.dataset.at):l.querySelector('.when').textContent)+': '+l.querySelector('.what').textContent});
 var ev=what.replace(/^the /i,'');location.href='mailto:?subject='+encodeURIComponent('My '+ev+' plan')+'&body='+encodeURIComponent('My '+ev+' plan, from ai.moms\\n\\n'+lines.join('\\n'))}
function flash(b,t){var o=b.textContent;b.textContent=t;setTimeout(function(){b.textContent=o},1600)}
s.querySelector('.ago').addEventListener('click',function(){s.classList.add('open');pan.hidden=false;go(0)});
s.querySelectorAll('.anext').forEach(function(b){b.addEventListener('click',function(){go(+b.dataset.to,true);s.scrollIntoView({behavior:'smooth',block:'start'})})});
var em=s.querySelector('.aemail');if(em)em.addEventListener('click',function(){if(s.classList.contains('editing'))editing(false);mail()});
var eb=s.querySelector('.aedit');if(eb)eb.addEventListener('click',function(){editing(!s.classList.contains('editing'))});
ul.addEventListener('click',function(e){var r=e.target.closest('.arm');if(r)r.closest('li').remove()});
var ad=s.querySelector('.aadd');if(ad)ad.addEventListener('click',function(){var l=document.createElement('li');l.dataset.at=today();l.innerHTML='<span class="when"></span><span class="what">New step</span><button type="button" class="arm" aria-label="Remove this step">×</button>';ul.appendChild(l);editing(true);var tx=l.querySelector('.what');tx.focus();try{document.getSelection().selectAllChildren(tx)}catch(e){}});
s.querySelectorAll('.chip').forEach(function(c){c.addEventListener('click',function(){if(c.dataset.multi!=='1')c.parentNode.querySelectorAll('.chip').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false')});var on=!c.classList.contains('on')||c.dataset.multi!=='1';c.classList.toggle('on',on);c.setAttribute('aria-pressed',on)})});
var cp=s.querySelector('.acopy');if(cp)cp.addEventListener('click',function(){try{navigator.clipboard.writeText(s.querySelector('.cmd code').innerText)}catch(e){}flash(cp,'Copied')});
});`;
