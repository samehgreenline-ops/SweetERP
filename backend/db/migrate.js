import db from "./database.js";

function columnExists(table, column) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  return columns.some((col) => col.name === column);
}

function tableExists(table) {
  const result = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?`
    )
    .get(table);

  return !!result;
}

if (!columnExists("items", "reorder_level")) {
  db.exec(`
    ALTER TABLE items
    ADD COLUMN reorder_level REAL DEFAULT 0;
  `);
  console.log("Added reorder_level to items");
}

if (!columnExists("items", "notes")) {
  db.exec(`
    ALTER TABLE items
    ADD COLUMN notes TEXT;
  `);
  console.log("Added notes to items");
}


// ERP Core - Companies Foundation
if (!tableExists("companies")) {
  db.exec(`
    CREATE TABLE companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      business_type TEXT,
      logo TEXT,
      background TEXT,
      theme TEXT DEFAULT 'default',
      currency TEXT DEFAULT 'EGP',
      phone TEXT,
      address TEXT,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  console.log("Created companies table");
}