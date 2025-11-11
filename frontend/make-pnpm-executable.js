#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');

console.log('Making pnpm executable...');

try {
    // Make the global pnpm executable
    fs.chmodSync('/usr/local/bin/pnpm', 0o755);
    console.log('✅ Made /usr/local/bin/pnpm executable');
    
    // Test it
    const result = execSync('pnpm install', { 
        stdio: 'inherit',
        cwd: __dirname
    });
    console.log('✅ pnpm install completed');
    
} catch (error) {
    console.error('Error:', error.message);
    
    // Fallback - use npm directly
    console.log('Using npm as fallback...');
    try {
        if (fs.existsSync('pnpm-lock.yaml')) {
            fs.unlinkSync('pnpm-lock.yaml');
        }
        execSync('npm install', { stdio: 'inherit', cwd: __dirname });
        console.log('✅ npm install completed');
    } catch (npmError) {
        console.error('npm also failed:', npmError.message);
    }
}