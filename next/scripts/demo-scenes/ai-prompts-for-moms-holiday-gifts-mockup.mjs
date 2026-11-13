// "Watch it" scenes for the holiday gift mockup. Follows the article's flow: web search on, copy the prompt and paste it whole,
// fill in only the pink spots with Wispr Flow, answer the clarifying questions, then click the links and ask for a swap.
// The toys and prices are made-up examples.
import { SIDEBAR } from '../demo-kit.mjs';

const PH = ['[insert ages]', '[insert type of toy you want to avoid]', '[insert type of play, like STEM, sensory play or critical thinking]', '[insert interests, hobbies, favorite characters, etc.]', '[insert toys they already own]', '[insert total budget for all kids]'];
const FILLS = ['5 and 8', 'light-up toys', 'STEM', 'dinosaurs and art', 'building blocks', '$150'];
const PROMPT = (f) => `<p><b>Role:</b> You are an experienced child development expert with a background in kids aged 10 and under.</p>
  <p><b>Context:</b> I’m looking for holiday gifts for my kids, aged ${f(0)}. I want to stay away from ${f(1)} and instead encourage ${f(2)}. My kids love ${f(3)}. They already have plenty of ${f(4)}, so let’s skip those. My budget is ${f(5)}. If gift wrapping is available, that’s a plus.</p>
  <p><b>Task:</b> Using this year’s Amazon Holiday Kids Gift Book, other popular gift guides online and your knowledge of play, find three toys for each child that I should consider.</p>
  <p><b>Format:</b> Give me a numbered list for each child. For each toy, include a link to where to buy it at its most affordable price and why I should consider it for that child. End with the total cost.</p>
  <p><b>Before you start, ask me any clarifying questions.</b></p>`;
const MARK = (i) => `<mark class="gf-ph">${PH[i]}</mark>`;
const SPOT = (i) => `<mark class="gf-ph p${i}"><span class="t">${PH[i]}</span></mark>`;
const SENT = PROMPT((i) => FILLS[i]).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const FILL_ACTS = FILLS.flatMap((v, i) => [['move', `.p${i}`], ['click', `.p${i}`, { off: i ? `.p${i - 1}` : undefined, on: `.p${i}`, text: [`.p${i} .t`, ''], show: '.gf-wispr' }], ['type', `.p${i} .t`, v]]);
const ANSWER = 'Split it evenly. Main gifts only. We need it by December 15.';
const SWAP = 'Swap the second toy for something under $40.';
const QS = '<p>Happy to help. A few questions first:</p><ol><li>Should the budget be split evenly between the kids?</li><li>Does that include stocking stuffers or only the main gifts?</li><li>When do you need it delivered?</li></ol>';

const ROW = (n, name, price, why, cls = '') => `<li class="${cls}"><b>${n}. ${name}</b> <u>$${price}</u><i>${why}</i></li>`;
const LIST = ({ second, total }) => `<div class="gf-cols"><div><b class="gf-h">Age 5</b><ol>${ROW(1, 'Dinosaur dig kit', 24, 'Fits the dinosaur phase')}${second}${ROW(3, 'Washable paint set', 18, 'Open-ended art time')}</ol></div>
  <div><b class="gf-h">Age 8</b><ol>${ROW(1, 'Beginner robot kit', 34, 'Hands-on STEM play')}${ROW(2, 'Comic drawing book', 21, 'Art with a story')}${ROW(3, 'Fossil science kit', 17, 'Dinosaurs plus science')}</ol></div></div>
  <p class="gf-total"><b>Total: $${total}</b> of your $150</p>`;
const OLD = ROW(2, 'Wooden marble run', 28, 'Building and patience', 'gf-link');
const NEW = ROW(2, 'Wooden train set', 26, 'In stock, same kind of play', 'gf-new');

const BOX = (extra = '') => `<div class="box in-chat gf-box"><span class="t"></span>${extra}<span class="send">↑</span></div>`;
const WISPR = '<span class="gf-wispr" hidden><i></i><i></i><i></i>Wispr Flow is listening</span>';

