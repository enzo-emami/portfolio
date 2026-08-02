# emamienzo — portfolio

Vite + React + TypeScript + Tailwind CSS (shadcn project structure). Hero background is an
interactive Three.js shader (`src/components/ui/shader-animation.tsx`) that reacts to cursor hover.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # type-checks + outputs to dist/
npm run preview # serve the production build locally
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the app and publishes it to
GitHub Pages via GitHub's Actions integration. In the repo's **Settings → Pages**, "Source" must be
set to **GitHub Actions** (not "Deploy from a branch") for this to take effect.

The Vite `base` in `vite.config.ts` is set to `/portfolio/` to match this repo's Pages URL
(`https://enzo-emami.github.io/portfolio/`) — update it if the site ever moves to a custom domain
or root-level Pages URL.

## Editing content

All project copy, images, tags, and links live in `src/data/projects.ts` (`projects` and
`community` arrays). Each entry:

```ts
{
  id: "...",           // unique, used to open the modal
  title, year, cats,   // cats drive the filter buttons
  img, modalImg,       // paths under public/assets/ — set to null for the
                        // "media pending" placeholder
  blurb, tags, meta,   // hover card + modal header
  text: [...],         // modal paragraphs
  video,                // optional YouTube embed URL (see FRC)
  links: [...]          // modal buttons (PDFs, external sites)
}
```

To replace a placeholder: drop the image in `public/assets/`, set `img`/`modalImg`.
