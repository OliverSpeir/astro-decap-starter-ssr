# Decap Starter

1. Set up GitHub OAuth app

   On GitHub, go to `Settings > Developer Settings > OAuth apps > New OAuth app` or use this [direct link](https://github.com/settings/applications/new).

   **Homepage URL**: This must be the prod URL of your application. You can use `localhost:4321` during dev if you want.

   **Authorization callback URL**: This must be the prod URL of your application followed by `/oauth/callback`.

2. Set up your config

   `/public/admin/config.yml`

   - Need to change the `repo`, `sitename`, and `base_url`
   - Can change the collections fields or media folder

3. Update env vars
   - Add your `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET` environmental variables to platform and `.env` file

## How it works

- Github backend of Decap
  - We create two endpoints used for auth ( `/oauth` and `/oauth/callback` )
  - Your endpoints are ["on demand"](https://docs.astro.build/en/guides/on-demand-rendering/) endpoints from astro, but your site can remain static.
- If you have a private repo, you need to add anyone you want to be able to log into the CMS as a collaborator of the repo

The Oauth endpoints we create are also responsible for error handling, you should update the error handling on line 53 of [callback.ts](./src/pages/oauth/callback.ts)

## Decap customizations

I use [these Decap customizations](./src/decap-utils/decap-customizations.js) for Decap because they provide better preview functionality and image handling. We also add [public/preview.css](./public/preview.css) to style the preview the same as our blog route, and this relies on using the `build:tailwind` or `dev:tailwind` scripts to generate the CSS. The preview component classes should match the classes used in your blog route. If you don't want to use Tailwind, you can just add your own CSS to `public/global.css` and change the classes in the preview component. You'll need to keep the css in sync with your blog route manually in that case.

**Configuration:** You can configure the image path transformations and other behavior in [decap-customizations-config.js](./src/decap-utils/decap-customizations-config.js). Currently, this setup uses hardcoded URL transforms in the editor component, so you'll need to update the path patterns in that file if you change your image folder structure.

### Image handling

This setup handles images in a way that provides both Astro optimization and working DecapCMS previews:

- **DecapCMS saves images** to `src/assets/img/` (the `media_folder`)
- **DecapCMS references images** as `src/assets/img/` in markdown content for Astro optimization
- [`vite-plugin-static-copy`](https://www.npmjs.com/package/vite-plugin-static-copy) copies images from `src/assets/img/` to `public/decap-images/` during build for public serving
- [Custom Decap components](./src/decap-utils/decap-customizations.js) transform `src/assets/img/` paths to `/decap-images/` for DecapCMS preview display

**Why this works:**

- Astro can import and optimize images from `src/assets/img/` paths in markdown content
- DecapCMS previews need public URLs, so the preview component transforms paths to `/decap-images/`
- The vite plugin ensures images are available at `/decap-images/` for both preview and production serving

**Important:** This setup requires `"baseUrl": "."` and `"paths": {"src/*": ["src/*"]}` in your `tsconfig.json` for proper path resolution in markdown content.

## TO DO

Make the decap-utils `.ts`, it's not too hard, I just haven't done it yet. Ideally you won't need to mess with this much at all though.

## Acknowledgements

https://github.com/dorukgezici/astro-decap-cms-oauth
