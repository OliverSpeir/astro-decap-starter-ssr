import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
	site: "http://localhost:4321",
	env: {
		schema: {
			OAUTH_GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
			OAUTH_GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret" }),
		},
	},
	vite: {
		plugins: [
			tailwindcss(),
			viteStaticCopy({
				targets: [
					{
						src: "src/assets/img/*",
						dest: "decap-images",
					},
				],
			}),
		],
	},
	adapter: node({
		mode: "standalone",
	}),
});
