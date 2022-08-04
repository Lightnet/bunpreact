/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet
*/

import { randomUUID } from 'crypto';
import { 
	checkUser, 
} from "../../database.js";
import { isEmpty } from "../../libs/helper.js";
import { verifyPassword, createJWT } from "../../libs/serveapi.js";
import cookie from "cookie";

const SECRET = process.env.SECRET;

export default async function handle(req){
  console.log("SIGN IN POST")

  const data = await req.json();
  //console.log("data????")
  //console.log(data)
  if(!isEmpty(data.alias) && !isEmpty(data.pass)){
    //console.log("NOT EMPTY")
    let user = checkUser(data.alias);
    //console.log("USER:",user)
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

        //console.log(SECRET)

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