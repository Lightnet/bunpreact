/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet

  browser client
*/

/** @jsx h */
import { h, Fragment } from "preact"
import { useState, useEffect, useContext } from "preact/hooks"
import { axiosapi } from "../../libs/clientapi.js";

export default function ToDoList(){

  const [textContent, setTextContent] = useState("");
  const [textId, setTextId] = useState("");
  const [textValue, setTextValue] = useState("");

  const [toDoList, setToDoList] = useState([
    {id:"00",content:"Hello World"},
    {id:"02",content:"Hello World2"},
  ]);

  useEffect(()=>{
    getToDoList();
  },[])

  function getToDoList(){
    axiosapi.get('/api/todolist')
    .then(resp=>{
      console.log(resp)
      if(resp.data?.api==='LIST'){
        setToDoList(resp.data?.list)
      }
    }).catch(error=>{
      console.log(error)
    })
  }

  function addToDoList(){
    axiosapi.post('/api/todolist',{
      api:"CREATE",
      content:textContent
    }).then(resp=>{
      console.log(resp)
      if(resp.data?.api=="ADD"){
        getToDoList();
        //setToDoList(state=>[...state,{
          //id:crypto.randomUUID(),
          //content:textContent
        //}])
      }
    }).catch(err=>{
      console.log(err)
    })
    /*
    setToDoList(state=>[...state,{
      id:crypto.randomUUID(),
      content:textContent
    }])
    */
  }

  function deleteContentId(id){
    console.log("DELETE:",id)
    //{data:{id:id}}

    /*
    fetch('/api/todolist?id=0', {
      method: 'DELETE'
    }).then(() => {
      console.log('removed');
    }).catch(err => {
      console.error(err)
    });*/

    axiosapi.request({
      //url:`/api/todolist?id=${id}`,
      url:`/api/todolist`,
      method: 'POST',
      data: {api:"DELETE",id:id}
    })
    .then(resp=>{
      console.log(resp)
      if(resp.data?.api=="DELETE"){
        setToDoList(state=>state.filter(item=>item.id!==id))  
      }
    }).catch(err=>{
      console.log(err)
    })
    
    //setToDoList(state=>state.filter(item=>item.id!==id))
  }

  function updateContentId(id, content){
    console.log("UPDATE:",id)
    axiosapi.request({
      url:'/api/todolist',//,
      method: 'PUT',
      data: {id:id, content:content}
    })
    .then(resp=>{
      console.log(resp)
      if(resp.data?.api=="UPDATE"){
        setTextId("")
      }
    }).catch(err=>{
      console.log(err)
    })
    //setToDoList(state=>state.filter(item=>item.id!==id))
  }

  function selectEditId(id,text){
    if(textId == id){
      setTextId("")
    }else{
      setTextId(id)
      setTextValue(text)
    }
  }

  function inputText(e){
    setTextContent(e.target.value)
  }

  function inputTextValue(e){
    console.log(e.target.name)
    setTextValue(e.target.value)
    const id = e.target.name;
    const text =e.target.value;
    
    setToDoList(state=>state.map(item=>{
      if(item.id == id){
        return {...item, content:text};
      }
      return item;
    }))
  }

  return (<div>
    <label>To Do List:</label><br/>
    <input value={textContent} onInput={inputText}/><button onClick={addToDoList}> + </button>
    <div>
      {toDoList.map(item=><div key={item.id}>
        {textId === item.id ?(
          <Fragment>
            <input name={item.id} value={textValue} onInput={inputTextValue} />
            <button onClick={()=>updateContentId(item.id,textValue)}> Update </button>
          </Fragment>
        ):(
          <Fragment>
            <label> {item.content} </label>
            <button onClick={()=>selectEditId(item.id,item.content)}> Edit </button>
          </Fragment>
        )}
        <button onClick={()=>deleteContentId(item.id)}> Delete </button>
      </div>)}
    </div>
  </div>)
}
