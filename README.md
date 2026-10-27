# Vincent Vo — Personal Portfolio

A responsive, data-driven personal portfolio for Vincent Vo. The site is built with semantic HTML, modern CSS, and vanilla JavaScript modules. It has no framework, package dependency, build command, or generated output, so the repository root can be published directly with GitHub Pages.

## Features

- Light and dark themes that follow the system setting by default and remember a manual choice
- Responsive layouts for mobile, tablet, and desktop
- Accessible navigation, search, filters, focus states, and reduced-motion support
- Experience timeline, filterable project cards, and searchable news updates
- Query-string project detail pages such as `?project=maestrom`
- MBTA Green Line-inspired scroll progress rail on desktop and compact top progress bar on mobile
- Open Graph, Twitter card, meta description, SVG favicon, and a custom 404 page

## Project structure

```text
.
├── index.html              # Static document shell and sharing metadata
├── index.js                # Data loading and route selection
├── data.json               # All portfolio content
├── styles.css              # Themes, layout, components, and responsive styles
├── 404.html                # GitHub Pages error page
├── favicon.svg             # VV monogram favicon
├── components/             # Vanilla rendering and interaction modules
└── images                  # Project and profile assets stored at the repo root
```

`data.json` is the single source of truth for profile details, experience, projects, and news. Add or edit content there rather than hard-coding it into a component. A project can leave `cardImage` and `detailImage` empty to use the generated maroon-to-gold typographic cover. Add a repository URL to a project's `repo` field to show its GitHub button.

## Run locally

Because the app fetches `data.json`, open it through a local HTTP server rather than directly with `file://`.

From the repository root, run:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). No `npm install` or build step is needed.

Useful project routes:

- `http://localhost:8000/?project=maestrom`
- `http://localhost:8000/?project=butterfly-effect`
- `http://localhost:8000/?project=quantify`
- `http://localhost:8000/?project=ecolocate`

## Publish with GitHub Pages

In the repository settings, enable GitHub Pages from the repository's default branch and select the root (`/`) folder. GitHub Pages will serve `index.html` and use `404.html` automatically.

The Resume button points to `resume.pdf` at the repository root. Add that file before publishing.
