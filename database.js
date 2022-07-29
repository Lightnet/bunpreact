/*
  Project Name: Bun Preact
  License: MIT
  Created By: Lightnet
*/

import { Database } from "bun:sqlite";
import { generateHashPassword } from "./libs/serveapi.js"
import crypto,{ randomUUID } from 'crypto';

//const db = new Database("mydb.sqlite");

// Create a table in the database
//db.run("CREATE TABLE IF NOT EXISTS cheeses (name VARCHAR(100));")
// Insert Some Values into the table
//db.run("INSERT INTO cheeses VALUES ('gouda'), ('munster'), ('brie');")
// Query the table
//const result = db.query("SELECT * FROM cheeses;").all()
// Log results
//console.log(result)

//const SECRET = process.env.SECRET;

let db;
function initDB(){
  if(db){
    console.log("DB READY!")
  }else{
    db = new Database("mydb.sqlite");
    console.log("DB INIT!")
    //deleteUserTable();
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,
        alias TEXT,
        passphrase TEXT,
        email TEXT,
        salt TEXT,
        date TEXT
      )`);
      
    db.run(
      `CREATE TABLE IF NOT EXISTS todolist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,
        content TEXT,
        date TEXT
      )`);
  }
}

function deleteUserTable(){
    db.run(`DROP TABLE IF EXISTS user;`);
}

function getDB(){
  if(db){
    console.log("DB READY!")
  }else{
    console.log("db NULL")
  }
  return db;
}

function checkUser(name){
  // get the query
  const stmt = db.query("SELECT * FROM user WHERE alias = ?");
  //console.log(stmt.get(name));
  return stmt.get(name) || null;
}

function addUser(name, pass){
  //const insert = db.prepare("INSERT INTO user (alias, passphrase) VALUES ($alias, $pass)");
  try {
    const SALT = crypto.randomBytes(16).toString('hex');
    const _hash = generateHashPassword(pass,SALT);
    db.run(
      "INSERT INTO user (userId, alias, passphrase, salt) VALUES (?, ?, ?, ?)",
      randomUUID(),
      name,
      _hash,
      SALT
    );
    return true;
  }catch(error){
      console.log("error", error)
    return false;
  }
}

function addToDoList(content){
  
  try {
    const UUID = crypto.randomUUID();
    const data = db.run(
      "INSERT INTO todolist ( content ) VALUES ( ? )",
      content
    );
    console.log(data)
    return true;
  }catch(error){
    console.log("error", error)
    return false;
  }
}

function getToDoList(){
  try {
    const stmt = db.query("SELECT * FROM todolist");
    return stmt.all();
  }catch(error){
    console.log("error", error)
    return false;
  }
}

function deleteToDoList(id){

  try {
    db.run(`DELETE FROM todolist WHERE id = ${id}`);
    return true;
  }catch(error){
    console.log("error", error)
    return false;
  }
}

function updateToDoList(id,content){
  //console.log("id:",id)
  //console.log("content:",content)
  try {
    const stmt = db.query(`UPDATE todolist SET content = '${content}' WHERE id = ${id}`);
    //console.log(stmt)
    stmt.run();
    return true;
  }catch(error){
    console.log("error", error)
    return false;
  }
}

export {
  initDB,
  getDB,
  checkUser,
  addUser,
  addToDoList,
  getToDoList,
  updateToDoList,
  deleteToDoList
}