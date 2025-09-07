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

## Decap preview customization

I [this custom preview component](./src/assets/utils/preview.js) for Decap because I think it looks better. We also add [public/global.css](./public/global.css) to style the preview the same as our blog route, and this relies on using the `build:tailwind` or `dev:tailwind` scripts to generate the CSS. The preview component classes should match the classes used in your blog route. If you don't want to use Tailwind, you can just add your own CSS to `public/global.css` and change the classes in the preview component. You'll need to keep the css in sync with your blog route manually in that case.

## Acknowledgements

https://github.com/dorukgezici/astro-decap-cms-oauth
