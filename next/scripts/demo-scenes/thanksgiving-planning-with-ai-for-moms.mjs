// "Watch it" scenes for thanksgiving-planning-with-ai-for-moms. Follows the article's "Set it up in five minutes" list:
// a Project called "Thanksgiving", web search on, Google Calendar connected, paste the prompt, answer by talking.
import { SIDEBAR } from '../demo-kit.mjs';

const MIC = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="5" y="1" width="6" height="9" rx="3" fill="currentColor"/><path d="M3 8a5 5 0 0 0 10 0M8 13v2" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round"/></svg>';
const PASTE = 'Role: You are my Thanksgiving planner. Take the whole thing off my plate, from today through the day after, and build the plan around my family, my kitchen, my budget and my time.';
const Q1 = '<p>Let’s start with Step 1, <b>Get to know our Thanksgiving</b>. Three questions first:</p><ol><li>Are you hosting, and what time do you want to eat?</li><li>Who’s coming, and how many are kids?</li><li>Any allergies or diets?</li></ol>';
const SAY = 'We’re hosting and eating at 3. Twelve people, four of them kids. One guest is dairy-free.';
const A2 = '<p>Got it: hosting, dinner at 3, 12 guests with 4 kids, one dairy-free. Added to the running list.</p><p>Next: your oven, burners and fridge space.</p>';

const BOX = `<div class="box in-chat tg-box"><span class="t"></span><span class="tg-mic">${MIC}</span><span class="send">↑</span></div>`;

export const SCENES = {
  'tg-project': {
    html: () => `${SIDEBAR('projects')}<div class="main"><div class="form"><h4>Create a project</h4>
      <div class="in in-name tg-name"><span class="t"></span></div>
      <div class="frow"><span class="btn ghost">Cancel</span><span class="btn btn-create">Create project</span></div></div>
      <div class="tg-made" hidden><span class="crumb">Projects</span><h4>Thanksgiving</h4></div></div>`,
    acts: [['wait', 500], ['move', '.tg-name'], ['click', '.tg-name', { on: '.tg-name' }], ['type', '.tg-name .t', 'Thanksgiving'], ['wait', 300], ['move', '.btn-create'], ['click', '.btn-create', { on: '.btn-create' }], ['wait', 900], ['show', '.tg-made'], ['wait', 1600]],
  },
  'tg-tools': {
    html: () => `${SIDEBAR('projects')}<div class="main"><div class="form"><span class="crumb">Projects</span><h4>Thanksgiving</h4>
      <div class="conn"><span class="cn"><b>Web search</b><i>Look up store deadlines and recipes</i></span><span class="btn sm ghost tg-web">Off</span></div>
      <div class="conn"><span class="cn"><b>Google Calendar</b><i>Add your reminders</i></span><span class="btn sm tg-cal">Connect</span></div></div></div>`,
    acts: [['wait', 500], ['move', '.tg-web'], ['click', '.tg-web', { text: ['.tg-web', 'On'], on: '.tg-web' }], ['wait', 700], ['move', '.tg-cal'], ['click', '.tg-cal', { text: ['.tg-cal', 'Connected'], on: '.tg-cal' }], ['wait', 2000]],
  },
  'tg-paste': {
    html: () => `${SIDEBAR('projects')}<div class="main tg-main"><div class="chat"><span class="crumb">Thanksgiving</span>
      <div class="msgs"><div class="me" hidden></div><div class="ai" hidden>${Q1}</div></div>${BOX}</div></div>`,
    acts: [['wait', 400], ['move', '.in-chat .t'], ['click', '.in-chat', { on: '.in-chat' }], ['type', '.in-chat .t', PASTE], ['move', '.in-chat .send'], ['click', '.in-chat .send', { text: ['.in-chat .t', ''], fill: ['.me', PASTE], show: '.me' }], ['wait', 800], ['show', '.ai'], ['wait', 2200]],
  },
  'tg-talk': {
    html: () => `${SIDEBAR('projects')}<div class="main tg-main"><div class="chat"><span class="crumb">Thanksgiving</span>
      <div class="msgs"><div class="ai tg-old">${Q1}</div><div class="me" hidden></div><div class="ai tg-a2" hidden>${A2}</div></div>${BOX}</div></div>`,
    acts: [['wait', 500], ['move', '.tg-mic'], ['click', '.tg-mic', { on: '.tg-mic' }], ['wait', 300], ['type', '.in-chat .t', SAY], ['move', '.in-chat .send'], ['click', '.in-chat .send', { text: ['.in-chat .t', ''], fill: ['.me', SAY], show: '.me', off: '.tg-mic' }], ['wait', 800], ['show', '.tg-a2'], ['wait', 3000]],
  },
};

export const CSS = `
.ed .demo .tg-made{margin-top:18px;padding:14px;border:1px solid #e1ddd4;background:#fff;border-radius:10px;animation:dpop .3s ease-out}
.ed .demo .tg-made h4{margin:0}
.ed .demo .tg-web.on{background:#2f7d4f;color:#fff;border-color:#2f7d4f}
.ed .demo .tg-main{padding:14px 20px}
.ed .demo .tg-main .msgs{justify-content:flex-end;margin-bottom:10px;gap:8px}
.ed .demo .tg-main .me{max-width:88%;font-size:11.5px}
.ed .demo .tg-main .ai ol{margin:0 0 4px;padding-left:18px}
.ed .demo .tg-old{opacity:.55;animation:none}
.ed .demo .tg-box{padding-right:76px}
.ed .demo .tg-mic{position:absolute;right:42px;bottom:10px;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#5f5a52;transition:transform .15s}
.ed .demo .tg-mic.on{background:#ff63d8;color:#fff;box-shadow:0 0 0 4px rgba(255,99,216,.25)}
`;
