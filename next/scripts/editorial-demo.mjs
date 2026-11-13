// "Watch it" block for The AIM: an animated, clickable mock of the screen, in the style of the ai.moms™ Daily lessons.
// Article JSON: { "type": "demo", "label": "...", "steps": [{ "scene": "<name>", "title": "...", "accent": "...", "caption": "..." }] }
// Each scene is a fixed 640×380 stage (scaled to fit) plus a list of actions the player runs: move the cursor, click, type, show.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { esc, SIDEBAR } from './demo-kit.mjs';

const PROJECT_PAGE = ({ instructions, files }) => `<div class="pp">
  <div class="pp-main"><span class="crumb">All projects</span><h4>Dinners</h4><p class="sub">Weeknight dinners everyone will eat</p>
    <div class="box"><span class="ph-t">Start a chat in this project</span><span class="send">↑</span></div></div>
  <div class="pp-side">
    <div class="card c-instr"><b>Instructions</b><span class="edit">Edit</span><p class="itext">${instructions ? esc(INSTR) : '<i>Set instructions so every chat knows how your family works.</i>'}</p></div>
    <div class="card c-files"><b>Files</b><span class="add">+</span>${files ? FILES.map((f) => `<span class="file">${f}</span>`).join('') : '<p><i>Add the things you keep looking up.</i></p>'}<div class="newfiles"></div></div>
  </div></div>`;

const INSTR = 'We cook 4 nights a week. Wednesdays are late, so 20 minutes max. No peanuts. One picky eater: plain pasta is the backup. We shop at one store, list by aisle.';
const FILES = ['Family recipes.pdf', 'School calendar.pdf', 'Soccer schedule.png'];

// Scene markup and the actions the player runs on it.
export const SCENES = {
  projects: {
    html: () => `${SIDEBAR(false)}<div class="main">
      <div class="v v-home"><h4 class="hello">How can we help today?</h4><div class="box"><span class="ph-t">Type or talk</span><span class="send">↑</span></div></div>
      <div class="v v-projects" hidden><div class="row"><h4>Projects</h4><span class="btn btn-new">+ New project</span></div>
        <div class="plist"><span class="pc"><b>Work wins</b><i>Updated 2 days ago</i></span><span class="pc"><b>Holiday gifts</b><i>Updated last week</i></span></div></div></div>`,
    acts: [['wait', 500], ['move', '.sb-projects'], ['click', '.sb-projects', { on: '.sb-projects', hide: '.v-home', show: '.v-projects' }], ['wait', 600], ['move', '.btn-new'], ['click', '.btn-new'], ['wait', 900]],
  },
  create: {
    html: () => `${SIDEBAR(true)}<div class="main"><div class="form"><h4>Create a project</h4>
      <label>What are you working on?</label><div class="in in-name"><span class="t"></span></div>
      <label>What are you trying to achieve?</label><div class="in in-desc tall"><span class="t"></span></div>
      <div class="frow"><span class="btn ghost">Cancel</span><span class="btn btn-create">Create project</span></div></div></div>`,
    acts: [['wait', 400], ['move', '.in-name'], ['click', '.in-name', { on: '.in-name' }], ['type', '.in-name .t', 'Dinners'], ['move', '.in-desc'], ['click', '.in-desc', { on: '.in-desc', off: '.in-name' }], ['type', '.in-desc .t', 'Weeknight dinners everyone will eat'], ['move', '.btn-create'], ['click', '.btn-create'], ['wait', 900]],
  },
  instructions: {
    html: () => `${SIDEBAR(true)}<div class="main">${PROJECT_PAGE({})}
      <div class="modal" hidden><b>Set project instructions</b><div class="in tall big"><span class="t"></span></div><div class="frow"><span class="btn ghost">Cancel</span><span class="btn btn-save">Save instructions</span></div></div></div>`,
    acts: [['wait', 400], ['move', '.c-instr .edit'], ['click', '.c-instr .edit', { show: '.modal' }], ['wait', 300], ['type', '.modal .t', INSTR], ['move', '.btn-save'], ['click', '.btn-save', { hide: '.modal', text: ['.itext', INSTR] }], ['wait', 1200]],
  },
  files: {
    html: () => `${SIDEBAR(true)}<div class="main">${PROJECT_PAGE({ instructions: true })}</div>`,
    acts: [['wait', 400], ['move', '.c-files .add'], ['click', '.c-files .add', { text: ['.c-files p', ''] }], ...FILES.flatMap((f) => [['wait', 450], ['add', '.newfiles', `<span class="file">${f}</span>`]]), ['wait', 1200]],
  },
  chat: {
    html: () => `${SIDEBAR(true)}<div class="main"><div class="chat"><span class="crumb">Dinners</span>
      <div class="msgs"><div class="me" hidden></div><div class="ai" hidden><p>Here's your week, using your recipes and family rules:</p><ul><li><b>Mon</b> Sheet-pan chicken and rice (35 min)</li><li><b>Wed</b> 15-minute turkey tacos (late night)</li><li><b>Thu</b> Pasta night, plain pasta on the side</li><li><b>Sun</b> Slow-cooker chili, leftovers Monday</li></ul><p>Want the grocery list by aisle?</p></div></div>
      <div class="box in-chat"><span class="t"></span><span class="send">↑</span></div></div></div>`,
    acts: [['wait', 400], ['move', '.in-chat'], ['click', '.in-chat', { on: '.in-chat' }], ['type', '.in-chat .t', 'Plan 4 dinners this week.'], ['move', '.in-chat .send'], ['click', '.in-chat .send', { text: ['.in-chat .t', ''], fill: ['.me', 'Plan 4 dinners this week.'], show: '.me' }], ['wait', 700], ['show', '.ai'], ['wait', 2600]],
  },
  connectors: {
    html: () => `${SIDEBAR(true)}<div class="main"><div class="form"><h4>Connectors</h4>
      <div class="conn"><span class="cn"><b>Gmail</b><i>Read and search your email</i></span><span class="btn sm c-gmail">Connect</span></div>
      <div class="conn"><span class="cn"><b>Google Calendar</b><i>See your events</i></span><span class="btn sm c-cal">Connect</span></div></div></div>`,
    acts: [['wait', 400], ['move', '.c-gmail'], ['click', '.c-gmail', { text: ['.c-gmail', 'Connected'], on: '.c-gmail' }], ['wait', 300], ['move', '.c-cal'], ['click', '.c-cal', { text: ['.c-cal', 'Connected'], on: '.c-cal' }], ['wait', 1200]],
  },
};

