/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet

	Information:
		http web server
*/

// mozilla docs/web/api/headers

//import crypto,{ randomUUID } from 'crypto';
import {file, serve} from "bun";
import fs from "node:fs"
import { join } from "node:path";
//import livereload from "bun-livereload";
import cookie from "cookie";
import { initDB } from "./database.js";
import { sleep } from "./libs/helper.js"
//import { render } from "preact";
import render from 'preact-render-to-string';

//console.log("process.env.PORT", process.env.PORT)
//console.log("process.env.SECRET", process.env.SECRET)
//const SECRET = process.env.SECRET;

initDB();//init database

const PORT = process.env.PORT || 3000;
// API PATH
const apiPathName = join(import.meta.dir ,"/routes/api")
//console.log(apiPathName)
const APIFiles = new Map()
async function loadHandle(fileName){
	try{
		const m = await import(join(import.meta.dir+"/routes/", fileName)).then(module => module.default);
		//console.log("m fun:",fileName)
		//console.log(m.constructor.name) // check for AsyncFunction and Function tags  
		//console.log(m)
		return m;
	}catch(e){
		console.log("ERROR HANDLE LOADING...")
		console.log(e)
		return null;
	}
}
fs.readdirSync(apiPathName).forEach(async function(file) {
	//console.log(file)
	if(file.endsWith('.js')){
		const fileName = join("/api/",file);
		//console.log("fileName", fileName);
		let urlName = fileName.replace(".js","");//remove .js to blank
		//console.log(urlName);
		//console.log(join(import.meta.dir, fileName))
		const loadFun = await loadHandle(fileName);
		// set up url and handler request
		APIFiles.set(urlName,{
			handler:loadFun
		});
	}
});
// ROUTES PATH
async function loadRoutePage(fileName){
	try{
		console.log((import.meta.dir+"/routes/" + fileName))
		const m = await import(join(import.meta.dir+"/routes/", fileName)).then(module => {
			//return {default:module.default,handler:module.handler }
			//console.log(module)
			return module
		});
		//console.log("m fun:",fileName)
		//console.log(m.constructor.name) // check for AsyncFunction and Function tags  
		console.log(m)
		return m;
	}catch(e){
		console.log("ERROR HANDLE LOADING...")
		console.log(e)
		return null;
	}
}

const routesPathName = join(import.meta.dir ,"/routes")
const urlRoutes = new Map();

try{
	fs.readdirSync(routesPathName).forEach(async function(file) {
		//console.log(file)
		//console.log(join(import.meta.dir, fileName))
		if(file.endsWith('.js')){
			//console.log("fileName: ", file);
			const fileName = file;
			const pageName = fileName.replace(".js","");//remove .js to blank
			//console.log("pageName: ",pageName);
			const pageModule = await loadRoutePage(fileName);
			//console.log(pageModule)
			const routePageUrl = join("/",pageName)
			console.log("PAGE ROUTE:",routePageUrl);
			urlRoutes.set(routePageUrl,{
				handler:pageModule.handler || null, //serve
				page:pageModule.default || null // preact render
			})
		}
		if(file.endsWith('.jsx')){
			//console.log("fileName: ", file);
			const fileName = file;
			const pageName = fileName.replace(".jsx","");//remove .js to blank
			console.log("PAGE ROUTE: ",pageName);
			const pageModule = await loadRoutePage(fileName);
			//console.log(pageModule)
			const routePageUrl = join("/",pageName)
			console.log("PAGE ROUTE:",routePageUrl);
			//console.log(pageModule.default)
			//console.log(pageModule.default())
			urlRoutes.set(routePageUrl,{
				handler:pageModule.handler || null, //serve
				page:pageModule.default || null // preact render
			})
		}
	});
}catch(e){
	console.log(e)
}
await sleep(50);
console.log("FINISH API AND ROUTES LOADING...")

