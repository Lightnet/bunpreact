// browser client

/** @jsx h */
import { h } from "preact"

export default function Button(){

  function btnTest(){
    console.log("Button Test")
  }

  return (<button onClick={btnTest}>
    Button Test
  </button>
  )
}
