# GHC Website

## Structure
- `index.html` — cinematic 3D welcome / intro page (GitHub Pages entry point)
- `home.html` — original GHC main website, preserved and linked after the intro
- `about.html`, `events.html`, `categories.html`, `teams.html`, `gallery.html`, `contact.html` — separate navigation pages
- `assets/` — GHC logo
- `css/` and `js/` — original website styles and scripts

## Deploy on GitHub Pages
1. Upload the contents of this folder to the root of your repository (not the enclosing ZIP folder).
2. Keep `index.html`, `home.html`, `assets/`, `css/`, and `js/` at the repository root.
3. In GitHub, open **Settings → Pages** and deploy from the branch/folder you use (usually `main` / `/root`).
4. Visit the site. The cinematic intro opens first; select **Enter the Experience** to open the existing site.

The intro uses Three.js r128-compatible geometry. If WebGL or the CDN is unavailable, it runs an animated 2D tunnel fallback; it should not show a blank screen.

\n## Intro animation and page transition\n- The tunnel animation now loops continuously; its travel speed is no longer capped.\n- Clicking Enter Experience accelerates the pod, triggers a cyan warp-ring transition, and opens `home.html`.\n- The homepage performs a matching dark aperture reveal, avoiding a white flash between documents.\n- Skip Intro uses the same transition so both entry paths behave consistently.\n\n\nLatest polish: corrected the official name to Global Hyperloop Competition, increased text contrast, removed the washed-out launch fade, and shortened the warp transition.\n