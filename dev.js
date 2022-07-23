// mozilla docs/web/api/headers

import {file, serve} from "bun";
//import fs from "node:fs"
import { join } from "node:path";
import livereload from "bun-livereload";
import cookie from "cookie";

console.log("bun serve http://localhost:3000")

async function fetch(req){
	console.log("/////////////////")
	const headers = new Headers();
	headers.set('Content-Type','text/html; charset=UTF-8')
	console.log("url page:",req.url);
	const {pathname} = new URL(req.url)
	console.log("pathname");
	console.log(pathname);

	if(pathname === '/favicon.ico'){
		//heads.set('Set-Cookie', cookie.serialize('test','testss'))
		//headers.set('Content-Type','text/html; charset=UTF-8')
		//return new Response(blob,{headers:heads});
		//return new Response('Hello Echo!',{headers:headers});
		return new Response('',{status:404});
	}

	if(pathname === '/echo'){
		//heads.set('Set-Cookie', cookie.serialize('test','testss'))
		headers.set('Content-Type','text/html; charset=UTF-8')
		//return new Response(blob,{headers:heads});
		return new Response('Hello Echo!',{headers:headers});
	}

	if(pathname === '/'){
		//console.log("default page")
		//console.log(req.headers.get("cookie"))
		const sCookie = req.headers.get("cookie");
		if(sCookie){
			//console.log("Cookie found")
			const dCookie = cookie.parse(sCookie)
			//console.log(dCookie)
		}else{
			console.log("cookie not found")
		}
		//const {default: App} = await import("./src/index.jsx");
		//let htmlText = render(App(),{},{pretty:true})
		const blob = file(join(import.meta.dir+"/", "/index.html"))    	
		//headers.set('Set-Cookie', cookie.serialize('test','testss'))
		headers.set('Content-Type','text/html; charset=UTF-8')
		//headers.set('Access-Control-Allow-Origin','*')
		//headers.set('Access-Control-Allow-Credentials','false')
		headers.append('Access-Control-Allow-Origin','*')
		headers.append('Access-Control-Allow-Origin','https://unpkg.com/')
		//headers.append('Access-Control-Allow-Origin','http://localhost:3000/')
		
		headers.set('Access-Control-Allow-Methods','GET, PUT, POST, DELETE')
		headers.set('Access-Control-Allow-Headers',"Origin, Depth, User-Agent, X-file-Size, X-Request-With, Content-Type, Accept")
		
		//console.log(headers)
		return new Response(blob,{
		headers
	});
	}
	if(req.url.endsWith('.js')){
		const filepath = new URL( req.url).pathname;
		const blob = file(join(import.meta.dir+"/", filepath))		  
		return new Response(blob,{
			headers:{
			'Content-Type':'text/javascript'
			}
		})
	}
			
	if(req.url.endsWith('.jsx')){
		const transpiler = new Bun.Transpiler({ loader: "jsx", platform:"browser" });
		//
		const filepath = new URL( req.url).pathname;
		console.log("JSX: ",filepath)
		console.log(import.meta.dir)
		const blob = file(join(import.meta.dir+"/", filepath))
		console.log(blob)
		let text = await new Response(blob).text();
		console.log("text")
		//text = text.replace("preact", "https://cdn.jsdelivr.net/npm/preact/dist/preact.mjs");
		console.log(text)
		let JSXToJs = transpiler.transformSync(text)
		console.log("JSX")
		console.log(JSXToJs)
		// add jsx for render element
		JSXToJs = JSXToJs.replace('"preact"', `"preact"; import { jsx } from "preact/jsx-runtime"; `)
		return new Response(JSXToJs,{
			headers:{
			'Content-Type':'text/javascript'
			}
		})
	}

	return new Response(
		file(join(import.meta.dir.dir,"./public/", pathname))
	);
}

const server = Bun.serve({
  //port: 3000,
  port: 1337,
  fetch:livereload(fetch),
  error(error) {//error: Error
    return new Response("Uh oh!!\n" + error.toString(), { status: 500 });
  },
});

//server.stop();