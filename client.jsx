/**
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet
  
   Information: 
    Browser client entry.
 */

/** @jsx h */
import { h, render } from "preact"
import App from "/app.jsx"

//add preact app component to doc
render(App(), document.body)
//console.log("Hello JSX")

let loading = document.getElementById("loading")
if(loading){
  loading.remove()
}