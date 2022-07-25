

//import * as fs from "node:fs/promises";
import fs from 'node:fs';
import { exec, spawn} from "bun-utilities";
//import chokidar from "chokidar";
console.log("START TEST...")


console.log("...")

async() => await spawn('echo', ['test'])

//console.log(await exec(['bun', 'run','dev']))

const directoryPath = import.meta.dir+"/";
console.log(directoryPath)

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
//checkDirFiles();

//console.log(fs);
function onClose(){
    console.log("EXIT")
}

async function initSpawn(){
  spawn('bun',['run','dev'])
    .on('exit',onClose);
  console.log("server")
  console.log(serveProc)
}

//await initSpawn();



/*
// One-liner for current directory
const watcher = chokidar.watch(directoryPath,{
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
})
watcher.on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => { // internal
    log('Raw event info:', event, path, details);
  });
*/

console.log("END TEST...")