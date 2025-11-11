#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Fixing pnpm permissions and setup...');

try {
    // Make the global pnpm file executable
    const pnpmPath = '/usr/local/bin/pnpm';
    if (fs.existsSync(pnpmPath)) {
        fs.chmodSync(pnpmPath, '755');
        console.log('✅ Made /usr/local/bin/pnpm executable');
    }
    
    // Also create a local executable pnpm
    const localPnpmPath = path.join(__dirname, 'pnpm');
    if (fs.existsSync(localPnpmPath)) {
        fs.chmodSync(localPnpmPath, '755');
        console.log('✅ Made local pnpm executable');
    }
    
    // Test if pnpm command works
    try {
        execSync('which pnpm', { stdio: 'pipe' });
        console.log('✅ pnpm command is available');
        
        // Test pnpm install
        console.log('Running pnpm install...');
        execSync('pnpm install', { stdio: 'inherit', cwd: __dirname });
        console.log('✅ pnpm install completed');
        
    } catch (error) {
        console.log('⚠️  pnpm command not in PATH, using npm instead...');
        
        // Fallback to npm
        console.log('Running npm install...');
        execSync('npm install', { stdio: 'inherit', cwd: __dirname });
        console.log('✅ npm install completed');
    }
    
} catch (error) {
    console.error('❌ Error during setup:', error.message);
    
    // Final fallback - just use npm
    try {
        console.log('Using npm as final fallback...');
        execSync('npm install', { stdio: 'inherit', cwd: __dirname });
        console.log('✅ npm install completed');
    } catch (npmError) {
        console.error('❌ npm install also failed:', npmError.message);
    }
}