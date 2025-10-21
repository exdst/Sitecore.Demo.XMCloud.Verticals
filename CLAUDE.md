Important: 
When any changes in Sitecore data are required: try to make changes using Sitecore MCP tools.
Once all Sitecore changes(adding/removing/updating) are done, use `dotnet sitecore ser pull` command to get latest changes.
Fallback to .yml files editing only if Sitecore MCP tools do not work. If you use approach on changing .yml files then `docker sitecore ser push` command should be called afterwards to sync local files with Sitecore.

# Rules
1. Use 	/~/icon/office/32x32/robot.png icon for all new and edited items

# Sitecore configuration
1. Services Headless Astro website URL: https://services.sxastarter.localhost.astro/
2. Financial Headless Astro website URL: https://financial.sxastarter.localhost.astro/
3. Services Headless Next.js website URL: https://services.sxastarter.localhost/
4. Financial Headless Next.js website URL: https://financial.sxastarter.localhost/
5. Placeholder: each page has main placeholder: headless-main
6. Both Next.js and Astro websites shares the same Sitecore data
7. Services root path in Sitecore: /sitecore/content/Verticals/Services
8. Financial root path in Sitecore: /sitecore/content/Verticals/Financial

# Page creation
1. Use one of page templates, under: /sitecore/templates/Project/Verticals/Pages
2. Default choice for page creation is /sitecore/templates/Project/Verticals/Pages/Content Page {1226C3C7-2D1F-48F5-87B4-C1DA459F05E5}

# Adding rendering to page
1. Firstly, figure out template ID for rendering datasource. You need to get rendering item and read Datasource template field
2. If page doesn't have Data child item, it should be created. Use /sitecore/templates/Foundation/Experience Accelerator/Local Datasources/Page Data {1C82E550-EBCD-4E5D-8ABD-D50D0809541E} template fore it.
3. Datasource item should be created under the local Data folder. (Step 2)
4. Datasource fields should be filled with test values (preferably from Figma)
5. Rendering should be configured using local datasource "local:/Data/{datasource item name}"
6. Rendering should be added to headless-main placeholder by editing __Renderings field of the page

# Rendering creation

## Datasource template creation
Before rendering creation, template should be created
1. Template should be located under /sitecore/templates/Project/Verticals/Components path
2. Template should use 	/sitecore/templates/System/Templates/Template -  {AB86861A-6030-46C5-B394-E8F99E8B87DB} template
3. Template fields should be created as child items under Template sections
4. Template fields names should not use spaces
5. Template field display name and Title should use spaces
6. Template section should use /sitecore/templates/System/Templates/Template section - 
{E269FBB5-3750-427A-9149-7AA950B49301} template

After template is created, remember the ID and path, it will be used later

## Rendering creation
1. Select appropriate folder under /sitecore/layout/Renderings/Project/Verticals {6630C97B-F037-4F1F-87BC-907C43F167D1}
2. Create item using 	/sitecore/templates/Foundation/JavaScript Services/Json Rendering - 
{04646A89-996F-4EE7-878A-FFDBF1F0EF0D} template
3. "Component Name" field is mandatory, it corresponds to file name without extension and without spaces
4. "Datasource Template" field is mandatory, it contains path to template created before
5. "Datasource Location" field is mandatory, it contains query:$site/*[@@name='Data']/*[@@templatename='VALUE']|query:$sharedSites/*[@@name='Data']/*[@@templatename='VALUE'], where VALUE is replace by proper template name
6. Placeholder filed should be empty
7. Remember placeholder path and ID

## Placeholder settings update
After rendering is created, it should be added to the list of available rendering
1. Edit /sitecore/content/Verticals/Services/Presentation/Available Renderings/Page Content {86D8240D-04DB-4DAE-B147-A1D5955932E5} item, update Renderings field, add id of new rendering
2. Edit /sitecore/content/Verticals/Financial/Presentation/Available Renderings/Page Content {0D181447-7CA1-4661-9F55-D752460957B4}, add id of new rendering

# On any changes in Sitecore:
1. Run `dotnet sitecore ser pull` in console to pull latest changes

## Styling

1. New components should use the same approach that exist in the project
2. Styles should use SCSS and be located under the src/assets/sass/components/
3. Component should be wrapped with a full-width div
4. Component should be centered horizontally with auto margin

## Rendering

1. Rendering should use Text, RichText, Image field component. It allows inline editing.