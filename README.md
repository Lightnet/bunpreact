# bunpreact

# Information:
  Prototype build.



https://github.com/oven-sh/bun/tree/main/examples


https://developer.mozilla.org/en-US/docs/Web/API/Headers


https://github.com/oven-sh/bun#Reference


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









