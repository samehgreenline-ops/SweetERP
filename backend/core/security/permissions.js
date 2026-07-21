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

  {
    code: "items.item.delete",
    name: "Delete Items",
    module: "items",
    resource: "item",
    action: "delete"
  },


  // Inventory
  {
    code: "inventory.stock.view",
    name: "View Inventory",
    module: "inventory",
    resource: "stock",
    action: "view"
  },

  {
    code: "inventory.stock.adjust",
    name: "Adjust Inventory Stock",
    module: "inventory",
    resource: "stock",
    action: "adjust"
  },

  {
    code: "inventory.stock.transfer",
    name: "Transfer Inventory Stock",
    module: "inventory",
    resource: "stock",
    action: "transfer"
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

  {
    code: "production.order.edit",
    name: "Edit Production Orders",
    module: "production",
    resource: "order",
    action: "edit"
  },

  {
    code: "production.order.approve",
    name: "Approve Production Orders",
    module: "production",
    resource: "order",
    action: "approve"
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

  {
    code: "purchases.invoice.edit",
    name: "Edit Purchase Invoices",
    module: "purchases",
    resource: "invoice",
    action: "edit"
  },

  {
    code: "purchases.invoice.approve",
    name: "Approve Purchase Invoices",
    module: "purchases",
    resource: "invoice",
    action: "approve"
  },

  {
    code: "purchases.invoice.post",
    name: "Post Purchase Invoices",
    module: "purchases",
    resource: "invoice",
    action: "post"
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
    code: "sales.invoice.edit",
    name: "Edit Sales Invoices",
    module: "sales",
    resource: "invoice",
    action: "edit"
  },

  {
    code: "sales.invoice.approve",
    name: "Approve Sales Invoices",
    module: "sales",
    resource: "invoice",
    action: "approve"
  },

  {
    code: "sales.invoice.post",
    name: "Post Sales Invoices",
    module: "sales",
    resource: "invoice",
    action: "post"
  },


  // Customers
  {
    code: "customers.customer.view",
    name: "View Customers",
    module: "customers",
    resource: "customer",
    action: "view"
  },

  {
    code: "customers.customer.create",
    name: "Create Customers",
    module: "customers",
    resource: "customer",
    action: "create"
  },

  {
    code: "customers.customer.edit",
    name: "Edit Customers",
    module: "customers",
    resource: "customer",
    action: "edit"
  },

  {
    code: "customers.customer.delete",
    name: "Delete Customers",
    module: "customers",
    resource: "customer",
    action: "delete"
  },


  // Suppliers
  {
    code: "suppliers.supplier.view",
    name: "View Suppliers",
    module: "suppliers",
    resource: "supplier",
    action: "view"
  },

  {
    code: "suppliers.supplier.create",
    name: "Create Suppliers",
    module: "suppliers",
    resource: "supplier",
    action: "create"
  },

  {
    code: "suppliers.supplier.edit",
    name: "Edit Suppliers",
    module: "suppliers",
    resource: "supplier",
    action: "edit"
  },

  {
    code: "suppliers.supplier.delete",
    name: "Delete Suppliers",
    module: "suppliers",
    resource: "supplier",
    action: "delete"
  },


  // Reports
  {
    code: "reports.report.view",
    name: "View Reports",
    module: "reports",
    resource: "report",
    action: "view"
  },

  {
    code: "reports.report.export",
    name: "Export Reports",
    module: "reports",
    resource: "report",
    action: "export"
  },


  // Users & Security
  {
    code: "users.manage",
    name: "Manage Users",
    module: "security",
    resource: "users",
    action: "manage"
  },

  {
    code: "roles.manage",
    name: "Manage Roles",
    module: "security",
    resource: "roles",
    action: "manage"
  },

  {
    code: "permissions.manage",
    name: "Manage Permissions",
    module: "security",
    resource: "permissions",
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
    code: "accounting.account.create",
    name: "Create Accounts",
    module: "accounting",
    resource: "account",
    action: "create"
  },

  {
    code: "accounting.account.edit",
    name: "Edit Accounts",
    module: "accounting",
    resource: "account",
    action: "edit"
  },

  {
    code: "accounting.journal.view",
    name: "View Journal Entries",
    module: "accounting",
    resource: "journal",
    action: "view"
  },

  {
    code: "accounting.journal.create",
    name: "Create Journal Entries",
    module: "accounting",
    resource: "journal",
    action: "create"
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
  },

  {
    code: "accounting.reports.export",
    name: "Export Financial Reports",
    module: "accounting",
    resource: "reports",
    action: "export"
  }

];