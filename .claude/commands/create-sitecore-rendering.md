Create a new Sitecore rendering component end-to-end. Follow each step in order.

The user will provide: component name, fields, and optionally a Figma design reference.

## Step 1: Datasource Template Creation

Before rendering creation, the template must be created:

1. Template should be located under /sitecore/templates/Project/Verticals/Components path
2. Template should use /sitecore/templates/System/Templates/Template - {AB86861A-6030-46C5-B394-E8F99E8B87DB} template
3. Template fields should be created as child items under Template sections
4. Template field names should not use spaces
5. Template field display name and Title should use spaces
6. Template section should use /sitecore/templates/System/Templates/Template section - {E269FBB5-3750-427A-9149-7AA950B49301} template

After template is created, remember the ID and path - it will be used in subsequent steps.

## Step 2: Rendering Item Creation

1. Select appropriate folder under /sitecore/layout/Renderings/Project/Verticals {6630C97B-F037-4F1F-87BC-907C43F167D1}
2. Create item using /sitecore/templates/Foundation/JavaScript Services/Json Rendering - {04646A89-996F-4EE7-878A-FFDBF1F0EF0D} template
3. "Component Name" field is mandatory, it corresponds to file name without extension and without spaces
4. "Datasource Template" field is mandatory, it contains path to template created in Step 1
5. "Datasource Location" field is mandatory, it contains query:$site/*[@@name='Data']/*[@@templatename='VALUE']|query:$sharedSites/*[@@name='Data']/*[@@templatename='VALUE'], where VALUE is replaced by the proper template name
6. Placeholder field should be empty
7. Remember the rendering path and ID

## Step 3: Placeholder Settings Update

After rendering is created, it should be added to the list of available renderings:

1. Edit /sitecore/content/Verticals/Services/Presentation/Available Renderings/Page Content {86D8240D-04DB-4DAE-B147-A1D5955932E5} item, update Renderings field, add id of new rendering
2. Edit /sitecore/content/Verticals/Financial/Presentation/Available Renderings/Page Content {0D181447-7CA1-4661-9F55-D752460957B4}, add id of new rendering

## Step 4: Pull Sitecore Changes

Run `dotnet sitecore ser pull` to sync local files with Sitecore.

## Step 5: Create Frontend Component

1. Create the React/Next.js component file
2. Use Text, RichText, Image field components for inline editing support
3. Create SCSS styles under src/assets/sass/components/
4. Component should be wrapped with a full-width div
5. Component should be centered horizontally with auto margin
6. Follow existing component patterns in the project

## Step 6: Verify

Use Chrome DevTools MCP to verify the component renders correctly on the page.
