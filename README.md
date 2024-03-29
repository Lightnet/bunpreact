# bunpreact

# Program:
 - Bun (https://bun.sh)

# Languages:
 - Javascript ( main )
 - Typecript

# Created By: Lightnet

# Information:
  Prototype build. For preact but note there some react convert and alias since bun runtime built.

  Using the preact components since browser only support js module as it need to transpiler to load and read for browser javascript to understand to render the html elements and javascript.

  Note this is test build. Some of the Bun runtime features are in beta and features not yet added or work to debug better.

## Features:
- Bun serve
- jsx transpiler to js for fetch request handler
- cookie
  - [x] set
  - [x] clear
- headers
  - [x] Content-Type
  - [x] Simple Content-Security-Policy ( deal with url script packages)
- Account
  - [x] Sign Up
  - [x] Sign In
  - [x] Sign Out
- Simple Json web token > JWT
- Preact handler transpiler jsx to js for browser developement build 
- database sqlite simple test
- web IDE ( importmap )
  - https://www.npmjs.com/package/es-module-shims

## Design:

### package.json:
 It handle some config for bun runtime config.

### dev.js:
 It handle the set up for bun.serve for http.

```js
async function fetch(req){// from browser client input
  const {pathname} = new URL(req.url)
  console.log(pathname);// default to "/" and get "/favico.ico" as well.
  if(pathname==="/"){
    return new Response('Index, Hello World!',{});
  }
  return new Response('Hello World!',{});//return browser client output
}

const server = Bun.serve({
  development: process.env.NODE_ENV !== "production",
  //hostname: "localhost", // defaults to 0.0.0.0
  port: 3000,
  fetch:fetch,
  error(error) {//error: Error
    return new Response("Uh oh!!\n" + error.toString(), { status: 500 });
  },
});

//server.stop();
```

### Headers:
 The follow the basic of the header format web api. But it not recommand for allow all for url it for testing dev build.

```js
const headers = new Headers();
headers.append('Access-Control-Allow-Origin','*')
headers.set('Content-Type','text/html; charset=UTF-8')
headers.set('Access-Control-Allow-Methods','GET, PUT, POST, DELETE')
headers.set('Access-Control-Allow-Headers',"Origin, Depth, User-Agent, X-file-Size, X-Request-With, Content-Type, Accept")

return new Response("<div>Hello World!</div>",{headers});
```

### JSX to JS:
  File convert to JSX to JS for browser to read and render html preact components.
```js
import {file, serve} from "bun";
import { join } from "node:path";
// JSX to JS
const transpiler = new Bun.Transpiler({ loader: "jsx", platform:"browser" });
const filepath = new URL( req.url).pathname;// ex. "/app.jsx"
const blob = file(join(import.meta.dir+"/", filepath))
let text = await new Response(blob).text();
let JSXToJs = transpiler.transformSync(text)
JSXToJs = JSXToJs.replace('"preact"', `"preact"; import { jsx } from "preact/jsx-runtime"; `)
return new Response(JSXToJs,{
  headers:{'Content-Type':'text/javascript'}
})
```
File translate jsx to js for browser client to load.
```js
// Bun built in variablies
const transpiler = new Bun.Transpiler({ loader: "jsx", platform:"browser" });
let text = `<div>Hello World</div>`; // does not work but return  ";"
text = `function Page(){return (<div>Hello World</div>)}`;//this works since warp around function
let JSXToJs = transpiler.transformSync(text);
```
Simple hello world text file JSX
```jsx
<div>Hello World</div>
```
Note this does not work correct.

```jsx
function Hello(){
  return(<div>Hello World</div>)
}
```
Should be something like this.

JS
```js
import { jsx } from "preact/jsx-runtime"; // note since use of bun.Transpiler does not add import. Must be config.

export default jsx(
  "div",
  {
    children: "hi!",
  },
  undefined,
  false,
  undefined,
  this
);
```
### Index HTML:
 Note that jsx format might not work on html for front page render. As some browser does not work correctly.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'nonce-n0nce'" />
  	<script async src="https://unpkg.com/es-module-shims@1.5.9/dist/es-module-shims.js" nonce="n0nce"></script>
    <script type="importmap" nonce="n0nce">
    {
      "imports":{
        "preact":"https://unpkg.com/preact?module",
        "preact/hooks":"https://unpkg.com/preact@10.10.0/hooks/dist/hooks.module.js",
        "preact/jsx-runtime":"https://unpkg.com/preact@10.10.0/jsx-runtime/dist/jsxRuntime.module.js"
      }
    }
    </script>
    <script type="module" defer nonce="n0nce">
// For Testing if the code works
  import {h} from "preact";
  console.log(h)
  console.log("Test Here?");
    </script>
  </head>
  <body>
    <label>Testing</label>
	</body>
</html> 
```
 Note that there are tag or attribute for easy access to importmap for development test. It handle script Content-Security-Policy config.


## Notes: 
 - There are couples way to build preact serve http. 
 - Bun Runtime 
  - SSR packages
  - There is server side render. (too advance coding)
  - Auto compiler, transpiler, package manager
  - there is bun predefined config .env loading
  - required socket to reload or rebuild preact components and variablies
  - package loading and compiler
  - watch files changes (bun not build)
  - pre generate files for layer order query like middleware
 - Preact
  - preact two or three type of using by component class or jsx file.
  - odd bug for packages url for preact@latest for router async load
 - localStorage access third for dev web host Access is denied

# Bun runtime:
 Read more on https://bun.sh

## Web Sandbox Build Test:
- https://codedamn.com/playground/4tiQmWVHa6BkHvFwDp-T9

# .env:
```
PORT=3000
SECRET=32char
```

# References:
 - https://github.com/oven-sh/bun/tree/main/examples
 - https://developer.mozilla.org/en-US/docs/Web/API/Headers
 - https://github.com/oven-sh/bun#Reference
 - https://preactjs.com/
 - https://www.npmjs.com/package/es-module-shims