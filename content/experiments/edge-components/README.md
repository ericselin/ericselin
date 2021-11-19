# Edge-rendered components

Wouldn't it be awesome if you could just insert some dynamic elements on an otherwise static page? So you could just update the logged-in user's name or add a country-specific discount when needed? Why yes, yes it would.

Just somehow render the needed HTML structure:

```html
<edge-component title="My page" src="Country">
  <p>Not really sure where you're from...</p>
</edge-component>
```

Note that this (static) HTML is what users will see if no edge-rendering is done. It should work on its own - that way the edge rendering can be a "progressive enhancement" that should update a page but doesn't have to update a page.

Then, create your actual component:

```js
export const Country = (props, ctx) => (
  <div>
    <h1>{props.title}</h1>
    <p>Hello, user from {ctx.country}</p>
  </div>
);
```

This component is then compiled and sent to a Cloudflare Worker that acts as a proxy for your static content. It will receive the attributes of the element in the `props` object, and the request context in the `ctx` object, and update this part of the page in real-time.
