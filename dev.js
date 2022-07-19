
import cookie from "cookie";
import { render } from "preact-render-to-string"
import App from "./src/index.jsx"
const html = render(App(),{},{pretty:true})

Bun.serve({
  //http server port
  port: 3000,
  // http handler request
  fetch(req) {
    console.log("URL",req.url)
    const {pathname} = new URL(req.url)// url 'http:localhost:3000/' > '/'

    if(pathname == '/'){ //index or home page default
      const headers = new Headers();
      headers.set('Content-Type','text/html charset=UTF-8');
      return new response(html,{headers})
    }

    if(pathname == '/echo'){
      const headers = new Headers();
      headers.set('Content-Type','text/html charset=UTF-8');
      return new response('hello',{headers})
    }

    /*
    //get browser client
    for(const key of req.headers.keys()){
      console.log(key)
    }
    //get browser cookie
    console.log(req.headers.get('cookie'))
    //string cookie from header only string value
    const sCookie = req.headers.get('cookie')
    if(sCookie){
      console.log("Cookie Found!")
      //string to object json
      const dCookie = cookie.parse(sCookie)
      console.log(dCookie)
    }else{
      console.log("Cookie Not Found!")
    }
    // set up header to return to browser client
    const headers = new Headers();
    headers.set('Set-Cookie', cookie.serialize('test','testx'))

    return new Response("Bun, Hello world!", { 
      headers: headers, //must match param name
      status: 200 // good = 200, bad = 500 (error page request) 
    });
    */
  },
  error(error) {
    return new Response("Uh oh!!\n" + error.toString(), { status: 500 });
  },
});


/*
export default {
  port: 3000,
  fetch(request) {

    const headers = new Headers();
    headers.set('Set-Cookie',)

    return new Response("Welcome to Bun!",{
      headers
    });
  },
};
*/