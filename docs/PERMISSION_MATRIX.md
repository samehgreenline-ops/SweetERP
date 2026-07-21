# ERP Permission Matrix

## Purpose

This document defines the standard permission model for the ERP Core platform.

The permission system is designed to support:

- Multiple companies
- Multiple roles
- Different industries
- Customizable ERP deployments

Permission structure:

Module.Resource.Action


Example:

sales.invoice.create


---

# Core Actions

Standard actions:

- view
- create
- edit
- delete
- approve
- post
- export
- manage


---

# Dashboard

| Module | Resource | Actions |
|---|---|---|
| dashboard | dashboard | view |


---

# Items Management

| Module | Resource | Actions |
|---|---|---|
| items | item | view, create, edit, delete |


---

# Inventory

| Module | Resource | Actions |
|---|---|---|
| inventory | stock | view, adjust, transfer |


---

# Production

| Module | Resource | Actions |
|---|---|---|
| production | order | view, create, edit, approve |


---

# Purchases

| Module | Resource | Actions |
|---|---|---|
| purchases | invoice | view, create, edit, approve, post |


---

# Sales

| Module | Resource | Actions |
|---|---|---|
| sales | invoice | view, create, edit, approve, post |


---

# Customers

| Module | Resource | Actions |
|---|---|---|
| customers | customer | view, create, edit, delete |


---

# Suppliers

| Module | Resource | Actions |
|---|---|---|
| suppliers | supplier | view, create, edit, delete |


---

# Accounting

| Module | Resource | Actions |
|---|---|---|
| accounting | account | view, create, edit |
| accounting | journal | view, create, post |
| accounting | ledger | view |
| accounting | reports | view, export |


---

# Reports

| Module | Resource | Actions |
|---|---|---|
| reports | report | view, export |


---

# Administration

| Module | Resource | Actions |
|---|---|---|
| security | users | manage |
| security | roles | manage |
| security | permissions | manage |


---

# Future Platform Extensions

The permission engine should support:

- Custom modules
- Custom resources
- Custom actions
- Company specific permissions
- Role templates
- Approval workflows


---

# Current Implementation Status

Completed:

- Permission registry
- Role permissions
- JWT authentication
- Authorization middleware
- Users route protection


Next:

- Expand permission definitions
- Protect ERP modules gradually
- Build role templates