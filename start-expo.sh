#!/bin/bash

# Kill any existing Expo processes
echo "🔄 Killing existing Expo processes..."
pkill -f "expo start" 2>/dev/null
pkill -f "metro" 2>/dev/null
sleep 2

# Clear all caches
echo "🧹 Clearing all caches..."
rm -rf .expo 2>/dev/null
rm -rf node_modules/.cache 2>/dev/null
rm -rf $TMPDIR/metro-* 2>/dev/null

# Force localhost binding
echo "🚀 Starting Expo on localhost..."
export EXPO_DEVTOOLS_LISTEN_ADDRESS=127.0.0.1
npx expo start --localhost --port 8081 --clear
