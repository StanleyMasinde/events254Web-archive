#!/bin/sh
echo "Installing dependencies with npm"
npm install

echo "Generating static files"
npm run generate
