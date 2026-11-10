# Glam by Mer-c website

Portfolio website for Mercy Mukunda, founder and freelance makeup artist (bridal, events, graduations, photo shoots).

## Open it
Double-click `index.html`. No build step or install needed.

## Folder guide
- `index.html` : page structure and text (hero, moodboard, work, services, booking steps, about, booking)
- `css/style.css` : all styling, light and dark mode, responsive rules
- `js/theme.js` : system theme detection and saved light/dark preference controls in the mobile menu
- `js/main.js` : gallery, filter tabs, accessible photo viewer, scroll effects, and contextual WhatsApp button. The gallery list is the `items` array near the top
- `404.html` : custom not-found page for static hosts that support a root-level 404 document
- `assets/images/` : optimized photos and reel poster frames
- `assets/video/` : optimized reels (no sound, loop silently)
- `_source-originals/` : the original uploads, untouched. Not needed to run the site; do not upload to hosting
- `docs/website-audit.md` : audit results and next steps
- `favicon.svg`, `robots.txt`

## Common edits
- **WhatsApp / phone:** search `254705274301` in `index.html` (5 places)
- **Add a photo:** copy it into `assets/images/` (about 800px wide, JPG), add a key to the `M` object and a line to `items` in `js/main.js`
- **Add a reel:** same, with an MP4 in `assets/video/` and a poster image; keys `v3` and `v3p`
- **Prices:** service quote links in `index.html` open WhatsApp; update them if adding prices
- **Instagram / testimonials:** not added yet. Add them in the `#contact` and `#about` sections

## Publishing
Upload the whole folder (except `_source-originals` and `docs`) to any static host such as Netlify, Cloudflare Pages, GitHub Pages or your hosting provider's `public_html`. Keep the folder structure as is. The root-level `404.html` is used automatically by hosts that support it.

## After you have a domain
- Add `<link rel="canonical" href="https://your-domain/">` and an `og:image` with a full https URL to `index.html`
- Add your domain to a `sitemap.xml` and to `robots.txt`
- Test speed with PageSpeed Insights on the live URL

## Known limits
- Fonts (Young Serif, DM Sans) load from Google Fonts and need internet; fallbacks are set
- Not yet tested: live-network speed, security scan, full WCAG 2.2 AA audit
