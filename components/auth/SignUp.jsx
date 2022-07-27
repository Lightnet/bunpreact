/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet

  browser client
*/

/** @jsx h */
import { h } from "preact"
import { useState } from "preact/hooks"
import { AuthContext } from "./AuthProvider.jsx";
import { axiosapi } from "../../libs/clientapi.js";
import { route } from 'preact-router';

export default function ELogin(){

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

  function btnRegister(){
    fetch('/signup',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({alias:alias,pass:passphrase})
    }).then(response=>{
      console.log(response)
    })
  }

  function btnCancel(){
    route("/",true)
  }

  return (<div>
    <table>
      <tbody>
        <tr>
          <td colSpan="2">
            <label>Sign Up</label>
          </td>
        </tr>
        <tr>
          <td>
            <label>Alias: </label>    
          </td>
          <td>
          <input value={alias} onInput={inputAlias} />    
          </td>
        </tr>
        <tr>
          <td>
            <label>Passphrase: </label>    
          </td>
          <td>
            <input value={passphrase} onInput={inputPassphrase} /><br/>    
          </td>
        </tr>

        <tr>
          <td colSpan="2">
            <span style="float:right">
              <button onClick={btnRegister}>Register</button>
              <button onClick={btnCancel}>Cancel</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>)
}
