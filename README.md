# Decap Starter

1. Set up GitHub OAuth app

On GitHub, go to Settings > Developer Settings > OAuth apps > New OAuth app. Or use this [direct link](https://github.com/settings/applications/new).

**Homepage URL**: This must be the prod URL of your application.

**Authorization callback URL**: This must be the prod URL of your application followed by `/oauth/callback`.

2. Set up your config

`/public/admin/config.yml`

- Need to change the `repo`, `sitename`, and `base_url`
- Can change the collections fields or media folder

3. Deploy to Cloudflare

- Add your `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET` environmental variables

4. Deploy to Vercel

- Switch the adapter to vercel
- Add your `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET` environmental variables

## How it works

- Hybrid SSR on Cloudlfare
- Github backend of Decap

  - This is why we need SSR
  - We create two endpoints used for auth ( `/oauth` and `/oauth/callback` )
- The decap admin board is preconfigured with preview styles built from the tailwind of our project and to only show the body in the preview ( personal preference of mine can be removed by removing the scripts in `/pages/admin.astro`)
- If you have a private repo you need to add anyone you want to be able to log into the CMS as a collaborator of the repo
- Tailwind typography for styling the blogs
  - Personally not a fan but I figured it was easy to use and remove

## WIP

This is a very rough WIP created very hastily

## Acknowledgements

https://github.com/dorukgezici/astro-decap-cms-oauth
