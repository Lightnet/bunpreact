/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet
*/
import {
  getDB
} from "../../database.js"

export default function handle(req){
  getDB();
	return new Response('',{status:200});
}