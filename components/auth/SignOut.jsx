// browser client

/** @jsx h */
import { h } from "preact"
import { useState, useContext } from "preact/hooks"
import { AuthContext } from "./AuthProvider.jsx";
import { axiosapi } from "../../libs/clientapi.js";
import { route } from 'preact-router';

export default function SignOut(){

  const { setUser, setUserInfo } = useContext(AuthContext);
  const [alias, setAlias] = useState("");

  function btnLogin(){
    console.log("query")

    axiosapi.post('/signout',{
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

  }

  return (<div>
    <label>Are you sure you want to sign out?</label><br/>
    <button onClick={btnLogin}>Logout</button>
    <button onClick={btnCancel}>Cancel</button>
  </div>)
}
