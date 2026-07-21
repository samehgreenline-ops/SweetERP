/*
|--------------------------------------------------------------------------
| ERP Platform - Menu Registry
|--------------------------------------------------------------------------
|
| Every module can register its own menu.
| The frontend sidebar will later be generated from this registry.
|
*/

export const menuRegistry = [

  {
    id: "dashboard",
    module: "dashboard",
    title: "Dashboard",
    icon: "Dashboard",
    path: "/",
    permission: "dashboard.view",
    order: 10
  },

  {
    id: "items",
    module: "items",
    title: "Items",
    icon: "Inventory",
    path: "/items",
    permission: "items.item.view",
    order: 20
  },

  {
    id: "inventory",
    module: "inventory",
    title: "Inventory",
    icon: "Inventory",
    path: "/inventory",
    permission: "inventory.stock.view",
    order: 30
  },

  {
    id: "production",
    module: "production",
    title: "Production",
    icon: "Factory",
    path: "/production",
    permission: "production.order.view",
    order: 40
  },

  {
    id: "purchases",
    module: "purchases",
    title: "Purchases",
    icon: "Receipt",
    path: "/purchases",
    permission: "purchases.invoice.view",
    order: 50
  },

  {
    id: "sales",
    module: "sales",
    title: "Sales",
    icon: "ShoppingCart",
    path: "/sales",
    permission: "sales.invoice.view",
    order: 60
  },

  {
    id: "accounting",
    module: "accounting",
    title: "Accounting",
    icon: "AccountBalance",
    path: "/accounting",
    permission: "accounting.account.view",
    order: 70
  },

  {
    id: "reports",
    module: "reports",
    title: "Reports",
    icon: "Assessment",
    path: "/reports",
    permission: "reports.report.view",
    order: 80
  },

  {
    id: "security",
    module: "security",
    title: "Administration",
    icon: "Settings",
    path: "/users",
    permission: "users.manage",
    order: 90
  }

];

export function getMenus() {
  return [...menuRegistry].sort((a, b) => a.order - b.order);
}