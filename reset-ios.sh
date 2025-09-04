#!/bin/bash

set -e

echo "🛑 Killing running Node / React Native processes..."
killall -9 node || true
killall -9 react-native || true

echo "🧹 Removing React Native build artifacts..."
rm -rf ios/build
rm -rf android/build
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/react-*

echo "👀 Clearing Watchman watches..."
watchman watch-del-all || true

echo "📦 Removing dependencies & lock files..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

echo "🍏 Cleaning CocoaPods..."
cd ios || exit
rm -rf Pods
rm -rf Podfile.lock
cd ..

echo "🧽 Cleaning Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*

echo "📥 Reinstalling npm dependencies..."
npm install   # or yarn install / pnpm install

echo "📥 Reinstalling CocoaPods..."
cd ios || exit
pod install --repo-update
cd ..

echo "🛠 Running xcodebuild clean..."
cd ios || exit
xcodebuild clean -workspace RStodoApp.xcworkspace -scheme RStodoApp -configuration Debug
cd ..

echo "⚡ Resetting Metro cache..."
npm start -- --reset-cache

echo "✅ iOS project has been FULLY reset & cleaned!"
