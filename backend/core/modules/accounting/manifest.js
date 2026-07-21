/*
|--------------------------------------------------------------------------
| ERP Platform - Accounting Module Manifest
|--------------------------------------------------------------------------
|
| Accounting module definition.
|
| Every ERP module should describe itself through a manifest.
|
*/


const accountingManifest = {


  id: "accounting",


  name: "Accounting",


  version: "1.0.0",


  vendor: "ERP Platform",


  description:
    "Financial accounting module including accounts, journals and reports.",





  dependencies: [

    "core",

    "sales",

    "purchases"

  ],





  permissions: [


    "accounting.account.view",

    "accounting.account.create",

    "accounting.account.edit",


    "accounting.journal.view",

    "accounting.journal.create",

    "accounting.journal.post",


    "accounting.ledger.view",


    "accounting.reports.view",

    "accounting.reports.export"


  ],






  menus: [


    {

      id: "accounting",

      title: "Accounting",

      icon: "AccountBalance",

      path: "/accounting",

      permission:
        "accounting.account.view"

    }


  ],






  routes: [


    {

      path: "/accounting/accounts",

      permission:
        "accounting.account.view"

    },


    {

      path: "/accounting/journal",

      permission:
        "accounting.journal.view"

    },


    {

      path: "/accounting/ledger",

      permission:
        "accounting.ledger.view"

    }


  ],






  reports: [


    {

      id: "trial_balance",

      name: "Trial Balance",

      permission:
        "accounting.reports.view"

    },


    {

      id: "income_statement",

      name: "Income Statement",

      permission:
        "accounting.reports.view"

    },


    {

      id: "balance_sheet",

      name: "Balance Sheet",

      permission:
        "accounting.reports.view"

    }


  ]

};



export default accountingManifest;