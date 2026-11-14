# Glam by Mer-c website

Portfolio website for Mercy Mukunda, founder and freelance makeup artist (bridal, events, graduations, photo shoots).

## Open it
Double-click `index.html` for a quick preview. Some browsers restrict video playback from `file://`; use a local web server or hosted site to test the reels.

## Folder guide
- `index.html` : page structure and text (hero, moodboard, before-and-after, work, services, booking steps, FAQ, about, booking)
- `css/style.css` : dark berry styling and responsive rules
- `js/main.js` : responsive hero slideshow, gallery and filters, accessible photo viewer, scroll effects, and contextual WhatsApp button. The gallery list is the `items` array near the top
- `404.html` : custom not-found page for static hosts that support a root-level 404 document
- `assets/images/` : optimized photos and reel poster frames
- `assets/video/` : optimized reels, shown as muted autoplay previews in the gallery and as muted looping video in the viewer
- `_source-originals/` : the original uploads, untouched. Not needed to run the site; do not upload to hosting
- `docs/website-audit.md` : audit results and next steps
- `favicon.svg`, `robots.txt`

## Common edits
- **WhatsApp / phone:** search `254705274301` in `index.html` to update contact and booking links
- **Add a photo:** copy it into `assets/images/` (about 800px wide, JPG), add a key to the `M` object and a line to `items` in `js/main.js`
- **Add a reel:** same, with an MP4 in `assets/video/` and a poster image; keys `v3` and `v3p`
- **Prices:** service quote links in `index.html` open WhatsApp; update them if adding prices
- **Instagram:** linked in the mobile menu, about section, and footer
- **Testimonials:** add only after quotes and permission to publish are verified
- **Gallery:** filter results are announced to assistive technology; the media viewer and mobile menu isolate background content while open. Reels play muted and loop in the viewer; close with the Close button, Escape, or the backdrop.

## Publishing
Upload the whole folder (except `_source-originals` and `docs`) to any static host such as Netlify, Cloudflare Pages, GitHub Pages or your hosting provider's `public_html`. Keep the folder structure as is. The root-level `404.html` is used automatically by hosts that support it.

## After you have a domain
- Add `<link rel="canonical" href="https://your-domain/">` and an `og:image` with a full https URL to `index.html`
- Add your domain to a `sitemap.xml` and to `robots.txt`
- Test speed with PageSpeed Insights on the live URL

## Known limits
- Fonts (Young Serif, DM Sans) load from Google Fonts and need internet; fallbacks are set
- Confirm business details and service FAQ claims with Mercy before publication
- Not yet tested: live-network speed, security scan, full WCAG 2.2 AA audit
