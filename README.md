# Decap Starter

1. Deploy your site so you can get the assigned URL
  
    If you plan to use a custom domain, you can set up the GitHub OAuth app directly.

2. Set up GitHub OAuth app

   On GitHub, go to `Settings > Developer Settings > OAuth apps > New OAuth app` or use this [direct link](https://github.com/settings/applications/new).

   **Homepage URL**: This must be the prod URL of your application.

   **Authorization callback URL**: This must be the prod URL of your application followed by `/oauth/callback`.

3. Set up your config

   `/public/admin/config.yml`

   - Need to change the `repo`, `sitename`, and `base_url`
   - Can change the collections fields or media folder

4. Update env vars and redeploy

   - Add your `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET` environmental variables to platform


## How it works

- Hybrid SSR on Vercel
- Github backend of Decap
  - This is why we need SSR
  - We create two endpoints used for auth ( `/oauth` and `/oauth/callback` )
- The decap admin board is preconfigured with preview styles built from the tailwind of our project and to only show the body in the preview (personal preferences of mine can be removed by removing the scripts in `/pages/admin.astro`)
- If you have a private repo, you need to add anyone you want to be able to log into the CMS as a collaborator of the repo
- Tailwind typography for styling the blogs
  - Personally not a fan, but I figured it was easy to use and remove

## Decap with netlify identity in astro

https://github.com/OliverSpeir/astro-decap-ssg-netlify-identity

## Acknowledgements

https://github.com/dorukgezici/astro-decap-cms-oauth
