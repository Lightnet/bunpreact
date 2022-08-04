/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet
*/

//const SECRET = process.env.SECRET;
import cookie from "cookie";

export default async function handle(req){
  //clear token
  return new Response(JSON.stringify({api:"LOGOUT"}),{status:200,headers:{
    'Set-Cookie':cookie.serialize('token','',{
      httpOnly: true,
      maxAge:0,
      //expires: Date.now()
    })
  }});
}