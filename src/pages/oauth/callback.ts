export const prerender = false;
import type { APIRoute } from "astro";
import { OAUTH_GITHUB_CLIENT_ID, OAUTH_GITHUB_CLIENT_SECRET } from "astro:env/server";

const tokenUrl = "https://github.com/login/oauth/access_token";

export const GET: APIRoute = async ({ url, redirect }) => {
	const data = {
		code: url.searchParams.get("code"),
		client_id: OAUTH_GITHUB_CLIENT_ID,
		client_secret: OAUTH_GITHUB_CLIENT_SECRET,
	};

	let script;

	try {
		const response = await fetch(tokenUrl, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${String(response.status)}`);
		}

		const body = (await response.json()) as { access_token: string };

		const content = {
			token: body.access_token,
			provider: "github",
		};

		// This is what talks to the DecapCMS page.
		// Using window.postMessage we give it the token details in a format it's expecting
		script = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:${content.provider}:success:${JSON.stringify(content)}',
            message.origin
          );

          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);

        window.opener.postMessage("authorizing:${content.provider}", "*");
      </script>
    `;

		return new Response(script, {
			headers: { "Content-Type": "text/html" },
		});
	} catch (err) {
		// If we hit an error we'll handle that here
		console.log(err);
		return redirect("/?error=😡");
	}
};
