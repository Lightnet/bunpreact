// browser client

/** @jsx h */
import { h } from "preact"
import { useState } from "preact/hooks"

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

  }

  return (<div>
    <label>Sign Up</label><br/>
    <label>Alias: </label><input value={alias} onInput={inputAlias} /><br/>
    <label>Passphrase: </label><input value={passphrase} onInput={inputPassphrase} /><br/>
    <button onClick={btnRegister}>Register</button>
    <button onClick={btnCancel}>Cancel</button>
  </div>)
}
