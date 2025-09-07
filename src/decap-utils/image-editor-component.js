/* eslint-disable */
// @ts-nocheck

import { DECAP_IMAGE_CONFIG } from "./decap-customizations-config.js";
import { transformImagePath } from "./image-utils.js";

/**
 * Registers a custom image editor component for Decap CMS rich text editor
 * This only affects the markdown rich text editor, not form field image widgets
 */
export function registerImageEditorComponent() {
	if (typeof CMS === "undefined" || !CMS.registerEditorComponent) {
		return;
	}

	const { markdownImagePattern } = DECAP_IMAGE_CONFIG;

	CMS.registerEditorComponent({
		id: "image",
		label: "Image",
		fields: [
			{
				name: "src",
				label: "Image",
				widget: "image", // Use the regular image widget for file selection
			},
			{
				name: "alt",
				label: "Alt Text",
				widget: "string",
				required: false,
				default: "",
			},
		],
		// Pattern to match existing image markdown
		pattern: markdownImagePattern,
		fromBlock: function (match) {
			return {
				alt: match[1] || "",
				src: match[2] || "",
			};
		},
		toBlock: function (obj) {
			return "![" + (obj.alt || "") + "](" + (obj.src || "") + ")";
		},
		toPreview: function (obj) {
			const src = transformImagePath(obj.src || "");
			return (
				'<img src="' +
				src +
				'" alt="' +
				(obj.alt || "") +
				'" style="max-width: 100%; height: auto;" />'
			);
		},
	});

	console.log("✅ Image editor component registered for rich text editor");
}

/**
 * Initializes the image editor component when CMS is ready
 */
export function initializeImageEditorComponent() {
	// Try immediate registration
	registerImageEditorComponent();

	// Try again after delay in case CMS loads asynchronously
	setTimeout(registerImageEditorComponent, 1000);
}
