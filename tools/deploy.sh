#!/bin/bash
# Deploy myurdu.org: stamp a fresh cache-busting version on all asset
# URLs, then commit and push. ALWAYS deploy with this script — hand
# deploys without a version bump cause stale-cache version skew.
set -euo pipefail
cd "$(dirname "$0")/.."
node tools/smoke.js || { echo "DEPLOY ABORTED: smoke tests failed"; exit 1; }
python3 tools/gen_seo.py
V=$(date +%Y%m%d%H%M)
sed -i '' -E "s/\.(css|js)\?v=[0-9]+/.\1?v=$V/g" index.html
sed -i '' -E "s/myurdu-v[0-9]+/myurdu-v$V/" sw.js
git add -A
git -c user.name="Muneeb Ata" -c user.email="194409090+muneebata@users.noreply.github.com" commit -m "${1:-Deploy} (assets v$V)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push
echo "Deployed with asset version $V"
