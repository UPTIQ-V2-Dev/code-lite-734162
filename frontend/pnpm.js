#!/usr/bin/env node
// pnpm wrapper that uses npm instead

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const command = args[0];

// Ensure we're in the correct working directory
const cwd = process.cwd();

console.log(`pnpm wrapper: Running in directory ${cwd}`);

try {
    switch (command) {
        case 'install':
            console.log('pnpm wrapper: Running npm install');
            execSync('npm install', { 
                stdio: 'inherit', 
                cwd: cwd,
                env: { ...process.env }
            });
            break;
            
        case 'build':
            console.log('pnpm wrapper: Running npm run build');
            execSync('npm run build', { 
                stdio: 'inherit', 
                cwd: cwd,
                env: { ...process.env }
            });
            break;
            
        case 'run':
            const runCommand = args.slice(1).join(' ');
            console.log(`pnpm wrapper: Running npm run ${runCommand}`);
            execSync(`npm run ${runCommand}`, { 
                stdio: 'inherit', 
                cwd: cwd,
                env: { ...process.env }
            });
            break;
            
        case 'add':
            const addPackages = args.slice(1).join(' ');
            console.log(`pnpm wrapper: Running npm install ${addPackages}`);
            execSync(`npm install ${addPackages}`, { 
                stdio: 'inherit', 
                cwd: cwd,
                env: { ...process.env }
            });
            break;
            
        case 'remove':
            const removePackages = args.slice(1).join(' ');
            console.log(`pnpm wrapper: Running npm uninstall ${removePackages}`);
            execSync(`npm uninstall ${removePackages}`, { 
                stdio: 'inherit', 
                cwd: cwd,
                env: { ...process.env }
            });
            break;
            
        default:
            const allArgs = args.join(' ');
            console.log(`pnpm wrapper: Running npm ${allArgs}`);
            execSync(`npm ${allArgs}`, { 
                stdio: 'inherit', 
                cwd: cwd,
                env: { ...process.env }
            });
            break;
    }
    
    console.log('pnpm wrapper: Command completed successfully');
    
} catch (error) {
    console.error('pnpm wrapper: Command failed:', error.message);
    process.exit(error.status || 1);
}