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