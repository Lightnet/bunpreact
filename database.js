import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");

// Create a table in the database
db.run("CREATE TABLE IF NOT EXISTS cheeses (name VARCHAR(100));")
// Insert Some Values into the table
db.run("INSERT INTO cheeses VALUES ('gouda'), ('munster'), ('brie');")
// Query the table
const result = db.query("SELECT * FROM cheeses;").all()
// Log results
console.log(result)