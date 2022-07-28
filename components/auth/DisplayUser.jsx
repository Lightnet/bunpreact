/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet

  browser client
*/

/** @jsx h */
import { h } from "preact"
import { useContext } from "preact/hooks"
import { AuthContext } from "./AuthProvider.jsx"

export default function DisplayUser(){

  const { user } = useContext(AuthContext);

  return (<label> { user } </label>)
}
