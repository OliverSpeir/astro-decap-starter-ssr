/* eslint-disable */
var CustomPreview = createClass({
	render: function () {
		var entry = this.props.entry;

		// Render only the body
		return h("div", {}, this.props.widgetFor("body"));
	},
});

// Register the custom preview template for a specific collection
CMS.registerPreviewTemplate("blog", CustomPreview);
console.log("preview styles");
