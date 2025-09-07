/* eslint-disable */
// @ts-nocheck

import { DECAP_IMAGE_CONFIG } from "./decap-customizations-config.js";

/**
 * Transforms image paths from the source pattern to the target pattern
 * @param {string} path - The original image path
 * @returns {string} The transformed path for display
 */
export function transformImagePath(path) {
	if (!path || typeof path !== "string") {
		return path;
	}

	const { sourcePathPattern, targetPathPattern } = DECAP_IMAGE_CONFIG;

	// Transform src/assets/img/filename.png to /decap-images/filename.png
	if (path.includes(sourcePathPattern)) {
		// Create regex to replace the source path pattern
		const sourceRegex = new RegExp(sourcePathPattern.replace(/\//g, "\\/"), "g");
		const transformed = path.replace(sourceRegex, targetPathPattern.replace(/^\//, ""));

		// Ensure leading slash for proper URL resolution
		return transformed.startsWith("/") ? transformed : "/" + transformed;
	}

	return path;
}

/**
 * Transforms image elements in a preview DOM element
 * @param {HTMLElement} previewElement - The preview element to search for images
 */
export function transformImagesInPreview(previewElement) {
	if (!previewElement) return;

	const { sourcePathPattern } = DECAP_IMAGE_CONFIG;
	const images = previewElement.querySelectorAll(`img[src*="${sourcePathPattern}"]`);

	images.forEach(function (img) {
		img.src = transformImagePath(img.src);
	});
}
