// browser client

/** @jsx h */
import {h, Component, render} from "preact"

const app = h('h1',null,'Hello World, Preact!')

render(app, document.body)

/*
export default function(){
  return (<div>
    <label>Hello World!</label>
  </div>
  )
}
*/
console.log("Hello JSX")