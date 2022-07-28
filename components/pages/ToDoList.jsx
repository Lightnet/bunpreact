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
    }).catch(error=>{
      console.log(error)
    })
  }

  function addToDoList(){
    setToDoList(state=>[...state,{
      id:crypto.randomUUID(),
      content:textContent
    }])
  }

  function deleteContentId(id){
    console.log("DELETE:",id)
    setToDoList(state=>state.filter(item=>item.id!==id))
  }

  function updateContentId(id){
    console.log("UPDATE:",id)
    setToDoList(state=>state.filter(item=>item.id!==id))
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
            <button onClick={updateContentId}> Update </button>
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
