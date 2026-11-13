// Test version of an article top: a video-style player (narrated walkthrough built from the Watch-it scenes),
// a "Listen to this article" bar and a 30-second highlights box. Built only as <slug>-video.html for review.
// Article JSON: "video": { "title": "...", "chapters": [{ "name": "...", "say": "...", "scene": "<scene>"?, "title": "...", "accent": "..." }] }
// Narration and listening use the browser's built-in voice for the mock; the real version would use recorded audio.
import { esc } from './demo-kit.mjs';
import { SCENES } from './editorial-demo.mjs';

const plain = (s = '') => String(s).replace(/\*\*(.+?)\*\*/g, '$1').replace(/_(.+?)_/g, '$1').replace(/\[(.+?)\]\((.+?)\)/g, '$1').replace(/`([^`]+)`/g, '$1');
const secs = (say) => Math.max(6, Math.round(say.split(/\s+/).length / 2.5) + 2);
const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function videoTop(a, { slugify }) {
  const v = a.video;
  let t = 0;
  const ch = v.chapters.map((c) => { const at = t; t += Math.max(secs(c.say), c.scene ? 9 : 0); return { ...c, at, dur: t - at }; });
  const total = t;
  const card = (c, i) => c.scene
    ? `<div class="vch" data-i="${i}" hidden><div class="vtxt"><span class="vk">Step ${i} of ${ch.filter((x) => x.scene).length}</span><h3>${esc(c.title)} <span class="accent">${esc(c.accent || '')}</span></h3></div>
        <div class="vstage-wrap demo"><div class="stage vstage" data-acts="${esc(JSON.stringify(SCENES[c.scene].acts))}"><div class="bar"><i></i><i></i><i></i></div><div class="scr">${SCENES[c.scene].html()}</div><span class="cur" aria-hidden="true"></span></div></div></div>`
    : `<div class="vch vcard${i ? ' vend' : ''}" data-i="${i}" hidden><span class="vbrand">The AIM <i>by ai.moms™</i></span><h3>${esc(c.title)} <span class="accent">${esc(c.accent || '')}</span></h3>${i ? `<a class="vcta" href="#${slugify(v.ctaAnchor)}">Get the prompt ↓</a>` : ''}</div>`;
  const keyTakes = a.takeaways.map((x) => (x.match(/^\*\*(.+?)\*\*/) || [, plain(x)])[1]);
  const jumps = (v.jumps || []).map(([label, h]) => `<a href="#${h === 'faq' ? 'faq' : slugify(h)}">${esc(label)}</a>`).join('');
  return `<section class="vtop" aria-label="Watch, listen or skim">
  <div class="vplayer" data-total="${total}" data-chapters="${esc(JSON.stringify(ch.map((c) => ({ at: c.at, dur: c.dur, say: c.say.replace(/ai\.moms™/g, 'A.I. moms') }))))}">
    <div class="vframe"><div class="vcanvas">
      <div class="vposter"><span class="vbrand">The AIM <i>by ai.moms™</i></span><h3>${esc(v.title)}</h3><span class="vlen">${clock(total)}</span></div>
      ${ch.map(card).join('')}
      <p class="vcc" hidden></p>
    </div><button type="button" class="vbig" aria-label="Play video"><span></span></button></div>
    <div class="vbar"><button type="button" class="vpp" aria-label="Play">▶</button><span class="vtime">0:00 / ${clock(total)}</span>
      <div class="vprog" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="${total}" tabindex="0"><div class="vfill"></div>${ch.slice(1).map((c) => `<i style="left:${(c.at / total) * 100}%"></i>`).join('')}</div>
      <button type="button" class="vcc-t on" aria-pressed="true">CC</button><button type="button" class="vspd">1x</button></div>
    <ol class="vchapters">${ch.map((c, i) => `<li><button type="button" data-go="${i}"><span>${clock(c.at)}</span>${esc(c.name)}</button></li>`).join('')}</ol>
  </div>
  <div class="vside">
    <div class="listen"><button type="button" class="lplay" aria-label="Listen to this article">▶</button><div><b>Listen to this article</b><span class="lmeta">${esc(a.readTime)} · read aloud</span></div><button type="button" class="lspd">1x</button></div>
    <div class="hl"><span class="kicker">In 30 seconds</span><ul>${keyTakes.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>${jumps ? `<div class="jump"><span>Jump to</span>${jumps}</div>` : ''}</div>
  </div>
</section>`;
}

export const VIDEO_CSS = `
.ed .vtop{max-width:1120px;margin:0 auto 10px;padding:0 24px;display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:28px;align-items:start}
.ed .vframe{position:relative;width:100%;aspect-ratio:16/9;background:var(--navy);overflow:hidden}
.ed .vcanvas{position:absolute;left:0;top:0;width:1280px;height:720px;transform-origin:0 0;color:#fff}
.ed .vposter,.ed .vch{position:absolute;inset:0}
.ed .vch[hidden],.ed .vcc[hidden]{display:none}
.ed .vposter{background:var(--navy);display:flex;flex-direction:column;justify-content:flex-end;padding:64px}
.ed .vposter h3,.ed .vcard h3{margin:14px 0 0;font:800 72px/1.02 'Outfit',sans-serif;color:#fff;max-width:900px;letter-spacing:-.02em}
.ed .vbrand{font:800 22px 'Outfit',sans-serif;color:#fff}.ed .vbrand i{font:600 16px 'Be Vietnam Pro',sans-serif;opacity:.7;margin-left:6px}
.ed .vlen{position:absolute;right:28px;bottom:24px;background:rgba(0,0,0,.7);padding:4px 10px;font:700 20px 'Be Vietnam Pro',sans-serif}
.ed .vcard{display:flex;flex-direction:column;justify-content:center;padding:0 96px}
.ed .vcta{display:inline-block;margin-top:34px;align-self:flex-start;background:var(--pink);color:var(--navy)!important;font:800 26px 'Outfit',sans-serif;padding:16px 30px;border-radius:100px;text-decoration:none!important}
.ed .vtxt{position:absolute;left:60px;top:70px;width:330px}
.ed .vk{font:600 20px 'Be Vietnam Pro',sans-serif;color:rgba(255,255,255,.7)}
.ed .vtxt h3{margin:10px 0 0;font:800 52px/1.05 'Outfit',sans-serif;color:#fff}
.ed .vstage-wrap{position:absolute;left:430px;top:80px;width:806px;height:479px}
.ed .vstage-wrap.demo{padding:0;margin:0;background:none}
.ed .vstage{position:absolute;left:0;top:0;transform:scale(1.26);transform-origin:0 0}
.ed .vcc{position:absolute;left:50%;bottom:34px;transform:translateX(-50%);max-width:1000px;margin:0;background:rgba(0,0,0,.78);padding:10px 20px;font:500 28px/1.35 'Be Vietnam Pro',sans-serif;color:#fff;text-align:center}
.ed .vbig{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:84px;height:60px;border-radius:16px;border:0;background:var(--pink);cursor:pointer}
.ed .vbig span{display:block;margin:0 auto;width:0;height:0;border-left:24px solid var(--navy);border-top:14px solid transparent;border-bottom:14px solid transparent}
.ed .vplayer.playing .vbig,.ed .vplayer.started .vposter{display:none}
.ed .vbar{display:flex;align-items:center;gap:12px;background:var(--navy);color:#fff;padding:8px 14px}
.ed .vbar button{background:transparent;color:#fff;border:0;font:700 13px 'Be Vietnam Pro',sans-serif;cursor:pointer;padding:6px;min-width:34px}
.ed .vbar .vcc-t{border:1px solid rgba(255,255,255,.5);border-radius:4px;padding:2px 6px;min-width:0}.ed .vbar .vcc-t.on{background:#fff;color:var(--navy)}
.ed .vtime{font-size:12px;white-space:nowrap;opacity:.85}
.ed .vprog{position:relative;flex:1;height:6px;background:rgba(255,255,255,.25);cursor:pointer}
.ed .vfill{position:absolute;left:0;top:0;bottom:0;width:0;background:var(--pink)}
.ed .vprog i{position:absolute;top:0;bottom:0;width:3px;background:var(--navy)}
.ed .vchapters{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:6px 18px;font-size:14px}
.ed .vchapters button{background:none;border:0;padding:0;cursor:pointer;color:var(--navy);font:inherit;text-align:left}
.ed .vchapters span{color:var(--pink);font-weight:700;margin-right:6px;text-decoration:underline}
.ed .vchapters .on button{font-weight:700}
.ed .listen{display:flex;align-items:center;gap:14px;border:1px solid var(--navy);padding:12px 14px}
.ed .listen b{display:block;font-size:15px}.ed .lmeta{font-size:12px;color:var(--muted)}
.ed .lplay{flex:0 0 44px;height:44px;border-radius:50%;border:0;background:var(--navy);color:#fff;font-size:15px;cursor:pointer}
.ed .lspd{margin-left:auto;background:none;border:1px solid var(--rule);border-radius:100px;padding:4px 10px;font:700 12px 'Be Vietnam Pro',sans-serif;cursor:pointer;color:var(--navy)}
.ed .hl{margin-top:18px;border-top:3px solid var(--navy);padding-top:14px}
.ed .hl ul{margin:10px 0 0;padding-left:18px;font-size:15px;line-height:1.5}.ed .hl li{margin-bottom:8px}.ed .hl li::marker{color:var(--pink)}
.ed .jump{margin-top:12px;display:flex;flex-wrap:wrap;gap:6px 12px;font-size:13px;align-items:center}
.ed .jump span{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.ed .jump a{text-decoration:underline;text-decoration-color:var(--pink);text-underline-offset:3px}
.ed .reading{background:rgba(255,99,216,.12);box-shadow:-10px 0 0 rgba(255,99,216,.12),10px 0 0 rgba(255,99,216,.12)}
@media (max-width:900px){.ed .vtop{grid-template-columns:1fr;padding:0}.ed .vside{padding:0 24px}.ed .vchapters{padding:0 24px}}
`;

export const VIDEO_JS = `
(function(){var v=document.querySelector('.vplayer');if(!v)return;
var ch=JSON.parse(v.dataset.chapters),total=+v.dataset.total,canvas=v.querySelector('.vcanvas'),frame=v.querySelector('.vframe'),cards=[].slice.call(v.querySelectorAll('.vch')),tpl=cards.map(function(c){var s=c.querySelector('.scr');return s?s.innerHTML:''});
var cc=v.querySelector('.vcc'),fill=v.querySelector('.vfill'),time=v.querySelector('.vtime'),pp=v.querySelector('.vpp'),ccOn=true,rate=1,cur=-1,run=0,playing=false,t0=0,tick,syn=window.speechSynthesis;
var lis=[].slice.call(v.querySelectorAll('.vchapters li'));
function fit(){canvas.style.transform='scale('+(frame.clientWidth/1280)+')'}fit();window.addEventListener('resize',fit);
function clk(s){s=Math.floor(s);return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
function say(text,done){if(!syn){setTimeout(done,text.split(' ').length*400/rate);return}syn.cancel();var u=new SpeechSynthesisUtterance(text);u.rate=rate;u.onend=done;u.onerror=done;syn.speak(u)}
function show(i){var id=++run;cur=i;v.classList.add('started');cards.forEach(function(c,j){c.hidden=j!==i});lis.forEach(function(l,j){l.classList.toggle('on',j===i)});
var c=ch[i],card=cards[i],st=card.querySelector('.vstage');cc.textContent=c.say.replace(/A\\.I\\. moms/g,'ai.moms™');cc.hidden=!ccOn;t0=performance.now()-0;
var alive=function(){return id===run&&playing},waits=[];
waits.push(new Promise(function(r){say(c.say,r)}));
if(st){var scr=st.querySelector('.scr'),cu=st.querySelector('.cur');scr.innerHTML=tpl[i];cu.style.transition='none';cu.style.left='330px';cu.style.top='250px';void cu.offsetWidth;cu.style.transition='';waits.push(aimRun(scr,st,cu,JSON.parse(st.dataset.acts),alive,false).catch(function(){}))}
Promise.all(waits).then(function(){if(id!==run||!playing)return;if(i<ch.length-1)show(i+1);else{playing=false;v.classList.remove('playing');pp.textContent='↻';pp.setAttribute('aria-label','Replay')}})}
function loop(){if(playing&&cur>=0){var c=ch[cur],e=Math.min(c.dur,(performance.now()-t0)/1000*rate),at=c.at+e;fill.style.width=(at/total*100)+'%';time.textContent=clk(at)+' / '+clk(total)}tick=requestAnimationFrame(loop)}loop();
function play(i){playing=true;v.classList.add('playing');pp.textContent='❚❚';pp.setAttribute('aria-label','Pause');show(i==null?(cur<0||cur>=ch.length-1&&!v.classList.contains('playing')?0:cur):i)}
function pause(){playing=false;run++;if(syn)syn.cancel();v.classList.remove('playing');pp.textContent='▶';pp.setAttribute('aria-label','Play')}
v.querySelector('.vbig').addEventListener('click',function(){play(cur<0?0:cur)});
pp.addEventListener('click',function(){if(playing)pause();else play(pp.textContent==='↻'?0:Math.max(cur,0))});
v.querySelectorAll('.vchapters button').forEach(function(b){b.addEventListener('click',function(){play(+b.dataset.go)})});
v.querySelector('.vprog').addEventListener('click',function(e){var r=this.getBoundingClientRect(),at=(e.clientX-r.left)/r.width*total,i=0;ch.forEach(function(c,j){if(c.at<=at)i=j});play(i)});
v.querySelector('.vcc-t').addEventListener('click',function(){ccOn=!ccOn;this.classList.toggle('on',ccOn);this.setAttribute('aria-pressed',ccOn);cc.hidden=!ccOn||cur<0});
v.querySelector('.vspd').addEventListener('click',function(){rate=rate===1?1.25:rate===1.25?1.5:1;this.textContent=rate+'x'});
// Listen to the article: reads the article top to bottom and highlights the paragraph being read.
var lp=document.querySelector('.lplay'),ls=document.querySelector('.lspd'),lr=1,li=0,lon=false,parts=[].slice.call(document.querySelectorAll('.art-head h1, .art-head .dek, .prose > p, .prose > h2, .prose > ul li, .prose > ol li, .prose .faq summary, .prose .faq p, .prose .closing h2, .prose .closing p'));
function lnext(){parts.forEach(function(p){p.classList.remove('reading')});if(!lon||li>=parts.length){lon=false;lp.textContent='▶';li=0;return}var el=parts[li++];el.classList.add('reading');var u=new SpeechSynthesisUtterance(el.innerText.replace(/ai\\.moms™/g,'A.I. moms'));u.rate=lr;u.onend=function(){if(lon)lnext()};syn.cancel();syn.speak(u)}
if(lp)lp.addEventListener('click',function(){if(!syn)return;if(lon){lon=false;syn.cancel();lp.textContent='▶';parts.forEach(function(p){p.classList.remove('reading')});li=Math.max(0,li-1)}else{if(playing)pause();lon=true;lp.textContent='❚❚';lnext()}});
if(ls)ls.addEventListener('click',function(){lr=lr===1?1.25:lr===1.25?1.5:1;ls.textContent=lr+'x'});
})();`;