export const SCENES = {
  'gf-search': {
    html: () => `${SIDEBAR(false)}<div class="main"><h4 class="hello">How can we help today?</h4>
      <div class="box gf-home"><span class="ph-t">Type or talk</span><span class="gf-on" hidden>Web search on</span><span class="gf-plus">+</span><span class="send">↑</span></div>
      <div class="gf-menu" hidden><span>Web search</span><span class="gf-tog"></span></div></div>`,
    acts: [['wait', 500], ['move', '.gf-plus'], ['click', '.gf-plus', { show: '.gf-menu' }], ['wait', 500], ['move', '.gf-tog'], ['click', '.gf-tog', { on: '.gf-tog' }], ['wait', 700], ['move', '.gf-home .ph-t'], ['click', '.gf-home', { hide: '.gf-menu', show: '.gf-on' }], ['wait', 1800]],
  },
  'gf-paste': {
    html: () => `<div class="main"><div class="gf-card"><span class="gf-lbl">The holiday gift prompt</span><span class="gf-copy">Copy</span>${PROMPT(MARK)}</div>
      <div class="gf-claude" hidden><div class="chat"><div class="msgs"><h4 class="hello gf-hi">How can we help today?</h4></div><span class="gf-pastemenu" hidden>Paste</span>${BOX(`<div class="gf-pasted" hidden>${PROMPT(MARK)}</div>`)}</div></div></div>`,
    acts: [['wait', 500], ['move', '.gf-copy'], ['click', '.gf-copy', { on: '.gf-copy', text: ['.gf-copy', 'Copied'] }], ['wait', 900], ['show', '.gf-claude'], ['wait', 500], ['move', '.in-chat'], ['click', '.in-chat', { on: '.in-chat', show: '.gf-pastemenu' }], ['wait', 300], ['move', '.gf-pastemenu'], ['click', '.gf-pastemenu', { hide: '.gf-pastemenu', show: '.gf-pasted' }], ['wait', 2400]],
  },
  'gf-say': {
    html: () => `<div class="main"><div class="chat"><div class="msgs"><div class="me gf-me" hidden></div><div class="ai gf-q" hidden>${QS}</div></div>${WISPR}${BOX(`<div class="gf-pasted gf-big">${PROMPT(SPOT)}</div>`)}</div></div>`,
    acts: [['wait', 900], ...FILL_ACTS, ['wait', 500], ['move', '.in-chat .send'], ['click', '.in-chat .send', { off: '.p5', hide: '.gf-pasted', fill: ['.gf-me', SENT], show: '.gf-me' }], ['wait', 100], ['move', '.gf-me'], ['wait', 300], ['show', '.gf-q'], ['wait', 2600]],
  },
  'gf-answer': {
    html: () => `${SIDEBAR(false)}<div class="main"><div class="chat"><div class="msgs"><div class="ai gf-q">${QS}</div><div class="me gf-me" hidden></div><div class="ai gf-list" hidden>${LIST({ second: OLD, total: 142 })}</div></div>${BOX()}</div></div>`,
    acts: [['wait', 700], ['move', '.in-chat'], ['click', '.in-chat', { on: '.in-chat' }], ['type', '.in-chat .t', ANSWER], ['move', '.in-chat .send'], ['click', '.in-chat .send', { text: ['.in-chat .t', ''], fill: ['.gf-me', ANSWER], show: '.gf-me', hide: '.gf-q', off: '.in-chat' }], ['wait', 600], ['show', '.gf-list'], ['wait', 3400]],
  },
  'gf-check': {
    html: () => `${SIDEBAR(false)}<div class="main"><div class="chat"><div class="msgs"><div class="ai gf-list gf-a">${LIST({ second: OLD, total: 142 })}</div><div class="me gf-me" hidden></div><div class="ai gf-list gf-b" hidden><p>Done. Here’s the new second toy:</p>${LIST({ second: NEW, total: 140 })}</div></div>${BOX()}</div>
      <div class="modal gf-shop" hidden><span class="crumb">Store page</span><h4>Wooden marble run</h4><p class="gf-out">Sold out</p><p class="gf-age">Ages 4 and up</p><div class="frow"><span class="btn gf-back">Back to the chat</span></div></div></div>`,
    acts: [['wait', 700], ['move', '.gf-link u'], ['click', '.gf-link u', { show: '.gf-shop' }], ['wait', 1600], ['move', '.gf-back'], ['click', '.gf-back', { hide: '.gf-shop' }], ['wait', 400], ['move', '.in-chat'], ['click', '.in-chat', { on: '.in-chat' }], ['type', '.in-chat .t', SWAP], ['move', '.in-chat .send'], ['click', '.in-chat .send', { text: ['.in-chat .t', ''], fill: ['.gf-me', SWAP], show: '.gf-me', hide: '.gf-a', off: '.in-chat' }], ['wait', 600], ['show', '.gf-b'], ['wait', 3400]],
  },
};

