/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet

  browser client
*/

/** @jsx h */
import { h } from "preact"
import { useState, useContext } from "preact/hooks"
import { AuthContext } from "./AuthProvider.jsx";
import { axiosapi } from "../../libs/clientapi.js";
import { route } from 'preact-router';

export default function SignOut(){

  const { setUser, setUserInfo } = useContext(AuthContext);
  const [alias, setAlias] = useState("");

  function btnSignOut(){
    //console.log("query")

    axiosapi.post('/api/signout',{
      api:"LOGOUT"
    }).then(response=>{
      console.log(response)
      if(response.data?.api==="LOGOUT"){
        console.log(response.data?.api)
        setUserInfo({})
        //setUser(response.data.user.alias)
        //console.log("USER NAME",response.data.user.alias)
        setUser("Guest")
        route("/",true);
      }else{
        console.log("LOGIN ERROR")
      }
    })
    
    /*
    fetch('/signout',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({api:'SIGNOUT'})
    }).then(response=>{
      console.log(response)
    })
    */
  }

  function btnCancel(){
    route("/", true)
  }

  return (<div>
    <label>Are you sure you want to sign out?</label><br/>
    <button onClick={btnSignOut}>Logout</button>
    <button onClick={btnCancel}>Cancel</button>
  </div>)
}
