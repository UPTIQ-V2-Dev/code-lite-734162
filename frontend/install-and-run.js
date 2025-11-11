#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Setting up pnpm...');

// Create pnpm wrapper function
function createPnpmWrapper() {
    const pnpmScript = `#!/usr/bin/env node
const { execSync } = require('child_process');
const args = process.argv.slice(2);

switch (args[0]) {
    case 'install':
        execSync('npm install', { stdio: 'inherit' });
        break;
    case 'build':
        execSync('npm run build', { stdio: 'inherit' });
        break;
    case 'run':
        execSync(\`npm run \${args.slice(1).join(' ')}\`, { stdio: 'inherit' });
        break;
    default:
        execSync(\`npm \${args.join(' ')}\`, { stdio: 'inherit' });
        break;
}`;

    fs.writeFileSync('pnpm.js', pnpmScript);
    fs.chmodSync('pnpm.js', '755');
    console.log('Created pnpm wrapper');
}

// Try to install pnpm globally first
try {
    execSync('npm install -g pnpm', { stdio: 'inherit' });
    console.log('pnpm installed globally');
} catch (error) {
    console.log('Could not install pnpm globally, creating wrapper...');
    createPnpmWrapper();
}

// Install dependencies
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installed successfully');
    
    // Try to build
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Build completed successfully');
} catch (error) {
    console.error('Error during setup:', error.message);
}