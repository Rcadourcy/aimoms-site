// "Watch it" scenes for which-ai-should-moms-use. Labels come from the article: New chat, the chat box, the + button, the mic, Projects, Settings → Memory → Start import, Add to memory.
import { SIDEBAR } from '../demo-kit.mjs';

// Home screen with the chat box, the + button and the mic. `extra` goes inside the box (file chips).
const HOME = (hidden = false) => `<div class="v-home"${hidden ? ' hidden' : ''}><h4 class="hello">How can we help today?</h4>
  <div class="box wa-box"><div class="wa-files"></div><span class="t"></span><span class="wa-plus">+</span><span class="wa-mic" aria-label="mic"><svg viewBox="0 0 16 16" width="13" height="13"><rect x="5.5" y="1.5" width="5" height="8" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 8a5 5 0 0 0 10 0M8 13v2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span><span class="send">↑</span></div></div>`;

const OLD_CHAT = `<div class="v-old"><span class="crumb">Wednesday dinner</span><div class="msgs"><div class="me">Plan Wednesday dinner, 20 minutes max.</div><div class="ai"><p>Turkey tacos, ready in 15 minutes.</p></div></div></div>`;

const BOX_MSG = 'We have two kids, 30 minutes on weeknights and one picky eater. Plan 5 dinners.';
const TALK = 'Remind us what the soccer email said about Saturday';

// Settings → Memory, with Start import and a two-part import panel.
const MEMORY = (part) => `<div class="main"><h4>Settings</h4><div class="wa-set">
  <div class="wa-nav"><span class="wa-ni">Privacy</span><span class="wa-ni wa-nm${part ? ' on' : ''}">Memory</span></div>
  <div class="wa-body"><b class="wa-h">Memory</b>
    <div class="wa-row"><span>Switching from ChatGPT?</span><span class="btn sm wa-start">Start import</span></div>
    <div class="wa-saved" hidden><b>Saved to memory</b><span>Two kids, ages 6 and 9</span><span>No peanuts in the house</span><span>Soccer on Saturdays</span></div></div></div>
  <div class="modal wa-modal"${part === 'paste' ? '' : ' hidden'}>
    <div class="wa-p1"${part === 'paste' ? ' hidden' : ''}><b>Copy the prompt into ChatGPT</b><div class="wa-prompt"><i></i><i></i><i class="s"></i></div><div class="frow"><span class="btn wa-copy">Copy</span></div></div>
    <div class="wa-p2"${part === 'paste' ? '' : ' hidden'}><b>Paste ChatGPT’s answer</b><div class="in tall wa-in"><span class="t"></span></div><div class="frow"><span class="btn wa-add">Add to memory</span></div></div></div></div>`;

const ANSWER = 'Two kids, ages 6 and 9. No peanuts in the house. Soccer on Saturdays.';

