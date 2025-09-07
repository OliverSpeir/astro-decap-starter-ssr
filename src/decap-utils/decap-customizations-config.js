/* eslint-disable */
// @ts-nocheck

/**
 * Configuration for Decap CMS image handling
 * Customize these values to change how images are processed and served
 */
export const DECAP_IMAGE_CONFIG = {
	/**
	 * Pattern to match in markdown for source images
	 * This is where Decap saves images in your project
	 */
	sourcePathPattern: "src/assets/img/",

	/**
	 * Target path for transformed images
	 * This is where your static server serves the images from
	 * Must include leading slash for proper URL resolution
	 */
	targetPathPattern: "/decap-images/",

	/**
	 * Collections that should use the custom image handling
	 * Add collection names to this array
	 */
	collections: ["blog"],

	/**
	 * Regex pattern to match existing image markdown
	 * Format: ![alt text](image path)
	 */
	markdownImagePattern: /!\[([^\]]*)\]\(([^)]+)\)/,
};
