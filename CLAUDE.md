Important: 
When any changes in Sitecore data are required: try to make changes using Sitecore MCP tools.
Once all Sitecore changes(adding/removing/updating) are done, use `dotnet sitecore ser pull` command to get latest changes.
Fallback to .yml files editing only if Sitecore MCP tools do not work. If you use approach on changing .yml files then `docker sitecore ser push` command should be called afterwards to sync local files with Sitecore.

# Rules
1. Use 	/~/icon/office/32x32/robot.png icon for all new and edited items
2. Astro is started in container in dev mode, no need to start it additionally or restart
3. Next.js is started in container in dev mode, no need to start it additionally or restart
4. Prefer Google Chrome DevTools MCP server to check results. Use curl or other options only as a fallback.
5. If there is present image field and you need test data, use images from /sitecore/media library/Project/Verticals/demo folder in media library. Get list of images and use the image that works.
6. Rendering context resolvers are located under /sitecore/system/Modules/Layout Service/Rendering Contents Resolvers. Use default "Datasource Resolver" {3DF775BF-3F56-446F-9D81-43DE64DA4DDA} for renderings that has one item as datasource. Use "Datasource Item And Children Resolver" {2401A891-9F1E-47A8-A0A3-3726059FEAFD} if datasource has multiple items located under the main one. 

7. Do not generate or manually change components factory. It is generated automatically.

# Skills and Commands

- `/project:sitecore-developer` - SitecoreAI development guidelines (configuration, resolvers, styling, page creation, adding renderings)
- `/project:create-sitecore-rendering` - Step-by-step guide for creating a new Sitecore rendering end-to-end (template, rendering item, placeholder settings, frontend component)
