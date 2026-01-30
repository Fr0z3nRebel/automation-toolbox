#!/bin/bash
# Simple script to create placeholder icons using ImageMagick or sips

cd "$(dirname "$0")/icons"

# Check if ImageMagick is available
if command -v convert &> /dev/null; then
    echo "Creating icons with ImageMagick..."
    for size in 16 48 128 512; do
        convert -size ${size}x${size} xc:'#1a1a1a' \
                -fill '#ff6b35' -draw "rectangle $((size/8)),$((size/8)) $((size-size/8)),$((size-size/8))" \
                -pointsize $((size/3)) -fill white -gravity center -annotate +0+0 "AA" \
                icon${size}.png
    done
    echo "Icons created successfully!"
# Check if sips is available (macOS)
elif command -v sips &> /dev/null; then
    echo "Creating a base icon with sips..."
    # Create a simple colored square as base
    echo "Note: sips has limited capabilities. Creating a simple colored square."
    # We'll create a simple approach - just create a note file
    echo "Icons need to be created manually. See README.md for details." > ICONS_README.txt
    echo "Please create icon files: icon16.png, icon48.png, icon128.png, icon512.png"
else
    echo "No image conversion tools found."
    echo "Please create icon files manually: icon16.png, icon48.png, icon128.png, icon512.png"
    echo "See README.md for details."
fi
