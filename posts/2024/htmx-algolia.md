---
title: Build a search UI w/ Algolia & HTMX
tags: post
layout: subs/layout-post.njk
description: learn how to build a search UI with Algolia, HTMX, Node.js and pug
date: 2024-04-29
---

_Disclaimer: as of writing this article, I work for Algolia_

<a href="https://algolia.com">Algolia</a> is a powerful search engine, that returns search results really quickly. It also has a proud developer experience, with a long list of APIs, client libraries and frontend SDKs.

InstantSearch (IS), Algolia's open source frontend libraries, allow developers to render Search UI components in the browser, and hooks up the components to the same APIs that allow you to query the Algolia engine to return results.

If you want to forego IS, the standard approach is to write some frontend code that takes client inputs and routes them serverside.

Hooking up event listeners and passing AJAX requests client side can be cumbersome, and involves passing a bunch of JSON between server and client, the flaws of which are detailed <a href="htmx.org">here.</a>

Enter HMTX...

## HTMX

HTMX allows you to write minimal, html-only code to make these same AJAX request. No more need for client-side scripts to connect to your backend,

Til now there is no online tutorial for creating an Algolia search UI wih HTMX.

For this tutorial, we will be using <a href="">Algolia</a>, <a href="">HTMX</a> (of course), <a href="">Node / Express</a> on the backend and <a href="">pug</a> for html templating.

If you want to reference any of the code in this tutorial, it's hosted on <a href="github.com">github.</a>

## Setup

Create a new folder in your IDE of choice. Make sure you have Node installed on your machine.

```shellsession
touch index.js
```

We'll use this file as our server entry point. Install express:

```shellsession
npm i express
```

Setup an express server to accept incoming requests:

```js
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
```

Next, create a new folder calls `/public`, this is where we will serve our static files that will contain our HTMX code.

To ensure that our express app can serve these files, we require a declaration:

`app.use(express.static("public"));`

```

```
