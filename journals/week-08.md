# Week 8 (starting 22.2.2021)

## Monday - Doing tab

- [x] seo / plan next steps
  - [x] seo / research sitemap issue
    This is because the reima world contentful slug is shit. The url escaping makes it a 404, but since it's available as content it is visible in the sitemap. Just `noindex` and it'll be gone from the sitemap.
- [x] seo / research shopify 307 issue
- [x] seo / update frontmatter with seo index and description include template
- [x] seo / create script to update files with noindex attribute
  Did this by hand instead, but still
- [x] filters / add algolia indecies
- [x] filters / add filters to pages
- [ ] weight / plan next steps
  Not doing this now.

## Tuesday - Unification

Consolidate hosting and builds to Netlify. Check yarn packages and port over algolia updater. Check all workflows.

- [x] port algolia updater to deno
- [x] check jp workflows and test netlify
- [x] remove need for github token on frontmatter updating (public repo)
- [x] origin fetcher for `site-worker`
- [x] create qry string to cookie helper
- [x] test origin fetcher on demo subdomain
- [ ] test caching resources on netlify
- [ ] check na workflows, fix yarn root package.json, test netlify

DONE: Update algolia after netlify publish plugin
PROCESSED: Caching resources fetched from Netlify
PROCESSED: Collection importer from storefront api

## Wednesday - Optimal build infra for JP

- [x] `netlify-plugin-refresh-algolia` reima
  - [x] skeleton
  - [x] copy old code
  - [x] test plugin
- [x] `netlify-plugin-move-file` reima
- [x] `github-action-update-theme` reima
- [x] `github-action-import-products` reima

## Thursday - FBB Unifaun live

Add weight and deploy container.