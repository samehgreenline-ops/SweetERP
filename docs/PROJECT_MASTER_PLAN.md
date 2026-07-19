# SweetERP Project Master Plan

## 1. Vision

SweetERP is a customizable ERP platform.
The first implementation model is a sweets manufacturing and sales business because it contains complex operational cycles:
- Raw materials
- Recipes
- Production
- Inventory
- Purchases
- Sales
- Cost calculation

The goal is to build a flexible ERP core that can later be customized for different industries.

---

# 2. Current Architecture

Frontend:
- React
- Material UI
- frontend_new is the approved frontend

Backend:
- Node.js
- Express

Database:
- SQLite

Repository:
- GitHub controlled

---

# 3. Completed Modules

## Core
✅ Project structure  
✅ Database  
✅ API layer  

## Security
✅ User login  
✅ User management  
✅ Permissions  
✅ Protected routes  

## Master Data
✅ Items
✅ Raw materials
✅ Finished products
✅ Units
✅ Customers
✅ Suppliers

## Manufacturing
✅ Recipes
✅ Recipe items
✅ Unit conversions
✅ Production orders
✅ Raw material consumption
✅ Finished goods increase

## Inventory
✅ Stock movements
✅ Purchases impact inventory
✅ Production impact inventory
✅ Sales impact inventory

## Sales
✅ Sales module
✅ Customer selection
✅ Product selection
✅ Sale price handling

## Purchases
✅ Purchase module
✅ Supplier handling

---

# 4. Current Development Phase

Phase:
Integration + Accounting + Reports + UI Improvements

Priority:
Do not rebuild completed modules.
Improve, test and connect existing modules.

---

# 5. Remaining Tasks

## A) Complete Operational Cycle

Purchase:
Supplier
→ Purchase Invoice
→ Stock Increase
→ Cost Update

Production:
Recipe
→ Production Order
→ Raw Material Consumption
→ Finished Product
→ Cost Update

Sales:
Customer
→ Sales Invoice
→ Stock Reduction
→ Revenue Recording

---

## B) Accounting System

Required:
- Chart of Accounts
- Journal Entries
- Automatic accounting transactions
- Customer accounts
- Supplier accounts
- Inventory valuation

---

## C) Cost Management

Required:
- Recipe cost
- Production cost
- Product cost
- Profit margin
- Actual cost tracking

---

## D) Reports

Required:
- Inventory reports
- Sales reports
- Purchase reports
- Production reports
- Cost reports
- Profit reports
- Financial statements

---

## E) Documents

Required:
- Purchase invoices
- Sales invoices
- Production documents
- Printing
- PDF export

---

## F) UI Improvements

Required:
- Dashboard
- Better tables
- Search
- Filters
- User experience improvements

---

# 6. Work Rules

1. Never modify stable modules without reason.
2. Before large changes:
   - git status
   - git diff --stat

3. Save completed phases with Git commit.

4. Keep frontend_new as the active frontend.

5. Complete business logic before cosmetic improvements.

---

# 7. Current Goal

Deliver ERP Version 1:

A complete working cycle:
Purchase
→ Inventory
→ Production
→ Cost
→ Sale
→ Accounting
→ Reports
س