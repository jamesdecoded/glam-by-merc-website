# Glam by Mer-c: Website Audit (8 November 2026)

Tested in a real browser at 320, 375, 768, 1280 and 1920px wide, plus a code review.

## Passed
- No sideways scrolling at any width; all images load; reels play; no script errors
- Text contrast meets WCAG AA (weakest pairing 5.15:1; minimum is 4.5:1)
- Scroll reveals, filter tabs and photo viewer work

## Fixed
- Menu tap targets raised from 19px to 40-42px (WCAG 2.2 minimum is 24px)
- Added main content area, skip link, description, share tags and business structured data
- Reels stay still for visitors with reduced motion; scrolling band pauses on hover
- Photo viewer keeps keyboard focus on the Close button
- Real WhatsApp and call links, biography added, placeholder text removed

## Updated after UI fixes
- Closed photo viewer is removed from the accessibility tree until opened; keyboard focus can move between Close and video controls, and Escape closes the viewer.
- Service quote links open WhatsApp with a service-specific booking prompt.
- Floating WhatsApp button hides while the hero or portfolio is in view so it does not cover the main imagery.
- Mobile hero collage is shorter to bring portfolio work closer to the first screen.
- Added a three-step booking guide and descriptive reel captions based on their poster frames.

## Still open
1. Add Instagram, email, prices and real client quotes after Mercy provides verified details and permission
2. Host on a real domain; add canonical link, og:image, sitemap
3. Fonts untested offline; check headings on a phone
4. Not done: competitor research, Core Web Vitals on a live network, security testing, full WCAG 2.2 AA audit

## Recommended next
- WhatsApp booking path (done); add a bridal section and a "how booking works" strip
- Name each reel instead of "Reel"
- "Behind the brush" section with before-and-after sliders
- Custom domain, Google Business profile, Instagram feed