// More scenes live in demo-scenes/<article-slug>.mjs, each exporting SCENES (and optionally CSS).
const SCENE_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'demo-scenes');
let EXTRA_CSS = '';
for (const f of fs.readdirSync(SCENE_DIR).filter((x) => x.endsWith('.mjs')).sort()) {
  const m = await import(pathToFileURL(path.join(SCENE_DIR, f)).href);
  for (const k of Object.keys(m.SCENES || {})) if (SCENES[k]) throw new Error(`Scene "${k}" in ${f} already exists`);
  Object.assign(SCENES, m.SCENES || {});
  EXTRA_CSS += m.CSS || '';
}

export function demoBlock(b) {
  const n = b.steps.length;
  const steps = b.steps.map((s, i) => {
    const sc = SCENES[s.scene];
    if (!sc) throw new Error('Unknown demo scene: ' + s.scene);
    return `<div class="dstep" data-i="${i}" data-acts="${esc(JSON.stringify(sc.acts))}" hidden>
      <span class="dk">Step ${i + 1} of ${n}</span><h3 class="dt">${esc(s.title)} <span class="accent">${esc(s.accent || '')}</span></h3>
      <div class="fit"><div class="stage"><div class="bar"><i></i><i></i><i></i></div><div class="scr">${sc.html()}</div><span class="cur" aria-hidden="true"></span></div></div>
      <p class="dc">${esc(s.caption)}</p></div>`;
  }).join('');
  return `<section class="demo" aria-label="${esc(b.label)}">
  <div class="dhead"><span class="lbl">${esc(b.label)}</span><span class="dtabs">${b.steps.map((s, i) => `<button type="button" data-go="${i}">${i + 1}</button>`).join('')}</span></div>
  ${steps}
  <div class="dctl"><button type="button" class="dprev" aria-label="Previous step">←</button><button type="button" class="dplay">Pause</button><button type="button" class="dnext" aria-label="Next step">→</button></div>
</section>`;
}

