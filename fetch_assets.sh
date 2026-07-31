#!/usr/bin/env bash
# Downloads every remote asset the site uses into ./assets/ so the repo is
# fully self-hosted and survives the Wix site being deleted.
# Run once from the repo root:  bash fetch_assets.sh
set -euo pipefail
cd "$(dirname "$0")/assets"

WIX="https://static.wixstatic.com/media"

fetch () {
  local name="$1" url="$2"
  if [ -s "$name" ]; then echo "skip   $name (exists)"; return; fi
  echo "fetch  $name"
  curl -fsSL "$url" -o "$name"
}

# ---- resume ----
fetch resume.pdf "https://2240088c-b9fd-479f-9bef-14271e43f919.filesusr.com/ugd/4809f6_554dc016e5a24ff288acf3056964990b.pdf"

# ---- project cards + modal images ----
fetch neurofocus-card.png  "$WIX/4809f6_5297133f28b84f498a52d7a3720489a2~mv2.png"
fetch neurofocus-modal.png "$WIX/4809f6_03b46c11c3164f38aac18260f423838e~mv2.png"
fetch drone-card.png       "$WIX/4809f6_e6575f0feddb4c9dbb385ef9dca9698d~mv2.png"
fetch drone-modal.png      "$WIX/4809f6_ad1462ce3c764d61875647b8762e9b0f~mv2.png"
fetch frc-card.png         "$WIX/4809f6_d3d831815f9f4535a65bb4a42d9db721~mv2.png"
fetch frc-modal.png        "$WIX/4809f6_191fa64637994fce80f595a89e49e6c7~mv2.png"
fetch ftc-card.png         "$WIX/4809f6_ffeb6d8581c94781ab40637ebe17a41b~mv2.png"
fetch ftc-modal.png        "$WIX/4809f6_2cb0aff657094edbaa0c07a5a528945b~mv2.png"
fetch fireflight-card.png  "$WIX/4809f6_6943ea9af0034a4caab5b83e39112445~mv2.png"
fetch fireflight-modal.png "$WIX/4809f6_511bdac0395b41c78b5dabbc8667a072~mv2.png"
fetch era-card.png         "$WIX/4809f6_c0e449dec320449ab58bd1bcb9d79095~mv2.png"
fetch era-modal.png        "$WIX/4809f6_8cd1f322d4f84d278f9647d023c78897~mv2.png"
fetch titanium-card.png    "$WIX/4809f6_9497cd2728cd4394b1e0181dadb15765~mv2.png"
fetch titanium-modal.png   "$WIX/4809f6_74ec7891f2e1403382bc1221ff9a9ae6~mv2.png"
fetch dahacks-card.webp    "$WIX/4809f6_4bb3b39a556c4677bb0c61c42ae565a0~mv2.webp"
fetch dahacks-modal.png    "$WIX/4809f6_1e0c3339be7e4f85aaa224426f3e9a57~mv2.png"
fetch k12-card.png         "$WIX/4809f6_68c6fe0e34d8483cbed7b09431926bc4~mv2.png"
fetch k12-modal.png        "$WIX/4809f6_fc89b9c35d66459c882a0d16f82c1ca0~mv2.png"

echo
echo "All assets present:"
ls -la
