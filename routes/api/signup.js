/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet
*/

import {
  checkUser,
  addUser
} from "../../database.js"

import { isEmpty } from "../../libs/helper.js";

export default async function handler(req){
  const data = await req.json();
  if(!isEmpty(data.alias) && !isEmpty(data.pass)){
    const isUser = checkUser(data.alias);
    if(isUser){
      console.log("USER FOUND")
    }else{
      console.log("NOT USER FOUND")
      addUser(data.alias,data.pass);
    }
  }else{
    return new Response(JSON.stringify({api:"EMPTY"}),{status:200});
  }
}