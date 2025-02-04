module.exports = async (
  page,
  scenario,
  viewport,
  isReference,
  browserContext
) => {
  console.log("SCENARIO > " + scenario.label);
  await require("./clickAndHoverHelper")(page, scenario);
  await page.evaluate((scenario) => {
    /** force load lazy images */
    const lazyImages = document.querySelectorAll('img[loading="lazy"');
    lazyImages.forEach((i) => {
      i.removeAttribute("loading");
    });
  }, scenario);
  await new Promise(r => setTimeout(r, 1000));
};
