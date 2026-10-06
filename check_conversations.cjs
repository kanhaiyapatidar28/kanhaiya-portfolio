const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\kanheya\\.gemini\\antigravity\\brain';
const entries = fs.readdirSync(brainDir);

const results = [];

for (const entry of entries) {
  const p = path.join(brainDir, entry);
  try {
    const stat = fs.statSync(p);
    if (!stat.isDirectory()) continue;
    const logPath = path.join(p, '.system_generated', 'logs', 'overview.txt');
    if (fs.existsSync(logPath)) {
      const content = fs.readFileSync(logPath, 'utf8');
      const lines = content.split('\n').filter(l => l.trim().length > 0);
      const firstLines = lines.slice(0, 5).join(' | ');
      results.push({
        id: entry,
        mtime: stat.mtime,
        firstLines: firstLines.substring(0, 150)
      });
    }
  } catch (e) {}
}

results.sort((a, b) => a.mtime - b.mtime);

fs.writeFileSync('brain_history.txt', results.map(r => `${r.mtime.toISOString()} [${r.id}]: ${r.firstLines}`).join('\n'));
console.log('Saved brain_history.txt, total:', results.length);
