import { apiGet, apiPost } from "./api.js";

export async function getInventory() {
  return apiGet("/inventory");
}

export async function getMovements() {
  return apiGet("/inventory/movements");
}

export async function adjustStock(itemId, qty, notes) {
  return apiPost("/inventory/adjust", { itemId, qty, notes });
}
