// Run 'node generate-backstop-scenarios.js' to generate the backstop configuration.

const fs = require('fs');

const siteNames = ['financial', 'services'];

siteNames.forEach((siteName) => {

  const pathsData = JSON.parse(fs.readFileSync(`../data/${siteName}.json`));

  // The basic structure of the backstop.json
  const backstopConfig = {
    "id": "backstop_default",
    "viewports": [
      {
        "label": "phone",
        "width": 320,
        "height": 480
      },
      {
        "label": "tablet",
        "width": 1024,
        "height": 768
      },
      {
        "label": "desktop",
        "width": 1920,
        "height": 1080
      }
    ],
    "onBeforeScript": "puppet/onBefore.js",
    "onReadyScript": "puppet/onReady.js",
    "scenarios":
      pathsData.map((item) => ({
        "label": item.path,
        "cookiePath": "backstop_data/engine_scripts/new_cookies.json",
        "url": `http://localhost:3000${item.path}`,
        "referenceUrl": `https://${siteName}.sxastarter.localhost${item.path.split('?')[0]}`,
        "delay": 3000,
        "misMatchThreshold": 0.1,
        "requireSameDimensions": true
      }))
    ,
    "paths": {
      "bitmaps_reference": "backstop_data/bitmaps_reference",
      "bitmaps_test": "backstop_data/bitmaps_test",
      "engine_scripts": "backstop_data/engine_scripts",
      "html_report": "backstop_data/html_report",
      "ci_report": "backstop_data/ci_report"
    },
    "report": [
      "browser"
    ],
    "engine": "puppeteer",
    "engineOptions": {
      "args": [
        "--no-sandbox"
      ]
    },
    "asyncCaptureLimit": 5,
    "asyncCompareLimit": 50,
    "debug": false,
    "debugWindow": false
  };

  fs.writeFileSync(`../${siteName}/backstop.json`, JSON.stringify(backstopConfig, null, 2), 'utf8');

  console.log(`backstop.json has been generated for '${siteName}' site.`);
});