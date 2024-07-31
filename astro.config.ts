import { defineConfig } from "astro/config";
import type { AstroUserConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

const config: AstroUserConfig = defineConfig({
	site: "https://example.com",
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
