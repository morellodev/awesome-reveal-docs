#!/usr/bin/env bash
# Set CHROME to the Chrome binary on systems other than macOS.
set -euo pipefail

chrome=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}
skill_dir=$(cd "$(dirname "$0")/.." && pwd)
root=$(git -C "$skill_dir" rev-parse --show-toplevel)
out="$root/public/og.png"
config="$root/astro.config.mjs"

# Without the network, Chrome draws the fallback fonts and the image still changes.
curl -sI -m 10 https://fonts.googleapis.com >/dev/null || {
	echo "Cannot reach Google Fonts. Connect to the network and run again." >&2
	exit 1
}
grep -q 'og\.png?v=[0-9]\+' "$config" || {
	echo "No og.png?v=<n> in astro.config.mjs." >&2
	exit 1
}

before=$(shasum "$out" 2>/dev/null || true)

"$chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 \
	--window-size=1200,630 --virtual-time-budget=10000 \
	--screenshot="$out" "file://$skill_dir/assets/og-image.html"

# 98: the result is not smaller. 99: the quality is below 90. Both keep the Chrome PNG.
status=0
pngquant --force --skip-if-larger --strip --quality=90-100 --output "$out" "$out" || status=$?
if ((status != 0 && status != 98 && status != 99)); then
	exit "$status"
fi

if [[ $(shasum "$out") == "$before" ]]; then
	echo "public/og.png did not change. The cache version stays the same."
	exit 0
fi

# Social sites cache the image by its URL, so a new image needs a new ?v= query.
perl -pi -e 's/og\.png\?v=(\d+)/"og.png?v=" . ($1 + 1)/e' "$config"
echo "Rendered public/og.png. The cache version is now $(grep -o 'og\.png?v=[0-9]*' "$config")."
