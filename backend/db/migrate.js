import db from "./database.js";
import { defaultPermissions } from "../core/security/permissions.js";

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

for (const permission of defaultPermissions) {

  const exists = db.prepare(`
    SELECT id
    FROM permissions
    WHERE code = ?
  `).get(permission.code);


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
      permission.code,
      permission.name,
      permission.module
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
// ================================
// Accounting Foundation
// ================================


// Accounts
if (!tableExists("accounts")) {

  db.exec(`
    CREATE TABLE accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      account_type TEXT NOT NULL,
      parent_id INTEGER,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(company_id, code),
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (parent_id) REFERENCES accounts(id)
    );
  `);

  console.log("Created accounts table");

}


// Journal Entries
if (!tableExists("journal_entries")) {

  db.exec(`
    CREATE TABLE journal_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      entry_date TEXT NOT NULL,
      reference_type TEXT,
      reference_id INTEGER,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (company_id) REFERENCES companies(id)
    );
  `);

  console.log("Created journal_entries table");

}


// Journal Lines
if (!tableExists("journal_lines")) {

  db.exec(`
    CREATE TABLE journal_lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      journal_entry_id INTEGER NOT NULL,
      account_id INTEGER NOT NULL,
      debit REAL DEFAULT 0,
      credit REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id)
        ON DELETE CASCADE,
      FOREIGN KEY (account_id) REFERENCES accounts(id)
    );
  `);

  console.log("Created journal_lines table");

}


// Default Chart Of Accounts
const defaultAccounts = [
  ["1000", "الصندوق", "ASSET"],
  ["1100", "البنك", "ASSET"],
  ["1200", "العملاء", "ASSET"],
  ["1300", "مخزون خامات", "ASSET"],
  ["1400", "مخزون منتجات تامة", "ASSET"],

  ["2000", "الموردون", "LIABILITY"],

  ["3000", "رأس المال", "EQUITY"],

  ["4000", "المبيعات", "REVENUE"],

  ["5000", "تكلفة المبيعات", "EXPENSE"],
  ["5100", "المصروفات العامة", "EXPENSE"],
];


const companiesForAccounts = db.prepare(`
  SELECT id FROM companies
`).all();


for (const company of companiesForAccounts) {

  for (const account of defaultAccounts) {

    const exists = db.prepare(`
      SELECT id
      FROM accounts
      WHERE company_id = ?
      AND code = ?
    `).get(
      company.id,
      account[0]
    );


    if (!exists) {

      db.prepare(`
        INSERT INTO accounts
        (
          company_id,
          code,
          name,
          account_type
        )
        VALUES (?, ?, ?, ?)
      `).run(
        company.id,
        account[0],
        account[1],
        account[2]
      );

    }

  }

}
// ================================
// Sales Payment Method
// ================================

if (tableExists("sales") && !columnExists("sales", "payment_method")) {

  db.exec(`
    ALTER TABLE sales
    ADD COLUMN payment_method TEXT DEFAULT 'CASH';
  `);

  console.log("Added payment_method to sales");

}
// ================================
// System Settings
// ================================

if (!tableExists("system_settings")) {

  db.exec(`
    CREATE TABLE system_settings (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      setting_key TEXT NOT NULL UNIQUE,

      value TEXT,

      data_type TEXT DEFAULT 'TEXT',

      description TEXT,

      created_at TEXT DEFAULT (datetime('now'))

    );
  `);


  console.log("Created system_settings table");

}



// Default System Settings

const defaultSettings = [

  [
    "default_currency",
    "EGP",
    "TEXT",
    "Default Currency"
  ],

  [
    "fiscal_year_start",
    "01-01",
    "TEXT",
    "Fiscal Year Start"
  ],

  [
    "cost_method",
    "AVERAGE",
    "TEXT",
    "Inventory Cost Method"
  ],

  [
    "tax_rate",
    "0",
    "NUMBER",
    "Default Tax Rate"
  ],

  [
    "decimal_places",
    "2",
    "NUMBER",
    "Decimal Places"
  ],

  [
    "system_language",
    "ar",
    "TEXT",
    "System Language"
  ]

];



for (const setting of defaultSettings) {


  const exists = db.prepare(`

    SELECT id

    FROM system_settings

    WHERE setting_key = ?

  `).get(setting[0]);



  if (!exists) {


    db.prepare(`

      INSERT INTO system_settings

      (

        setting_key,

        value,

        data_type,

        description

      )

      VALUES (?, ?, ?, ?)

    `).run(

      setting[0],

      setting[1],

      setting[2],

      setting[3]

    );


  }

}