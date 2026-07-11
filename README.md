# COSC Hackweek 2026 Projects

This repository contains projects built for **Hackweek 2026**, organized by **COSC (CBIT Open Source Community)** at **CBIT**.

## Event Context

In Hackweek, participants solve coding challenges and earn points based on challenge difficulty. Harder challenges give more points, and a live leaderboard tracks rankings.

- Challenges: https://coschackweek.vercel.app/challenges

## Repository Purpose

This repo is a collection of challenge-based mini projects created during the Hackweek event. It serves as:

- A showcase of implemented projects
- A quick access point for deployed demos
- A reference for challenge progress and practical solutions

## Projects

| Project | Description | Deployment | Source |
|---|---|---|---|
| Digital Business Card Generator | Generate a digital business card with live preview and download as PNG/PDF | https://dilip-reddymalla.github.io/COSC_Hackweek_2026/card-generator/ | ./card-generator |
| Cat Image Replacer | Browser extension that replaces webpage images with random cat images | Not applicable, extension project | ./cat-image-replacer |
| File Metadata Inspector | Upload a file and inspect metadata (EXIF for images, metadata for PDFs) | https://dilip-reddymalla.github.io/COSC_Hackweek_2026/file-metadata-inspector/ | ./file-metadata-inspector |

## Main Landing Page

A root landing page is available at:

- ./index.html

If GitHub Pages is enabled for this repository, the root page is typically available at:

- https://dilip-reddymalla.github.io/COSC_Hackweek_2026/

## Run Locally

1. Clone the repository.
2. Open the repository folder in VS Code.
3. Open `index.html` in a browser.
4. Open each project folder and run its `index.html` directly.

## Folder Structure

```text
COSC_Hackweek_2026/
├── index.html
├── README.md
├── card-generator/
│   ├── index.html
│   └── readme.md
├── cat-image-replacer/
│   ├── content.js
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── readme.md
└── file-metadata-inspector/
    ├── index.html
    ├── script.js
    ├── style.css
    └── readme.md
```

## Notes

- Deployment links assume GitHub Pages is configured for this repository.
- If a deployment link does not open, enable Pages in repository settings and redeploy.
