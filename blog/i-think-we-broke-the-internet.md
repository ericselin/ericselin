---
layout: default.hbs
tags: post
---

# I think we broke the Internet 😢

The World Wide Web (www) was designed to be a collection of documents that could be linked together. And ever since its inception, it has worked this way. Even the most cutting edge modern browsers are optimized for this. Sure, we have better and better possibilities to do almost anything with JavaScript and WebAssembly, but at its core, the www is for documents. And while some websites really are more "apps" than "documents", and thus benefit from this evolution, most websites are not "apps". Is a blog an app? Most certainly no. Is en ecom store and app? Also no. I absolutely love the possibilities the web platform gives us to build apps, I'm just saying that your site is probably not an app.

We put hacked a lot of things on top of these documents first because that made them better. But after that we did it just because we could. Then problems started popping up and we solved them in very intricate ways. (Webpack) We came up with new ways of developing. (React) This made time to launch shorter, sure. But it also made everything more complicated.

We forgot why we started down this path: to make it better for our users. We're releasing more and more things on top of things, and for what? Who decided users want these things? Not the users, that's for sure! But most of all, we forgot the core of the www: documents.

When you are writing something else than docents, how are you making the internet better for users? Is react or vue or html better? There is only one judge: the user. And he doesn't care.

Most of the internet is not dynamic. Dynamic means that it's different every time or most of the time (constant change). So why do we treat it that way? It's static: do as much as possible as early as possible. Yotpo reviews, product descriptions, site contents - do you need to fetch those from a db on every hit? Sure, you have caching but the db is still the end of the line. I have a picture of my wife on my phone, but that's also just a cache. Why is the end of the line not a html document?

React on a static site, that's just ridiculous. Ssr, good for you, but do you really need client side routing? Is your routing better than Chrome's?
