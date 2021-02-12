# Journal experiment

## 3.2.2021

One big thing: get ball rolling on inbound-outbound

- [ ] Write email to Martin
  - [x] list assumptions
  - [x] write some small-talk
  - I feel the need to explain my questions to Martin and the others. Keep this short, however.
- [x] Establish what you want to say and say that
  - [x] send the freaking email
  - Ok, so there it went. Exciting to see what people think. Not making many friends here, at least.
- [ ] Local footer logo config 
  - [x] create feature branch
  - [x] find place for config
    Create a headless page with the needed content. Much better than something in the data dir, since those need to be manually translated. However, if it really is going to be only logos, why not have a data file for that? Yes, just create a data file for now.
  - [x] add a couple of dummy logos
  - [x] create html output
- [x] Footer logo styling
  - [x] make img width / height
  - [x] resize img if not svg
  - [x] make styled hr
  - [x] make wrapping grid
- [x] Finish design
  - [x] check responsive behavior
  - [ ] show hr on "desktop"
  - Now implemented as a flex item with a negative margin hack to make the "gap" work as expected.
  - Not showing an hr at all, because the width is a bit difficult to get right.
- [ ] Release
  - [x] footer logo forestry config
  - [x] make auto release on master push
  - [x] merge feature branch
  - [ ] create footer_logo file in repos and forestry sites
  - Dispatch event not fired b/c the default GH token was used, and changes with that token don't trigger subsequent actions.
- [x] Site releases
  - [x] test site release with new token
  - [x] add footer_logo file to na
  - [x] add footer_logo file to japan
  - [x] add footer_logo file to na forestry
  - [x] add footer_logo file to japan forestry

## 4.2.2021

### Worker architecture

So a big question we need to answer is how to do the architectural side of this. There a couple of big questions related to this:

1. Keep workers in Node or port to Deno?
2. Keep site in KV or Netlify (/CF pages)?
3. How to deploy workers?

#### 1. Keep workers in Node or port to Deno?

The workers are in Node now, so this is the status quo. Also, `kv-asset-handler` is on npm, so that also speks for Node. However, the setup is not complete. Linting and testing need to be set up again, and publishing is a freaking pain.

Deno is more fun, it is "batteries included" and a lot of other things are already in Deno (and will stay there). So maybe Deno is the best choice here. `kv-asset-handler` can easily be ported to Deno. Sadly, wrangler sites will need a `package.json` and npm installed anyway, but that is perhaps fine.

#### 2. Keep site in KV or Netlify (/CF pages)?

KV pros:
- faster

KV cons:
- requires kv asset handler port for us
  wrangler can still be used, so not a big deal
- not possible on us without complete asset mgmt rewrite

Netlify pros:
- easier
- build with cache (no need for azure container instance)
- enables one worker with different configs

KV just probably is faster. And this should be the goal. We don't need branch builds or stuff like that anyway.

#### 3. How to deploy workers?

So if we use KV, and assuming we want to bundle the manifest in the script: we need to deploy each www worker separately and at the same time as the site (KV uploads). The other workers can be run as one worker with different configs depending on route (and this is how they currently work).

Worker ecosystem:
- site-specific www workers
  these have almost no code, and can be made entirely code-less
  this would mean that the "deployer" would just use a shared worker and add some config
- shared library code for the above
  if this would be a worker with an `addEventListener`, then it would make sense to have it next to the ones below
- cart worker
- subscribe worker

There is really quite little that speaks for having these in a single repo, though! The main thing is perhaps the dev container, but if this is really that cool, we can create a shareable image. Well, one thing is typings, but these should be solved in some meaningful way anyhow...

## 5.2.2021

- [x] process gmail email
- [ ] www worker structure
  - [x] create repo
  - [ ] make code structure and copy `www-worker`
    Making the code structure is a bit hard. Try to think about what the different parts actually need to do and structure accordingly.
  - [x] experiment with types
    These can be directly imported as regular ts files.
- [ ] code structure
  - [x] port everything to ts
  - [ ] document functions
  These are a bit oddly structured right now. Re-create the whole thing from scratch?
- [ ] create readme with flowchart of what to do
  Decided against this, it is not worth the trouble. Just start creating the code structure top-down.
- [ ] create code structure
  - [x] create main handler structure

## 9.2.2021 - Cart worker

So already made some edits. Must use journal more.

- [x] create custom attributes types
- [x] end-to-end custom attribute setter

Klarna banner next

- write email to mikko
- continue with www worker rewrite

`site-worker`

Structure is not great. Esp. redirecter needs to be checked a bit. Also, need something to turn a RedirectResult to Response. And need to figure out how to pass in the redirect getter / finder to the handler function.

What the event listener needs to do:
- return asset response (with correct trailing slash) OR
- find and return redirect response OR
- redirect based on trailing slash OR
- return 404

Input needed:
- asset getter (netlify vs kv)
- redirects (json)
- trailing slash handling

