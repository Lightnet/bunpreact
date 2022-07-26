// browser client

/** @jsx h */
import { h } from "preact"
import { useState, useContext } from "preact/hooks"
import {AuthContext} from "/AuthProvider.jsx"

export default function DisplayUser(){
  //const [count, setCount] = useState(0);
  const { user } = useContext(AuthContext);
  console.log()

  return (
    <label> {user} </label>
  )
}
