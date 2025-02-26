# Fork of the official Sitecore Vertical Demos on XM Cloud to showcase Astro

A headless multi-site solution focused on XM Cloud content and site management capabilities. Includes easily customizable sample sites for select industries.

𝐍 Next.js implementation with minimal changes(only related to Docker) from Sitecore

🚀 **Astro** implementation based on [Astro JSS SDK](https://github.com/exdst/jss-astro-public).

✨ 42 beautiful custom components (React and Astro) - enough to build any site you can dream up

🌍 Multisite support (3 sites ready to go, and more can easily be added)

🇨🇦 Multilingual (English, French-Canadian, and Japanese)

🌓 Light and dark themes

🔗 Single rendering host (with some magic to make it work for completely different sites)

🎨 Custom component variants/styles

🎯 Embedded Personalization

📄 Seamless integration with Pages

▲ Vercel integration

🌐 140 pages

📈 Performance testing scripts (Lighthouse)

🧪 Automated UI testing scripts (Backstop.js)

You can deploy the demo in just a few clicks at [Sitecore Demo Portal](https://portal.sitecoredemo.com/), or use one of the quick starts below to run it locally.

## Quick start Astro (Sitecore Demo Portal)

1. Fork this repository or use this repository as a template to create your one
1. Login to the Sitecore Demo Portal   
1. Make sure that Sitecore Demo Portal has access to your GitHub account repositories
1. Create a new demo by clicking "Get a demo"
1. Select Vertical Demos as a template
1. Choose the name for the demo
1. Customize the GihHub source. Select the repository you have created.
1. Customize the Vercel connection. Add Vercel token
1. Customize environment variables. Set `VERCEL_PROJECT_FRAMEWORK` to `astro`.
1. Review the changes
1. Deploy the demo!

## Quick start Astro (front-end app)

This is the easier way to get started, as long as you have access to XM Cloud. It does not require Docker and should work on any operating system supported by Node (Mac, Windows, Linux).

1. Deploy the project to XM Cloud

1. Download (from XM Cloud Deploy app / Developer Settings tab) and add the `.env.local` file to your app folder.

1. `cd src/sxastarter-nextjs`

1. Install dependencies and run your app.

   ```ps1
   npm install
   npm run dev
   ```

   Open http://localhost:3000 with your browser to see the result.

## Quick start Next.js (front-end app)

This is the easier way to get started, as long as you have access to XM Cloud. It does not require Docker and should work on any operating system supported by Node (Mac, Windows, Linux).

1. Deploy the project to XM Cloud

1. Download (from XM Cloud Deploy app / Developer Settings tab) and add the `.env.local` file to your app folder.

1. If for some reason you don't have acces to XM Cloud Deploy app / Developer Settings tab, you can find required values in the configuration of Vercel project: Settings / Environment Variables / SITECORE_EDGE_CONTEXT_ID and SITECORE_SITE_NAME.

1. `cd src/sxastarter-nextjs`

1. Install dependencies and run your app.

   ```ps1
   npm install
   npm run start:connected
   ```

   Open http://localhost:3000 with your browser to see the result.

## Quick start (Docker)

This will work only on Windows and deploy all Content Management roles and interfaces, as well as front-end app in a container.

1. In an ADMIN terminal:

   ```ps1
   .\up.ps1
   ```

   Open https://www.sxastarter.localhost with your browser to see the front-end of the website. Content Management UI will be available at https://xmcloudcm.localhost

2. Go to `/sitecore/system/Modules/Layout Service/Rendering Contents Resolvers/Datasource Item Children Resolver` and uncheck the `Include Server URL in Media URLs` checkbox.

## Updating color palette

Go to the `src\sxastarter\src\assets\sass\abstracts\vars` and update the colors in the `_colors.scss` file. Note, that each site has it's own color set for both light and dark theme.

Note, that each site has a special `site-*` class, this allows to apply custom CSS the specific site(s).
