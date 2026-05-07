# Silver Bridge Hackathon

A placeholder website for the Silver Bridge Hackathon project.

## Overview

This repository contains a simple HTML placeholder page displaying "Tutaj wkrótce będzie nasza strona" (Our page will be here soon).

## Features

### Core Features
- Pure HTML with external CSS (no inline styles)
- Semantic HTML5 elements (`<main>`, `<h1>`)
- Mobile-responsive design
- Polish language support

### Security
- Hardened Content Security Policy (no `unsafe-inline`)
- X-Frame-Options and X-Content-Type-Options headers
- External stylesheet for better security posture

### Accessibility
- ARIA landmarks (`role="main"`)
- Accessible SVG favicon with proper labels
- Relative units (`rem`) for better text scaling
- Reduced motion support for vestibular disorders
- Dark mode with proper color contrast (WCAG compliant)

### SEO & Social Media
- Open Graph meta tags for social media sharing
- Twitter Card support
- Descriptive meta tags
- Theme color for mobile browsers (light & dark mode)

### User Experience
- Automatic dark mode support via `prefers-color-scheme`
- Print-friendly styles
- Smooth transitions (respecting reduced-motion preference)
- SVG favicon (resolution-independent)

## Development

To run locally:

```bash
# Start a simple HTTP server
python3 -m http.server 8000

# Or with Node.js
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

### Testing Dark Mode

To test dark mode in Chrome DevTools:
1. Open DevTools (F12)
2. Open Command Palette (Ctrl+Shift+P)
3. Type "Show Rendering" and press Enter
4. Find "Emulate CSS media feature prefers-color-scheme"
5. Select "prefers-color-scheme: dark"

## Project Structure

```
.
├── index.html      # Main placeholder page with semantic HTML
├── style.css       # External stylesheet with dark mode
├── favicon.svg     # Accessible SVG favicon
└── README.md       # This file
```

## Task Details

**Task ID:** E1-T10 — Strona placeholder HTML

**Acceptance Criteria:**
- ✅ `index.html` file exists and opens in browser
- ✅ Visible text "Tutaj wkrótce będzie nasza strona"
- ✅ Page doesn't throw errors in console
