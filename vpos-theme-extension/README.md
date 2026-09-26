# VPOS Brutalist Dashboard

A Chrome extension that replaces the default [VPOS](https://vpos.cartomat.com) interface with a minimal, full-screen service launchpad.

---

## What it does

The original VPOS interface is a cluttered Metronic admin panel. This extension overrides it at the browser level, without touching the Angular app source code.

- Replaces the service grid with a clean card layout, one card per service
- Injects high-resolution official SVG logos for all major Moroccan utility and government providers
- Suppresses the original auto-scroll behavior on route transitions
- Adds a persistent back button on all subpage views
- Styles the recharge wizard (`#/admin/reload`), payment forms, and transaction history with a consistent layout
- Keeps all original Angular routing and functionality intact

---

## Covered services

| Category | Services |
|---|---|
| Telecoms | Orange, inwi |
| Utilities | Redal, Amendis, ONEE, Lydec, TGR, RADEETA, RADEEL, RADEEMA, RADEEO, RADEET, RAMSA, SRM |
| Tax / Government | DGI, TVA, IR, IS, e-Timbre, Vignette, TSAVA, ANCFCC, CNSS |
| Transport | Markoub, Portnet |

---

## Structure

```
vpos-theme-extension/
├── manifest.json        Chrome MV3 manifest
├── page-patch.js        Injected at document_start — blocks Metronic auto-scroll
├── content.js           Main logic: logo mapping, routing, grid, back button
├── content.css          All styles — ~1500 lines
├── background.js        Service worker — reloads tab on extension click
└── logos/               Official SVG and PNG logos
```

---

## Installation

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `vpos-theme-extension` folder
5. Navigate to `vpos.cartomat.com` — the new interface loads automatically

The extension icon in the toolbar reloads both the extension and the active tab.

---

## How it works

The extension intercepts all requests to `*://vpos.cartomat.com/*`.

**`page-patch.js`** runs at `document_start` and patches `window.scrollTo` to prevent Metronic from scrolling the page back to top on every Angular route change.

**`content.js`** runs at `document_idle` and:
- Waits for the Angular app to finish rendering
- Reads the service list from the existing DOM
- Builds a new card grid with correct logos resolved from `LOGO_MAP`
- Watches for URL hash changes (`hashchange`) to switch between home, form, reload, and transaction views
- Injects a back button into subpage portlet headers

**`content.css`** hides the original layout and renders the custom one based on `body` class flags (`view-form`, `view-reload`, `view-transaction`) set by `content.js`.

---

## Logo mapping

Logos are resolved in two passes:

1. **`LOGO_MAP`** — maps the original filename from the Angular app's image source to the correct local SVG/PNG
2. **`getHighResLogo()`** — fallback that matches on service name keywords if the filename lookup fails

SVG files are sourced from official vector releases. PNG fallbacks are used where no clean SVG exists.

---

## Notes

- Does not modify the Angular application source
- Does not intercept or alter any network requests
- All data flow and authentication remain handled by the original app
- Extension resets cleanly on page reload — no persistent side effects

---

## License

MIT
