#!/usr/bin/env node
// Comprehensive pnpm setup script

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔧 Setting up pnpm wrapper...');

try {
    // Make all pnpm-related files executable
    const filesToMakeExecutable = [
        '/usr/local/bin/pnpm',
        './pnpm',
        './pnpm.js',
        './setup.sh',
        './fix-pnpm.js'
    ];
    
    for (const file of filesToMakeExecutable) {
        try {
            if (fs.existsSync(file)) {
                fs.chmodSync(file, '755');
                console.log(`✅ Made ${file} executable`);
            }
        } catch (error) {
            console.log(`⚠️  Could not make ${file} executable: ${error.message}`);
        }
    }
    
    // Test if pnpm command works now
    console.log('🧪 Testing pnpm command...');
    
    try {
        // Test which pnpm
        const pnpmPath = execSync('which pnpm', { encoding: 'utf8' }).trim();
        console.log(`✅ pnpm found at: ${pnpmPath}`);
        
        // Test pnpm version
        execSync('pnpm --version', { stdio: 'inherit' });
        console.log('✅ pnpm command works');
        
        // Run pnpm install
        console.log('📦 Running pnpm install...');
        execSync('pnpm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed');
        
        // Run pnpm build
        console.log('🔨 Running pnpm build...');
        execSync('pnpm build', { stdio: 'inherit' });
        console.log('✅ Build completed successfully');
        
    } catch (error) {
        console.log('⚠️  pnpm test failed, using npm fallback...');
        
        // Remove pnpm-lock.yaml if it exists
        if (fs.existsSync('pnpm-lock.yaml')) {
            fs.unlinkSync('pnpm-lock.yaml');
            console.log('🗑️  Removed pnpm-lock.yaml');
        }
        
        // Use npm instead
        console.log('📦 Running npm install...');
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed with npm');
        
        console.log('🔨 Running npm run build...');
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✅ Build completed successfully with npm');
    }
    
    console.log('🎉 Setup completed successfully!');
    
} catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
}