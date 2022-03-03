/** @jsx h */

import { Component, h, readContents } from "./deps.ts";

export const Base: Component = async (
  { children },
  { page, needsCss },
) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>
        {page.title || "I'm Eric, and I'm a developer"}
        {" "}
        | ericselin.dev
      </title>
      <style>
        {await readContents(needsCss)}
      </style>
    </head>

    <body>
      <header>
        <a href="/">e</a>
        <ul>
          <li>
            <a href="/blog/">Blog</a>
          </li>
          <li>
            <a href="/experiments/">Experiments</a>
          </li>
        </ul>
      </header>
      {children}
      <footer>
        There's no such thing as the cloud - it's just someone else's computer.
      </footer>
    </body>
  </html>
);

Base.needsCss = "_base.css";