- [ ] write main event listener
  Ok, so made some refactorings instead. Mainly to the dependencies. Will write the main event listener next.
- [x] write main event listener
- [x] port tests to deno

## 10.2.2021

Started working without pomodoros again. Not good :D.

- [x] write exhaustive tests for trailing slash
- [x] fix failing tests
- [x] write tests that 404 works
- [x] 404
  - [x] figure out how to get 404
    Cannot clone `FetchEvent`, so need to rewrite `getAsset` to work on the request. Otherwise the logic cannot be in the main handler, and we need all kinds of workarounds in the individual asset getters (path override for 404). Only reason to have the event is to be able to call `waitUntil` for e.g. logging. Let's solve that in some other way when/if we need to.
  - [x] fix it
  Changed the "handlers" (both asset getter and redirecter) to take `Request` as an input.

Site worker publishing

- [x] worker / asset uploader architecture
- [x] us proxy workers.dev worker
- [x] make asset fetcher return undefined if 404
- [x] go to production
  - [x] make workflow

AB testing infra

- [x] infra plan

We have a few things to worry about:
- how to run experiments on the different workers
  - theme version vs worker ab config
    keep a list of active experiments in the theme, along with their css class names
    the list would be a good place to document results
    with the solution below, we'd just enable experiments on a per-site basis
  - how to know when an experiment has ended, so as not to record anymore
    keep a list of experiments in workers kv?
    vendor the above file and check from there?
    not a problem with the solution below
  - selector based on classname? always report what that classname is?
    `[exp-klarna-banner]` then we'd report either `control` or `test` if that selector
    was found and successfully set
- how to report (to Optimize?)
  - reporting experiment views
    do it in the server worker
    how can we identify subjects?
  - reporting add to carts
    if we do this on the server, this is very easy server-side
    client-side we could just load another ga property
  - reporting checkouts
    if we do a redirect, this is very easy, but care must be taken with cross-domain linking in e.g. GA

## 11.2.2021

**One big thing: first experiment running on frontend**

- [ ] create rewriter workflow with mock functions
  This is harder than it seems. This is also the main place for logic, so maybe not super strange.
- [x] more structure
  - [x] figure out where to store actually run experiments
- [x] testing logic
  - [x] add cookies function tests and implementation
  - [x] experiments that don't have a cookie get assigned a value randomly
- [ ] transformer element handler works
  - [x] transformer calls `.on` for each experiment
- [x] transformer beta
  - [x] refactor `experiments` on results
  - [x] set uuid if not set
  - [x] test attribute setting
  - [x] test tracking executed experiments
  Ok, so you cannot transform first and then set the headers. (Headers are set before content starts to stream.) Challenge here is to be able to log only the executed tests. We need to be able to identify when a 
- [x] test on site tester

Log experiments seen by a particular user in the `end` method of `DocumentHandler`. Log conversions with the user id only. Stitch together on back-end.

Reporting alternatives:
- optimizely - contact sales
- split.io - contact sales
- google optimize - free but significant lag in showing results
- workers kv - reporting layer needs to be built
  create a separate worker for this?
  just add a key for each hit `experiment-name:user-id` with the number of times experiment shown (really only a boolean is needed, e.g. this was shown), also include timestamp
  then create an endpoint for reporting, e.g. `POST https://experiments.reima.workers.dev/experiment-name` with e.g. JSON with user id and enabled experiments
  for conversions, create `POST https://experiments.reima.workers.dev/hit` with JSON with user id and event and timestamp
- elastic etc.
  this is pretty nice, but still requires setting up the reporting interface
  we might want to do elastic for tracking at some point anyway, though...
  we still have the old cluster running!

- [ ] elastic reporter endpoint
  - [ ] create new repo
  - [ ] write readme of what it's supposed to do
  Decided to do this in the main site worker for now.

## 12.2.2021 - worker architecture day

**OBT: site-worker in production**

So the main `site-worker` handler should not concern itself with AB testing (or logging). Instead, create a way to add middleware to the end of the pipe.

- [x] experiment with middleware
- [x] write new readme with middleware sections
- [x] fix errors
- [x] port relevant tests

### Experiment conversions

A few ways to report conversions:
1. server-side from the worker directly to elastic
  Can depend on ab testing code in another repo, however version management might become a pain.
  Or just assume a proper fetch format and just post with fetch.
  Requires all relevant routes to have the elastic api key secret set.
  This is already the way `site-worker` does it.
2. server-side from the worker via reporting worker
  Only one place with the api secret, however, we might want another secret/token anyway.
  One more worker to take care of.
3. client-side via reporting worker
  Must be accessible to the public.
  No changes to the cart handling required, only to pixel code.
  But: need to implement the new worker, so some moderate coding required.

We might want the cart server-side anyway in order to have the cart logic in only one place. Also, will likely be faster this way.

- [x] create github repo
- [x] make publish workflow
- [x] report conversions to elastic
- [ ] make json endpoint for cart
