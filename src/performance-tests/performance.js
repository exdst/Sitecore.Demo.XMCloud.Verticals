const fs = require("fs");
const spawnSync = require("child_process").spawnSync;
const lighthouseCli = require.resolve("lighthouse/cli");
const nextJsFinancialHost = "https://nextjs-sdeobysfus1adltgqnutq-financial.vercel.app";
const nextJsServicesHost = "https://nextjs-sdeobysfus1adltgqnutq-services.vercel.app";
const astroFinancialHost =
  "https://astro-zlyve5kyxe6tudsaeujbuw-financial.vercel.app";
const astroServicesHost =
  "https://astro-zlyve5kyxe6tudsaeujbuw-services.vercel.app";
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

  const nextJsAverageScore =
    nextJsResults.reduce((acc, result) => {
      return acc + result.categories.performance.score;
    }, 0) / nextJsResults.length;
  const nextJsAverageFCP =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["first-contentful-paint"].numericValue;
  }, 0) / nextJsResults.length;
  const nextJsAverageLCP =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["largest-contentful-paint"].numericValue;
  }, 0) / nextJsResults.length;
  const nextJsAverageSpeedIndex =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["speed-index"].numericValue;
  }, 0) / nextJsResults.length;

  const nextJsAverageFCPScore =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["first-contentful-paint"].score;
  }, 0) / nextJsResults.length;
  const nextJsAverageLCPScore =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["largest-contentful-paint"].score;
  }, 0) / nextJsResults.length;
  const nextJsAverageSpeedIndexScore =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["speed-index"].score;
  }, 0) / nextJsResults.length;
  const nextJsAverageTBT =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["total-blocking-time"].numericValue;
  }, 0) / nextJsResults.length;
  const nextJsAverageTBTScore =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["total-blocking-time"].score;
  }, 0) / nextJsResults.length;
  const nextJsAverageCLS =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["cumulative-layout-shift"].numericValue;
  }, 0) / nextJsResults.length;
  const nextJsAverageCLSScore =  nextJsResults.reduce((acc, result) => {
    return acc + result.audits["cumulative-layout-shift"].score;
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

  const astroAverageScore =
    astroResults.reduce((acc, result) => {
      return acc + result.categories.performance.score;
    }, 0) / astroResults.length;

  const astroAverageFCP =  astroResults.reduce((acc, result) => {
    return acc + result.audits["first-contentful-paint"].numericValue;
  }, 0) / astroResults.length;
  const astroAverageLCP =  astroResults.reduce((acc, result) => {
    return acc + result.audits["largest-contentful-paint"].numericValue;
  }, 0) / astroResults.length;
  const astroAverageSpeedIndex =  astroResults.reduce((acc, result) => {
    return acc + result.audits["speed-index"].numericValue;
  }, 0) / astroResults.length;

  const astroAverageFCPScore =  astroResults.reduce((acc, result) => {
    return acc + result.audits["first-contentful-paint"].score;
  }, 0) / astroResults.length;

  const astroAverageLCPScore =  astroResults.reduce((acc, result) => {
    return acc + result.audits["largest-contentful-paint"].score;
  }, 0) / astroResults.length;

  const astroAverageSpeedIndexScore =  astroResults.reduce((acc, result) => {
    return acc + result.audits["speed-index"].score;
  }, 0) / astroResults.length;

  const astroAverageTBT =  astroResults.reduce((acc, result) => {
    return acc + result.audits["total-blocking-time"].numericValue;
  }, 0) / astroResults.length;

  const astroAverageTBTScore =  astroResults.reduce((acc, result) => {
    return acc + result.audits["total-blocking-time"].score;
  }, 0) / astroResults.length;

  const astroAverageCLS =  astroResults.reduce((acc, result) => {
    return acc + result.audits["cumulative-layout-shift"].numericValue;
  }, 0) / astroResults.length;

  const astroAverageCLSScore =  astroResults.reduce((acc, result) => {
    return acc + result.audits["cumulative-layout-shift"].score;
  }, 0) / astroResults.length;

  console.log(`\n\n${website} ${path}`);
  console.log(`NextJs average performance score: ${nextJsAverageScore}`);
  console.log(`Astro average performance score: ${astroAverageScore}`);

  results.push({
    website,
    path,
    nextJsAverageScore: nextJsAverageScore,
    astroAverageScore: astroAverageScore,
    nextJsAverageFCP: nextJsAverageFCP,
    astroAverageFCP: astroAverageFCP,
    nextJsAverageLCP: nextJsAverageLCP,
    astroAverageLCP: astroAverageLCP,
    nextJsAverageSpeedIndex: nextJsAverageSpeedIndex,
    astroAverageSpeedIndex: astroAverageSpeedIndex,
    nextJsAverageFCPScore: nextJsAverageFCPScore,
    astroAverageFCPScore: astroAverageFCPScore,
    nextJsAverageLCPScore: nextJsAverageLCPScore,
    astroAverageLCPScore: astroAverageLCPScore,
    nextJsAverageSpeedIndexScore: nextJsAverageSpeedIndexScore,
    astroAverageSpeedIndexScore: astroAverageSpeedIndexScore,
    nextJsAverageTBT: nextJsAverageTBT,
    astroAverageTBT: astroAverageTBT,
    nextJsAverageTBTScore: nextJsAverageTBTScore,
    astroAverageTBTScore: astroAverageTBTScore,
    nextJsAverageCLS: nextJsAverageCLS,
    astroAverageCLS: astroAverageCLS,
    nextJsAverageCLSScore: nextJsAverageCLSScore,
    astroAverageCLSScore: astroAverageCLSScore,
  });
});

fs.writeFileSync("./data/results.json", JSON.stringify(results));
