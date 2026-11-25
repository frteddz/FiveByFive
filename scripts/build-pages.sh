#!/usr/bin/env bash
# Static export for GitHub Pages. Pages cannot run Next.js route handlers, so
# app/api is moved aside for the duration of the build and restored afterwards.
set -euo pipefail

# npm normally generates this through prebuild, which npx next build skips.
mkdir -p shared/data
node scripts/generate-commit-info.mjs

route_backup="$(mktemp -d)"
for route in api llms.txt security.txt; do
  mv "app/$route" "$route_backup/$route"
done

restore_routes() {
  for route in api llms.txt security.txt; do
    if [ -d "$route_backup/$route" ]; then
      mv "$route_backup/$route" "app/$route"
    fi
  done
  rm -rf "$route_backup"
}
trap restore_routes EXIT

STATIC_EXPORT=true npx next build
touch out/.nojekyll

echo "Static export written to out/"
