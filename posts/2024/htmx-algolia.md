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

For this tutorial, we will be using <a href="">Algolia</a>, <a href="">HTMX</a> (of course), <a href="">Node / Express</a> on the backend and <a href="">pug</a> for html templating and <a href="tailwind.com">Tailwind</a> for CSS.

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

```js
app.use(express.static("public"));
```

Add an `index.html` file into the public folder.

Add in HTMX and tailwind scripts into the document `<head>`, (we're not going to go into NPM packages here as it's overkill, feel free to in order to utilise Tailwind's).

```html
<script
  src="https://unpkg.com/htmx.org@1.9.12"
  integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
  crossorigin="anonymous"
></script>
<script src="https://cdn.tailwindcss.com"></script>
```

All we need to do now is write some HTMX in our `index.html` file and create an API route to handle incoming requests.

First, let's create a text input that will serve as our search bar in `index.html` and ass some HTMX attributes:

```html
<header class="py-4 px-2 shadow-lg">
  <div class="m-auto max-w-6xl flex gap-8">
    <a class="btn btn-ghost text-xl lowercase">HTMX / Algolia</a>
    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full"
      hx-get="/api/search"
      hx-trigger="keyup changed"
      hx-vals='js:{"q": event.target.value}'
      hx-swap="innerHTML"
      hx-target="#app"
    />
  </div>
</header>
<main class="py-4 px-2 max-w-6xl m-auto gap-8 flex" id="app"></main>
```

This is a simple text input that makes a get request to `/api/search`, is triggered on the keyup and changed events, and will swap out the `innerHTML` of the `<main>` element with an id of `app`.

Importantly, it uses HTMX's `hx-vals` attribute, which allows you to write JSON to send with the get request, which in this case will be the query string typed by the user in the search bar.

If we open up an API route in `index.js` to handle this incoming request and console log the result, we should see the query sring coming through:

```js
app.get("/api/search", async (req, res) => {
  console.log(req.query.q); // "foo"
});
```
