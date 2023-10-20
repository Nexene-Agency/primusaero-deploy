# Server-rendered content pages

The pages in this subdirectory will be rendered as static HTML/JS/CSS files
pages in the time of the deployment. Any non-server-side (stateful) component
references must be encapsulated in a `<Suspend>` boundary.

The pages here are subject of the nextintl middleware, which will handle the
multi-language issues.

Please note that the default layout should not contain anything else than
the Google Analytics and the Google Tag Manager scripts. Any other layouts
must be defined in the group routes (folders with names like `(....)`).