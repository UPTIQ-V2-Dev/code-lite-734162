#!/usr/bin/env node
const { execSync } = require('child_process');

try {
    // Try to install pnpm globally
    execSync('npm install -g pnpm', { stdio: 'inherit' });
    console.log('pnpm installed successfully');
} catch (error) {
    console.error('Failed to install pnpm:', error.message);
    
    // Alternative: create a simple pnpm wrapper
    const fs = require('fs');
    const path = require('path');
    
    const pnpmWrapper = `#!/bin/bash
case "$1" in
    "install")
        npm install
        ;;
    "build")
        npm run build
        ;;
    "run")
        npm run "\${@:2}"
        ;;
    "add")
        npm install "\${@:2}"
        ;;
    "remove")
        npm uninstall "\${@:2}"
        ;;
    *)
        npm "$@"
        ;;
esac`;
    
    try {
        fs.writeFileSync('/usr/local/bin/pnpm', pnpmWrapper);
        fs.chmodSync('/usr/local/bin/pnpm', '755');
        console.log('Created pnpm wrapper script');
    } catch (err) {
        console.error('Failed to create wrapper:', err.message);
    }
}