export const DEMO_CSS = () => BASE_CSS + EXTRA_CSS;
const BASE_CSS = `
.ed .demo{background:var(--navy);color:#fff;padding:22px 24px 18px;margin:8px 0 30px}
.ed .demo .dhead{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px}
.ed .demo .lbl{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--pink)}
.ed .demo .dtabs{display:flex;gap:6px}
.ed .demo .dtabs button{width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,.4);background:transparent;color:#fff;font:700 11px 'Be Vietnam Pro',sans-serif;cursor:pointer;padding:0}
.ed .demo .dtabs button[aria-current]{background:var(--pink);border-color:var(--pink);color:var(--navy)}
.ed .demo .dk{display:block;font-size:12px;color:rgba(255,255,255,.65);margin-bottom:2px}
.ed .demo .dt{margin:0 0 14px;font:800 26px/1.15 'Outfit',sans-serif;color:#fff}
.ed .demo .dc{margin:14px 0 0;font-size:16px;line-height:1.55;color:rgba(255,255,255,.88);min-height:50px}
.ed .demo .dctl{display:flex;gap:8px;justify-content:center;margin-top:12px}
.ed .demo .dctl button{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5);border-radius:100px;padding:7px 16px;font:700 12px 'Be Vietnam Pro',sans-serif;cursor:pointer;min-width:44px}
.ed .demo .fit{position:relative;width:100%;overflow:hidden}
.ed .demo .stage{position:absolute;left:0;top:0;width:640px;height:380px;transform-origin:0 0;background:#faf8f5;color:#1f1e1d;border-radius:10px;overflow:hidden;font:13px/1.4 'Be Vietnam Pro',sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35)}
.ed .demo .bar{height:22px;background:#eeebe5;display:flex;gap:6px;align-items:center;padding:0 10px}
.ed .demo .bar i{width:9px;height:9px;border-radius:50%;background:#d6d1c8}
.ed .demo .scr{position:absolute;top:22px;left:0;right:0;bottom:0;display:flex}
.ed .demo .sb{width:150px;background:#f3f0ea;border-right:1px solid #e5e1d8;padding:12px 10px;display:flex;flex-direction:column;gap:3px;font-size:12px}
.ed .demo .sb-name{font:700 14px 'Outfit',sans-serif;margin:0 0 10px 6px}
.ed .demo .sb-i{padding:6px 8px;border-radius:6px}
.ed .demo .sb-i.act{background:#e6e1d7;font-weight:700}
.ed .demo .sb-h{margin:12px 0 2px 8px;font-size:10px;color:#8a857c;text-transform:uppercase;letter-spacing:.08em}
.ed .demo .sb-r{padding:4px 8px;color:#5f5a52;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ed .demo .main{flex:1;position:relative;padding:20px 24px;overflow:hidden}
.ed .demo h4{margin:0 0 12px;font:700 18px 'Outfit',sans-serif;color:#1f1e1d}
.ed .demo .hello{text-align:center;margin:70px 0 18px;font-size:22px}
.ed .demo .box{border:1px solid #d9d4ca;background:#fff;border-radius:12px;min-height:46px;padding:12px 44px 12px 14px;position:relative;color:#1f1e1d}
.ed .demo .ph-t{color:#9a958c}
.ed .demo .send{position:absolute;right:10px;bottom:10px;width:26px;height:26px;border-radius:7px;background:#c96442;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
.ed .demo .row{display:flex;justify-content:space-between;align-items:center}
.ed .demo .btn{display:inline-block;background:#1f1e1d;color:#fff;border-radius:8px;padding:7px 12px;font-size:12px;font-weight:600;transition:transform .15s}
.ed .demo .btn.ghost{background:transparent;color:#1f1e1d;border:1px solid #d9d4ca}
.ed .demo .btn.sm{padding:5px 12px}
.ed .demo .plist{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}
.ed .demo .pc{border:1px solid #e1ddd4;background:#fff;border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:4px}
.ed .demo .pc i,.ed .demo .cn i{font-style:normal;font-size:11px;color:#8a857c}
.ed .demo .form label{display:block;font-size:12px;color:#5f5a52;margin:10px 0 5px}
.ed .demo .in{border:1px solid #d9d4ca;background:#fff;border-radius:8px;min-height:34px;padding:8px 10px}
.ed .demo .in.tall{min-height:62px}.ed .demo .in.big{min-height:120px;margin:10px 0}
.ed .demo .in.on,.ed .demo .box.on{border-color:#1f1e1d;box-shadow:0 0 0 2px rgba(31,30,29,.12)}
.ed .demo .t:after{content:"";display:inline-block;width:1px;height:14px;background:#1f1e1d;margin-left:1px;vertical-align:-2px;opacity:0}
.ed .demo .on .t:after{opacity:1;animation:dblink 1s steps(1) infinite}
@keyframes dblink{50%{opacity:0}}
.ed .demo .frow{display:flex;gap:8px;justify-content:flex-end;margin-top:14px}
.ed .demo .pp{display:flex;gap:16px;height:100%}
.ed .demo .pp-main{flex:1}.ed .demo .pp-side{width:180px;display:flex;flex-direction:column;gap:10px}
.ed .demo .crumb{display:block;font-size:11px;color:#8a857c;margin-bottom:4px}
.ed .demo .sub{margin:-8px 0 14px;font-size:12px;color:#5f5a52}
.ed .demo .card{position:relative;border:1px solid #e1ddd4;background:#fff;border-radius:10px;padding:10px 12px;font-size:11px}
.ed .demo .card p{margin:6px 0 0;color:#5f5a52;line-height:1.45}
.ed .demo .card .edit,.ed .demo .card .add{position:absolute;right:10px;top:8px;font-weight:700;color:#1f1e1d;padding:0 4px}
.ed .demo .file{display:block;margin-top:6px;padding:5px 8px;border-radius:6px;background:#f3f0ea;font-size:11px;animation:dpop .3s ease-out}
@keyframes dpop{from{opacity:0;transform:translateY(6px)}}
.ed .demo .modal{position:absolute;inset:30px 40px;background:#fff;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.25);padding:18px;animation:dpop .25s ease-out}
.ed .demo .chat{display:flex;flex-direction:column;height:100%}
.ed .demo .msgs{flex:1;display:flex;flex-direction:column;gap:10px;overflow:hidden}
.ed .demo .me{align-self:flex-end;background:#ece8e0;border-radius:12px;padding:8px 12px;animation:dpop .3s ease-out}
.ed .demo .ai{font-size:12px;line-height:1.5;animation:dpop .4s ease-out}
.ed .demo .ai p{margin:0 0 4px}.ed .demo .ai ul{margin:0 0 6px;padding-left:18px}
.ed .demo .conn{display:flex;justify-content:space-between;align-items:center;border:1px solid #e1ddd4;background:#fff;border-radius:10px;padding:12px 14px;margin-top:10px}
.ed .demo .cn{display:flex;flex-direction:column;gap:2px}
.ed .demo .btn.on{background:#2f7d4f}
.ed .demo .cur{position:absolute;left:320px;top:220px;width:18px;height:22px;z-index:5;pointer-events:none;transition:left .7s cubic-bezier(.5,0,.2,1),top .7s cubic-bezier(.5,0,.2,1);background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 22'%3E%3Cpath d='M1 1v17l4.5-4 3 7 3-1.3-3-6.7H15z' fill='%23111' stroke='%23fff' stroke-width='1.4' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat}
.ed .demo .cur.clk:before{content:"";position:absolute;left:-12px;top:-12px;width:26px;height:26px;border-radius:50%;background:rgba(255,99,216,.45);animation:dclk .45s ease-out forwards}
@keyframes dclk{from{transform:scale(.3);opacity:1}to{transform:scale(1.4);opacity:0}}
.ed .demo .press{transform:scale(.94)}
@media (max-width:700px){.ed .demo{padding:18px 14px 14px;margin-left:-4px;margin-right:-4px}.ed .demo .dt{font-size:21px}.ed .demo .dhead{flex-direction:column;align-items:flex-start}}
`;

