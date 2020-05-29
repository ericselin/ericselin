module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "css",
    "js",
    "html",
    "webmanifest",
  ]);
  eleventyConfig.addPassthroughCopy("CNAME");
};