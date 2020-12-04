# Gotchas when using custom elements in production

HTML and CSS needs to be included somehow. The best case is to have the html "template" ready the way it should look, and then just define the custom element, but for encapsulation and usage in other frameworks, you might consider:

- External file(s): loading the HTML via a loader (webpack / parcel / etc)
- Inside JS: use template strings in the js file, possibly with an IDE plugin for language services

Remember, global css doesn't work inside a shadow root. There are no perfect solutions for this:

- `<link>` elements download the stylesheet many times if inserted dynamically
- SASS includes require additional building

One option is not to use a shadow root in cases with heavy global styling.

*1.6.2020*

# CSS Modules

Parcel parses style tags as well, transforming style tags inside loaded html files with CSS Modules (if enabled!). In order to use styles normally in e.g. a shadow root, mark the selector as global with `:global`.

*1.6.2020*

# Google Calendar on mobile

Tasks are not visible in the mobile calendar. Neither are cal feeds (those under "other calendars" on desktop).

*1.6.2020*

# WebVitals are brutal

Need to pay very close attention to LCP! Hero images are particularly crucial here.

External (async!) CSS slows down LCP from 1.6s to 3.1s on Reima US (small sample!). Putting everything in the internal CSS takes it to 1.7s.

External JS also slows down LCP a lot, even though it's async. Need to investigate further, but now it seems impossible to get a perfect Lighthouse score with any JS.

*2.6.2020*

# Rollup chunks

Rollup creates a chunk of imported files if it's imported from many entry points.

*3.6.2020*

# CMS organization

Things you want from a CMS: scale. Scale in terms of what? Reusability. This is slightly difficult to attain in practice, though. For a headless ecom site, for instance, you need a checkout with the products (Shopify), the store content (CMS 1), and possibly some brand / shared content (CMS 2). All of these get input from a media bank, a PIM, and what not. Impossible to centralize for reusability. Or consistency, or auditability.

So what's wrong with having stuff in different places? Nothing, if the content is logically separated anyway. SSO is the only benefit, and a very small one at that. Having to change "spaces" or whatever instead of navigating to a different site when editing different kinds of content is even smaller (remember, brand content and ecom site content are anyway completely different "contexts").

# forestry.io, content organization and (hu)go modules

So should you do mono- or multirepo for ecom sites with different content but the same layout?

## Monorepo

Pros:
- Easier dependency management, especially when working on the layouts and code.
- Ability to share content and media in forestry.

Cons:
- Preview in forestry needs to be done via a special proxy server.
- Sidebar in forestry might get messy, and logically these are different sites.

What could be possible is to create two different sites from the same repo. For instance "us" and "ca". However, since *all* the settings will be shared, including site preview and sidebar settings, this doesn't work.

## Multirepo

Pros:
- Easy access management per repo.
- Logically separate sites have separate err... sites in forestry.

Cons:
- Updating dependencies on updates becomes harder.
- Sharing frontmatter templates in forestry is really hard.
- No media or content sharing (cannot edit git submodules in forestry).

## Specific highlights related to go modules

- hugo modules work in forestry preview
- hugo modules `replace` doesn't seem to work for subdirectories of a git repo

*10.6.2020*

# Typescript can do anything

So, say you want to create a function that groups an array into an object by some key and puts the array part into another key. Sounds weird, but it's simple:

```js
// original array
const arr = [
  { key: 'a', hello: 'world' },
  { key: 'b', hello: 'there' },
  { key: 'a', hello: 'you' }
];

group(arr, 'key', 'prop');

// new object
const result = {
  a: {
    prop: [
      { key: 'a', hello: 'world' },
      { key: 'a', hello: 'you' }     
    ]
  },
  b: {
    prop: [
      { key: 'b', hello: 'there' }     
    ]
  }
}
```

Trust me, there are legitimate use cases for this! Anyway, using TS, you can type check the function based on what you're trying to do:

1. First argument should be an array of any type, let's call the type T.
2. Second argument should be the string representation of a key of type T.
3. Third argument specifies the property name of the returned (sub)object, visible in the resulting return type.

To achieve this:

```ts
function group<T, K extends keyof T, PropName extends string>
  (array: T[], key: K, prop: PropName): {
    [key: string]: {
      [P in PropName]: T[]
    }
  }
```

This works flawlessly in type checking and IntelliSense. This uses [generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types) and is pretty darn cool!

# Ditching the online store in Shopify is hard

Shopify apps use products for different things, e.g. sending out emails after purchase and syncing products with data feeds of different sorts. This becomes pretty hard to manage when the "online store" is a separate static site and not the default Shopify version. One needs to carefully migrate apps and services to use URLs from the new site, and delete apps which only relate to the frontend.

While the online store cannot be deleted (on plans higher than "Lite"), it's possible to password protect the site, or `noindex` the whole site. Regardless of the method used, no apps should use the "online store URLs" from Shopify. This is especially important so that search engines don't get a hold of the deprecated URLs.

**This migration needs to be part of the overall strategy.**