/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet

	Information:
		work in progress not build yet
*/

/** @jsx h */
import { h, Fragment } from "preact"

export function handle(){// serve only http
  console.log("query")
  //return new Response();//?
  return {};//? object data to pass to Page props ?
}

export default function Page(props){ //props from handler
  return (<div>
    <label>Hello Bun Preact! Route!</label>
  </div>)
}
