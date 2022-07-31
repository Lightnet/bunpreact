/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet

	Information:
		http web server
*/

// mozilla docs/web/api/headers

import crypto,{ randomUUID } from 'crypto';
import {file, serve} from "bun";
import fs from "node:fs"
import { join } from "node:path";
import livereload from "bun-livereload";
import cookie from "cookie";
import { 
	initDB, 
	getDB, 
	checkUser, 
	addUser
} from "./database.js";
import { isEmpty } from "./libs/helper.js"
import { verifyPassword, createJWT } from "./libs/serveapi.js"

//console.log("process.env.PORT")
//console.log(process.env.PORT)

//console.log(process.env.SECRET)
const SECRET = process.env.SECRET;

initDB();

let PORT = process.env.PORT || 3000;

const apiPathName = join(  import.meta.dir ,"/routes/api")
//console.log(apiPathName)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

//let apiFiles = [];
const APIFiles = new Map()
// const contacts = new Map()
// contacts.set('Jessie', {phone: "213-555-1234", address: "123 N 1st Ave"})
// contacts.get('Jessie') // {phone: "213-555-1234", address: "123 N 1st Ave"}
// contacts.delete('Jessie') // true

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

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

fs.readdirSync(apiPathName).forEach(async function(file) {
	//console.log(file)
	//console.log(file.endsWith('.js'))
	if(file.endsWith('.js')){
		const fileName = join("/api/",file);
		//console.log("fileName", fileName);
		let urlName = fileName.replace(".js","");//remove .js to blank
		console.log(urlName);
		//console.log(join(import.meta.dir, fileName))

		const loadFun = await loadHandle(fileName);
		// set up url and handler request
		APIFiles.set(urlName,{
			handler:loadFun
		});
	}
});

//console.log(APIFiles.get("/api/test"))
//console.log(await APIFiles.get("/api/test").handler());
//await sleep(100);
//const typefun = await APIFiles.get("/api/test").handler;
//console.log(typefun.constructor.name)
//console.log(typefun)
//console.log(await typefun())
//console.log("AWAIT S")
//const typefun1 = APIFiles.get("/api/stest").handler;
//console.log(typefun1.constructor.name)
//console.log(typefun1)
//console.log(await typefun1())

//let testURL = "/sdf/api/test"
//testURL = "/as/api/test"
//testURL = "/test"
//console.log("MATCH > /api/")
//console.log(testURL.match("/api/"))
//let REGAPI = /\api\/\ ;
//console.log(testURL.search("/api/")) // 0 == match pass

//const sum = async (a, b) => {
  //return a + b;
//};
//console.log(sum.constructor.name)

// browser input request query
async function fetch(req){
	//console.log("/////////////////")
	const headers = new Headers();
	headers.set('Content-Type','text/html; charset=UTF-8')
	//console.log("req:",req);
	//console.log("url page:",req.url);
	//console.log("METHOD:",req.method);
	const { pathname } = new URL(req.url)
	//console.log("pathname",pathname);

	const cookies = cookie.parse(req.headers.get('cookie') || '');
	
	if(cookies.token){
		//console.log("TOKEN:",cookies.token)
		const text = cookies.token.split(".")[1]
		//console.log(Buffer.from(text, 'base64').toString('ascii'))
	}else{
		//console.log("TOKEN: NULL")
	}

  // https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
	if(pathname === '/favicon.ico'){
		//heads.set('Set-Cookie', cookie.serialize('test','testss'))
		//headers.set('Content-Type','text/html; charset=UTF-8')
		//return new Response(blob,{headers:heads});
		//return new Response('Hello Echo!',{headers:headers});
		return new Response('',{status:204});
	}

	/*
	if(pathname === '/signin' && req.method=='POST'){
		console.log("SIGN IN POST")

		const data = (await req.json());
		//console.log("data????")
		//console.log(data)
		if(!isEmpty(data.alias) && !isEmpty(data.pass)){
			console.log("NOT EMPTY")
			let user = checkUser(data.alias);
			console.log("USER:")
			console.log(user)
			//if(user.pass)
			if(user){//check exist
				console.log("FOUND USER")
				//check for passphrase
				//console.log(verifyPassword(user.passphrase,data.pass,user.salt))
				if(verifyPassword(user.passphrase,data.pass,user.salt)==true){
					console.log("PASS")
					//heads.set('Set-Cookie', cookie.serialize('test','testss'))

					const payload={
						uuid:randomUUID(),
						id:user.userId,
						alias:user.alias
					}

					const token = createJWT(payload,SECRET);
					console.log(token)

					return new Response(JSON.stringify({api:"TOKEN",user:payload}),{status:200,headers:{
						'Set-Cookie':cookie.serialize('token',token,{
							httpOnly: true,
							//maxAge: 60 * 60 * 24 * 7 // 1 week
							//maxAge: 60 * 60 * 24  // 1 day ?
							maxAge: 60  // 60 sec?
						})
					}});

				}else{
					console.log("FAIL PASSWORD")
					return new Response(JSON.stringify({api:"INVALIDPASS"}),{status:200});
				}
			}else{
				console.log("NOT FOUND")
				return new Response(JSON.stringify({api:"INVALID"}),{status:200});
			}
				
		}else{
			console.log("EMPTY")
			return new Response(JSON.stringify({api:"EMPTY"}),{status:200});
		}
        
		return new Response('',{status:200});
	}
	*/
	if(pathname === '/signup' && req.method=='POST'){
		const data = await req.json();
		if(!isEmpty(data.alias) && !isEmpty(data.pass)){
			const isUser = checkUser(data.alias);
			if(isUser){
				console.log("USER FOUND")
			}else{
				console.log("NOT USER FOUND")
				addUser(data.alias,data.pass);
			}
		}
		//addUser("test","test")
		return new Response('',{status:200});
	}

	if(pathname === '/signout' && req.method=='POST'){
		//clear token
		return new Response(JSON.stringify({api:"LOGOUT"}),{status:200,headers:{
			'Set-Cookie':cookie.serialize('token','',{
				httpOnly: true,
				maxAge:0,
				//expires: Date.now()
			})
		}});
	}

  if(pathname === '/db'){
		getDB();
		return new Response('',{status:200});
	}

	if(pathname === '/echo'){
		//heads.set('Set-Cookie', cookie.serialize('test','testss'))
		headers.set('Content-Type','text/html; charset=UTF-8')
		//return new Response(blob,{headers:heads});
		return new Response('Hello Echo!',{headers:headers});
	}

	//CHECK PATH API 
	if(pathname.search("/api/")==0){
		console.log("API FOUND:", pathname)
		if(APIFiles.has(pathname)==true){//match file name
			
			const APIName = APIFiles.get(pathname);
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
		}
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
		headers.set('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, PATCH')
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
const server = serve({
  //port: 3000,
  port: Number(PORT),//error on string
  //fetch:livereload(fetch),
	fetch:fetch,
  error(error) {//error: Error
    return new Response("Uh oh!!\n" + error.toString(), { status: 500 });
  },
});

//server.stop();