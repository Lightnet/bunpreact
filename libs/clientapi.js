/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet
*/

//import axios from "https://unpkg.com/@bundled-es-modules/axios@0.27.2/index.js";
//console.log(await import("https://unpkg.com/axios/dist/axios.min.js"))

import { axios } from 'axios';

const axiosapi = axios.create({
  baseURL: '/',
  timeout: 1000,
  //headers: {'X-Custom-Header': 'foobar'}
});

export {
  axiosapi
}

//get token user data "header.object.sign" base64
export function JWTtoObj(jwtoken){
  const sPayload = jwtoken.split('.')[1];
  let payload=Buffer.from(sPayload, 'base64').toString('ascii')
  return JSON.parse(payload);
}

/*
const axiosapi={};
export {
  axiosapi
}
*/