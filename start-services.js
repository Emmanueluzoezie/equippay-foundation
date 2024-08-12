const { spawn } = require('child_process');
const path = require('path');

function startService(name) {
  const npmPath = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const child = spawn(npmPath, ['run', 'start:prod'], {
    cwd: path.join('/app/packages', name),
    stdio: 'inherit',
    shell: true
  });

  child.on('error', (error) => {
    console.error(`Error starting ${name} service:`, error);
  });

  child.on('exit', (code, signal) => {
    if (code) {
      console.error(`${name} service exited with code ${code}`);
    } else if (signal) {
      console.error(`${name} service was killed with signal ${signal}`);
    } else {
      console.log(`${name} service exited successfully`);
    }
  });
}

['auth', 'vendors', 'lenders', 'borrowers'].forEach(startService);