# Informtion:
  This is for headless or request without page content output as text/html but handle fetch for return text/json.

Note the prefixed for api is determind the path in case of miss match for page or non page return data.

```
URL >  http://localhost:3000/api/[name]
```



```js
//browser
fetch('/api/[name]')
.then(respon=>{

})
```

```js
//server
//...
fetch(request){
    const headers = new Headers();
	headers.set('Content-Type','text/json; charset=UTF-8')
    return new Response(JSON.stringify({api:"hello"}),{headers});
}
//...
```