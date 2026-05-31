# EvalIQ Prototype Change Log

## 2026-05-31

- Fixed CDN script loading in `index.html` by removing brittle Subresource Integrity hashes from React, ReactDOM, and Babel script tags.
- Fixed the sidebar `Reports` item so it opens a real route instead of doing nothing.
- Added `Reports.jsx`, a working team review report screen with source-backed summary, metrics, and agent evidence rows.
- Registered `Reports.jsx` in `index.html` and mapped the `reports` route to the new screen.
