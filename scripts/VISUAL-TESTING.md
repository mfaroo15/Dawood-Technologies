# Visual verification with installed Chrome

Run `npm run verify:visual`. This starts a localhost-only Next.js development server,
launches the existing Chrome executable in a separate headless session, and closes
both when finished. It never downloads a browser or touches your daily Chrome profile.

The default Chrome path is `C:/Program Files/Google/Chrome/Application/chrome.exe`.
Set `CHROME_PATH` to use another existing Chrome installation. No fallback browser is installed.

Screenshots, a clickable HTML gallery, server logs, and JSON results are written to
`coverage/visual/` (already ignored by Git). Set `VISUAL_OUTPUT` to retain another run.
Set `VISUAL_PORT` to change port 3198, or `VISUAL_BASE_URL` to test an already-running
server without starting/stopping one. Use a separate output folder for comparisons.

Coverage: Services, Solutions, Industries, Company, and all eight service details at
1440×1000, 768×1024 and 390×844, plus half-width/half-height viewports to test equivalent
200% browser-zoom reflow. This is not actual browser zoom or text-only enlargement.

Checks include full-page screenshots, viewport and text overflow, clipping, header
overlap, broken images, page errors, Services label wrapping, internal HTTP responses,
navigation, mobile-menu Escape/focus restoration/closing, body links and Contact CTAs.
No forms are submitted. Nonzero exit status means findings need review; screenshots
still require human visual inspection. These checks are not a complete accessibility
audit or automatic pixel-diff regression suite.

`playwright-core` is a development dependency only and is never imported by the app.
