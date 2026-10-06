const { execSync } = require('child_process');
const fs = require('fs');

try {
  const output = execSync('git log --pretty=format:"%h | %ad | %s" --date=iso -n 100', { encoding: 'utf8' });
  fs.writeFileSync('git_history.txt', output);
  console.log('Success writing git_history.txt, lines:', output.split('\n').length);
} catch (e) {
  console.error('Error:', e.message);
  fs.writeFileSync('git_history.txt', 'Error: ' + e.message);
}
