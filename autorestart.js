import fs from 'node:fs';
//import child_process from 'child_process';//nope
//import Bun from "bun" //ok
import { 
  exec,
  spawn
} from "bun-utilities"
console.log("init restart script!")
//console.log(exec)
console.log(spawn)

//const server = exec(['bun','run','dev'])

let serveProc=null;

async function initSpawn(){
  serveProc = async()=> await spawn('bun',['run','dev']);
  console.log("server")
  console.log(serveProc)
}

await initSpawn();





//console.log(fs)
//console.log(child_process)
console.log("auto restart");
//const file = "./routes/";
//let proc=null;
//const nodefile = "dev.js"
//console.log( Bun)
function initSetup(){
//  proc = child_process('bun',[nodefile]);
}

function restart(){
//	proc.kill();
//	initSetup();
}

//fs.watch(file, (event,filename)=>{
// console.log("file change:",filename)
//})

initSetup()