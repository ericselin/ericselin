const Component = (props, ctx) => `<h1>${props.title}</h1><p>Hello, user from ${ctx.country}!</p>`

const components = {
  Component
};

const rewriter = (req) => ({
  element: (el) => {
    const component = el.getAttribute("src");
    const props = new Proxy({}, {
      get: (_target, prop) => el.getAttribute(prop)
    });
    const ctx = {
      country: req.cf?.country,
      agent: req.headers.get("User-Agent"),
    };
    try {
      const html = components[component](props, ctx);
      html && el.replace(html, { html: true });
    } catch (ex) {
      console.log("Could not render edge component", ex);
    }
  }
});

const handler = (request) => {
  const res = fetch(request);
  return new HTMLRewriter().on("edge-component", rewriter(request)).transform(res);
}

export default { fetch: handler };
