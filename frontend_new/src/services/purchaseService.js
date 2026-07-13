import { apiGet, apiPost, apiPut, apiDelete } from "./api.js";

export async function getSuppliers() {
  return apiGet("/suppliers");
}

export async function addSupplier(data) {
  return apiPost("/suppliers", data);
}

export async function updateSupplier(data) {
  return apiPut(`/suppliers/${data.id}`, data);
}

export async function deleteSupplier(id) {
  return apiDelete(`/suppliers/${id}`);
}

export async function getPurchases() {
  return apiGet("/purchases");
}

export async function addPurchase(data) {
  return apiPost("/purchases", data);
}
