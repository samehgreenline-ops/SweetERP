import express from "express";
import cors from "cors";

import { itemsRouter } from "./routes/items.js";
import { recipesRouter } from "./routes/recipes.js";
import { inventoryRouter } from "./routes/inventory.js";
import { productionRouter } from "./routes/production.js";
import { purchasesRouter } from "./routes/purchases.js";
import { salesRouter } from "./routes/sales.js";
import { suppliersRouter } from "./routes/suppliers.js";
import { customersRouter } from "./routes/customers.js";
import { reportsRouter } from "./routes/reports.js";

import { companiesRouter } from "./routes/companies.js";
import { usersRouter } from "./routes/users.js";
import { rolesRouter } from "./routes/roles.js";
import { authRouter } from "./routes/auth.js";

import { accountingRouter } from "./routes/accounting.js";
import { accountingReportsRouter } from "./routes/accounting_reports.js";
import { financialReportsRouter } from "./routes/financial_reports.js";
import { costingRouter } from "./routes/costing.js";


import "./db/database.js";
import "./db/migrate.js";


const app = express();

const PORT = 3001;


app.use(cors());

app.use(express.json());



// Health Check

app.get("/api/health", (req,res)=>{

  res.json({

    status:"ok",

    message:"SweetERP Backend يعمل بنجاح",

    version:"1.0"

  });

});




// Main Modules

app.use("/api/items", itemsRouter);

app.use("/api/recipes", recipesRouter);

app.use("/api/inventory", inventoryRouter);

app.use("/api/production", productionRouter);

app.use("/api/purchases", purchasesRouter);

app.use("/api/sales", salesRouter);

app.use("/api/suppliers", suppliersRouter);

app.use("/api/customers", customersRouter);

app.use("/api/reports", reportsRouter);




// System Modules

app.use("/api/companies", companiesRouter);

app.use("/api/users", usersRouter);

app.use("/api/roles", rolesRouter);

app.use("/api/auth", authRouter);




// Accounting Core

app.use(
  "/api/accounting",
  accountingRouter
);



// Accounting Reports

app.use(
  "/api/accounting/reports",
  accountingReportsRouter
);



// Financial Reports

app.use(
  "/api/financial-reports",
  financialReportsRouter
);



// Costing

app.use(
  "/api/costing",
  costingRouter
);





// Error Handler

app.use((err,req,res,next)=>{

  console.error(
    "SERVER ERROR:",
    err
  );


  res.status(500).json({

    error:"خطأ في الخادم",

    message:err.message

  });


});




// Start

app.listen(PORT,()=>{

  console.log(
    `SweetERP Backend يعمل على http://localhost:${PORT}`
  );

});