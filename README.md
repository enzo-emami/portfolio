# emamienzo — portfolio

Single-file portfolio site. No build step, no dependencies: `index.html` + `assets/`.

## One-time setup (before first push)

The four project PDFs are already in `assets/`. The images and resume still live
on the old Wix CDN — pull them down so the site is fully self-hosted:

```bash
bash fetch_assets.sh
```

This downloads ~18 images + `resume.pdf` into `assets/` (safe to re-run; it
skips files that already exist). Do this **before** deleting the Wix site.

## Deploy

Any static host works:

- **GitHub Pages** — push, then Settings → Pages → deploy from branch (root).
- **Vercel / Netlify** — import the repo, no build command, output dir `.`.

Then point `emamienzo.com` at it.

## Editing content

All project copy, images, tags, and links live in one place: the `projects` and
`community` arrays at the top of the `<script>` block in `index.html`. Each entry:

```js
{
  id: "...",           // unique, used to open the modal
  title, year, cats,   // cats drive the filter buttons
  img, modalImg,       // paths under assets/ — set to null for the
                       // "media pending" placeholder (TBD, RAHIP)
  blurb, tags, meta,   // hover card + modal header
  text: [...],         // modal paragraphs
  video,               // optional YouTube embed URL (see FRC)
  links: [...]         // modal buttons (PDFs, external sites)
}
```

To replace a placeholder: drop the image in `assets/`, set `img`/`modalImg`.

## Still TODO

- RAHIP: expand modal text with outcome details (see the TODO comment in the
  data array).
- Replace `assets/resume.pdf` with new versions as they ship — every resume
  button points at that one path.
