export const prerender = false;
import type { APIRoute } from "astro";
import { OAUTH_GITHUB_CLIENT_ID } from "astro:env/server";

const authUrl = `https://github.com/login/oauth/authorize?client_id=${OAUTH_GITHUB_CLIENT_ID}&scope=repo,user`;

export const GET: APIRoute = ({ redirect }) => {
	return redirect(authUrl);
};
