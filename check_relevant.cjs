const fs = require('fs');
const path = require('path');

const ids = [
  'e0088174-ad31-4c46-a8c1-f9bdc32cf29c', // 2026-05-31
  '6adaf5c3-a5bb-44cc-9f1c-979fab6dcc22', // 2026-06-01
  '5645c740-f339-4ea2-aef7-5348044e0d87', // 2026-07-08
  '6fb112b1-8b28-4546-9deb-a5c68d16bb98', // 2026-07-23
  '0214f129-244c-4fb6-8a07-2485d1392f1c', // 2026-08-10
  'da73e117-ad91-470e-8f24-4db57dd7ea06', // 2026-08-10
  'af00b36e-cc45-4949-af5d-276afeffedf0', // 2026-08-12
  '3e4d3893-1cb1-472e-aedd-3a8d4bdd292d'  // 2026-08-12
];

let summary = '';

for (const id of ids) {
  const p = path.join('C:\\Users\\kanheya\\.gemini\\antigravity\\brain', id, '.system_generated', 'logs', 'overview.txt');
  if (fs.existsSync(p)) {
    summary += `\n\n==================== CONVERSATION ${id} ====================\n`;
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    for (const l of lines) {
      if (!l.trim()) continue;
      try {
        const item = JSON.parse(l);
        if (item.type === 'USER_INPUT') {
          summary += `[USER] ${item.created_at}: ${item.content.substring(0, 300)}\n`;
        } else if (item.tool_calls) {
          for (const tc of item.tool_calls) {
            summary += `[TOOL] ${tc.name} ${JSON.stringify(tc.args).substring(0, 100)}\n`;
          }
        }
      } catch (e) {}
    }
  }
}

fs.writeFileSync('convos_summary.txt', summary);
console.log('Saved convos_summary.txt');
