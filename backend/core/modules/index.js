/*
|--------------------------------------------------------------------------
| ERP Platform - Module Registry
|--------------------------------------------------------------------------
|
| This registry represents every module installed in the ERP Platform.
| SweetERP itself is only one application built on top of this platform.
|
*/

export const moduleRegistry = [

  {
    id: "core",
    name: "ERP Core",
    version: "1.0.0",
    vendor: "ERP Platform",
    enabled: true,
    system: true,
    dependencies: [],
    description: "Core platform services."
  },

  {
    id: "dashboard",
    name: "Dashboard",
    version: "1.0.0",
    vendor: "ERP Platform",
    enabled: true,
    system: true,
    dependencies: ["core"],
    description: "Platform dashboard."
  },

  {
    id: "items",
    name: "Items",
    version: "1.0.0",
    vendor: "SweetERP",
    enabled: true,
    system: false,
    dependencies: ["core"],
    description: "Items management."
  },

  {
    id: "inventory",
    name: "Inventory",
    version: "1.0.0",
    vendor: "SweetERP",
    enabled: true,
    system: false,
    dependencies: ["items"],
    description: "Inventory management."
  },

  {
    id: "production",
    name: "Production",
    version: "1.0.0",
    vendor: "SweetERP",
    enabled: true,
    system: false,
    dependencies: ["inventory"],
    description: "Production management."
  },

  {
    id: "purchases",
    name: "Purchases",
    version: "1.0.0",
    vendor: "SweetERP",
    enabled: true,
    system: false,
    dependencies: ["inventory"],
    description: "Purchasing."
  },

  {
    id: "sales",
    name: "Sales",
    version: "1.0.0",
    vendor: "SweetERP",
    enabled: true,
    system: false,
    dependencies: ["inventory"],
    description: "Sales."
  },

  {
    id: "accounting",
    name: "Accounting",
    version: "1.0.0",
    vendor: "SweetERP",
    enabled: true,
    system: false,
    dependencies: ["sales", "purchases"],
    description: "Financial accounting."
  },

  {
    id: "reports",
    name: "Reports",
    version: "1.0.0",
    vendor: "ERP Platform",
    enabled: true,
    system: true,
    dependencies: ["core"],
    description: "Reporting engine."
  },

  {
    id: "security",
    name: "Security",
    version: "1.0.0",
    vendor: "ERP Platform",
    enabled: true,
    system: true,
    dependencies: ["core"],
    description: "Authentication and authorization."
  }

];

export function getModules() {
  return moduleRegistry;
}

export function getModule(id) {
  return moduleRegistry.find((m) => m.id === id);
}

export function isModuleEnabled(id) {
  const module = getModule(id);
  return !!module && module.enabled;
}