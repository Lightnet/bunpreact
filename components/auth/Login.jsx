// browser client

/** @jsx h */
import { h } from "preact"
import { useState, useContext } from "preact/hooks"
import { AuthContext } from "./AuthProvider.jsx";
import { axiosapi } from "../../libs/clientapi.js";
import {route} from 'preact-router';

export default function ELogin(){
  const { setUser, setUserInfo } = useContext(AuthContext);

  const [alias, setAlias] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [email, setEmail] = useState("");

  function inputAlias(event){
    //console.log(event.target.value)
    setAlias(event.target.value)
  }

  function inputPassphrase(event){
    //console.log(event.target.value)
    setPassphrase(event.target.value)
  }

  function btnLogin(){
    console.log("query")
    
    axiosapi.post('/signin',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data:{alias:alias,pass:passphrase}
      //data:JSON.stringify({alias:alias,pass:passphrase})
    }).then(response=>{
      console.log(response)
      if(response.data?.api=="TOKEN"){
        console.log(response.data?.api)
        setUserInfo(response.data.user)
        //setUser(response.data.user.alias)
        //console.log("USER NAME",response.data.user.alias)
        setUser(response.data.user.alias)
        route("/",true);
      }else{
        console.log("LOGIN ERROR")
      }
    })
  }

  function btnCancel(){

  }

  return (<div>
    <label>Login </label><br/>
    <label>Alias: </label><input value={alias} onInput={inputAlias} /><br/>
    <label>Passphrase: </label><input value={passphrase} onInput={inputPassphrase} /><br/>
    <button onClick={btnLogin}>Login</button>
    <button onClick={btnCancel}>Cancel</button>
  </div>)
}
