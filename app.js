// browser client

/** @jsx h */
//import { h } from "preact"
//import { h, Fragment } from "react"
//import { h } from "preact"

//import {h} from "https://cdn.jsdelivr.net/npm/preact/dist/preact.mjs"

import {h, Component, render} from "https://cdn.jsdelivr.net/npm/preact/dist/preact.mjs"

const app = h('h1',null,'Hello World, Preact!')

render(app, document.body)


console.log("Hello JSX")

/*
export default function(){

  return (

  <div>
    <label>Hello World!</label>
    <div id="app"></div>
  </div>
  )
}
*/






