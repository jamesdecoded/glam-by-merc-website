# Glam by Mer-c: UI and content audit

Updated 14 November 2026 after a source review and local browser checks.

## Changes made

- Removed the nonfunctional mobile theme control and the unused theme script. The site currently uses one dark berry theme.
- Removed unverified experience and client-count claims, and replaced the unverified response-speed label. Confirm business details and service information with Mercy before publication.
- Added FAQ links to the desktop and mobile navigation.
- Made scroll-reveal effects progressive enhancements: content remains visible unless JavaScript initializes the reveal behavior. Reduced-motion mode keeps all content visible.
- Put the first hero image directly in the HTML with high fetch priority; later slideshow images load after the initial page work. The chosen photos and their order were not changed.
- Isolated page content from keyboard and assistive-technology navigation while the mobile menu or photo viewer is open.
- Added a polite screen-reader announcement for gallery filter result counts.
- Updated the 404-page browser theme color to match the site background.

## Validation

- JavaScript syntax checked with `node --check`.
- Browser checks cover the homepage and 404 page, mobile menu open/close and focus behavior, gallery filters and announcements, FAQ navigation and expansion, photo viewer open/close and modal isolation, reduced motion, image loading, and responsive overflow.
- These local checks are not a substitute for a full WCAG 2.2 AA audit, assistive-technology testing, or live performance testing.

## Still to verify before launch

- Confirm business details, service FAQ claims, and any future testimonials with Mercy.
- Add the canonical URL, absolute Open Graph image URL, and sitemap after the public domain is confirmed. Do not publish placeholder domain metadata.
- Test external fonts, page speed, and Core Web Vitals on the production network.
- Review slideshow crops on representative physical devices. `object-fit: cover` fills the hero frame and necessarily trims some edges; responsive focal positioning reduces unwanted crops but cannot preserve every pixel of a portrait on every screen shape.
- Consider adding confirmed starting prices and booking/deposit expectations if the business can provide them.