// Runs one scene's actions (shared by the Watch-it player and the article video player).
export const RUNNER_JS = `function aimRun(scr,stage,c,acts,alive,still){
var sleep=function(ms){return new Promise(function(r,x){setTimeout(function(){alive()?r():x()},still?0:ms)})};
function apply(s,o){if(!o)return;var q=function(x){return s.querySelector(x)};if(o.off)q(o.off).classList.remove('on');if(o.on)q(o.on).classList.add('on');if(o.hide)q(o.hide).hidden=true;if(o.show)q(o.show).hidden=false;if(o.text)q(o.text[0]).textContent=o.text[1];if(o.fill)q(o.fill[0]).textContent=o.fill[1]}
var p=Promise.resolve();
acts.forEach(function(a){p=p.then(function(){var el=typeof a[1]==='string'&&scr.querySelector(a[1]);
if(a[0]==='wait')return sleep(a[1]);
if(a[0]==='move'){var r=el.getBoundingClientRect(),b=stage.getBoundingClientRect(),k=b.width/640;c.style.left=((r.left-b.left+r.width*0.55)/k)+'px';c.style.top=((r.top-b.top+r.height*0.55)/k)+'px';return sleep(800)}
if(a[0]==='click'){c.classList.remove('clk');void c.offsetWidth;c.classList.add('clk');el.classList.add('press');return sleep(180).then(function(){el.classList.remove('press');apply(scr,a[2]);return sleep(350)})}
if(a[0]==='type'){var t=a[2],n=0;return (function step(){if(n>=t.length)return sleep(250);el.textContent=t.slice(0,++n);return sleep(t.length>60?18:45).then(step)})()}
if(a[0]==='show'){el.hidden=false;return sleep(200)}
if(a[0]==='add'){el.insertAdjacentHTML('beforeend',a[2]);return sleep(0)}})});
return p}
`;

