#!/bin/sh
echo "Installing dependencies with npm"
npm install

echo "Building for production"
npm run build

echo "Restarting the process"
pm2 restart ecosystem.config.js
