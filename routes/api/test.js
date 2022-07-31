/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet
*/

export default async ()=>{
  
  console.log("STEST async")

  return await new Response("Hello Test SYNC!");

  //return new Promise(resolve => {
    //resolve(new Response("Hello Test!"));
  //});
}