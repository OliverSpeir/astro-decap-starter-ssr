import { defineConfig } from "astro/config";
import type { AstroUserConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
const config: AstroUserConfig = defineConfig({
	site: "https://astro-decap-starter-ssr.pages.dev/",
	output: "hybrid",
	adapter: cloudflare(),
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
	],
});

// https://astro.build/config
export default defineConfig(config);
