#!/bin/bash

# Setup script to install pnpm and dependencies

echo "Setting up pnpm and dependencies..."

# Install pnpm globally if not available
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm globally..."
    npm install -g pnpm
fi

# Remove old lockfile
rm -f pnpm-lock.yaml

# Install dependencies using pnpm
echo "Installing dependencies..."
pnpm install

# Build the project
echo "Building the project..."
pnpm run build

echo "Setup complete!"