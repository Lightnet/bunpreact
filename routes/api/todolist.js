/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet
*/

import { 
	addToDoList,
	getToDoList,
	updateToDoList,
	deleteToDoList
} from "../../database.js";

import { isEmpty } from "../../libs/helper.js"

export default async function handle(req){
  console.log("TODOLIST METHOD:",req.method)
  console.log("req",req)
  console.log(req.method)
  console.log(req.method.length)
  
  if(req.method=='POST'){
    const data = await req.json();
    if(data?.api=="CREATE"){
      if(!isEmpty(data.content)){
        addToDoList(data.content)
        return new Response(JSON.stringify({
          api:'ADD',
          id:''
        }),{status:200});
      }else{
        return new Response(JSON.stringify({
          api:'EMPTY',
        }),{status:200});
      }
    }else if(data?.api=="DELETE"){
      if(!isEmpty(data.id)){
        const isPass = deleteToDoList(data.id)
        console.log("isPass: ",isPass)
        return new Response(JSON.stringify({
          api:'DELETE',
          id:''
        }),{status:200});
      }else{
        return new Response(JSON.stringify({
          api:'EMPTY',
        }),{status:200});
      }
    }else{
      return new Response(JSON.stringify({
        api:'ERROR',
      }),{status:200});
    }
    
  }else if(req.method=='PUT'){
    const data = await req.json();
    console.log("data:",data)
    if(!isEmpty(data.id) && !isEmpty(data.content)){
      const query = updateToDoList(data.id,data.content);
      console.log("query: ",query)
      return new Response(JSON.stringify({
        api:'UPDATE',
        id:''
      }),{status:200});
    }
  }else if(req.method=="DELETE"){//DOES NOT WORK return empty string
    console.log("DELETE HERE???")
    /*
    const data = await req.json();
    if(!isEmpty(data.id)){
      console.log("data.id:",data.id)
      deleteToDoList(data.id)
      return new Response(JSON.stringify({
        api:'DELETE',
        id:''
      }),{status:200});
    }*/
  }else if(req.method=='GET'){
    console.log("GET LIST")
    let list = getToDoList();
    if(list==null){list=[];}

    return new Response(JSON.stringify({
      api:'LIST',
      list:list
    }),{status:200});

    //return new Response('',{status:200});
  }else{
    return new Response(JSON.stringify({
      api:'ERROR',
    }),{status:200});
  }
}