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


// ERP Core - Roles Foundation
if (!tableExists("roles")) {
  db.exec(`
    CREATE TABLE roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (company_id) REFERENCES companies(id)
    );
  `);

  console.log("Created roles table");
}


// Create default roles for existing companies
const companies = db.prepare(`
  SELECT id FROM companies
`).all();

const defaultRoles = [
  "Owner",
  "Financial Manager",
  "Accountant",
  "Cashier",
  "Store Keeper",
  "Production Manager",
];

for (const company of companies) {
  for (const roleName of defaultRoles) {
    const exists = db.prepare(`
      SELECT id
      FROM roles
      WHERE company_id = ?
      AND name = ?
    `).get(company.id, roleName);

    if (!exists) {
      db.prepare(`
        INSERT INTO roles
        (
          company_id,
          name
        )
        VALUES (?, ?)
      `).run(
        company.id,
        roleName
      );
    }
  }
}


// ERP Core - Permissions Foundation
if (!tableExists("permissions")) {
  db.exec(`
    CREATE TABLE permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      module TEXT NOT NULL,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  console.log("Created permissions table");
}


// Default system permissions
const defaultPermissions = [
  ["dashboard.view", "View Dashboard", "dashboard"],
  ["items.view", "View Items", "items"],
  ["items.create", "Create Items", "items"],
  ["items.edit", "Edit Items", "items"],
  ["inventory.view", "View Inventory", "inventory"],
  ["production.view", "View Production", "production"],
  ["production.create", "Create Production", "production"],
  ["purchases.view", "View Purchases", "purchases"],
  ["purchases.create", "Create Purchases", "purchases"],
  ["sales.view", "View Sales", "sales"],
  ["sales.create", "Create Sales", "sales"],
  ["reports.view", "View Reports", "reports"],
  ["users.manage", "Manage Users", "users"],
];


for (const permission of defaultPermissions) {
  const exists = db.prepare(`
    SELECT id
    FROM permissions
    WHERE code = ?
  `).get(permission[0]);

  if (!exists) {
    db.prepare(`
      INSERT INTO permissions
      (
        code,
        name,
        module
      )
      VALUES (?, ?, ?)
    `).run(
      permission[0],
      permission[1],
      permission[2]
    );
  }
}