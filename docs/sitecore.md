# Rendering creation

## Datasource template creation
Before rendering creation, template should be created
1. Template should be located under /sitecore/templates/Project/Verticals/Components path
2. Template should use 	/sitecore/templates/System/Templates/Template -  {AB86861A-6030-46C5-B394-E8F99E8B87DB} template
3. Template fields should be created as child items under Template sections
4. Template section should use /sitecore/templates/System/Templates/Template section - 
{E269FBB5-3750-427A-9149-7AA950B49301} template

After template is created, remember the ID and path, it will be used later

## Rendering creation
1. Select appropriate folder under /sitecore/layout/Renderings/Project/Verticals {6630C97B-F037-4F1F-87BC-907C43F167D1}
2. Create item using 	/sitecore/templates/Foundation/JavaScript Services/Json Rendering - 
{04646A89-996F-4EE7-878A-FFDBF1F0EF0D} template
3. "Component Name" field is mandatory, it corresponds to file name without extension
4. "Datasource Template" field is mandatory, it contains path to template created before
5. "Datasource Location" field is mandatory, it contains query:$site/*[@@name='Data']/*[@@templatename='VALUE']|query:$sharedSites/*[@@name='Data']/*[@@templatename='VALUE'], where VALUE is replace by proper template name
6. Remember placeholder path and ID

## Placeholder settings update
After rendering is created, it should be added to the list of available rendering
1. Edit /sitecore/content/Verticals/Services/Presentation/Available Renderings/Page Content {86D8240D-04DB-4DAE-B147-A1D5955932E5} item, update Renderings field, add id of new rendering
2. Edit /sitecore/content/Verticals/Financial/Presentation/Available Renderings/Page Content {0D181447-7CA1-4661-9F55-D752460957B4}, add id of new rendering