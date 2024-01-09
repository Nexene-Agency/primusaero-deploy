# PRIMUS AERO Website

Website made with NextJS 14 and TailwindCSS, using Google Firebase [and Algolia Search] as backend.

## Development

1. Check out the development branch from [GitHub](https://github.com/NexeneAgency/vanlifezone-website.git)
1. Install dependencies: `npm install`
1. Ask one of the admins (preferable Viktor) for the `.env` file containing the credentials
1. Start the dev server: `npm run dev`

### Branching

Please do not commit directly to the `development` branch. Create your own feature/bugfix branch,
do the work, then commit and create a pull request to merge it into `development`. One of the admins (usually Viktor)
will check the code and merge it into `development`.

The `development` branch is immediately deployed to Vercel.

Before committing your branch, please checht that the `npm run build` command runs without errors. If
not, then fix the problems, if you cannot fix it in a reasonable time, then contact one of the
admins (preferably Viktor) for help. Please note that the warnings you can ignore safely.

## Test deployment

[https://primusaero-dev.vercel.app/](https://primusaero-dev.vercel.app/)
