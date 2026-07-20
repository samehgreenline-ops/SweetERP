import db from "./db/database.js";

const tables = db.prepare(`
SELECT name 
FROM sqlite_master 
WHERE type='table'
ORDER BY name
`).all();

console.log("TABLES:");
console.log(tables);


for (const t of tables) {

  if (
    [
      "users",
      "accounts",
      "journal_entries",
      "journal_lines"
    ].includes(t.name)
  ) {

    console.log("\nSTRUCTURE:", t.name);

    console.log(
      db.prepare(`PRAGMA table_info(${t.name})`).all()
    );

  }

}