#!/usr/bin/env bash
# Set CHROME to the Chrome binary on systems other than macOS.
set -euo pipefail

chrome=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}
skill_dir=$(cd "$(dirname "$0")/.." && pwd)
root=$(git -C "$skill_dir" rev-parse --show-toplevel)
out="$root/public/og.png"
github_out="$root/.github/social-preview.png"
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

# The window size selects the layout: the template scales the card to 1280×640 for GitHub.
render_png() {
	local width=$1 height=$2 png=$3
	"$chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 \
		--window-size="$width,$height" --virtual-time-budget=10000 \
		--screenshot="$png" "file://$skill_dir/assets/og-image.html"

	# 98: the result is not smaller. 99: the quality is below 90. Both keep the Chrome PNG.
	local status=0
	pngquant --force --skip-if-larger --strip --quality=90-100 --output "$png" "$png" || status=$?
	if ((status != 0 && status != 98 && status != 99)); then
		exit "$status"
	fi
}

before=$(shasum "$out" 2>/dev/null || true)

render_png 1200 630 "$out"
mkdir -p "$(dirname "$github_out")"
render_png 1280 640 "$github_out"
echo "Rendered .github/social-preview.png. Upload it by hand in Settings > General > Social preview of each repo."

if [[ $(shasum "$out") == "$before" ]]; then
	echo "public/og.png did not change. The cache version stays the same."
	exit 0
fi

# Social sites cache the image by its URL, so a new image needs a new ?v= query.
perl -pi -e 's/og\.png\?v=(\d+)/"og.png?v=" . ($1 + 1)/e' "$config"
echo "Rendered public/og.png. The cache version is now $(grep -o 'og\.png?v=[0-9]*' "$config")."
