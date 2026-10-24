import { defineConfig } from 'astro/config';

// Astro does not load .env into process.env for this config file, so load it here.
// Variables already set by the host (e.g. Cloudflare) take precedence.
try { process.loadEnvFile(); } catch {}

const site = process.env.PUBLIC_SITE_URL?.trim();

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  ...(site ? { site } : {}),
});
