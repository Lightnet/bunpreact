//import { h } from "preact"
//import { h, Fragment } from "react"
//import { h } from "preact"
//import {h} from "https://cdn.jsdelivr.net/npm/preact/dist/preact.mjs"

//import {h, Component, render} from "https://cdn.jsdelivr.net/npm/preact/dist/preact.mjs"
//const app = h('h1',null,'Hello World, Preact!')
//render(app, document.body)
//import { jsx } from "https://cdn.jsdelivr.net/npm/preact#10.10.0/jsx-runtime/dist/jdxRuntime.module.mjs"

/** @jsx h */
import { h, render } from "preact"
import Button from "/button.jsx"

export default function PageApp(){

  function clickTest(){
  	console.log("TEST CLICK")
  }

  return (
  <div>
    <label onClick={clickTest}>Hello World!</label>
    <Button/>
  </div>
  )
}

render(PageApp(), document.body)
console.log("Hello JSX")