export const CSS = `
.ed .demo .gf-home{padding-right:76px}
.ed .demo .gf-plus{position:absolute;right:44px;bottom:10px;width:26px;height:26px;border-radius:7px;border:1px solid #d9d4ca;display:flex;align-items:center;justify-content:center;font-weight:700;background:#fff}
.ed .demo .gf-on{display:inline-block;margin-left:10px;padding:2px 8px;border-radius:100px;background:#e4f1e9;color:#2f7d4f;font-size:11px;font-weight:700}
.ed .demo .gf-on[hidden]{display:none}
.ed .demo .gf-menu{position:absolute;right:30px;top:216px;width:190px;display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#fff;border:1px solid #e1ddd4;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,.12);animation:dpop .25s ease-out}
.ed .demo .gf-menu[hidden]{display:none}
.ed .demo .gf-tog{width:30px;height:17px;border-radius:100px;background:#d6d1c8;position:relative;transition:background .2s}
.ed .demo .gf-tog:after{content:"";position:absolute;left:2px;top:2px;width:13px;height:13px;border-radius:50%;background:#fff;transition:left .2s}
.ed .demo .gf-tog.on{background:#2f7d4f}.ed .demo .gf-tog.on:after{left:15px}
.ed .demo .gf-box{font-size:12px;line-height:1.45;flex:0 0 auto}
.ed .demo .gf-hi{margin-top:28px}
.ed .demo .msgs:has(.gf-me:not([hidden])) .gf-hi{display:none}
.ed .demo .gf-me{font-size:12px;line-height:1.4;max-width:86%;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;padding-bottom:0;border-bottom:8px solid #ece8e0}
.ed .demo .gf-me[hidden]{display:none}
.ed .demo .gf-q ol{margin:0;padding-left:18px}
.ed .demo .gf-card{position:relative;background:#060d26;color:#fff;border-radius:10px;padding:14px 16px;font-size:11.5px;line-height:1.5}
.ed .demo .gf-card b{color:#FF63D8}
.ed .demo .gf-card p,.ed .demo .gf-pasted p{margin:0 0 6px}
.ed .demo .gf-lbl{display:block;margin-bottom:8px;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#FF63D8}
.ed .demo .gf-copy{position:absolute;top:10px;right:12px;padding:4px 12px;border:1px solid rgba(255,255,255,.5);border-radius:100px;font-size:11px;font-weight:700}
.ed .demo .gf-copy.on{background:#FF63D8;border-color:#FF63D8;color:#060d26}
.ed .demo .gf-claude{position:absolute;inset:0;padding:20px 24px;background:#faf8f5;animation:dpop .25s ease-out}
.ed .demo .gf-claude[hidden]{display:none}
.ed .demo .chat:has(.gf-pasted:not([hidden])) .gf-hi{display:none}
.ed .demo .gf-pastemenu{align-self:flex-start;margin:0 0 6px 10px;padding:6px 14px;border-radius:8px;background:#1f1e1d;color:#fff;font-size:12px;font-weight:600;animation:dpop .2s ease-out}
.ed .demo .gf-pastemenu[hidden]{display:none}
.ed .demo .gf-pasted{font-size:11.5px;line-height:1.5}
.ed .demo .gf-pasted[hidden]{display:none}
.ed .demo .gf-big{font-size:13px;line-height:1.55;max-height:236px;overflow:hidden}
.ed .demo .gf-ph{background:#FF63D8;color:#060d26;padding:1px 4px;border-radius:3px;font-weight:600;white-space:nowrap}
.ed .demo .gf-ph.on{box-shadow:0 0 0 2px #060d26}
.ed .demo .chat:has(.gf-pasted[hidden]) .gf-wispr{display:none}
.ed .demo .gf-wispr{align-self:center;display:flex;align-items:center;gap:3px;margin-bottom:8px;padding:5px 12px;border-radius:100px;background:#1f1e1d;color:#fff;font-size:11px;font-weight:600}
.ed .demo .gf-wispr[hidden]{display:none}
.ed .demo .gf-wispr i{width:3px;height:10px;border-radius:2px;background:#FF63D8;animation:gfbar .7s ease-in-out infinite alternate}
.ed .demo .gf-wispr i:nth-child(2){animation-delay:.2s}.ed .demo .gf-wispr i:nth-child(3){animation-delay:.4s;margin-right:6px}
@keyframes gfbar{from{transform:scaleY(.4)}to{transform:scaleY(1.2)}}
.ed .demo .gf-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ed .demo .gf-h{display:block;margin-bottom:3px;font-size:12px}
.ed .demo .gf-list ol{list-style:none;margin:0;padding:0}
.ed .demo .gf-list li{margin:0 0 5px;font-size:11px;line-height:1.3;padding:2px 4px;border-radius:5px}
.ed .demo .gf-list li u{color:#2a5db0}
.ed .demo .gf-list li i{display:block;font-style:normal;color:#5f5a52;font-size:10.5px}
.ed .demo .gf-new{background:#fdeef8}
.ed .demo .gf-total{margin:4px 0 0;font-size:12px}
.ed .demo .gf-shop{inset:56px 90px auto;display:block}
.ed .demo .gf-shop[hidden]{display:none}
.ed .demo .gf-out{margin:0 0 6px;font-weight:700;color:#b3261e;font-size:15px}
.ed .demo .gf-age{margin:0;color:#5f5a52}
`;
