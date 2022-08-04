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
  console.log("Response")
  return new Response("Hello World! Request!"); //will not render page doc but this will render doc instead
}

export default function Page(props){ //props from handle
  return (<div>
    <label>Hello Bun Preact! Response!</label>
  </div>)
}
