// browser client

/** @jsx h */
import { h } from "preact"
import { useState, useEffect, useContext } from "preact/hooks"
import {AuthContext} from "/components/auth/AuthProvider.jsx"

export default function Settings(){
  const [isCookie, setIsCookie] = useState(false);
  const [view, setView] = useState("theme");
  const { user } = useContext(AuthContext);
  //console.log(crypto)
  //console.log(crypto.randomUUID())

  function clickView(event,name){
    event.preventDefault();
    setView(name)
  }

  return (<div>
    <label>Settings </label>
    <div>
      <a href="#" onClick={(e)=>clickView(e,'theme')}> Theme </a>
      <a href="#" onClick={(e)=>clickView(e,'storage')}> Storage </a>
      <a href="#" onClick={(e)=>clickView(e,'cookie')}> Cookies </a>
    </div>
    <div>
      
    </div>
  </div>)
}
