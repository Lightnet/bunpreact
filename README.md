# bunpreact

# Program:
 - Bun (https://bun.sh)

# Languages:
 - Javascript ( main )
 - Typecript

# Created By: Lightnet

# Information:
  Prototype build. For preact but note there some react convert and alias since bun built react js.

  Using the preact component class since browser only support js module as it need to transpiler for to load and read for browser javascript to understand to render the html elements.

  Note this is test build.

## Features:
- Bun serve
- jsx transpiler to js for fetch request handler
- cookie testing
- headers testing
- preact handler transpiler jsx to js for browser developement build 
- cors simple ( deal with url script packages)

## Notes: 
 - There couple way to build preact serve http. 
  - SSR packages
  - built from scrap
  - bun auto compiler, transpiler, package manager
 - There is server side render. (too advance coding)
  - there is bun predefined config .env loading
  - required socket to reload or rebuild preact components and variablies
  - package loading and compiler
  - watch files changes (bun not build)
  - pre generate files for layer order query like middleware
 - preact two or three type of using by component class or jsx file.

# Bun runtime:
 Read more on https://bun.sh

# No build tools route:
https://preactjs.com/guide/v10/getting-started

```html
<script type="module">
  import { h, Component, render } from 'https://unpkg.com/preact?module';

  // Create your app
  const app = h('h1', null, 'Hello World!');

  render(app, document.body);
</script>
```

# References:
 - https://github.com/oven-sh/bun/tree/main/examples
 - https://developer.mozilla.org/en-US/docs/Web/API/Headers
 - https://github.com/oven-sh/bun#Reference
 - https://preactjs.com/
 - 