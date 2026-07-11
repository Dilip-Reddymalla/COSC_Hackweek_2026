# Cat Image Replacer

Cat Image Replacer is a browser extension that swaps webpage images with random cat images. It uses a popup button to trigger the replacement and a content script to update images on the current page.

## Features

- Replace all visible webpage images with random cat images
- Use a popup button to trigger image replacement on the active tab
- Automatically handle newly added images with a mutation observer
- Works as a lightweight Chrome/Chromium extension

## How It Works

- `manifest.json` defines the extension, permissions, popup, and content script
- `popup.html` provides the extension UI
- `popup.js` sends a message to the active tab when the button is clicked
- `content.js` listens for messages and replaces images with cat images from `https://cataas.com`

## File Structure

```text
cat-image-replacer/
├── content.js
├── manifest.json
├── popup.html
├── popup.js
└── readme.md
```

## Installation

1. Open Chrome or any Chromium-based browser.
2. Go to the extensions page.
3. Enable Developer mode.
4. Load the `cat-image-replacer` folder as an unpacked extension.
5. Open any webpage and click the extension popup button to replace images.

## Notes

- No deployment link is provided because this is a browser extension project.
- The extension requests access to `https://cataas.com/*` so it can load cat images.
- The content script runs on all pages, so image replacement can be applied anywhere after activation.