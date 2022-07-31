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

export default function ELogin(){
  const { setUser, setUserInfo } = useContext(AuthContext);

  const [alias, setAlias] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [email, setEmail] = useState("");

  function inputAlias(event){
    setAlias(event.target.value)
  }

  function inputPassphrase(event){
    setPassphrase(event.target.value)
  }

  function btnLogin(){
    //console.log("query")
    axiosapi.post('/api/signin',{
      alias:alias,
      pass:passphrase
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
    route("/",true)
  }

  return (<div>
    <table>
      <tbody>
      <tr>
        <td colspan="2">
          <label>Login </label>
        </td>
      </tr>
      <tr>
        <td>
          <label>Alias: </label>
        </td><td>
          <input value={alias} onInput={inputAlias} /><br/>
        </td>
      </tr><tr>
        <td>
          <label>Passphrase: </label>
        </td>
        <td>
          <input value={passphrase} onInput={inputPassphrase} />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span style="float:right;">
          <button onClick={btnLogin}>Login</button>
          <button onClick={btnCancel}>Cancel</button>    
          </span>
        </td>
      </tr>
    </tbody>
    </table>
  </div>)
}
