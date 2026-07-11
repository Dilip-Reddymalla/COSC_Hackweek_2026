# File Metadata Inspector

File Metadata Inspector is a small front-end project that lets you upload a file in the browser and view useful metadata about it. It can read image EXIF data, inspect PDF document metadata, and show basic details for other file types.

## Features

- Upload a local file and inspect its metadata in the browser
- Show image preview for supported image files
- Read EXIF metadata from images using `exif-js`
- Read PDF metadata using `pdf.js`
- Display generic file details for unsupported file types
- Responsive layout for desktop and mobile screens

## Supported File Types

- Images such as `jpg`, `jpeg`, `png`, and other browser-supported image formats
- PDF documents
- Any other file type for basic file information

## How It Works

The app uses a single HTML page, a stylesheet, and a JavaScript file:

- `index.html` provides the upload input, preview area, and metadata container
- `script.js` handles file selection and metadata extraction
- `style.css` controls the page layout and visual design

When you select a file, the app detects its type and routes it to the appropriate metadata handler:

- Images are loaded into a preview and read with EXIF parsing
- PDFs are processed with PDF.js to extract document metadata
- Other files are shown with generic file information such as name, size, type, and last modified date

## Getting Started

1. Open the `file-metadata-inspector` folder in a browser-based editor or local web server.
2. Open `index.html` in your browser.
3. Choose a file using the upload input.
4. Review the metadata table that appears below the preview.

## Dependencies

The project loads these libraries from a CDN:

- `exif-js` for image metadata
- `pdf.js` for PDF parsing

Because the libraries are loaded remotely, the app should be opened with internet access.

## Project Structure

```text
file-metadata-inspector/
├── index.html
├── script.js
├── style.css
└── readme.md
```

## Notes

- The preview is cleared for non-image files.
- Some metadata fields may be unavailable depending on the uploaded file.
- PDF metadata may vary based on how the document was created.
