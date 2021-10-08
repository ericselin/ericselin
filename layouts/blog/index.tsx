/** @jsx h */

import { Component, h } from "../deps.ts";
import { Base } from "../_base.tsx";

const C: Component<any, { title: string }, { title: string }> = (
  _props,
  { page: { content, frontmatter: { title } }, wantedPages },
) => (
  <Base>
    <h1>{title}</h1>
    <main>
      {wantedPages?.map((post) => <div>{post.frontmatter.title}</div>)}
      {content}
    </main>
  </Base>
);

C.wantsPages = "blog/*.md";

export default C;
