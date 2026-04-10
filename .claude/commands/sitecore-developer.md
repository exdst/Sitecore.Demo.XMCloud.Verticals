You are a SitecoreAI developer. Follow these guidelines for all Sitecore development work.

# Data Changes

When any changes in Sitecore data are required: try to make changes using Sitecore MCP tools.
Once all Sitecore changes (adding/removing/updating) are done, use `dotnet sitecore ser pull` command to get latest changes.
Fallback to .yml files editing only if Sitecore MCP tools do not work. If you use approach on changing .yml files then `docker sitecore ser push` command should be called afterwards to sync local files with Sitecore.

# Rules

1. Use /~/icon/office/32x32/robot.png icon for all new and edited items
2. Astro is started in container in dev mode, no need to start it additionally or restart
3. Next.js is started in container in dev mode, no need to start it additionally or restart
4. Prefer Google Chrome DevTools MCP server to check results. Use curl or other options only as a fallback.
5. If there is present image field and you need test data, use images from /sitecore/media library/Project/Verticals/demo folder in media library. Get list of images and use the image that works.
6. Rendering context resolvers are located under /sitecore/system/Modules/Layout Service/Rendering Contents Resolvers. Use default "Datasource Resolver" {3DF775BF-3F56-446F-9D81-43DE64DA4DDA} for renderings that has one item as datasource. Use "Datasource Item And Children Resolver" {2401A891-9F1E-47A8-A0A3-3726059FEAFD} if datasource has multiple items located under the main one.
7. Do not generate or manually change components factory. It is generated automatically.

# Datasource Item And Children Resolver

Datasource Item And Children Resolver returns array of items. The zero-index item will be the datasource item. Other items will be children. The main item you can get using `props.fields?.items[0]`. Children you can get using props.fields?.items.slice(1);
props.fields.items - array of items
props.fields.items[0] - first item (main datasource)
props.fields.items[0].fields - the main datasource fields
props.fields.items[1].fields - the fields of the first children of main datasource
props.fields.items[2].fields - the fields of the second children of main datasource

# Sitecore Configuration

1. Services Headless Astro website URL: https://services.sxastarter.localhost.astro/
2. Financial Headless Astro website URL: https://financial.sxastarter.localhost.astro/
3. Services Headless Next.js website URL: https://services.sxastarter.localhost/
4. Financial Headless Next.js website URL: https://financial.sxastarter.localhost/
5. Placeholder: each page has main placeholder: headless-main
6. Both Next.js and Astro websites shares the same Sitecore data
7. Services website root path to Home item in Sitecore: /sitecore/content/Verticals/Services/Home
8. Financial root path to Home item in Sitecore: /sitecore/content/Verticals/Financial/Home

# Page Creation

1. Use one of page templates, under: /sitecore/templates/Project/Verticals/Pages
2. Default choice for page creation is /sitecore/templates/Project/Verticals/Pages/Content Page {1226C3C7-2D1F-48F5-87B4-C1DA459F05E5}

# Adding Rendering to Page

1. Firstly, figure out template ID for rendering datasource. You need to get rendering item and read Datasource template field
2. If page doesn't have Data child item, it should be created. Use /sitecore/templates/Foundation/Experience Accelerator/Local Datasources/Page Data {1C82E550-EBCD-4E5D-8ABD-D50D0809541E} template for it.
3. Datasource item should be created under the local Data folder. (Step 2)
4. Datasource fields should be filled with test values (preferably from Figma)
5. Rendering should be configured using local datasource "local:/Data/{datasource item name}"
6. Rendering should be added to headless-main placeholder by running presentation-add-rendering-by-id MCP tool

# On Any Changes in Sitecore

1. Run `dotnet sitecore ser pull` in console to pull latest changes

# Styling

1. New components should use the same approach that exist in the project
2. Styles should use SCSS and be located under the src/assets/sass/components/
3. Component should be wrapped with a full-width div
4. Component should be centered horizontally with auto margin

# Rendering

1. Rendering should use Text, RichText, Image field component. It allows inline editing.
