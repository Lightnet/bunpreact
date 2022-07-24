
/** @jsx h */
import { h, render } from "preact"
import Counter from "/components/Counter.jsx"

export default function App(){

  function clickTest(){
  	console.log("TEST CLICK")
  }

  return (
  <div>
    <label onClick={clickTest}>Hello World! Preact!</label>
    <Counter/>
  </div>
  )
}

//render(App(), document.body)
//console.log("Hello JSX")

//let loading = document.getElementById("loading")
//if(loading){
  //loading.remove()
//}