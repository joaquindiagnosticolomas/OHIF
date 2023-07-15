#!/bin/bash

# Set directory to location of this script
# https://stackoverflow.com/a/3355423/1867984
cd "$(dirname "$0")"
cd .. # Up to project root

# Helpful to verify which versions we're using
echo 'My yarn version is... '

yarn -v
node -v

# Build && Move PWA Output
yarn run dev
mkdir -p ./.netlify/www/pwa
mv ./* .netlify/www/pwa -v
echo 'Web application built and copied'
