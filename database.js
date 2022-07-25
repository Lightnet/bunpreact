import { Database } from "bun:sqlite";

//const db = new Database("mydb.sqlite");

// Create a table in the database
//db.run("CREATE TABLE IF NOT EXISTS cheeses (name VARCHAR(100));")
// Insert Some Values into the table
//db.run("INSERT INTO cheeses VALUES ('gouda'), ('munster'), ('brie');")
// Query the table
//const result = db.query("SELECT * FROM cheeses;").all()
// Log results
//console.log(result)

let db;
function initDB(){
  if(db){
    console.log("DB READY!")
  }else{
    db = new Database("mydb.sqlite");
    console.log("DB INIT!")
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alias TEXT,
        passphrase TEXT,
        email TEXT,
        salt TEXT,
        date TEXT
      )`);
  }
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
  return stmt.get(name);
}

function checkUserPassphrase(name,pass){
    return null;
}

function addUser(name, pass){
  //const insert = db.prepare("INSERT INTO user (alias, passphrase) VALUES ($alias, $pass)");
  db.run(
    "INSERT INTO user (alias, passphrase) VALUES (?, ?)",
    name,
    pass
  );

  return null;
}

export {
  initDB,
  getDB,
  checkUser,
  checkUserPassphrase,
  addUser
}