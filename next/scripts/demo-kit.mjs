// Shared pieces for "Watch it" scenes (see editorial-demo.mjs). Scene files in demo-scenes/ import from here.
export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// The drawn Claude sidebar. `active` highlights a sidebar item: 'projects' | 'chats' | 'customize' | 'scheduled' | true (= projects).
export const SIDEBAR = (active) => {
  const a = active === true ? 'projects' : active;
  const i = (key, label) => `<span class="sb-i sb-${key}${a === key ? ' act' : ''}">${label}</span>`;
  return `<aside class="sb"><span class="sb-name">Claude</span><span class="sb-i sb-new">+ New chat</span>${i('chats', 'Chats')}${i('projects', 'Projects')}<span class="sb-h">Recents</span><span class="sb-r">Soccer carpool swap</span><span class="sb-r">Teacher gift ideas</span><span class="sb-r">Wednesday dinner</span></aside>`;
};

// A chat screen: optional crumb (Project name), a box to type into (.in-chat .t), a hidden user bubble (.me) and a hidden reply (.ai).
// replyHtml is trusted markup you write (p, ul, li, b).
export const CHAT = ({ crumb = '', replyHtml = '', tools = '' }) => `<div class="chat">${crumb ? `<span class="crumb">${esc(crumb)}</span>` : ''}
  <div class="msgs"><div class="me" hidden></div><div class="ai" hidden>${replyHtml}</div></div>
  <div class="box in-chat"><span class="t"></span>${tools}<span class="send">↑</span></div></div>`;

// The standard "type a message, send it, reply appears" action list for CHAT.
export const CHAT_ACTS = (msg, { hold = 2600 } = {}) => [['wait', 400], ['move', '.in-chat'], ['click', '.in-chat', { on: '.in-chat' }], ['type', '.in-chat .t', msg], ['move', '.in-chat .send'], ['click', '.in-chat .send', { text: ['.in-chat .t', ''], fill: ['.me', msg], show: '.me' }], ['wait', 700], ['show', '.ai'], ['wait', hold]];
