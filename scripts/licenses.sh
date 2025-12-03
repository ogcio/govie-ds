#!/usr/bin/env sh
set -eu

{
  echo "<!--"
  echo "This is an auto-generated file. DO NOT modify it manually."
  echo
  echo "To regenerate this file, run: ./scripts/licenses.sh"
  echo "-->"
  echo
  echo "# Licenses"
  echo
  echo "This file contains license information for all third-party dependencies used by this project."
  echo
  echo "_Generated from \`pnpm licenses list\` on $(date +%F)._"
  echo
  echo "| Package | Version | License |"
  echo "|---------|---------|---------|"

  pnpm licenses list --json \
    | jq -r '.[][] | "| \(.name) | \((.versions // [])[]) | \(.license) |"' \
    | sort
} > LICENSES.md

echo "License information has been generated."
