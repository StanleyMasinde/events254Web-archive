#!/bin/sh
echo "Restarting the process"
pm2 restart ecosystem.config.js
