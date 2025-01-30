const fs = require("fs");
const spawnSync = require("child_process").spawnSync;
const lighthouseCli = require.resolve("lighthouse/cli");
const nextJsFinancialHost = "https://xmc-us4oyb-financial.sitecoredemo.com";
const nextJsServicesHost = "https://xmc-us4oyb-services.sitecoredemo.com";
const astroFinancialHost =
  "https://main-dfmhtpb5mu6rhugmetmedg-financial.vercel.app";
const astroServicesHost =
  "https://main-dfmhtpb5mu6rhugmetmedg-services.vercel.app";
const amountOfRequestInTest = 5;

const financialPaths = JSON.parse(fs.readFileSync(`./data/financial.json`));
const servicesPaths = JSON.parse(fs.readFileSync(`./data/services.json`));

financialUrls = [];

financialPaths.forEach((path) => {
  const nextJsUrl = `${nextJsFinancialHost}${path.path}`;
  const astroUrl = `${astroFinancialHost}${path.path}`;
  financialUrls.push([path.path, nextJsUrl, astroUrl, "Financial"]);
});

servicesUrls = [];
servicesPaths.forEach((path) => {
  const nextJsUrl = `${nextJsServicesHost}${path.path}`;
  const astroUrl = `${astroServicesHost}${path.path}`;
  servicesUrls.push([path.path, nextJsUrl, astroUrl, "Services"]);
});

const urls = financialUrls.concat(servicesUrls);

const results = [];

fs.writeFileSync("./data/results.json", JSON.stringify(results));

urls.forEach((url) => {
  const path = url[0];
  const nextJsUrl = url[1];
  const astroUrl = url[2];
  const website = url[3];

  // run first requtest to make sure that Vercel ISR cache is populated
  const firstRequest = require("sync-request");
  const firstNextJsResponse = firstRequest("GET", nextJsUrl);
  const firstAstroResponse = firstRequest("GET", astroUrl);

  const nextJsResults = [];
  for (let i = 0; i < amountOfRequestInTest; i++) {
    const { status = -1, stdout } = spawnSync("node", [
      lighthouseCli,
      nextJsUrl,
      "--output=json",
      '--chrome-flags="--headless"',
    ]);
    if (status !== 0) {
      console.log("Lighthouse failed, skipping run...");
      continue;
    }

    fs.writeFileSync(`./data/nextjs/${website}${path.replaceAll("/","-")}-${i}.json`, stdout);

    nextJsResults.push(JSON.parse(stdout));
  }

  const nextJsAverage =
    nextJsResults.reduce((acc, result) => {
      return acc + result.categories.performance.score;
    }, 0) / nextJsResults.length;

  const astroResults = [];

  for (let i = 0; i < amountOfRequestInTest; i++) {
    const { status = -1, stdout } = spawnSync("node", [
      lighthouseCli,
      astroUrl,
      "--output=json",
      '--chrome-flags="--headless"',
    ]);
    if (status !== 0) {
      console.log("Lighthouse failed, skipping run...");
      continue;
    }

    fs.writeFileSync(`./data/astro/${website}-${path.replaceAll("/","-")}-${i}.json`, stdout);

    astroResults.push(JSON.parse(stdout));
  }

  const astroAverage =
    astroResults.reduce((acc, result) => {
      return acc + result.categories.performance.score;
    }, 0) / astroResults.length;

  console.log(`\n\n${website} ${path}`);
  console.log(`NextJs average performance score: ${nextJsAverage}`);
  console.log(`Astro average performance score: ${astroAverage}`);

  results.push({
    website,
    path,
    nextJsAverage,
    astroAverage,
  });
});

fs.writeFileSync("./data/results.json", JSON.stringify(results));
