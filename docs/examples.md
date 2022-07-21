

```js
export default {
  port: 3000,
  fetch(request: Request) {

    const blob = Bun.file("input.txt");

    const headers = new Headers();
    headers.append('Content-Type', 'text/html');
    
    return new Response(blob,{headers} )//by default it download file need to set content type
  },
};
```

Bun.Transpiler.transformSync

```js
const transpiler = new Bun.Transpiler({ loader: "jsx" });
transpiler.transformSync("<div>hi!</div>");
```

```js
const transpiler = new Bun.Transpiler({ loader: "jsx" });
await transpiler.transform("<div>hi!</div>");
```

https://github.com/oven-sh/bun#Reference
Server-side render React:
// react-ssr.tsx