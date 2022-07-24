// browser client

/** @jsx h */
import { h } from "preact"
import { useState } from "preact/hooks"

export default function Counter(){
  const [count, setCount] = useState(0);

  function btnAdd(){
    console.log("count+")
    setCount(count + 1)
  }

  function btnSubtract(){
    console.log("Count-")
    setCount(count - 1)
  }

  return (<div>
    <label>Counter </label>
    <button onClick={btnAdd}>+</button>
    <button onClick={btnSubtract}>-</button>
    <label> {count} </label>
  </div>)
}
