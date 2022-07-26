//import axios from "https://unpkg.com/@bundled-es-modules/axios@0.27.2/index.js";
//const axios = await import("axios");
//console.log("axios")
//console.log(axios)
//console.log("axios>>>")
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

/*
const axiosapi={};
export {
  axiosapi
}
*/