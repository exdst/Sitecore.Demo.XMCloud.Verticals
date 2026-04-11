Create a new Sitecore rendering component end-to-end. Follow each step in order.

The user will provide: component name, fields, and optionally a Figma design reference.

## Step 1: Plan in Plan Mode

Before making any changes, enter **plan mode** and produce an implementation plan:

1. Enter plan mode (`ExitPlanMode` is used at the end to leave it - do not start work until the plan is approved)
2. Open the Figma design referenced by the user using the Figma MCP tools:
   - `mcp__figma__get_screenshot` - to see the visual design
   - `mcp__figma__get_design_context` - to read structural / layout context
   - `mcp__figma__get_variable_defs` - to capture exact colors, spacing, typography tokens
   - `mcp__figma__get_metadata` - if you need additional node info
3. Analyse the design and identify:
   - Component structure and layout
   - Required fields (Text, RichText, Image, Link, etc.) and their names
   - Datasource template shape (single item vs item + children)
   - Visual tokens to reproduce in SCSS (colors, font sizes, spacing, breakpoints)
   - Any responsive / interactive behavior visible in the design
4. If anything in the design is ambiguous or missing (field purpose, copy, breakpoints, asset sources, interaction states, etc.) **ask the user clarifying questions before proposing the plan**. Do not guess.
5. Produce a concrete plan covering Steps 3-9 below, including:
   - Proposed template name, path, sections and fields
   - Proposed rendering name, folder, and resolver choice
   - Proposed component file path and SCSS file path
   - Proposed test page name under `/sitecore/content/Verticals/Services/Home`

## Step 2: Confirm the Plan

Present the plan to the user and wait for explicit approval before exiting plan mode. Only after the user confirms, proceed with Step 3 onward.

## Step 3: Datasource Template Creation

Before rendering creation, the template must be created:

1. Template should be located under /sitecore/templates/Project/Verticals/Components path
2. Template should use /sitecore/templates/System/Templates/Template - {AB86861A-6030-46C5-B394-E8F99E8B87DB} template
3. Template fields should be created as child items under Template sections
4. Template field names should not use spaces
5. Template field display name and Title should use spaces
6. Template section should use /sitecore/templates/System/Templates/Template section - {E269FBB5-3750-427A-9149-7AA950B49301} template

After template is created, remember the ID and path - it will be used in subsequent steps.

## Step 4: Rendering Item Creation

1. Select appropriate folder under /sitecore/layout/Renderings/Project/Verticals {6630C97B-F037-4F1F-87BC-907C43F167D1}
2. Create item using /sitecore/templates/Foundation/JavaScript Services/Json Rendering - {04646A89-996F-4EE7-878A-FFDBF1F0EF0D} template
3. "Component Name" field is mandatory, it corresponds to file name without extension and without spaces
4. "Datasource Template" field is mandatory, it contains path to template created in Step 3
5. "Datasource Location" field is mandatory, it contains query:$site/*[@@name='Data']/*[@@templatename='VALUE']|query:$sharedSites/*[@@name='Data']/*[@@templatename='VALUE'], where VALUE is replaced by the proper template name
6. Placeholder field should be empty
7. Remember the rendering path and ID

## Step 5: Placeholder Settings Update

After rendering is created, it should be added to the list of available renderings:

1. Edit /sitecore/content/Verticals/Services/Presentation/Available Renderings/Page Content {86D8240D-04DB-4DAE-B147-A1D5955932E5} item, update Renderings field, add id of new rendering

## Step 6: Pull Sitecore Changes

Run `dotnet sitecore ser pull` to sync local files with Sitecore.

## Step 7: Create Frontend Component

1. Create the React/Next.js component file
2. Use Text, RichText, Image field components for inline editing support
3. Create SCSS styles under src/assets/sass/components/
4. Component should be wrapped with a full-width div
5. Component should be centered horizontally with auto margin
6. Follow existing component patterns in the project

## Step 8: Create Test Page

Create a test page so the new rendering can be previewed on the running Next.js site.

1. Create the test page under /sitecore/content/Verticals/Services/Home using /sitecore/templates/Project/Verticals/Pages/Content Page {1226C3C7-2D1F-48F5-87B4-C1DA459F05E5} template
2. Page name should clearly identify the rendering being tested (e.g. `test-<component-name>`)
3. Create a local Data child item under the test page using /sitecore/templates/Foundation/Experience Accelerator/Local Datasources/Page Data {1C82E550-EBCD-4E5D-8ABD-D50D0809541E} template (named `Data`)
4. Create the datasource item under the local `Data` folder using the template from Step 3
5. Fill datasource fields with realistic test values - prefer values taken directly from the Figma design. For image fields use images from /sitecore/media library/Project/Verticals/demo
6. Add the rendering to the page's `headless-main` placeholder using the `presentation-add-rendering-by-id` MCP tool
7. Configure the rendering to use the local datasource path `local:/Data/<datasource item name>`
8. Run `dotnet sitecore ser pull` after all Sitecore changes are done

## Step 9: Verify Against Figma Design

Once the test page is created it will be available on the Next.js website at:
`https://services.sxastarter.localhost/<path under Home>`
For example a page at `/sitecore/content/Verticals/Services/Home/test-hero` becomes `https://services.sxastarter.localhost/test-hero`.

Validate the rendering on the live page using Chrome DevTools MCP and iterate until it matches the Figma design:

1. Open the test page URL using Chrome DevTools MCP (`navigate_page` / `take_screenshot`)
2. Compare the rendered output side-by-side with the Figma design (use `mcp__figma__get_screenshot` / `get_design_context` / `get_variable_defs` for reference values like colors, spacing, typography)
3. If there are visual or structural differences, update the React component, SCSS styles, or datasource values to fix them
4. Reload the page in Chrome DevTools MCP and re-compare
5. Repeat steps 2-4 until the rendered page matches the Figma design

Do not consider the task complete until the test page in Chrome DevTools MCP visually matches the Figma design.

## Step 10: Write Summary

After the rendering matches the Figma design, output a final summary for the user covering:

1. **Template** - name, path, ID, sections and fields created
2. **Rendering** - name, path, ID, datasource template, datasource location
3. **Frontend component** - component file path and SCSS file path
4. **Test page** - Sitecore path and the live testing URL in the form `https://services.sxastarter.localhost/<path under Home>` (make this URL clearly visible so the user can click it)
5. **Datasource** - local datasource path and the test values used
6. **Figma reference** - link / node id of the design that was implemented

Keep the summary concise and scannable - bullet points, not prose.
