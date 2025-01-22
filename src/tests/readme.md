# Testing approach

We rely on the Next.js version of Verticals website. We use this website as a reference.
The easiest way of testing is visual comparison of screens.

Backstop.js tool was selected for visual regression testing.

## Generation of URLs

Use GraphQL Sitemap query to get required URLs and put them into `data\financial.json` and `data\services.json`

```
query DefaultSitemapQuery(
    $siteName: String!
    $language: String!
    $pageSize: Int = 10000
    $after: String
  ) {
    site {
      siteInfo(site: $siteName) {
        routes(
          language: $language
          first: $pageSize
          after: $after
        ){
          total
          pageInfo {
            endCursor
            hasNext
          }
          results {
            path: routePath
          }
        }
      }
    }
  }
```

## Generation of Backstop.js configuration

Before running tests, we need to update the Backstop.js configuration file with the URLs of the pages we want to test.

1. `cd scripts`
2. `node .\generateBackstopConfig.js`

It will generate Backstop.js configuration file `backstop.json` with the URLs from `data\financial.json` and `data\services.json`

## Running tests

1. `cd financial` or `cd services` depending on which site you want to test
2. `npm install -g backstopjs` It will install Backstop.js globally(if you haven't installed it yet).
3. `backstop reference` It will create reference screenshots
4. `backstop test` It will compare reference screenshots with the current ones

## Results

Web browser will open with the results of the tests. You can see the differences between the reference and the current screenshots.
