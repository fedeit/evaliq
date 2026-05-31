# EvalIQ Prototype Change Log

## 2026-05-31

- Fixed CDN script loading in `index.html` by removing brittle Subresource Integrity hashes from React, ReactDOM, and Babel script tags.
- Fixed the sidebar `Reports` item so it opens a real route instead of doing nothing.
- Added `Reports.jsx`, a working team review report screen with source-backed summary, metrics, and agent evidence rows.
- Registered `Reports.jsx` in `index.html` and mapped the `reports` route to the new screen.
- Added `UI_ROADMAP_ALIGNMENT.md` to track roadmap-driven UI hooks and feedback/rubric gap fixes.
- Applied feedback/rubric UI fixes: safer AI/HR wording, manager-facing brief language, generic integration copy, development-context goals, and the 180 hrs/year value metric.
- Made the prep brief editable: `Edit` toggles manager editing mode, draft sections become editable, approval changes the state to manager approved, and citations remain visible outside edit mode.
- Extended edit mode to coaching questions and suggested next steps, kept source citations visible while editing, added manager prep notes, and removed the nonfunctional regenerate action.
- Clarified section-level notes so they are separate from the global brief edit mode.
- Enlarged editable brief text areas for easier manager review.