// Player: plays the visible step's actions, auto-advances, starts when scrolled into view, and respects reduced motion.
export const DEMO_JS = () => RUNNER_JS + DEMO_PLAYER;
const DEMO_PLAYER = `document.querySelectorAll('section.demo').forEach(function(d){
var steps=[].slice.call(d.querySelectorAll('.dstep')),tabs=[].slice.call(d.querySelectorAll('.dtabs button')),play=d.querySelector('.dplay');
var cur=-1,run=0,playing=true,started=false,still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var tpl=steps.map(function(s){return s.querySelector('.scr').innerHTML});
function fit(){steps.forEach(function(s){var f=s.querySelector('.fit'),st=s.querySelector('.stage'),k=Math.min(1,f.clientWidth/640)||1;st.style.transform='scale('+k+')';f.style.height=(380*k)+'px'})}
function go(i,auto){cur=(i+steps.length)%steps.length;var id=++run;steps.forEach(function(s,j){s.hidden=j!==cur});tabs.forEach(function(t,j){j===cur?t.setAttribute('aria-current','step'):t.removeAttribute('aria-current')});
var s=steps[cur],scr=s.querySelector('.scr'),c=s.querySelector('.cur'),stage=s.querySelector('.stage');scr.innerHTML=tpl[cur];c.style.transition='none';c.style.left='330px';c.style.top='250px';void c.offsetWidth;c.style.transition='';fit();
var p=aimRun(scr,stage,c,JSON.parse(s.dataset.acts),function(){return id===run},still);
p.then(function(){if(playing&&auto!==false&&cur<steps.length-1)go(cur+1);else if(cur===steps.length-1){playing=false;play.textContent='Replay'}},function(){})}
tabs.forEach(function(t,j){t.addEventListener('click',function(){go(j,playing)})});
d.querySelector('.dprev').addEventListener('click',function(){go(cur-1,playing)});
d.querySelector('.dnext').addEventListener('click',function(){go(cur+1,playing)});
play.addEventListener('click',function(){if(play.textContent==='Replay'){playing=true;play.textContent='Pause';go(0);return}playing=!playing;play.textContent=playing?'Pause':'Play';if(playing)go(cur);else run++});
window.addEventListener('resize',fit);
steps[0].hidden=false;fit();
if('IntersectionObserver' in window){new IntersectionObserver(function(e,o){if(e[0].isIntersecting&&!started){started=true;o.disconnect();go(0)}},{threshold:.4}).observe(d)}else go(0);
});`;
