# SriNidhi Engineers Website

The official SriNidhi Engineers company website, built with Astro, TypeScript, and CSS. It is a static, responsive website containing:

- Home
- About Us
- Completed Projects
- Our Expertise
- Client List
- Connect With Us
- Privacy Notice
- Custom 404 page

The Completed Projects page contains 55 photographs organised into Mechanical Works, MS/SS Piping and Equipments, Civil Works, SS Drains and Gratings, and Paint Shop Installation Work.

## Project structure

```text
.
|-- public/
|   |-- images/
|   |   `-- work/
|   |-- _headers
|   |-- favicon.png
|   `-- favicon.svg
|-- src/
|   |-- components/
|   |-- data/
|   |-- layouts/
|   |-- pages/
|   |-- scripts/
|   `-- styles/
|-- .env.example
|-- .gitignore
|-- astro.config.mjs
|-- package.json
|-- pnpm-lock.yaml
|-- pnpm-workspace.yaml
|-- README.md
`-- tsconfig.json
```

## Local development

Install Node.js 22.12 or newer and pnpm 11.19 or newer.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:4321` in a browser.

## Production build

```sh
pnpm build
pnpm preview
```

Astro writes the static production website to `dist/`. The site does not require an application server or database.

## Environment variables

Copy `.env.example` to `.env` when you need to override deployment settings.

```env
PUBLIC_SITE_URL=https://example.com
PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

`PUBLIC_SITE_URL` should be the final website origin without a trailing path. The enquiry form contains the currently configured public Web3Forms access key and supports an environment-variable override.

## Deploy from GitHub

Upload the contents of this folder to the root of a GitHub repository. For Cloudflare Pages, Vercel, Netlify, or another Astro-compatible static host, use:

- Build command: `pnpm build`
- Output directory: `dist`
- Node.js version: 22.12 or newer
- Environment variable: `PUBLIC_SITE_URL`

After deployment, submit one test enquiry and confirm it reaches `essn2020@gmail.com`.

## Editing content

- Company details and contact address: `src/data/company.ts`
- Client list: `src/data/clients.ts`
- Completed-work galleries: `src/data/work.ts`
- Page templates: `src/pages/`
- Shared layout and navigation: `src/layouts/Layout.astro`
- Website styling: `src/styles/global.css`
- Images: `public/images/`

Do not commit `.env`, `node_modules/`, `.astro/`, or `dist/`; they are excluded by `.gitignore`.
