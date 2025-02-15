const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addCollection("coursesList", function (collectionApi) {
    const courseColl = collectionApi
      .getAll()
      .filter((item) => item.data.course);
    console.log(courseColl);
    return courseColl;
  });

  eleventyConfig.addPassthroughCopy("assets/");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("notes/assets");
  eleventyConfig.addPlugin(syntaxHighlight);
};
