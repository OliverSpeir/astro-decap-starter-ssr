import { defineConfig } from "astro/config";
import type { AstroUserConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

const config: AstroUserConfig = defineConfig({
	site: "https://astro-decap-starter-ssr-git-update-oliverspeirs-projects.vercel.app/",
	output: "hybrid",
	adapter: vercel(),
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
	],
});

// https://astro.build/config
export default defineConfig(config);
