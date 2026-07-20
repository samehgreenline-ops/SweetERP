import db from "./db/database.js";

try {

  const transaction = db.transaction(() => {

    db.prepare(`
      DELETE FROM journal_lines
    `).run();


    db.prepare(`
      DELETE FROM journal_entries
    `).run();

  });


  transaction();

  console.log("JOURNAL CLEANED SUCCESSFULLY");

}
catch (error) {

  console.error("CLEAN ERROR:");
  console.error(error.message);

}