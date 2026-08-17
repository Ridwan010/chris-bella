# Chrisbella Verify Concept

An independent, interactive product-authentication and digital-ownership concept. This repository is configured for automatic deployment to GitHub Pages.

> This is a demonstration using sample data. It is not an official Chrisbella service and does not store personal information.

## Run locally

Requirements: Node.js 22 or later.

```bash
npm install
npm run dev
```

Open the local address printed by Vite.

## Demo paths

- Authentic product: `CB-2026-000184`
- Suspicious product: `CB-2026-009999`
- Any other value: unrecognised product
- Select **Brand portal** to open the operations dashboard.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `chrisbella-verify`.
2. Upload all files from this folder to the repository's `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Open the repository's **Actions** tab and wait for **Deploy to GitHub Pages** to finish.
6. GitHub will show the public website URL in **Settings → Pages**.

The included workflow builds and publishes the site automatically whenever you push to `main`.

## Connect a custom subdomain

For a hostname such as `verify.example.com`:

1. In **Settings → Pages → Custom domain**, enter `verify.example.com` and select **Save**.
2. At your DNS provider, create this record:

   | Type | Host | Target |
   | --- | --- | --- |
   | CNAME | `verify` | `YOUR-GITHUB-USERNAME.github.io` |

3. Do not include the repository name in the CNAME target.
4. Wait for DNS verification, then enable **Enforce HTTPS** in GitHub Pages.

For the GitHub account `Ridwan010`, the CNAME target would be `ridwan010.github.io`.

## Important limitation

GitHub Pages only hosts static frontend files. This prototype works because its data and interactions are demonstrations in the browser. A production authenticity platform will require a backend API, database, authentication, secure serial generation, audit logging and ownership-transfer validation.
