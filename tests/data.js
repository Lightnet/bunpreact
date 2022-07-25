import { Database } from "bun:sqlite";
// create a new database file
const db = new Database("db.sqlite3")
//crate a table in the the database
db.run("CREATE TABLE IF NOT EXISTS cheeses (name VARCHAR(100));")
// insert some values into the table
db.run("INSERT INTO cheeses VALUES ('gouda'), ('muster'), ('brie');")
// query table
const result = db.query("SELECT * FROM cheeses;").all();
//log results
console.log(result)