# Moon Router

A router plugin for Moon.

[![Build Status](https://travis-ci.org/kbrsh/moon-router.svg?branch=master)](https://travis-ci.org/kbrsh/moon-router)

### What?

Moon router lets you create routes that map to different components. Clicking special links update the view and the URL as if the user is visiting a new page.

### Install

With npm:

```bash
$ npm install moon-router
```

```js
const MoonRouter = require("moon-router");
Moon.use(MoonRouter)
```

With a CDN/Local:

```html
<script src="https://unpkg.com/moon-router"></script>
<script>
  Moon.use(MoonRouter);
</script>
```

### Usage

Initialize Moon router

```js
Moon.use(MoonRouter)
```

#### Creating Routes

**Before** you create your Moon instance, define your routes like this:

```js
const router = new MoonRouter({
  default: "/",
  map: {
    "/": "Root",
    "/hello": "Hello"
  }
});
```

This will map `/` to the `Root` component, and will map `/hello` to the `Hello` component.

The `default` route is `/`, if a URL is not found, Moon will display this route.

##### History Mode

Moon Router will use "hash" mode by default, meaning the URL will look something like: `/#/`. If you want routes to look more realistic, you must provide a `mode` option.

```js
const router = new MoonRouter({
  default: "/",
  map: {
    "/": "Root",
    "/hello": "Hello"
  },
  mode: "history"
});
```

Still, if a user visits `"/hello"` in history mode, they will get a 404 response. Moon Router can only switch routes in history mode, not initialize them. For this, you must configure your server to always serve a single page but still keep the route.

##### Dynamic Routes

Routes can also be dynamic, with support for query parameters, named parameters, and wildcards. These can be accessed via a `route` prop passed to the view component.

```js
const router = new MoonRouter({
  map: {
    "/:named": "Root", // `named` can be shown with {{route.params.named}}
    "/:other/parameter/that/is/:named": "Named",
    "/*": "Wildcard" // matches any ONE path
  }
});
```

* Named Parameters are in the `route.params` object
* Query Parameters are in the `route.query` object (`/?key=val`)

Just remember, to access the special `route` variable, you must state it is a prop in the component, like:

```js
Moon.component("Named", {
  props: ['route'],
  template: '<h1></h1>'
});
```

#### Define Components

After initializing Moon Router, define any components referenced.

```js
Moon.component("Root", {
  template: `<div>
    <h1>Welcome to "/"</h1>
    <router-link to="/hello">To /hello</router-link>
  </div>`
});

Moon.component("Hello", {
  template: `<div>
    <h1>You have Reached "/hello"</h1>
    <router-link to="/">Back Home</router-link>
  </div>`
});
```

You will notice the `router-link` component. This is by default, rendered as an `a` tag, and should **always be used** to link to routes. A class of `router-link-active` will be applied to the active link by default, unless another class is provided in `options.activeClass`.

When clicking on this link, the user will be shown the new route at the `router-view` component (see below), and the page will not reload.

#### Installing Router to Instance

When creating your Moon instance, call the `init` method on the router inside of the `mounted` hook to bind the instance to the router.

```js
new Moon({
  el: "#app",
  hooks: {
    mounted() {
      router.init(this);
    }
  }
});
```

```html
<div id="app">
  <router-view></router-view>
</div>
```

This will install the Moon Router to the Moon Instance, and when you visit the page, you will notice the URL changes to `/#/`

The `router-view` is a `span` with a child component that corresponds with the current route.

### License

Licensed under the [MIT License](https://kbrsh.github.io/license) By [Kabir Shah](https://kabir.ml)
