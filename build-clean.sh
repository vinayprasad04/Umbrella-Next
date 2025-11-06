#!/bin/bash
# Clean build script that unsets problematic environment variables

unset __NEXT_PRIVATE_STANDALONE_CONFIG
unset __NEXT_PRIVATE_ORIGIN

echo "Cleaned Next.js environment variables"
echo "Running build..."

npm run build
