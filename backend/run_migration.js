import db from "./db/database.js";
import fs from "fs";

try {

  const sql = fs.readFileSync(
    "./db/accounting_migration.sql",
    "utf8"
  );

  db.exec(sql);

  console.log("ACCOUNTING MIGRATION DONE");

} catch (error) {

  console.error("MIGRATION ERROR:");
  console.error(error);

}