# 🛠️ pdf-stamp

A lightweight, high-performance, **100% client-side** PDF image watermarking application built completely in a single file using vanilla JavaScript.

This utility allows users to overlay customized image logos or graphics onto existing documents directly inside the web browser. Because it executes entirely locally, **no files are ever uploaded to an external server**, guaranteeing absolute privacy and data security for sensitive documents.

*Inspired by the architecture detailed on [freeCodeCamp](https://www.freecodecamp.org/news/build-a-pdf-watermark-tool-in-javascript/).*

---

## ✨ Features

- 🔒 **Absolute Privacy:** Files are processed completely in local memory. Your documents never touch a third-party server.
- 🖼️ **Image Logo Watermarking:** Upload PNG or JPEG company logos and customize them seamlessly.
- 🎛️ **Precision Tuning:** Simple inputs to control watermark image sizing/scaling and layout opacity.
- 🎯 **Automated Centering:** Automatically reads individual page dimensions (`width` and `height`) to stamp the logo exactly in the center of every page.
- ⚡ **Single-File Architecture:** The entire app lives inside just one `index.html` file—no complex terminal installations or build setups needed.

---

## 📐 How It Works

The tool processes the low-level binary structure of a PDF using the open-source library `pdf-lib` loaded via CDN.


1. **File Ingestion:** The user provides a PDF and an image logo. The browser extracts the raw data as `ArrayBuffer` objects.
2. **Dynamic Scaling:** The engine checks if the image is a PNG or JPEG, embeds it, and scales its width and height proportionally.
3. **Canvas Drawing:** It loops through every page, dynamically fetches individual landscape or portrait viewports (`page.getSize()`), and applies the transparency layer via `page.drawImage()`.
4. **Instant Output:** The final PDF compiles back into a data stream and triggers an automatic download via an ephemeral local browser link.

---

## 🚀 Quick Start / Local Setup

Since `pdf-stamp` runs completely on front-end infrastructure, running it locally takes seconds.

### Setup Steps
1. Clone the repository to your machine:
   ```bash
   git clone [https://github.com/Dhruv-AFK/pdf-stamp.git]

### Update it on GitHub:
Run these commands in your project terminal to save and push your new README file:

```bash
git add README.md
git commit -m "Docs: Update README to reflect single-file architecture"
git push origin main
