import db from "./db/database.js";

console.log("Cleaning zero quantity recipe items...");

const result = db.prepare(`
DELETE FROM recipe_items
WHERE qty = 0
`).run();

console.log(
  "Deleted rows:",
  result.changes
);

console.log("DONE");