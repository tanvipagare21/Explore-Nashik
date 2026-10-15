const { spawn } = require('child_process');
const path = require('path');

console.log('====================================================');
console.log('   🚀 Launching Explore Nashik Full-Stack Application');
console.log('====================================================\n');

// Start Express Backend
const backend = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['start'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start Vite React Frontend
const frontend = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

const cleanup = () => {
  console.log('\n🛑 Stopping Explore Nashik servers...');
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
