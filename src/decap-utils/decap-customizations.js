/* eslint-disable */
// @ts-nocheck

/**
 * Decap CMS Preview Templates and Image Handling
 *
 * This file registers custom preview templates that transform image paths
 * for proper display in the CMS preview. It works in conjunction with the
 * image editor component to provide a complete image handling solution.
 */

import { DECAP_IMAGE_CONFIG } from "./decap-customizations-config.js";
import { transformImagesInPreview } from "./image-utils.js";
import { initializeImageEditorComponent } from "./image-editor-component.js";

/**
 * Custom preview template that transforms image paths in the rendered preview
 * This ensures images display correctly in the CMS preview pane
 */
var CustomPreview = createClass({
	render: function () {
		var entry = this.props.entry;
		var body = this.props.widgetFor("body");

		return h(
			"div",
			{
				className: "prose",
				ref: function (el) {
					if (el) {
						// Transform all images with source path patterns
						transformImagesInPreview(el);
					}
				},
			},
			body,
		);
	},
});

/**
 * Registers preview templates for all configured collections
 */
function registerPreviewTemplates() {
	const { collections } = DECAP_IMAGE_CONFIG;

	collections.forEach(function (collectionName) {
		CMS.registerPreviewTemplate(collectionName, CustomPreview);
		console.log("✅ Preview template registered for collection:", collectionName);
	});
}

/**
 * Initialize all Decap CMS customizations when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
	// Register preview templates
	registerPreviewTemplates();

	// Initialize image editor component
	initializeImageEditorComponent();
});
