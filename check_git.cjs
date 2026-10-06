const { execSync } = require('child_process');
const fs = require('fs');

fs.writeFileSync('git_info.txt', 'Started\n');

try {
  const stat = execSync('git --no-pager status --porcelain', { encoding: 'utf8', timeout: 3000 });
  fs.appendFileSync('git_info.txt', 'Status:\n' + stat + '\n');
} catch (e) {
  fs.appendFileSync('git_info.txt', 'Status error: ' + e.message + '\n');
}

try {
  const branches = execSync('git --no-pager branch -a', { encoding: 'utf8', timeout: 3000 });
  fs.appendFileSync('git_info.txt', 'Branches:\n' + branches + '\n');
} catch (e) {
  fs.appendFileSync('git_info.txt', 'Branches error: ' + e.message + '\n');
}
