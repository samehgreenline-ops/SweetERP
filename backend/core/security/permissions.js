export const defaultPermissions = [

  // Dashboard
  {
    code: "dashboard.view",
    name: "View Dashboard",
    module: "dashboard",
    resource: "dashboard",
    action: "view"
  },


  // Items
  {
    code: "items.item.view",
    name: "View Items",
    module: "items",
    resource: "item",
    action: "view"
  },

  {
    code: "items.item.create",
    name: "Create Items",
    module: "items",
    resource: "item",
    action: "create"
  },

  {
    code: "items.item.edit",
    name: "Edit Items",
    module: "items",
    resource: "item",
    action: "edit"
  },


  // Inventory
  {
    code: "inventory.stock.view",
    name: "View Inventory",
    module: "inventory",
    resource: "stock",
    action: "view"
  },


  // Production
  {
    code: "production.order.view",
    name: "View Production Orders",
    module: "production",
    resource: "order",
    action: "view"
  },

  {
    code: "production.order.create",
    name: "Create Production Orders",
    module: "production",
    resource: "order",
    action: "create"
  },


  // Purchases
  {
    code: "purchases.invoice.view",
    name: "View Purchase Invoices",
    module: "purchases",
    resource: "invoice",
    action: "view"
  },

  {
    code: "purchases.invoice.create",
    name: "Create Purchase Invoices",
    module: "purchases",
    resource: "invoice",
    action: "create"
  },


  // Sales
  {
    code: "sales.invoice.view",
    name: "View Sales Invoices",
    module: "sales",
    resource: "invoice",
    action: "view"
  },

  {
    code: "sales.invoice.create",
    name: "Create Sales Invoices",
    module: "sales",
    resource: "invoice",
    action: "create"
  },

  {
    code: "sales.invoice.approve",
    name: "Approve Sales Invoices",
    module: "sales",
    resource: "invoice",
    action: "approve"
  },


  // Reports
  {
    code: "reports.report.view",
    name: "View Reports",
    module: "reports",
    resource: "report",
    action: "view"
  },


  // Users & Security
  {
    code: "users.manage",
    name: "Manage Users",
    module: "security",
    resource: "users",
    action: "manage"
  },


  // Accounting
  {
    code: "accounting.account.view",
    name: "View Accounts",
    module: "accounting",
    resource: "account",
    action: "view"
  },

  {
    code: "accounting.journal.view",
    name: "View Journal Entries",
    module: "accounting",
    resource: "journal",
    action: "view"
  },

  {
    code: "accounting.journal.post",
    name: "Post Journal Entries",
    module: "accounting",
    resource: "journal",
    action: "post"
  },

  {
    code: "accounting.ledger.view",
    name: "View General Ledger",
    module: "accounting",
    resource: "ledger",
    action: "view"
  },

  {
    code: "accounting.reports.view",
    name: "View Financial Reports",
    module: "accounting",
    resource: "reports",
    action: "view"
  }

];