https://www.npmjs.com/package/set-cookie-parser

https://www.npmjs.com/package/cookie

```js
cookie.serialize(name, value, options)

res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7 // 1 week
}));
```
Note that it base on response class.
```js
const headers = new Headers();
headers.append('Set-Cookie', cookie.serialize('name', String(query.name), {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7 // 1 week
}))

return new Response("HELLO!",{headers})
```