

// https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j

import {file, serve} from "bun";
import path,{ join } from 'node:path';
import fs from 'node:fs';

import events from 'node:events';

//import child_process from 'node:child_process';
//import child_process from 'child_process';//nope
//import Bun from "bun" //ok
//console.log("child_process")
//console.log(child_process)
//console.log(events)

import { exec, spawn} from "bun-utilities";
console.log("init restart script!");
//console.log(exec)
//console.log(spawn)
//const server = exec(['bun','run','dev'])
// const blob = file(join(import.meta.dir+"/", "/index.html"))
let checkFiles=[];// for md5 hash check for restart up
let serveProc=null;

const directoryPath = import.meta.dir+"/";


class MyEmitter extends events {}
const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');

function checkDirFiles(){
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      //console.log(file);
    });
  })
}

checkDirFiles();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//const input = "hello world".repeat(10);
//const input = "hello world";
//console.log(Bun.hash(input));


//console.log("TEST1")
//await sleep(2000)
//console.log("TEST2")
//await sleep(2000)
//console.log("TEST3")




/*
setInterval(function() {
  //Your code
}, 1000); //Every 1000ms = 1sec

async function initSpawn(){
  await spawn('bun',['run','dev']).on('exit',function(){
    console.log("EXIT")
  });
  console.log("server")
  console.log(serveProc)
}
//await initSpawn();

let count=0
function TaskCode(){
  console.log("TID:",tid)
  //clearTimeout(tid);
  //console.log(TaskCode())
  console.log(TaskCode)
  count++;
  if(count>50){
    abortTimer()
  }
  //tid=setInterval(()=>{TaskCode()},2000);
}
//let tid = setTimeout(()=>{TaskCode()},2000);
let tid = setInterval(()=>{TaskCode()},2000);


function abortTimer() { // to be called when you want to stop the timer
  clearTimeout(tid);
}
*/
console.log("END SCRIPT")



//const transpiler = new Bun.Transpiler({ loader: "jsx" });
//  import Preact from 'preact';
// https://unpkg.com/preact?module
// 
// import { h } from 'preact';
//const importmap = transpiler.scan(`
//import { h } from "preact";
//import { jsx } from "preact/jsx-runtime";
//export const loader = () => import('./loader');
//`);

//console.log("importmap")
//console.log(importmap)


const jsxText=`
import {h} from "preact";
export default function TestApp(){
  return (<div>Hello</div>)
}
`;
//const html = await transpiler.transform(jsxText, "jsx");
//console.log(html)

//const transpiler2 = new Bun.Transpiler({ loader: "jsx", macros:importmap});
//const html2 = await transpiler2.transform(jsxText);
//console.log(html2)






//console.log(fs)
//console.log(child_process)
//console.log("auto restart");
//const file = "./routes/";
//let proc=null;
//const nodefile = "dev.js"
//console.log( Bun)
//function initSetup(){
//  proc = child_process('bun',[nodefile]);
//}

//function restart(){
//	proc.kill();
//	initSetup();
//}

//fs.watch(file, (event,filename)=>{
// console.log("file change:",filename)
//})

//initSetup()