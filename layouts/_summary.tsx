/** @jsx h */

import { Component, ContentBase, h } from "./deps.ts";

export const Summary: Component<{ post: ContentBase<{ title: string }> }> = (
  { post: { filepath: { url }, title } },
) => (
  <article>
    <header>
      <h2>
        <a href={url.pathname}>{title}</a>
      </h2>
      <i>DATE - WORDCOUNT Words</i>
    </header>
    <p>
      SUMMARY
    </p>
    <footer>
      <a href={url.pathname}>
        <nobr>Read more →</nobr>
      </a>
    </footer>
  </article>
);
