import { apiGet } from "./api.js";

export async function getDashboardStats() {
  return apiGet("/reports/dashboard");
}

export async function getInventoryReport() {
  return apiGet("/reports/inventory");
}

export async function getProductionCosts() {
  return apiGet("/reports/production-costs");
}
