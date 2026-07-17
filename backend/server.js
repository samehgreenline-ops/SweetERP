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

import "./db/database.js";
import "./db/migrate.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SweetERP Backend يعمل بنجاح" });
});

app.use("/api/items", itemsRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/production", productionRouter);
app.use("/api/purchases", purchasesRouter);
app.use("/api/sales", salesRouter);
app.use("/api/suppliers", suppliersRouter);
app.use("/api/customers", customersRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/companies", companiesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "خطأ في الخادم" });
});

app.listen(PORT, () => {
  console.log(`SweetERP Backend يعمل على http://localhost:${PORT}`);
});