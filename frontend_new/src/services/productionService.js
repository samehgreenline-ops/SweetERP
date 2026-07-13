import { apiGet, apiPost, apiDelete } from "./api.js";

export async function getProductionOrders() {
  return apiGet("/production");
}

export async function createProductionOrder(data) {
  return apiPost("/production", data);
}

export async function completeProductionOrder(id) {
  return apiPost(`/production/${id}/complete`);
}

export async function deleteProductionOrder(id) {
  return apiDelete(`/production/${id}`);
}
