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


// Items updates
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


// Companies
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


// Roles
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
    `).get(
      company.id,
      roleName
    );


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


// Permissions
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


// Users
if (!tableExists("users")) {

  db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      role_id INTEGER NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (role_id) REFERENCES roles(id)
    );
  `);

  console.log("Created users table");

}


// Role Permissions
if (!tableExists("role_permissions")) {

  db.exec(`
    CREATE TABLE role_permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role_id INTEGER NOT NULL,
      permission_id INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(role_id, permission_id),
      FOREIGN KEY (role_id) REFERENCES roles(id),
      FOREIGN KEY (permission_id) REFERENCES permissions(id)
    );
  `);

  console.log("Created role_permissions table");

}


// Give Owner role all permissions
const ownerRoles = db.prepare(`
  SELECT id
  FROM roles
  WHERE name = 'Owner'
`).all();


const allPermissions = db.prepare(`
  SELECT id
  FROM permissions
`).all();


for (const role of ownerRoles) {

  for (const permission of allPermissions) {

    const exists = db.prepare(`
      SELECT id
      FROM role_permissions
      WHERE role_id = ?
      AND permission_id = ?
    `).get(
      role.id,
      permission.id
    );


    if (!exists) {

      db.prepare(`
        INSERT INTO role_permissions
        (
          role_id,
          permission_id
        )
        VALUES (?, ?)
      `).run(
        role.id,
        permission.id
      );

    }

  }

}