// browser input request query
async function fetch(req){
	const { pathname } = new URL(req.url);
	//console.log("/////////////////")
	//const headers = new Headers();
	//headers.set('Content-Type','text/html; charset=UTF-8')
	//console.log("req:",req);
	//console.log("url page:",req.url);
	//console.log("METHOD:",req.method);
	
	//console.log("pathname",pathname);
	//const cookies = cookie.parse(req.headers.get('cookie') || '');
	//if(cookies.token){
		//console.log("TOKEN:",cookies.token)
		//const text = cookies.token.split(".")[1]
		//console.log(Buffer.from(text, 'base64').toString('ascii'))//user data
	//}else{
		//console.log("TOKEN: NULL")
	//}

  // https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
	if(pathname === '/favicon.ico'){
		//const heads = new Headers();
		//heads.set('Content-Type','text/html; charset=UTF-8')
		//return new Response(blob,{headers:heads});
		return new Response('',{status:204});
	}
	
	//if(pathname === '/echo'){
		//const heads = new Headers();
		//heads.set('Content-Type','text/html; charset=UTF-8')
		//return new Response("ECHO!",{headers:heads});
	//}

	//CHECK PATH API 
	if(pathname.search("/api/")==0){
		console.log("API FOUND:", pathname)
		if(APIFiles.has(pathname)==true){//match file name
			const APIName = APIFiles.get(pathname);
			try{
				if(APIName.handler){
					if(APIName.handler.constructor.name=='Function'){
						return APIName.handler(req)
					}else if (APIName.handler.constructor.name=='AsyncFunction'){
						return await APIName.handler(req);
					}else{
						return new Response("Uh oh!!\n", { status: 500 });	
					}
				}else{
					return new Response("Uh oh!!\n", { status: 500 });
				}
			}catch(e){
				return new Response("Uh oh!!\n"+e.toString(), { status: 500 });
			}
		}
	}

	//Testing...
	//console.log(urlRoutes.has(pathname))
	if(urlRoutes.has(pathname) == true){ //match file name
		const heads = new Headers();
		heads.set('Content-Type','text/html; charset=UTF-8')
		console.log("FOUND ROUTES:",pathname)
		const pageModule = urlRoutes.get(pathname);
		//console.log(pageModule)
		//console.log(pageModule.page)
		//console.log(pageModule.page())
		let jsxTohtml = render(pageModule.page(),{},{pretty:true})
		console.log(jsxTohtml)
		return new Response(jsxTohtml,{headers:heads});
	}
	

	// index / home > default url
	if(pathname === '/'){
		const headers = new Headers();
		//console.log(req.headers.get("cookie"))
		const sCookie = req.headers.get("cookie");
		
		if(sCookie){
			//console.log("Cookie found")
			const dCookie = cookie.parse(sCookie)
			//console.log(dCookie)
		}else{
			//console.log("cookie not found")
		}
		//const {default: App} = await import("./src/index.jsx");
		//let htmlText = render(App(),{},{pretty:true})
		const blob = file(join(import.meta.dir, "/index.html"))    	
		//headers.set('Set-Cookie', cookie.serialize('test','testss'))
		headers.set('Content-Type','text/html; charset=UTF-8')
		headers.set('Access-Control-Allow-Origin','*')
		//headers.set('Access-Control-Allow-Credentials','false')
		//headers.append('Access-Control-Allow-Origin','*')
		//headers.append('Access-Control-Allow-Origin','https://unpkg.com/')
		//headers.append('Access-Control-Allow-Origin','http://localhost:3000/')
		headers.set('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, PATCH')
		headers.set('Access-Control-Allow-Headers',"Origin, Depth, User-Agent, X-file-Size, X-Request-With, Content-Type, Accept")
		
		//console.log(headers)
		return new Response(blob,{headers});
	}

	if(req.url.endsWith('.js')){
		const filepath = new URL( req.url).pathname;
		const blob = file(join(import.meta.dir+"/", filepath))		  
		return new Response(blob,{headers:{'Content-Type':'text/javascript'}})
	}
			
	if(req.url.endsWith('.jsx')){
		const transpiler = new Bun.Transpiler({ loader: "jsx", platform:"browser" });
		//
		const filepath = new URL( req.url).pathname;
		//console.log("JSX: ",filepath)
		//console.log(import.meta.dir)
		const blob = file(join(import.meta.dir+"/", filepath))
		//console.log(blob)
		let text = await new Response(blob).text();
		//console.log("text")
		//text = text.replace("preact", "https://cdn.jsdelivr.net/npm/preact/dist/preact.mjs");
		//console.log(text)
		let JSXToJs = transpiler.transformSync(text)
		//console.log("JSX")
		//console.log(JSXToJs)
		// add jsx for render element
		JSXToJs = JSXToJs.replace('"preact"', `"preact"; import { jsx } from "preact/jsx-runtime"; `)
		return new Response(JSXToJs,{headers:{'Content-Type':'text/javascript'}})
	}
  //console.log("LAST CHECK?")
  //console.log(join(import.meta.dir,"./public/", pathname))
	return new Response(
		file(join(import.meta.dir,"./public/", pathname))
	);
}

//console.log("PORT:",PORT)
console.log(`Bun serve http://localhost:${PORT}`)
console.log("NODE_ENV:",process.env.NODE_ENV)

const server = serve({
	development: process.env.NODE_ENV !== "production",
	//hostname: "localhost", // defaults to 0.0.0.0
  //port: 3000,
  port: Number(PORT),//error on string
  //fetch:livereload(fetch),
	fetch:fetch,
  error(error) {//error: Error
    return new Response("Uh oh!!\n" + error.toString(), { status: 500 });
  },
});

//server.stop();