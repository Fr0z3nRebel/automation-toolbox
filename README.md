# Automation Toolbox Chrome Extension

A Chrome extension that provides automation tools for various platforms, including Artistly.

## Features

### Artistly Section
- **AI Art Illustrator Tool**: Automatically generates images using selected styles and multiple prompts
  - Progress Tracking: Real-time stats showing total images, current image, and progress percentage
  - Style Selection: Searchable dropdown with 79+ available styles
  - Batch Processing: Process multiple prompts sequentially

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `artistly-automation` folder
5. The extension icon should appear in your toolbar

## Usage

1. Click the extension icon to open the side panel
2. Navigate to the **Artistly** section
3. Select **AI Art Illustrator** from the tool list
4. Choose a style from the searchable dropdown (79+ styles available)
5. Enter your prompts in the textarea, separated by blank lines
6. Click "Start" to begin automation
7. The extension will:
   - Navigate to the Artistly AI Illustrator page
   - Select the chosen style
   - Process each prompt sequentially
   - Wait 5 seconds between each generation
   - Display progress in real-time

## Icons

The extension requires icon files in the `icons/` directory:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)
- `icon512.png` (512x512 pixels)

You can create these icons using any image editor. The icons should represent the extension's purpose (automation/art tools).

## File Structure

```
artistly-automation/
├── manifest.json          # Extension manifest
├── icons/                 # Extension icons
├── sidepanel/            # Side panel UI
│   ├── sidepanel.html
│   ├── sidepanel.css
│   └── sidepanel.js
├── content/              # Content scripts
│   └── content.js
├── background/           # Background service worker
│   └── background.js
└── README.md
```

## Development

The extension uses Manifest V3 and requires the following permissions:
- `sidePanel`: For the side panel UI
- `activeTab`: To interact with the current tab
- `scripting`: To inject content scripts
- `storage`: For storing extension state (if needed)

## Notes

- The extension will automatically navigate to the Artistly AI Illustrator page if not already there
- Prompts should be separated by blank lines (double newline)
- The automation waits 5 seconds between each image generation
- If an error occurs, the automation will stop and display an error message