export const SCENES = {
  'which-newchat': {
    html: () => `${SIDEBAR('chats')}<div class="main">${OLD_CHAT}${HOME(true)}</div>`,
    acts: [['wait', 1200], ['move', '.sb-new'], ['wait', 300], ['click', '.sb-new', { hide: '.v-old', show: '.v-home' }], ['wait', 600], ['move', '.wa-box'], ['wait', 2200]],
  },
  'which-box': {
    html: () => `${SIDEBAR(false)}<div class="main">${HOME()}</div>`,
    acts: [['wait', 400], ['move', '.wa-box'], ['click', '.wa-box', { on: '.wa-box' }], ['type', '.wa-box .t', BOX_MSG], ['wait', 2200]],
  },
  'which-plus': {
    html: () => `${SIDEBAR(false)}<div class="main">${HOME()}</div>`,
    acts: [['wait', 500], ['move', '.wa-plus'], ['click', '.wa-plus'], ['wait', 300], ['add', '.wa-files', '<span class="file wa-f">School flyer.jpg</span>'], ['wait', 500], ['add', '.wa-files', '<span class="file wa-f">Fridge photo.jpg</span>'], ['move', '.wa-box'], ['click', '.wa-box', { on: '.wa-box' }], ['type', '.wa-box .t', 'What do we need to bring?'], ['wait', 1500]],
  },
  'which-mic': {
    html: () => `${SIDEBAR(false)}<div class="main">${HOME()}</div>`,
    acts: [['wait', 500], ['move', '.wa-mic'], ['click', '.wa-mic', { on: '.wa-mic' }], ['wait', 600], ['type', '.wa-box .t', TALK], ['wait', 300], ['click', '.wa-mic', { off: '.wa-mic' }], ['wait', 1800]],
  },
  'which-projects': {
    html: () => `${SIDEBAR(false)}<div class="main">${HOME()}
      <div class="v-projects" hidden><h4>Projects</h4><div class="plist"><span class="pc"><b>Dinners</b><i>Weeknight dinners everyone will eat</i></span><span class="pc"><b>School</b><i>Forms, dates and the school calendar</i></span><span class="pc"><b>Work wins</b><i>Updated 2 days ago</i></span><span class="pc"><b>Holiday gifts</b><i>Updated last week</i></span></div></div></div>`,
    acts: [['wait', 500], ['move', '.sb-projects'], ['click', '.sb-projects', { on: '.sb-projects', hide: '.v-home', show: '.v-projects' }], ['wait', 700], ['move', '.pc'], ['wait', 2600]],
  },
  'which-import': {
    html: () => MEMORY('start'),
    acts: [['wait', 500], ['move', '.wa-nm'], ['wait', 300], ['move', '.wa-start'], ['click', '.wa-start', { show: '.wa-modal' }], ['wait', 900], ['move', '.wa-copy'], ['click', '.wa-copy', { text: ['.wa-copy', 'Copied'], on: '.wa-copy' }], ['wait', 2200]],
  },
  'which-paste': {
    html: () => MEMORY('paste'),
    acts: [['wait', 400], ['move', '.wa-in'], ['click', '.wa-in', { on: '.wa-in' }], ['type', '.wa-in .t', ANSWER], ['move', '.wa-add'], ['click', '.wa-add', { hide: '.wa-modal', show: '.wa-saved' }], ['wait', 2600]],
  },
};

export const CSS = `
.ed .demo .wa-box{padding-bottom:44px;min-height:96px}
.ed .demo .wa-files{display:flex;gap:6px;flex-wrap:wrap}
.ed .demo .wa-files .file{display:inline-block;margin:0 0 6px}
.ed .demo .wa-plus,.ed .demo .wa-mic{position:absolute;bottom:10px;width:26px;height:26px;border-radius:7px;border:1px solid #d9d4ca;background:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
.ed .demo .wa-plus{left:10px}.ed .demo .wa-mic{right:44px}
.ed .demo .wa-mic{color:#1f1e1d}.ed .demo .wa-mic.on{color:#fff}
.ed .demo .wa-saved[hidden]{display:none}
.ed .demo .wa-mic.on{background:#ff63d8;border-color:#ff63d8;animation:wapulse 1s ease-in-out infinite}
@keyframes wapulse{50%{box-shadow:0 0 0 6px rgba(255,99,216,.25)}}
.ed .demo .v-old .msgs{gap:10px}
.ed .demo .sb-new.on{background:#e6e1d7}
.ed .demo .sb-projects.on{background:#e6e1d7;font-weight:700}
.ed .demo .wa-set{display:flex;gap:20px}
.ed .demo .wa-nav{width:120px;display:flex;flex-direction:column;gap:4px;font-size:12px}
.ed .demo .wa-ni{padding:7px 10px;border-radius:6px}.ed .demo .wa-ni.on{background:#e6e1d7;font-weight:700}
.ed .demo .wa-body{flex:1}.ed .demo .wa-h{display:block;font-size:14px;margin-bottom:6px}
.ed .demo .wa-row{display:flex;justify-content:space-between;align-items:center;gap:12px;border:1px solid #e1ddd4;background:#fff;border-radius:10px;padding:12px 14px;margin-top:10px;font-size:12px}
.ed .demo .wa-saved{display:flex;flex-direction:column;gap:5px;margin-top:12px;font-size:12px;animation:dpop .3s ease-out}
.ed .demo .wa-saved span{background:#f3f0ea;border-radius:6px;padding:5px 8px}
.ed .demo .wa-modal{inset:50px 60px auto 60px;padding:18px}
.ed .demo .wa-prompt{background:#f3f0ea;border-radius:8px;padding:12px;margin-top:10px;display:flex;flex-direction:column;gap:7px}
.ed .demo .wa-prompt i{display:block;height:8px;border-radius:4px;background:#d9d4ca}.ed .demo .wa-prompt i.s{width:60%}
.ed .demo .wa-in{margin-top:10px;font-size:12px}
`;
