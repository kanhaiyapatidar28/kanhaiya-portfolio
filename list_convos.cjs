const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\kanheya\\.gemini\\antigravity\\brain';
const entries = fs.readdirSync(brainDir);

const convos = [];

for (const entry of entries) {
  const logFile = path.join(brainDir, entry, '.system_generated', 'logs', 'overview.txt');
  if (fs.existsSync(logFile)) {
    try {
      const content = fs.readFileSync(logFile, 'utf8');
      const firstLine = content.split('\n')[0];
      if (firstLine) {
        const parsed = JSON.parse(firstLine);
        if (parsed.created_at) {
          convos.push({
            id: entry,
            date: parsed.created_at,
            content: (parsed.content || '').substring(0, 300).replace(/\n/g, ' ')
          });
        }
      }
    } catch (e) {}
  }
}

convos.sort((a, b) => a.date.localeCompare(b.date));

fs.writeFileSync('all_convos.txt', convos.map(c => `${c.date} | ${c.id} | ${c.content}`).join('\n\n'));
console.log('Saved all_convos.txt, total:', convos.length);
