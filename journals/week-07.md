# Week 7 (starting 15.2.2021)

## Monday - AB testing day

**OBT: Klarna banner test live**

Remember to write today i learned if there is something important to learn!

- [x] make cart endpoint in JSON
- [x] make domain checkout type
- [x] demo cf worker
  - [x] create cf worker for demo
  - [x] make publish workflow
  - [x] make cart route for demo
- [x] make proxy for using cart
- [x] use new endpoint in theme
  - [x] rewrite client ts
  - [x] test cart on demo
- [x] fix cart worker functionality
  - [x] reset checkout if it's already checked out (order exists)
  - [x] update item count
- [ ] document cart functionality
  - [ ] cart worker
  - [ ] cart client script and dev server
- [x] create klarna banner test html/css
- [x] test experiment reporting on demo

**TIL**: Deno http module server `Request` and `Response` are not the same as those in the Web API.

PROCESSED: Add page and host to experiment reporting.
PROCESSED: Create A/B reporting view in Kibana.
DONE: Update Klarna banner learn more link.

## Tuesday - AB reporting research

**TIL**: No possible at all to join records / indecies in Elasticsearch.

## Wednesday - GDPR day

**OBT: GDPR/CCPA live**

- [x] create gdpr element
- [ ] content editable in forestry
  - [x] hide banner by default
  - [x] create ccpa element
  - [x] make forestry frontmatter conf
- [ ] make client-side js
  A bit big task...
- [x] client-side finishing
  - [x] make ccpa dismiss button work client-side
  - [x] mark scripts with `[uses-cookies]` attribute
- [x] make `site-worker` rewriter tests
- [x] make tests for cookie setting
  - [x] california
  - [x] `?gdpr-consent`
- [x] create classes for rewriting
  - [x] also show banner only on first visit
- [x] document the rewriter
- [ ] test on demo
- [ ] release on all sites

PROCESSED: Withdrawing consent
DONE: Setting cookie server-side does not work

## Thursday - GDPR day

**OBT: GDPR/CCPA live on US**

DONE!

## Friday - small bugs day

- [x] interstitial banner wrap
- [x] products shop all button placement, swatch border
