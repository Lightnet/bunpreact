// mozilla docs/web/api/headers

import {file, serve} from "bun";
import fs from "node:fs"
import { join } from "node:path"
import livereload from "bun-livereload"

import cookie from "cookie"
import { render } from "preact-render-to-string"
//import App from "./src/index.jsx"

//console.log(App)//nope
//console.log(App())//work
//const app = App;
//console.log(render)
//let html = render(App(),{},{pretty:true})
//console.log(html)
//console.log(typeof html)

//const src = './src/'
//console.log(fs)
//const files = fs.readdirSync(src)
//console.log(files)
//fs.readdirSync(src).array.forEach(element => {
  //console.log(element)
//});


//await Bun.write(Bun.stdout, Bun.file('test.md'));
const blob = Bun.file('test.md')
//console.log(blob)
//Bun.write(Bun.stdout,blob);
//console.log("init bun http server")
console.log("bun serve http://localhost:3000")

async function fetch(req){
	console.log("/////////////////")
	const headers = new Headers();
	headers.set('Content-Type','text/html; charset=UTF-8')
    console.log("url page:",req.url);
    const {pathname} = new URL(req.url)
    console.log("pathname");
    console.log(pathname);

    if(pathname === '/echo'){
      //heads.set('Set-Cookie', cookie.serialize('test','testss'))
      headers.set('Content-Type','text/html; charset=UTF-8')
      //return new Response(blob,{headers:heads});
      return new Response('Hello Echo!',{headers:headers});
    }

    if(pathname === '/'){
        //console.log(req.headers.get("cookie"))
        const sCookie = req.headers.get("cookie");
	    if(sCookie){
    	  console.log("Cookie found")
    	  const dCookie = cookie.parse(sCookie)
    	  //console.log(dCookie)
    	}else{
    	  console.log("cookie not found")
    	}
    	const {default: App} = await import("./src/index.jsx");
    	
    	let htmlText = render(App(),{},{pretty:true})
    
		console.log("default page")

		//headers.set('Set-Cookie', cookie.serialize('test','testss'))
		headers.set('Content-Type','text/html; charset=UTF-8')
		//headers.set('Access-Control-Allow-Origin','*')
		headers.set('Access-Control-Allow-Credentials','false')
		headers.append('Access-Control-Allow-Origin','*')
		headers.append('Access-Control-Allow-Origin','http://localhost:3000/')
		headers.append('Access-Control-Allow-Origin','https://unpkg.com/')
		headers.set('Access-Control-Allow-Methods','GET, PUT, POST, DELETE')
		headers.set('Access-Control-Allow-Headers',"Origin, Depth, User-Agent, X-file-Size, X-Request-With, Content-Type, Accept")
		//headers.set('Content-Security-Policy',"script-src '*'")
		//headers.set('Content-Security-Policy',"script-src 'http:/localhost:3000' 'https://unpkg.com'")
		//headers.set('Content-Security-Policy',"script-src 'unsafe-inline'")
		htmlText = "<!DOCTYPE html>" + htmlText
		//htmlText = "Welcome to Bun!"
		//headers.set('Content-Type',"text/html")
		console.log(headers)
		return new Response(htmlText,{
		  headers
		});
    }
    
    if(req.url.endsWith('.jsx')){
    	//console.log("Found jsx file!")
    	return new Response(file(join(import.meta.dir+"/",new URL( req.url).pathname )))
    }

	return new Response(
		file(join(import.meta.dir.dir,"./public/", pathname))
	);

}

const server = Bun.serve({
  port: 3000,
  fetch:livereload(fetch),
  error(error) {//error: Error
    return new Response("Uh oh!!\n" + error.toString(), { status: 500 });
  },
});

//server.stop();